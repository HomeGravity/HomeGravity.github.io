from basic import *
from pprint import pprint
from PatchesDownload import *


# ImagePath JSON 변경사항 추적
def AddImageJSONTrackChanges(NewData, PreviousData):

    # PreviousData에는 있지만 NewData에는 없는 키 처리
    TrackChangesOutput(PreviousData, NewData, "삭제되었습니다.", "PreviousData")

    # NewData에는 있지만 PreviousData에는 없는 키 처리
    TrackChangesOutput(NewData, PreviousData, "추가되었습니다.", "NewData")


def TrackChangesOutput(targetData, compareData, outputstring, targetDataName):

    print() # 줄바꿈
    index = 1
    for key in targetData.keys():
        # targetData에 있는 keys가 compareData에 없으면 True
        if key not in compareData:
            print(f"[{index:,.0f}번] '{key}' Key {outputstring}")
            index += 1
            
            
    if index == 1:
        print(f"{targetDataName} JSON 변경사항 없음.")

def AddImage(UserName, RepoName):
    ImgDataJSON = {}
    
    # 신규 패치 JSON 처리
    PatchesData = InitResponse(f'https://github.com/{UserName}/{RepoName}/releases')
    PatchesData = json.dumps(PatchesData)
    PatchesData = json.loads(PatchesData)

    # 이전 JSON 데이터 불러오기
    DataRead = OpenJSON(rf"rvx-tips\rvx-patches\rvx-patches-menu\SetPatchesImgPath\{UserName}AddPatchesImage.json")

    for patch in PatchesData:
        if list(patch.keys())[0] != "patches-version":

            if not any(x in patch["compatiblePackages"][0]["name"] for x in ["music", "reddit"]):

                if patch["name"] in DataRead:
                    ImgDataJSON[patch["name"]] = DataRead[patch["name"]]
                
                else:
                    ImgDataJSON[patch["name"]] = ["../../../bird-8763079_1280.jpg"]


    # 새롭게 생성된 JSON 데이터와 이전 데이터를 비교
    AddImageJSONTrackChanges(ImgDataJSON, DataRead)

    # 줄바꿈
    print()
    
    # 새롭게 생성된 JSON 데이터를 JSON 포맷으로 저장
    JSONSave(
        ImgDataJSON,
        rf"rvx-tips\rvx-patches\rvx-patches-menu\SetPatchesImgPath\{UserName}AddPatchesImage.json"
        )
    
    print(UserName, "완료!")



AddImage(
    "inotia00",
    "revanced-patches"
    )

AddImage(
    "anddea",
    "revanced-patches"
    )

# AddImage(
#     "YT-Advanced",
#     "rex-patches"
#     )