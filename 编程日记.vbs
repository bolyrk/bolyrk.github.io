Dim ws
Set ws = Wscript.CreateObject("Wscript.Shell")
ws.run "hexo s -p 9001",vbhide
Wscript.quit