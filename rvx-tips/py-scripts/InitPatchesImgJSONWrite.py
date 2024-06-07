from basic import *
from pprint import pprint

# def AddImage(patches, UserName):
#     ImgDataJSON = {}

#     for patch in patches:
#         if not any(x in patch["compatiblePackages"][0]["name"] for x in ["music", "reddit"]):
#             ImgDataJSON[patch["name"]] = ["../../../bird-8763079_1280.jpg"]

    

#     JSONSave(ImgDataJSON, rf"rvx-tips\py-scripts\PatchesSave\{UserName}Patches\{UserName}AddPatchesImage.json")



# AddImage(
#     OpenJSON(r"rvx-tips\py-scripts\PatchesSave\inotia00Patches\inotia00 - v4.8.6 - patches.json"),
#     "inotia00"
#     )

# AddImage(
#     OpenJSON(r"rvx-tips\py-scripts\PatchesSave\anddeaPatches\anddea - v2.226.0-dev.4 - patches.json"),
#     "anddea"
#     )


def ImagePathCopy():
    DataRead = OpenJSON(r"rvx-tips\py-scripts\PatchesSave\anddeaPatches\anddeaAddPatchesImage.json")
    TargetRead = OpenJSON(r"rvx-tips\py-scripts\PatchesSave\inotia00Patches\inotia00AddPatchesImage.json")
    
    for key, values in DataRead.items():
        if key in TargetRead:
            TargetRead[key] = values

    
    JSONSave(TargetRead, r"rvx-tips\py-scripts\PatchesSave\inotia00Patches\inotia00AddPatchesImage.json")
    
ImagePathCopy()