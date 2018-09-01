
local parse_al = require("scripts/lib/parse_al")
local output_al = require("scripts/lib/output_al")
local fname, dataPath, mode = ...
local outPath = "GameAssets\\"
local working = "working\\"

local copy = {
  [".png"] = true,
  [".ogg"] = true,
  [".mp3"] = true,
  [".html"] = true,
  [".lua"] = true,
  [".js"] = true,
  [".txt"] = true,
}
local ext = fname:match("%.%w+")
copy = copy[ext]

local h = assert(io.open("menucallservant", 'rb'))
local data = assert(h:read('*a'))
assert(h:close())

if copy or mode == "copy" then
  local h = assert(io.open(outPath .. "\\" .. fname, 'wb'))
  print(fname, outPath .. "\\" .. fname, 'wb')
  assert(h:write(data))
  assert(h:close())
elseif mode == "decompress" or mode == "dec" then
  local obj = parse_al.decompress(data)
  local h = assert(io.open(outPath .. "\\" .. fname .. ".dec", 'wb'))
  print(fname, outPath .. "\\" .. fname .. ".dec")
  assert(h:write(obj))
  assert(h:close())
else
  local obj = parse_al.parse(data)
  local filePaths = output_al.output(obj, outPath .. "\\" .. fname .. "\\", working)
  for _, f in ipairs(filePaths) do
    print(f.fnmae,f.path)
  end
end
