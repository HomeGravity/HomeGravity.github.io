from basic import *
from pprint import pprint
from PatchesDownload import *

def AddImage(UserName, RepoName):
    ImgDataJSON = {}
    
    PatchesData = InitResponse(f'https://github.com/{UserName}/{RepoName}/releases')
    PatchesData = json.dumps(PatchesData)
    PatchesData = json.loads(PatchesData)
    DataRead = OpenJSON(rf"rvx-tips\py-scripts\PatchesSave\{UserName}Patches\{UserName}AddPatchesImage.json")

    
    for patch in PatchesData:
        if list(patch.keys())[0] != "patches-version":
            if not any(x in patch["compatiblePackages"][0]["name"] for x in ["music", "reddit"]):
                if patch["name"] in DataRead:
                    ImgDataJSON[patch["name"]] = DataRead[patch["name"]]
                
                else:
                    ImgDataJSON[patch["name"]] = ["../../../bird-8763079_1280.jpg"]

    pprint(ImgDataJSON)
    

    JSONSave(ImgDataJSON, rf"rvx-tips\py-scripts\PatchesSave\{UserName}Patches\{UserName}AddPatchesImage.json")



AddImage(
    "inotia00",
    "revanced-patches"
    )

AddImage(
    "anddea",
    "revanced-patches"
    )



def ImagePathCopy():
    DataRead = OpenJSON(r"rvx-tips\py-scripts\PatchesSave\anddeaPatches\anddeaAddPatchesImage.json")
    TargetRead = OpenJSON(r"rvx-tips\py-scripts\PatchesSave\inotia00Patches\inotia00AddPatchesImage.json")
    
    
    difference = []
    print(len(DataRead), len(TargetRead))
    
    for key, values in DataRead.items():
        if key in TargetRead:
            TargetRead[key] = values
        
        else:
            difference.append(key)

    
    JSONSave(TargetRead, r"rvx-tips\py-scripts\PatchesSave\inotia00Patches\inotia00AddPatchesImage.json")
    
    print("\n기능 차이점\n")
    for x in difference:
        print(x)
    
# ImagePathCopy()