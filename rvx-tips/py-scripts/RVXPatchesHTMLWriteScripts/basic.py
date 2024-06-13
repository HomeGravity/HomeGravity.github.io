import json
import datetime
import re

def OpenJSON(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)

def SaveHTML(filename, data):
    with open(filename, "w", encoding='utf-8') as f:
        f.write(data)
        
def CurrentTime():
    dt = datetime.datetime.now()
    
    if dt.hour < 12:
        meridiem = "오전"

    else:
        meridiem = "오후"
    
    hour = dt.hour % 12
    if hour == 0:
        hour = 12
    
    return dt.strftime(f"%Y/%m/%d {meridiem} {hour}:%M:%S")

def GetPatchesVersion(text):
    r = re.search(r"v[\d.]+(?:-dev\.\d+)?", text).group()
    return r



def JSONSave(data, FileName):
    print("%s saved!" % FileName)
    with open(FileName, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

