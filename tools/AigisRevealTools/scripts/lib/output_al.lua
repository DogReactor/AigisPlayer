-- output_al.lua library
-- v1.2.1
-- author: lzlis
-- changes: v1.2.1 support for ALTX frame names
--                 slightly better output of certain AOD data (Scale and Center)
--          v1.2   printing out more details about AOD data in ALMT.txt
--          v1.1   gm moved to library
--                 besides providing the full atx png, also provide each individual atlased frame
--                 don't remember other changes

local gm = require("scripts/lib/gm")

local function mkdir(where)
  os.execute("cmd /c if NOT EXIST \"" .. where .. "\" md \"" .. where .. "\"")
end

local function padlen(str)
  -- assume non-ASCII is double-width:
  local _, ASCII = str:gsub("[\000-\127]", "%1")
  local utf8len = utf8.len(str)
  local l = #str
  return 2 * (utf8len - ASCII) + ASCII
end

local function padl(str, n)
  str = tostring(str)
  assert(padlen(str) <= n)
  if padlen(str) < n then
    str = (" "):rep(n - padlen(str)) .. str
  end
  return str
end

local function padr(str, n)
  str = tostring(str)
  assert(padlen(str) <= n)
  if padlen(str) < n then
    str = str .. (" "):rep(n - padlen(str))
  end
  return str
end

local function nulfile(altype, where)
  local f = assert(io.open(where .. altype .. ".nul", "w"))
  assert(f:close())
end

local is_hex = {PatternID = true}

