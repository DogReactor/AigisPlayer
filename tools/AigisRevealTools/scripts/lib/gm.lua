-- gm.lua library
-- v1.0
-- author: lzlis

local gmpath =
-- replace the part of the following line between the [[ ]] with
-- the path to your copy of GraphicsMagick (or just gm if it is
-- on your system path). (Make sure to use Q8 version.)
[[gm]]

if gmpath:match(" ") then
  gmpath = "\"" .. gmpath .. "\""
end

return {
  execute = function(args)
    local command = gmpath .. " " .. args
    return assert(os.execute(command))
  end,
  path = gmpath,
}
