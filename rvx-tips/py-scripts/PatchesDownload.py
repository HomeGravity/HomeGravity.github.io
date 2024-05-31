import requests
from requests import exceptions
from bs4 import BeautifulSoup
from GetHeaders import *
import os

def InitResponse(URL):
    response = requests.get(URL, headers=request_headers, timeout=10)
    response.raise_for_status()
    
    if response.status_code == 200:
        File = ResponseParse(response.text, URL)
    
    else:
        print("Response code: %s", response.status_code)

    return File

def ResponseParse(source, URL):
    soup = BeautifulSoup(source, "lxml")
    user = soup.select_one("#repo-content-pjax-container > div > div:nth-child(3) > section:nth-child(1) > div > div.col-md-2.d-flex.flex-md-column.flex-row.flex-wrap.pr-md-6.mb-2.mb-md-0.flex-items-start.pt-md-4 > div:nth-child(2) > a").text.strip()
    Fullbox = soup.find("div", attrs={"class" : "Box"})
    LastReleses = Fullbox.find(class_ = "Link--primary Link")
    
    repo = URL.split("/")[4]
    PatchesJSON = f"https://github.com/{user}/{repo}/releases/download/{LastReleses.text.strip()}/patches.json"
    FileSaveName = rf"rvx-tips\py-scripts\PatchesSave\{user}Patches\{user} - {LastReleses.text.strip()} - patches.json"    
    DownloadJSON(PatchesJSON, FileSaveName)
    
    return FileSaveName
    
def DownloadJSON(URL, FileSaveName):
    if os.path.isfile(FileSaveName):
        print(f"{FileSaveName} 파일이 이미 존재합니다. 저장을 취소합니다.")
        return

    try:
        response = requests.get(URL, headers=request_headers, timeout=10)
        response.raise_for_status()
        
        with open(FileSaveName, "w") as File:
            File.write(response.text)
        print(f"{FileSaveName} 저장에 성공했습니다.")
        
    except exceptions.HTTPError as err:
        print(f"HTTP 에러가 발생했습니다: {err}")
        
    except Exception as err:
        print(f"다운로드 중 예외가 발생했습니다: {err}")

if __name__ == "__main__":
    a = InitResponse("https://github.com/anddea/revanced-patches/releases")
    # InitResponse("https://github.com/inotia00/revanced-patches/releases")
    print(a)
