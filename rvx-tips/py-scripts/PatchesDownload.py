import requests
from requests import exceptions
from bs4 import BeautifulSoup
from GetHeaders import *
import json

def InitResponse(URL):
    response = requests.get(URL, headers=request_headers, timeout=10)
    response.raise_for_status()
    
    if response.status_code == 200:
        data = ResponseParse(response.text, URL)
    
    else:
        print("Response code: %s", response.status_code)

    return data

def ResponseParse(source, URL):
    soup = BeautifulSoup(source, "lxml")
    user = soup.select_one("#repo-content-pjax-container > div > div:nth-child(3) > section:nth-child(1) > div > div.col-md-2.d-flex.flex-md-column.flex-row.flex-wrap.pr-md-6.mb-2.mb-md-0.flex-items-start.pt-md-4 > div:nth-child(2) > a").text.strip()
    Fullbox = soup.find("div", attrs={"class" : "Box"})
    LastReleses = Fullbox.find(class_ = "Link--primary Link")
    
    repo = URL.split("/")[4]
    PatchesJSON = f"https://github.com/{user}/{repo}/releases/download/{LastReleses.text.strip()}/patches.json"
    JSONData = json.loads(JSONDownloadBytes(PatchesJSON))


    if isinstance(JSONData, list):
        JSONData.append({"patches-version" : LastReleses.text.strip()})

        return JSONData
    
    # 위 JSONDatas에서 아무것도 반환되지 않으면 리턴 값을 None로 지정
    return None
    

def JSONDownloadBytes(URL):
    try:
        response = requests.get(URL, headers=request_headers, timeout=10)
        response.raise_for_status()

        return response.text
        
    except exceptions.HTTPError as err:
        print(f"HTTP 에러가 발생했습니다: {err}")
        
    except Exception as err:
        print(f"다운로드 중 예외가 발생했습니다: {err}")
        
    return None

if __name__ == "__main__":
    a = InitResponse("https://github.com/anddea/revanced-patches/releases")
    # InitResponse("https://github.com/inotia00/revanced-patches/releases")
    print(a)
    print(type(a))
    print(a[len(a)-1]["patches-version"])