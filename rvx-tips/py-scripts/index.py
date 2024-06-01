from basic import *
from PatchesDownload import *

def init_html():
    return """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./rvx-patches.css">
</head>
<body>
    <div class="home">
        <a href="../../rvx-patches-main.html">홈</a>
    </div>

    <div class="title">
        <h3>
            RVX Manager 패치 JSON으로 저장 ({name}) Bata
        </h3>
    </div>

    <div>
        {insert_html}
        

        <!-- 이 밑은 건드리지 말 것 -->
        <!-- 이 밑은 건드리지 말 것 -->
        <hr><hr><br>

        <!-- 갤러리 주소 -->
        <div class="contact">
            <address>
                리밴스드 갤러리(DC): <a target="_blank" href="https://gall.dcinside.com/vanced">리밴스드 갤러리로 이동</a> <br>
                문의: <a target="_blank" href="https://gall.dcinside.com/vanced/3817">Kotlin</a> <br>
                <footer>마지막 수정: <time>{time}</time></footer> <br>
            </address>
        </div>
        
        <!-- 구분 -->
        <!-- 구분 -->
        <br><br><br><br>
    </div>
    
    <div class="button-container">
        <button id="download-button" type="button" class="w-btn w-btn-green">
            JSON으로 저장하기
        </button>
        <button id="checked-none" type="button" class="w-btn w-btn-green">
            모든 체크 해제
        </button>
        
    </div>
    
    <script src="./rvx-patches.js"></script>

</body>
</html>"""


def generate_html(patches):
    html_template = """
        <div class="rvx-option" id="main-{idx}">
            <div class="rvx-option-title">
                <input type="checkbox" name="rvx-option-title" id="rvx-option-id{idx}" {checked}>
                <label for="rvx-option-id{idx}" data-original-text="{title}">
                    <span class="id-copy-selection"><a href="#main-{idx}">#main-{idx}</a></span> 
                    <span>{title}</span>
                </label>
            </div>

            <div class="rvx-option-desc">
                <span>
                    {desc}
                </span>
            </div>
            
            <div class="rvx-option-version">
                <span>
                    {versions_str}
                </span>
            </div>
        </div>
        
        <!-- 구분 -->
        <!-- 구분 -->
    """
    new_html = ""
    idx = 1
    for patch in patches:
        if not any(x in patch["compatiblePackages"][0]["name"] for x in ["music", "reddit"]):
            versions = patch["compatiblePackages"][0]["versions"]
            versions_str = f"{min(versions)} ~ {max(versions)}" if versions else "ALL"
            checked = "checked" if patch["use"] else ""

            new_html += html_template.format(
                idx=idx, 
                checked=checked, 
                title=patch["name"].strip(), 
                desc=patch["description"].strip(), 
                versions_str=versions_str) + "\n\n"
            idx += 1
    
    return new_html


def StartHTML(FileName, UserName):
    patches = OpenJSON(f"{FileName}")
    new_html = generate_html(patches)
    SaveHTML(rf"rvx-tips\rvx-patches\rvx-patches-menu\normal\rvx-{UserName}.html", init_html().format(name=UserName, insert_html=new_html, time=CurrentTime()))
    print(f"{UserName} 완료!")
    

StartHTML(rf"{InitResponse('https://github.com/anddea/revanced-patches/releases')}", "anddea")
StartHTML(rf"{InitResponse('https://github.com/inotia00/revanced-patches/releases')}", "inotia00")
