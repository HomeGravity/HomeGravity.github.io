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
        <div class="set-img-svg">
            <a href="../../rvx-patches-main.html" class="path-svg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            </a>
        </div>
    </div>

    <div class="main-content">
        <div class="title">
            <h3>
                RVX Manager 패치 JSON으로 저장 (<span class="patch-developer-name">{name}</span>) Bata
            </h3>
        </div>
        <div class="patches-web">
            <h4>
                <span>
                    <a href="{Patches_website}">패치 내역 확인</a>
                    <span class="patches-version">{patches_version}</span>
                </span>
            </h4>
        </div>
    </div>

    <div>
        {insert_html}
        

        <!-- 이 밑은 건드리지 말 것 -->
        <!-- 이 밑은 건드리지 말 것 -->
        <hr><br>

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


def ImagesInsert():
    return """<img class="reference-image" src="{img_path}" alt="">
                """


def generate_html(patches, UserName):
    ImgData = OpenJSON(rf"rvx-tips\py-scripts\PatchesSave\{UserName}Patches\{UserName}AddPatchesImage.json")

    html_template = """
        <div class="Full-Spaces">
            <div class="rvx-option" id="main-{idx}">
                <div class="rvx-option-title">
                    <input type="checkbox" name="rvx-option-title" id="rvx-option-id{idx}" {checked}>
                    <span for="rvx-option-id{idx}" data-original-text="{title}">
                        <span class="id-copy-selection"><a href="#main-{idx}">#main-{idx}</a></span> 
                        <span class="Label-Text">{title}</span>
                    </span>
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
                
            <!-- 사진 공간 -->
            
            <hr>

            <div class="Reference">
                {images}
                <button class="images-open" onclick="toggleImages(this)">
                    Show Images
                </button>
            </div>
        </div>
    
        <!-- 구분 -->
        <!-- 구분 -->
        """
        
        
    new_html = ""
    idx = 1
    for patch in patches:
        imagesHTML = ""

        if not any(x in patch["compatiblePackages"][0]["name"] for x in ["music", "reddit"]):
            versions = patch["compatiblePackages"][0]["versions"]
            versions_str = f"{min(versions)} ~ {max(versions)}" if versions else "ALL"
            checked = "checked" if patch["use"] else ""

            for key, imgList in ImgData.items():
                if key == patch["name"].strip():
                    for img in imgList:
                        imagesHTML += ImagesInsert().format(img_path = img)

            # NEW_HTML에 신규 생성된 HTML을 추가
            new_html += html_template.format(
                idx=idx, 
                checked=checked, 
                title=patch["name"].strip(), 
                desc=patch["description"].strip(), 
                versions_str=versions_str,
                images=imagesHTML
                ) + "\n\n"
            
            
            idx += 1
    
    return new_html


def StartHTML(FileName, UserName):
    patches = OpenJSON(f"{FileName}")
    new_html = generate_html(patches, UserName)

    SaveHTML(
        rf"rvx-tips\rvx-patches\rvx-patches-menu\normal\rvx-{UserName}.html", 
        init_html().format(
            Patches_website=f"https://github.com/{UserName}/revanced-patches/releases",
            patches_version=GetPatchesVersion(FileName),
            name=UserName, 
            insert_html=new_html, 
            time=CurrentTime()
            )
    )
    
    print(f"{UserName} 완료!")


StartHTML(rf"{InitResponse('https://github.com/anddea/revanced-patches/releases')}", "anddea")
StartHTML(rf"{InitResponse('https://github.com/inotia00/revanced-patches/releases')}", "inotia00")