local function output(obj, where, working, aux, hasaod)
  local filePaths = {}
  assert(where:sub(-1) == "\\" or where:sub(-1) == "/")
  mkdir(where)
  local altype = obj.type
  if altype == "ALAR" then
    local newaux = {}
    for k, v in pairs(aux) do newaux[k] = v end
    aux = newaux
    aux.textures = obj.textures
    if not hasaod then
      for _, subobj in ipairs(obj) do
        if subobj.name:match("%.aod$") then
          hasaod = true
          break
        end
      end
    end
    for idx, subobj in ipairs(obj) do
      local name = ("%.3d_%s"):format(idx, subobj.name)
      if subobj.value.type == "TEXT" then
        local f = assert(io.open(where .. name, "wb"))
        assert(f:write(subobj.value.text))
        assert(f:close())
      else
        output(subobj.value, where .. name .. "\\", working, aux, hasoad)
      end
    end
  elseif altype == "ALRD" then
    local name = where .. "ALRD.txt"
    local f = assert(io.open(name, "w"))
    
    local str = ""
    for _, entry in ipairs(obj) do
      str = str .. entry.name_en .. " "
    end
    assert(f:write(str, "\n"))
    
    assert(f:close())
  elseif altype == "ALTB" then
    local name = where .. "ALTB_" .. obj.header.name .. ".txt"
    local f = assert(io.open(name, "w"))
    
    local function u_tostring(u, head)
      if head.type == 0x20 and type(u.v) == "string" then
        local str = ("%q"):format(tostring(u.v)):gsub("\\\n", "\\n")
        return str-- .. padlen(str)
      elseif head.type == 5 then
        if u.v == 1 then
          return "true"
        elseif u.v == 0 then
          return "false"
        else
          return tostring(u.v)
        end
      elseif head.type == 4 then
        return ("%.7g"):format(u.v)
      elseif is_hex[head.name_en] then
        return ("0x%08x"):format(u.v)
      else
        return tostring(u.v)
      end
    end
    
    local widths = {}
    for idx, entry in ipairs(obj.header.object) do
      widths[idx] = math.max(widths[idx] or 0, padlen(entry.name_en))
    end
    for _, v in ipairs(obj) do
      for idx, u in ipairs(v) do
        widths[idx] = math.max(widths[idx] or 0, padlen(u_tostring(u, obj.header.object[idx])))
      end
    end
    
    local str = ""
    for idx, entry in ipairs(obj.header.object) do
      local pad = padl
      if entry.type == 0x20 then pad = padr end
      str = str .. pad(entry.name_en, widths[idx]) .. " "
    end
    assert(f:write(str, "\n"))
    
    for _, v in ipairs(obj) do
      str = ""
      for idx, u in ipairs(v) do
        local head = obj.header.object[idx]
        local pad = padl
        if head.type == 0x20 and type(u.v) == "string" then pad = padr end
        str = str .. pad(u_tostring(u, head), widths[idx]) .. " "
      end
      assert(f:write(str, "\n"))
    end
    assert(f:close())
  elseif altype == "ALTX" then
    if type(obj.rawimage) == "table" then
      local rawimage = obj.rawimage
      local out_raw = assert(io.open(working .. "altx.raw", "wb"))
      assert(out_raw:write(rawimage.image))
      assert(out_raw:close())
      local get_frame = aux.get_frame
      if not get_frame then
        gm.execute(("convert -size %dx%d rgba:%saltx.raw %saltx.png"):format(rawimage.width, rawimage.height, working, where))
      end
      
      if not hasaod then
        for idx, sprite in pairs(obj.sprites) do
          --print(idx)
          idx = idx % 4096
          if get_frame == nil or idx == get_frame.index then
            for frame_idx, frame in ipairs(sprite) do
              if frame.width > 0 and frame.height > 0 then
                local outwhere = where .. "frames/"
                local fname = string.format("%03d_%03d.png", idx, frame_idx)
                if sprite.name then
                  fname = string.format("%03d_%s_%03d.png", idx, sprite.name, frame_idx)
                end
                if get_frame then
                  outwhere = where
                  if get_frame.name then
                    fname = get_frame.name .. ".png"
                  end
                else
                  mkdir(outwhere)
                end
                local outname = outwhere .. fname
                local i = frame.y * obj.rawimage.width + frame.x
                local image = ""
                for _ = 1, frame.height do
                  image = image .. obj.rawimage.image:sub(1 + 4 * i, 1 + 4 * (i + frame.width) - 1)
                  i = i + obj.rawimage.width
                end
                local out_raw = assert(io.open(working .. "alod.raw", "wb"))
                assert(out_raw:write(image))
                assert(out_raw:close())
                gm.execute(("convert -size %dx%d rgba:%salod.raw -trim %s"):format(frame.width, frame.height, working, outname))
              end
            end
          end
        end
      end
      
    elseif type(obj.rawimage) == "string" then
      local f = assert(io.open(where .. altype .. ".txt", "w"))
      assert(f:write(obj.rawimage, "\n", tostring(obj.width), "\n", tostring(obj.height), "\n"))
      assert(f:close())
    else
      nulfile(altype, where)
    end
  elseif altype == "ALMT" then
    local name = where .. "ALMT.txt"
    local f = assert(io.open(name, "w"))
    f:write(string.format("pattern: 0x%08x", obj.pattern),"\n")
    f:write("length: ",obj.length,"\n")
    f:write("rate (?): ",obj.rate,"\n")
    f:write("\n")
    for _, entry in ipairs(obj.entries) do
      f:write("entry: ",entry.name,"\n")
      local fields = {}
      for field, _ in pairs(entry.data) do
        table.insert(fields, field)
      end
      table.sort(fields)
      for _, field in ipairs(fields) do
        local stream = entry.data[field]
        f:write("  ", field,"\n")
        for i, stream_frame in ipairs(stream) do
          local time_string
          if stream_frame.time == nil then
            time_string = "N/A"
          else
            time_string = string.format("%03d", stream_frame.time)
          end
          local data_string
          if field == "Scale" or field == "Center" then
            data_string = string.format("x:%g y:%g z:%g", stream_frame.data.x, stream_frame.data.y, stream_frame.data.z)
          else
            data_string = tostring(stream_frame.data)
          end
          f:write(string.format("    %2d @%s: ", i - 1, time_string), data_string, "\n")
        end
        f:write("\n")
      end
      f:write("\n")
    end
    assert(f:close())
  elseif altype == "ALOD" then
    for _, entry in ipairs(obj.entries) do
      local tex0id = entry.fields.Texture0ID
      if tex0id then
        local tx -- = aux.textures[1]
        for _, tx_candidate in ipairs(aux.textures) do
          if tx_candidate.sprites[tex0id.id1] then
            tx = tx_candidate
            break
          end
        end
        --print(tex0id.id2, tex0id.id1)
        
        if tx and obj.mt then
          local sprite = tx.sprites[tex0id.id1]
          assert(sprite)
          
          for _, mt_entry in ipairs(obj.mt.entries) do
            
            local time_set = {[0] = true}
            for field_name, stream in pairs(mt_entry.data) do
              --print(field_name)
              for _, datum in ipairs(stream) do
                if datum.time then
                  time_set[datum.time] = true
                end
              end
            end
            
            local times = {}
            for t, _ in pairs(time_set) do times[#times + 1] = t end
            table.sort(times)
            
            local full_frames = {}
            for _, t in pairs(times) do
              local full_frame = {}
              for field_name, stream in pairs(mt_entry.data) do
                local i = 1
                while stream[i + 1] and stream[i + 1].time <= t do
                  i = i + 1
                end
                full_frame[field_name] = stream[i].data
              end
              table.insert(full_frames, full_frame)
            end
            
            --for frame_idx, frame in ipairs(sprite) do
            for frame_idx, full_frame in ipairs(full_frames) do
              if full_frame.PatternNo and sprite[full_frame.PatternNo + 1] then
                local frame = assert(sprite[full_frame.PatternNo + 1])
                if frame.width > 0 and frame.height > 0 then
                  local i = frame.y * tx.rawimage.width + frame.x
                  local image = ""
                  local alpha = 1.0
                  if entry.fields.Alpha then
                    alpha = entry.fields.Alpha
                  end
                  if full_frame.Alpha then
                    alpha = alpha * full_frame.Alpha
                  end
                  for _ = 1, frame.height do
                    local row = tx.rawimage.image:sub(1 + 4 * i, 1 + 4 * (i + frame.width) - 1)
                    if alpha < 1.0 then
                      row = row:gsub("(...)(.)", function(rgb, a)
                        a = math.floor(0.5 + ((string.byte(a) / 255) * alpha) * 255)
                        return rgb .. string.char(a)
                      end)
                    end
                    image = image .. row
                    i = i + tx.rawimage.width
                  end
                  local out_raw = assert(io.open(working .. "alod.raw", "wb"))
                  assert(out_raw:write(image))
                  assert(out_raw:close())
                  gm.execute(("convert -size %dx%d rgba:%salod.raw %salod_%s_%02d.png"):format(frame.width, frame.height, working, where, entry.name:sub(1, 4), frame_idx - 1))
                  local out_txt = assert(io.open(string.format("%salod_%s_%02d.txt", where, entry.name:sub(1, 4), frame_idx - 1), "w"))
                  assert(out_txt:write("origin_x:",frame.origin_x,"\n"))
                  assert(out_txt:write("origin_y:",frame.origin_y,"\n"))
                  assert(out_txt:close())
                end
              end
            end
          end
        else
          -- todo
        end
      end
    end
    if obj.mt then
      output(obj.mt, where, working, aux)
    end
  else
    nulfile(altype, where)
  end
  return filePaths
end

return {
  output = function(obj, where, working, aux)
    assert(working)
    mkdir(working)
    if working:sub(-1) ~= "\\" then
      working = working .. "\\"
    end
    return output(obj, where, working, aux or {})
  end,
}
