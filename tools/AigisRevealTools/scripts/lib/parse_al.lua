-- parse_al.lua library
-- v1.3.4
-- author: lzlis
-- changes:
-- v1.3.4: support ALFT
-- v1.3.3: support BGRA swizzle
-- v1.3.2: support for ALTX frame names
-- v1.3.1: faster decompression
-- v1.3  : more improvement to .aar v3 parsing
-- v1.2  : greatly improved .aod parsing
--         some improvements to .aar v3 parsing (still in progress)
--         other things (don't remember)
-- v1.1  : fixed ABG5 decoding

local parse

local function parser(data, decompress)

  local function read_word(offset)
    local b1, b2 = data:byte(offset, offset + 1)
    return b1 + b2 * 256
  end

  local function read_dword(offset)
    local b1, b2, b3, b4 = data:byte(offset, offset + 3)
    return b1 + b2 * 256 + b3 * (256 * 256) + b4 * (256 * 256 * 256)
  end

  local function read_sdword(offset)
    local dword = read_dword(offset)
    if dword >= 0x80000000 then
      dword = dword - 0x100000000
    end
    return dword
  end

  local function tofloat(bin)
    local bytes = 4
    local expbits = 8
    local expbias = 127
    
    local sign = bin >> (bytes * 8 - 1)
    local exponent = bin >> (bytes * 8 - (1 + expbits))
    exponent = exponent & ((1 << expbits) - 1)
    local mantissa = bin & ((1 << (bytes * 8 - 1 - expbits)) - 1)
    local f
    
    if exponent == 0 and mantissa == 0 then
      f = 0.0
    else
      exponent = exponent - expbias
      f = 1.0 + mantissa / (1 << (bytes * 8 - 1 - expbits))
      f = f * 2.0 ^ exponent
    end
    if sign == 1 then
      f = -f
    end
    return f
  end
  
  local function read_float(offset)
    return tofloat(read_dword(offset))
  end
  
  local function read_string(offset, maxlen)
    local str = ""
    local end_offset = offset + maxlen - 1
    while offset <= end_offset do
      local b = data:byte(offset)
      assert(b ~= nil, "truncated at " .. ("%x"):format(offset - 1))
      if b == 0 then
        break
      end
      str = str .. string.char(b)
      offset = offset + 1
    end
    return str
  end

  local function align(offset, a, n)
    while true do
      local current_align = offset % a
      if current_align == n then
        return offset
      end
      offset = offset + 1
    end
  end

  local function parse_object(offset)
    local object_type = read_string(offset, 4)
    --print('offset:', offset, object_type)
    --print(data:byte(offset, offset+18))
    local t = {type = object_type}
    if object_type == "ALLZ" then
      offset = offset + 4
      local vers = data:byte(offset); offset = offset + 1
      assert(vers == 1)
      local minbits_length = data:byte(offset); offset = offset + 1
      local minbits_offset = data:byte(offset); offset = offset + 1
      local minbits_literal = data:byte(offset); offset = offset + 1
      local dst_size = read_dword(offset); offset = offset + 4
      local dst = setmetatable({_tail = "", _buffer = {}}, {
        __index = {
          byte = function(self, idx)
            if idx < 0 then idx = 1 + #self + idx end
            idx = idx - 1
            local section = 1 + (idx // 256)
            --print(section, #self._buffer)
            if section > #self._buffer then
              --print(self._tail, #self._tail, idx, #self)
              return self._tail:byte(1 + (idx & 255))
            end
            return self._buffer[section]:byte(1 + (idx & 255))
          end,
          add = function(self, byt)
            self._tail = self._tail .. string.char(byt)
            if #self._tail == 256 then
              table.insert(self._buffer, self._tail)
              self._tail = ""
            end
          end,
          tostring = function(self)
            return table.concat(self._buffer) .. self._tail
          end,
        },
        __len = function(self)
          return (#self._buffer << 8) + #self._tail
        end,
      })
      
      local bits = 0
      local bits_count = 0
      
      local function ensure(n)
        while bits_count < n do
          bits = bits | (data:byte(offset) << bits_count);
          offset = offset + 1
          bits_count = bits_count + 8
        end
      end
      
      local function readbit()
        ensure(1)
        local result = bits & 1
        bits = bits >> 1
        bits_count = bits_count - 1
        return result
      end
      
      local function readbits(n)
        ensure(n)
        local result = bits & ((1 << n) - 1)
        bits = bits >> n
        bits_count = bits_count - n
        return result
      end
      
      local function readunary()
        local n = 0
        while readbit() == 1 do
          n = n + 1
        end
        return n
      end
      
      local function readcontrol(minbits)
        local u = readunary()
        local n = readbits(u + minbits)
        if u > 0 then
          return n + (((1 << u) - 1) << minbits)
        else
          return n
        end
      end
      
      local function readcontrol_length()
        return 3 + readcontrol(minbits_length)
      end
      
      local function readcontrol_offset()
        return -1 - readcontrol(minbits_offset)
      end
      
      local function readcontrol_literal()
        return 1 + readcontrol(minbits_literal)
      end
      
      local function copy_word(word_off, word_len)
        --print("word", word_off, word_len)
        for _ = 1, word_len do
          dst:add(dst:byte(word_off))
        end
      end
      
      local function copy_literal(control)
        --print("literal", control)
        for _ = 1, control do
          dst:add(data:byte(offset)); offset = offset + 1
        end
      end
      
      -- initial segment
      copy_literal(readcontrol_literal())
      
      local word_off = readcontrol_offset()
      local word_len = readcontrol_length()
      local literal
      
      local finish = 'overflow'
      while offset - 1 <= #data do
        --[[
        if offset & 255 == 0 then
          print(offset / #data)
        end
        --]]
        if #dst + word_len >= dst_size then
          finish = 'word'
          break
        end
        if readbit() == 0 then
          --print("mode 0")
          literal = readcontrol_literal()
          if #dst + word_len + literal >= dst_size then
            finish = 'literal'
            break
          end
          local literal_offset = offset
          offset = offset + literal
          local next_off = readcontrol_offset()
          local next_len = readcontrol_length()
          copy_word(word_off, word_len)
          local control_offset = offset
          offset = literal_offset
          copy_literal(literal)
          assert(offset == literal_offset + literal)
          offset = control_offset
          word_off, word_len = next_off, next_len
        else
          --print("mode 1")
          local next_off = readcontrol_offset()
          local next_len = readcontrol_length()
          copy_word(word_off, word_len)
          word_off, word_len = next_off, next_len
        end
      end
      --print("finish", finish)
      if finish == 'word' then
        copy_word(word_off, word_len)
      elseif finish == 'literal' then
        copy_word(word_off, word_len)
        copy_literal(literal)
      elseif finish == 'overflow' then
        error()
      end
      
      --print("final length", #dst)
      
      if not decompress then
        t = parse(dst:tostring())
      end
      
      t.lz = dst:tostring()
      return offset, t
    elseif object_type == "ALAR" then
      local base = offset
      local vers = data:byte(offset + 4)
      assert(vers == 2 or vers == 3)
      --if vers == 3 then print("VERS3") end
      --do return nil, t end
      local function parse_toc_entry(offset)
        local entry = {}
        if vers == 2 then
          entry.index = read_word(offset); offset = offset + 2
          offset = offset + 2 -- ??
          entry.address = read_dword(offset); offset = offset + 4
          entry.size = read_dword(offset); offset = offset + 4
          offset = offset + 4 -- ??
          entry.name = read_string(base + entry.address - 0x22, 0x20)
        else
          entry.index = read_word(offset); offset = offset + 2
          offset = offset + 2 -- ??
          entry.address = read_dword(offset); offset = offset + 4
          entry.size = read_dword(offset); offset = offset + 4
          offset = offset + 6 -- ??
          --print(("0x%0x"):format(offset - 1))
         
          entry.name = read_string(offset, 0xffff)
          --print(entry.name)
          offset = offset + #entry.name + 1
          offset = align(offset, 4, 1)
        end
        return offset, entry
      end
      
      local record_count
      
      if vers == 2 then
        record_count = read_word(offset + 6)
        offset = offset + 0x10
      elseif vers == 3 then
        -- print(string.format("start %x", offset - 1))
        record_count = read_word(offset + 6)
        local unk0 = read_word(offset + 8)
        local unk = read_word(offset + 10)
        offset = offset + 0x10
        --print(string.format("%x", offset - 1))
        local data_offset = read_word(offset); offset = offset + 2
        for _ = 1, record_count do
          local toc_offset = read_word(offset); offset = offset + 2
        end
        --print(string.format("%x", offset - 1))
        offset = align(offset, 4, 1)
        --print(string.format("%x", offset - 1))
      end
      
      local textures = {}
      
      for record_idx = 1, record_count do
        local entry
        offset, entry = parse_toc_entry(offset)
        
        local extension = entry.name:match("%.([^%.]*)$")
        
        --print(entry.name, entry.size, entry.address, data:byte(entry.address, entry.address+3))
        
        local _, result
        if extension == "txt" or extension == "lua" then
          result = {type = "TEXT", text = data:sub(base + entry.address, base + entry.address + entry.size - 1)}
          --print(name, result.text)
        else
          --print(base, entry.address)
          _, result = parse_object(base + entry.address)
          if result.type == "ALTX" then
            table.insert(textures, result)
          end
        end
        table.insert(t, {name = entry.name, value = result, toc = entry})
      end
      
      t.textures = textures
      
      return nil, t
    elseif object_type == "ALTX" then
      local start_offset = offset
      offset = offset + 4
      local vers = data:byte(offset); offset = offset + 1
      assert(vers == 0)
      local form = data:byte(offset); offset = offset + 1
      assert(form == 0 or form == 0x0e)
      local count = read_word(offset); offset = offset + 2
      local alig_offset = start_offset + read_dword(offset); offset = offset + 4
      --print(string.format("0x%x", alig_offset - 1))
      
      -- [[
      if form == 0 then
        local block_start = {}
        for i = 1, count do
          block_start[i] = start_offset + read_word(offset); offset = offset + 2
        end
        offset = align(offset, 4, 1)
        
        local frame_data = {}
        for i = 1, count do
          assert(offset == block_start[i] or offset == block_start[i] - 0x20, string.format("0x%x", offset - 1))
          local frame_name = nil
          if offset == block_start[i] - 0x20 then
            frame_name = read_string(offset, 0x20)
            offset = offset + 0x20
          end
          local index = read_word(offset); offset = offset + 2
          --assert(index == i - 1, string.format("0x%x", offset - 1))
          --assert(frame_data[index] == nil and index >= 0 and index < count, string.format("index %d/%d", index, count))
          assert(frame_data[index] == nil)
          offset = offset + 2 -- ?
          local frames = read_word(offset); offset = offset + 2
          offset = offset + 2 -- ?
          local frames_table = {name = frame_name}
          for j = 1, frames do
            local frame = {}
            frame.x = read_word(offset); offset = offset + 2
            frame.y = read_word(offset); offset = offset + 2
            frame.width = read_word(offset); offset = offset + 2
            frame.height = read_word(offset); offset = offset + 2
            frames_table[j] = frame
          end
          for j = 1, frames do
            local frame = frames_table[j]
            frame.origin_x = read_word(offset); offset = offset + 2
            frame.origin_y = read_word(offset); offset = offset + 2
          end
          frame_data[index] = frames_table
        end
        t.sprites = frame_data
      end
      -- align 0x20?
      --]]
      
      offset = alig_offset
      if form == 0 then
        local rawimage
        offset, rawimage = parse_object(offset)
        assert(rawimage.type == "ALIG")
        t.rawimage = rawimage
        return offset, t
      elseif form == 0x0e then
        local width = read_word(offset); offset = offset + 2
        local height = read_word(offset); offset = offset + 2
        local name = read_string(offset, offset + 0x100)
        offset = offset + #name + 1
        t.rawimage = name
        t.width = width
        t.height = height
        return offset, t
      end
    elseif object_type == "ALIG" then
      offset = offset + 4
      local vers = data:byte(offset); offset = offset + 1
      assert(vers == 1)
      local unk1 = data:byte(offset)
      local unk2 = data:byte(offset + 1)
      local unk3 = data:byte(offset + 2); offset = offset + 3
      assert(unk1 == 1 or unk1 == 0) -- ?
      assert(unk2 == 0 or unk2 == 16) -- ? (16 from MainFont.aft, probably flag for pallete info)
      assert(unk3 == 0)
      local form = read_string(offset, 4); offset = offset + 4
      local palette_form = read_string(offset, 4); offset = offset + 4
      local width = read_dword(offset); offset = offset + 4
      local height = read_dword(offset); offset = offset + 4
      --print("W/H", width, height)
      local unk5 = read_word(offset); offset = offset + 2
      local unk6 = read_word(offset); offset = offset + 2
      local unk7 = read_dword(offset); offset = offset + 4
      assert(unk5 == 1)
      assert(unk6 == 0x20)
      assert(unk7 == 0x20 or unk7 == 0x60) -- ? (0x60 from MainFont.aft)
      
      t.width = width
      t.height = height
      
      local palette = {}
      local palette_size = 0
      if form == "PAL4" then
        palette_size = 16
      end
      
      --print("palette table")
      for palette_index = 1, palette_size do
        assert(palette_form == "RGBA") -- others should be easy to add if needed
        palette[palette_index] = data:sub(offset, offset + 3); offset = offset + 4
        --print(palette[palette_index])
      end
      
      if form == "PAL4" then
        local rawimage = {}
        for i = 1, width * height // 2 do
          local x = data:byte(offset); offset = offset + 1
          local low, high = x >> 4, x & 0xf
          rawimage[i] = palette[low + 1] .. palette[high + 1]
        end
        t.image = table.concat(rawimage)
      elseif form == "ABG5" then
        local rawimage = {}
        
        for i = 1, width * height do
          local pix = read_word(offset)
          
          local a = pix % 2
          pix = (pix - a) / 2
          local b = pix % 32
          pix = (pix - b) / 32
          local g = pix % 32
          pix = (pix - g) / 32
          local r = pix % 32
          pix = (pix - r) / 32
          assert(pix == 0)

          --[[ this would be sensible -- but no
          r = math.floor(r * (255/31) + 0.5)
          g = math.floor(g * (255/31) + 0.5)
          b = math.floor(b * (255/31) + 0.5)
          a = math.floor(a * (255/1) + 0.5)
          ==]]
          
          local function convert(x)
            return (x // 8) * 64 + (x % 8) * 9
          end
          
          r = convert(r)
          g = convert(g)
          b = convert(b)
          a = math.floor(a * (255/1) + 0.5)
          
          rawimage[i] = string.char(r, g, b, a)
          
          offset = offset + 2
        end
        
        t.image = table.concat(rawimage)
      elseif form == "BGR5" then
        local rawimage = {}
        
        for i = 1, width * height do
          local pix = read_word(offset)
                    
          local b = pix % 32
          pix = (pix - b) / 32
          local g = pix % 32
          pix = (pix - g) / 32
          local r = pix % 32
          pix = (pix - r) / 32
          local a = pix % 2
          pix = (pix - a) / 2
          assert(pix == 0)
          
          local function convert(x)
            return (x // 8) * 64 + (x % 8) * 9
          end
          
          r = convert(r)
          g = convert(g)
          b = convert(b)
          a = math.floor(a * (255/1) + 0.5)
          
          rawimage[i] = string.char(r, g, b, a)
          
          offset = offset + 2
        end
        
        t.image = table.concat(rawimage)
      elseif form == "ABG4" then
        local rawimage = {}
        
        for i = 1, width * height do
          local pix = read_word(offset)
          
          local a = pix % 16
          pix = (pix - a) / 16
          local b = pix % 16
          pix = (pix - b) / 16
          local g = pix % 16
          pix = (pix - g) / 16
          local r = pix % 16
          pix = (pix - r) / 16
          assert(pix == 0)
          
          r = math.floor(r * (255/15) + 0.5)
          g = math.floor(g * (255/15) + 0.5)
          b = math.floor(b * (255/15) + 0.5)
          a = math.floor(a * (255/15) + 0.5)
          
          rawimage[i] = string.char(r, g, b, a)
          
          offset = offset + 2
        end
        
        t.image = table.concat(rawimage)
      elseif form == "BGR4" then
        local rawimage = {}
        
        for i = 1, width * height do
          local pix = read_word(offset)
          
          --[[local a = 255
          
          local b = pix % 16
          pix = (pix - b) / 16
          local unused = pix % 16
          pix = (pix - unused) / 16
          assert(unused == 0)
          local g = pix % 16
          pix = (pix - g) / 16
          local r = pix % 16
          pix = (pix - r) / 16
          assert(pix == 0)
          
          r = math.floor(r * (255/15) + 0.5)
          g = math.floor(g * (255/15) + 0.5)
          b = math.floor(b * (255/15) + 0.5)
          ]]
          
          local b = pix % 16
          pix = (pix - b) / 16
          local g = pix % 16
          pix = (pix - g) / 16
          local r = pix % 16
          pix = (pix - r) / 16
          local a = pix % 16
          pix = (pix - a) / 16
          assert(pix == 0)
          
          r = math.floor(r * (255/15) + 0.5)
          g = math.floor(g * (255/15) + 0.5)
          b = math.floor(b * (255/15) + 0.5)
          a = math.floor(a * (255/15) + 0.5)
          
          rawimage[i] = string.char(r, g, b, a)
          
          offset = offset + 2
        end
        
        t.image = table.concat(rawimage)
      elseif form == "RGBA" then
        t.image = data:sub(offset, offset + 4 * width * height - 1)
        offset = offset + 4 * width * height
      elseif form == "BGRA" then
        t.image = data:sub(offset, offset + 4 * width * height - 1)
        t.image = t.image:gsub("(.)(.)(.)(.)", "%3%2%1%4")
        offset = offset + 4 * width * height
      else
        error("unknown image format: " .. form)
      end
      
      return offset, t
    elseif object_type == "ALTB" then
      local start_offset = offset
      offset = offset + 4
      
      -- vers: always 1
      local vers = data:byte(offset); offset = offset + 1
      assert(vers == 1) -- unk
      
      -- form: determines which style of ALTB (short or long)
      local form = data:byte(offset); offset = offset + 1
      assert(form == 0x10 or form == 0x14 or form == 0x1e) -- others? 1C may appear in ALLZ test_mission\test08.bin
      
      -- count: number of things
      local count = read_word(offset); offset = offset + 2
      
      local unk1 = read_word(offset); offset = offset + 2
      -- unk (header length?)
      if form == 0x10 then assert(unk1 == 0x14) end
      if form == 0x14 then assert(unk1 == 0x1c) end
      if form == 0x1e then assert(unk1 == 0x20) end
      
      -- entry_offset: offset from start_offset where thing data is (after "header")
      local entry_offset = start_offset + read_word(offset); offset = offset + 2
      
      -- size: bytes in each thing
      local size = read_dword(offset); offset = offset + 4
      
      local strings_start, strings_size
      if form == 0x14 or form == 0x1e then
        -- size of the strings section
        strings_size = read_dword(offset); offset = offset + 4
        
        -- end_offset: offset from start_offset where thing data ends
        strings_start = start_offset + read_dword(offset); offset = offset + 4
      end
      
      local names_start
      if form == 0x1e then
        names_start = read_dword(offset); offset = offset + 4
      end
      
      -- print(("label offset 0x%x"):format(offset - 1))
      -- label: 4 byte descriptive of what "header" represents
      local label = read_string(offset, 4); offset = offset + 4
      
      -- header: describes the contents of each thing
      local header
      offset, header = parse_object(offset)
      assert(header.type == "ALRD")
      t.header = {name = label, object = header}
      offset = align(offset, 4, 1)
      assert(offset == entry_offset, string.format("offset (0x%x) ~= entry_offset (0x%x)", offset - 1, entry_offset - 1))
      --print(("entry offset 0x%x; size 0x%x; count %d"):format(offset - 1, size, count))
      
      -- read things
      for i = 1, count do
        --print(("offset 0x%x; index %d"):format(offset - 1, i))
        local v = {}
        for _, entry in ipairs(header) do
          --print(("offset 0x%x; entry %s; entry-offset 0x%x"):format(offset - 1, entry.name_en, entry.offset))
          local u = {}
          u.k = entry
          if entry.type == 1 or entry.type == 0x20 then
            u.v = read_sdword(offset + entry.offset)
          elseif entry.type == 4 then
            u.v = tofloat(read_dword(offset + entry.offset))
          elseif entry.type == 5 then
            u.v = data:byte(offset + entry.offset)
          end
          if entry.type == 0x20 and strings_start then
            --print(entry.name_en)
            u.v = read_string(strings_start + u.v, 0xffff)
          end
          table.insert(v, u)
        end
        table.insert(t, v)
        offset = offset + size
      end
      
      offset = align(offset, 4, 1)
      
      if strings_start then
        assert(offset == strings_start)
        offset = offset + strings_size
        offset = align(offset, 4, 1)
      end
      
      if names_start then
        local unk_names = read_dword(offset); offset = offset + 4
        assert(unk_names == 1)
        local name_len = data:byte(offset); offset = offset + 1
        local name = read_string(offset, name_len)
        t.name = name
        --print(t.name)
        offset = offset + name_len
        offset = align(offset, 4, 1)
      end
      
      -- (debug) print things
      --[[
      local w = 8
      
      print(label, count)
      
      local str = ""
      for _, entry in ipairs(header) do
        str = str .. extl(entry.name_en, math.max(8, #entry.name_en)) .. " "
      end
      print(str)
      
      for i = 1, count do
        str = ""
        local v = t[i]
        for _, u in ipairs(v) do
          str = str .. padl(u.v, math.max(8, #u.k.name_en)) .. " "
        end
        print(str)
      end
      
      print()
      --]]
      --[[ ???
      if form == 0x14 then
        offset = offset + 8
        -- ???? probably varies
      end
      ]]
    elseif object_type == "ALRD" then
      local count = data:byte(offset + 6)
      local size = read_word(offset + 8)
      
      --print(count)
      offset = offset + 10
      for i = 1, count do
        --print(i, string.format("offset (0x%x)", offset - 1))
        t[i] = {}
        t[i].offset = read_word(offset)
        offset = offset + 2
        local a, b = data:byte(offset, offset + 1)
        t[i].type = a
        offset = offset + 2
        local len_en, len_jp = data:byte(offset, offset + 2)
        offset = offset + 2
        t[i].name_en = read_string(offset, len_en)
        --print(i, t[i].name_en)
        offset = offset + len_en + 1
        t[i].name_jp = read_string(offset, len_jp)
        offset = offset + len_jp + 1
        offset = align(offset, 4, 1)
        offset = offset + b
        offset = align(offset, 4, 1)
        -- print(t[i].name_en, t[i].offset, t[i].type)
        --("%04x"):format(offset)
      end
    elseif object_type == "ALOD" then
      local start_offset = offset
      offset = offset + 4
      local vers = data:byte(offset); offset = offset + 1
      assert(vers == 2)
      local form = data:byte(offset); offset = offset + 1
      assert(form == 2 or form == 0)
      local count_entries = data:byte(offset); offset = offset + 1
      local count_fields = data:byte(offset); offset = offset + 1
      local unk4 = read_dword(offset); offset = offset + 4
      local mt_offset = start_offset + read_dword(offset); offset = offset + 4
      local entry_offsets = {}
      for i = 1, count_entries do
        entry_offsets[i] = start_offset + read_word(offset); offset = offset + 2
      end
      local field_offsets = {}
      for i = 1, count_fields do
        field_offsets[i] = start_offset + read_word(offset); offset = offset + 2
      end
      local fields = {}
      for i = 1, count_fields do
        assert(offset == field_offsets[i])
        fields[i] = read_string(offset, 0xffff)
        offset = offset + 1 + #fields[i]
      end
      offset = align(offset, 4, 1)
      local entries = {}
      for i = 1, count_entries do
        offset = align(offset, 4, 1)
        assert(offset <= entry_offsets[i])
        offset = entry_offsets[i]
        local entry = {}
        entries[i] = entry
        entry.name = read_string(offset, 8); offset = offset + 8
        
        local count_entry_fields = read_dword(offset); offset = offset + 4
        local entry_field_offsets = {}
        for j = 1, count_entry_fields do
          entry_field_offsets[j] = entry_offsets[i] + read_word(offset); offset = offset + 2
        end
        local entry_field_indices = {}
        for j = 1, count_entry_fields do
          entry_field_indices[j] = data:byte(offset); offset = offset + 1
        end
        offset = align(offset, 2, 1)
        entry.fields = {}
        for j = 1, count_entry_fields do
          local field = fields[entry_field_indices[j] + 1]
          assert(field)
          assert(offset <= entry_field_offsets[j])
          offset = entry_field_offsets[j]
          local value = nil
          if field == "Texture0ID" then
            value = {}
            value.id1 = read_word(offset); offset = offset + 2
            value.id2 = read_word(offset); offset = offset + 2
          elseif field == "Color" then
            value = {}
            value.r = read_float(offset); offset = offset + 4
            value.g = read_float(offset); offset = offset + 4
            value.b = read_float(offset); offset = offset + 4
            value.a = read_float(offset); offset = offset + 4
          elseif field == "Alpha" then
            value = read_float(offset); offset = offset + 4
          else
            -- todo
          end
          entry.fields[field] = value
        end
      end
      t.entries = entries
      if form == 2 then
        assert(offset <= mt_offset)
        offset = mt_offset
        offset, t.mt = parse_object(offset)
        assert(t.mt.type == "ALMT")
      end
    elseif object_type == "ALMT" then
      local start_offset = offset
      --[[
      for n = 0,7 do
        print(data:byte(offset+(n*12),offset+(n*12+11)))
      end
      print(offset, offset+95)]]
      offset = offset + 4
      local vers = data:byte(offset); offset = offset + 1
      assert(vers == 3)
      local unk1 = data:byte(offset); offset = offset + 1
      assert(unk1 == 0)
      local entry_count = read_word(offset); offset = offset + 2
      local field_count = data:byte(offset); offset = offset + 1
      --print("Total entries: " .. entry_count, "Max fields: " .. field_count)
      local unk2 = data:byte(offset); offset = offset + 1
      assert(unk2 == 1)
      local unk3 = read_word(offset); offset = offset + 2
      assert(unk3 == 0)
      local entries = {}
      for i = 1, entry_count do
        local entry = {data = {}}
        entry.name = read_string(offset, 4); offset = offset + 4
        --print("Entry" .. i, entry.name)
        entries[i] = entry
      end
      t.entries = entries
      local data_offset = start_offset + read_dword(offset); offset = offset + 4
      local fields = {}
      if field_count > 0 then -- ILLUMINI9 WAS HERE
        for i = 1, field_count do
          local field = {}
          field.offset = start_offset + read_word(offset); offset = offset + 2
          fields[i] = field
        end
        for _, field in ipairs(fields) do
          field.id1 = data:byte(offset); offset = offset + 1
          field.id2 = data:byte(offset); offset = offset + 1
          assert(offset == field.offset)
          field.name = read_string(offset, 0xffff)
          --print(field.name)
          offset = offset + #field.name + 1
        end
        offset = align(offset, 4, 1)
        assert(offset == data_offset)
      else
        -- 0-field case has no name to be read
        assert(data_offset == start_offset + read_dword(offset))
        assert(data_offset == offset + 4)
        offset = offset + 4
      end  -- ILLUMINI9 WAS HERE
      -- temp
      local pattern = read_dword(offset); offset = offset + 4
      local length = read_word(offset); offset = offset + 2
      local rate = data:byte(offset); offset = offset + 1
      local flag1 = data:byte(offset); offset = offset + 1
      local unk4 = read_word(offset); offset = offset + 2 -- 0x002a or 0x002c
      t.pattern = pattern
      t.length = length
      t.rate = rate
      
      local entry_offset
      for _ = 1, (unk4 - 0x002a) / 2 do
        entry_offset = read_word(offset); offset = offset + 2 -- todo
      end
      
      for _, entry in ipairs(entries) do
        --print(entry.name)
        
        if field_count > 0 then -- ILLUMINI9 WAS HERE
          local field_offset_base = offset
          --print(string.format("base %x", offset - 1))
          
          local field_count_nonstream = data:byte(offset); offset = offset + 1
          --print(string.format("%x", offset - 2), stream_data_flag, _)
          --assert(stream_data_flag == 0 or stream_data_flag == 1)
          local field_count = data:byte(offset); offset = offset + 1
          --print(string.format("%x", offset - 3), field_count_nonstream, field_count)
          --print(data:byte(offset-2,offset+16))
          local field_descs = {}
          for idx = 1, field_count + field_count_nonstream do
            --print("idx: " .. idx, data:byte(offset))
            field_descs[idx] = data:byte(offset); offset = offset + 1
          end
          offset = align(offset, 2, 1)
          local field_offsets = {}
          for idx = 1, field_count + field_count_nonstream do
            local field_offset = field_offset_base + read_word(offset); offset = offset + 2
            --print(string.format("off %x", field_offset - 1), "+" .. (field_offset - field_offset_base))
            field_offsets[idx] = field_offset
          end
          
          for idx, field_desc in ipairs(field_descs) do
            --print("idx", idx, #field_offsets)
            local field_idx = (field_desc & 0x0f) + 1
            local field = assert(fields[field_idx])
            
            local stream = {}
            
            local parsers = {
              ["PatternNo"] = function()
                local d = read_word(offset); offset = offset + 2
                return d
              end,
              ["Texture0ID"] = function()
                local t = {}
                t.id1 = read_word(offset); offset = offset + 2
                t.id2 = read_word(offset); offset = offset + 2
                return t
              end,
              ["BlendMode"] = function()
                local d = read_word(offset); offset = offset + 2
                return d
              end,
              ["Disp"] = function()
                local d = read_word(offset); offset = offset + 2
                return d
              end,--[[
              
                About HFlip and VFlip:
                -- so far only seems to take have hex values of (00,00) or (01,00)
                -- can be used both in streamed fields and not streamed fields
                
              ]]
              ["HFlip"] = function() -- ILLUMINI9 WAS HERE
                local d = read_word(offset); offset = offset + 2
                return d
              end,
              ["VFlip"] = function() -- ILLUMINI9 WAS HERE
                local d = read_word(offset); offset = offset + 2
                return d
              end,
              ["Alpha"] = function()
                local d = read_float(offset); offset = offset + 4
                return d
              end,
              ["DrawPrioOffset"] = function() -- ILLUMINI9 WAS HERE
                local d = read_float(offset); offset = offset + 4
                return d
              end,
              ["Pos"] = function()
                local t = {}
                for i = 1, 3 do
                  t[i] = read_dword(offset); offset = offset + 4
                end
                return t
              end,
              ["ParentNodeID"] = function() -- ILLUMINI9 WAS HERE
                local parentName = read_string(offset,4); offset = offset + 4
                return parentName
              end,
              ["Rot"] = function()
                local d = read_dword(offset); offset = offset + 4
                return d
              end,
              ["Scale"] = function()
                local t = {}
                for _, name in ipairs{"x", "y", "z"} do
                  t[name] = read_float(offset); offset = offset + 4
                end
                return t
              end,
              ["Center"] = function()
                local t = {}
                for _, name in ipairs{"x", "y", "z"} do
                  t[name] = read_float(offset); offset = offset + 4
                end
                return t
              end,
              ["Color3"] = function()
                local t = {}
                for i = 1, 3 do
                  t[i] = read_float(offset); offset = offset + 4
                end
                return t
              end,
            }
            
            --print(string.format("%x %x %s", offset - 1, field_desc, field.name))
            --[[
            if field.name == "DrawPrioOffset" then
              for n = 0,7 do
                print(data:byte(offset+(n*12), offset+(n*12+11)))
              end
            end]]
            
            local parser = assert(parsers[field.name], string.format("missing parser %s", field.name))
            --print(field.name)
            
            if idx > field_count_nonstream then
              
              local i = 1
              while true do
                local time = read_word(offset); offset = offset + 2
                --print(time, data:byte(offset-2,offset-1))
                
                if time == 0xffff then break end
                if time == 0x494c then -- "LI"
                  assert(i == 1)
                else
                  if i == 1 then
                    assert(offset - 2 == field_offsets[idx], string.format("%x %x", offset, field_offsets[idx]))
                  end
                  local stream_frame = {}
                  
                  stream_frame.time = time
                  --print(data:byte(offset-2,offset+46))
                  stream_frame.data = parser()
                  
                  stream[i] = stream_frame
                  i = i + 1
                end
              end
            else
              local stream_frame = {}
              --print(data:byte(offset-2,offset+25))
              stream_frame.data = parser()
              stream[1] = stream_frame
            end
            
            entry.data[field.name] = stream
          end -- field_desc loop
        else -- zero fields case
          assert(read_dword(offset) == 0)
          offset = offset + 4
          local noname = ""
          local stream = {}
          local stream_frame = {}
          stream_frame.data = read_string(offset, 0xffff)
          offset = offset + #stream_frame.data + 1
          stream[1] = stream_frame
          entry.data[noname] = stream -- hex values (0xb2, 0x10) before next data set starts in both cases.
        end -- non-zero field count check
      end -- entry loop
      
    elseif object_type == "ALSN" then
      -- todo
    elseif object_type == "ALFT" then
      offset = offset + 4
      local vers = data:byte(offset); offset = offset + 1
      assert(vers == 0)
      local form = read_string(offset, 3); offset = offset + 3
      assert(form == ":TB") -- ?
      -- width and height may be reversed (I can't tell since they are the same)
      t.block_width = data:byte(offset); offset = offset + 1
      t.block_height = data:byte(offset); offset = offset + 1
      --print("W/H:", t.block_width, t.block_height)
      local unk1 = read_word(offset); offset = offset + 2
      assert(unk1 == 9)
      local range_count = read_word(offset); offset = offset + 2
      --print("Range count:", range_count)
      --print('i', "min codepoint", "max codepoint", "image offset")
      local ranges = {}
      t.ranges = ranges
      for i = 1, range_count do
        local range = {}
        range.codepoint_min = read_word(offset); offset = offset + 2
        range.codepoint_max = read_word(offset); offset = offset + 2
        range.image_offset = read_word(offset); offset = offset + 2
        --print(i, range.codepoint_min, range.codepoint_max, range.image_offset)
        table.insert(ranges, range)
      end
      t.ranges = ranges
      local width_count = read_word(offset); offset = offset + 2
      --print("Width count:", width_count)
      local widths = {}
      t.widths = widths
      for i = 1, width_count do
        local width = data:byte(offset); offset = offset + 1
        --print(i, width)
        table.insert(widths, width)
      end
      -- MainFont.aft seems to have added double 0s as a separator between data and image - illumini9
      if data:byte(offset) == 0 and data:byte(offset+1) == 0 then offset = offset + 2 end
      offset, t.image = parse_object(offset)
    else
      error("unknown object type: " .. tostring(object_type) .. " at " .. string.format("%x", offset - 1))
    end
    return offset, t
  end
  
  return function()
    local _, obj = parse_object(1)
    return obj
  end
end

function parse(data)
  return parser(data)()
end

function decompress(data)
  if data:sub(1, 4) == "ALLZ" then
    return parser(data, true)().lz
  else
    return data
  end
end

local function totable(obj)
  assert(obj.type == "ALTB")
  local t = {}
  for idx, rec in ipairs(obj) do
    local tt = {}
    for fidx, field in ipairs(rec) do
      local head = obj.header.object[fidx]
      tt[head.name_en] = field.v
    end
    table.insert(t, tt)
  end
  return t
end

return {
  parse = parse,
  decompress = decompress,
  totable = totable,
}
