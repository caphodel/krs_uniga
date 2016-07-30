import sys,os
import re
myre = re.compile("\/\*\*\*\*js\/(.*)\*\*\*\*\/")
uniprotFile=open("jui2.ui.js")
uniprotFileContent=uniprotFile.read()
uniprotFileList = myre.split(uniprotFileContent)
i = 0
filename = ''
for items in uniprotFileList:
    if((i%2)!=0):
        filename = items
    else:
        if filename!='':
            seqInfoFile=open('js/'+filename,'w')
            seqInfoFile.write(str(items))
    i = i + 1
