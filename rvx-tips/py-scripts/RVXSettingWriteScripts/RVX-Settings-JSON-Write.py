from bs4 import BeautifulSoup
from basic import OpenJson
import json
import os

def OpenFile(FileName):
    with open(FileName, "r", encoding="utf-8") as f:
        return f.read()

def GetAttribute(data):
    soup = BeautifulSoup(data, "lxml")
    JSONData = JSONTempRead()

    """질문 & 속성 ID"""

    category = soup.find("div", attrs={"class" : "variable"}).find("ul")

    # 카테고리 속성 ID 접근
    categoryIDList = category.find_all("a")
    categoryIDList = [categoryIDList[x]["href"].strip().replace("#", "") for x in range(len(categoryIDList))]
    for x in categoryIDList:

        JSONData[x] = {
            "title": None,
            "description": [

            ],
            "image-url": [
                
            ]
        }


    # 카테고리 명
    categoryTitle = soup.find("div", attrs={"class" : "variable"})
    for index, x in enumerate(categoryTitle.find_all("li")):

        # 데이터 추가
        k = list(JSONData.keys())[index]
        JSONData[k]["title"] = x.text.strip()




    """설명"""
    # description 접근
    description = soup.find_all("div", attrs={"class" : "variable-main"})
    for index, desc in enumerate(description):
        descriptionLoop = desc.find("ul")
        descriptionLoop = descriptionLoop.find_all(attrs={"class" : "variable-desc"})

        # 데이터 추가
        k = list(JSONData.keys())[index]

        for descLoop in descriptionLoop:

            JSONData[k]["description"].append(descLoop.text)


    """사진"""
    # images 접근
    images = soup.find_all("div", attrs={"class" : "Reference"})

    for index, img in enumerate(images):
        imagesLoop = img.find_all("img", attrs={"class" : "reference-image"})

        # 데이터 추가
        k = list(JSONData.keys())[index]

        for imgLoop in imagesLoop:
            JSONData[k]["image-url"].append(imgLoop["src"])

    

    # JSON 저장 위해 데이터를 반환
    return JSONData



def JSONTempRead():
    JSONTemp = OpenJson(r"rvx-tips\rvx-setting-write-scripts\set-json\Template.json")
    return JSONTemp


def JSONSave(data, FileName):
    print("%s saved!" % FileName)
    with open(rf"rvx-tips\rvx-setting-write-scripts\set-json\{FileName.replace('.html', '')}.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def main():
    path = os.listdir(r"rvx-tips\settings")
    FileList = [file for file in path if file.endswith('.html')]

    for x in FileList:
        JSonData = GetAttribute(OpenFile(rf"rvx-tips\settings\{x}"))
        JSONSave(JSonData, x)


# HTML 구조가 변경되서 호환이 안됨.
# main()
