from basic import *
from PatchesDownload import *
import json

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
                    <a href="{Patches_website}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 256C0 209.4 12.5 165.6 34.3 127.1L144.1 318.3C166 357.5 207.9 384 256 384C270.3 384 283.1 381.7 296.8 377.4L220.5 509.6C95.9 492.3 0 385.3 0 256zM365.1 321.6C377.4 302.4 384 279.1 384 256C384 217.8 367.2 183.5 340.7 160H493.4C505.4 189.6 512 222.1 512 256C512 397.4 397.4 511.1 256 512L365.1 321.6zM477.8 128H256C193.1 128 142.3 172.1 130.5 230.7L54.2 98.5C101 38.5 174 0 256 0C350.8 0 433.5 51.5 477.8 128V128zM168 256C168 207.4 207.4 168 256 168C304.6 168 344 207.4 344 256C344 304.6 304.6 344 256 344C207.4 344 168 304.6 168 256z"/></svg>
                        패치 내역 확인
                    </a>
                    <br>
                    <span class="patches-version">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg>
                        {patches_version}
                    </span>
                </span>
            </h4>
        </div>
    </div>

    <div>
        {insert_html}
        

        <!-- 이 밑은 건드리지 말 것 -->

        <!-- 갤러리 주소 -->
        <div class="contact">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
            <address>
                리밴스드 갤러리(DC): <a target="_blank" href="https://gall.dcinside.com/vanced">리밴스드 갤러리로 이동</a> <br>
                문의: <a target="_blank" href="https://gall.dcinside.com/vanced/3817">Kotlin</a> <br>
                <footer>마지막 수정: <time>{time}</time></footer>
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
    return """<img class="reference-image" src="{img_path}" onclick="window.open(this.src)" alt="">
                """



def generate_html(patches, UserName):
    ImgData = OpenJSON(rf"rvx-tips\py-scripts\PatchesSave\{UserName}Patches\{UserName}AddPatchesImage.json")

    html_template = """
        <div class="Full-Spaces" id="main-{idx}">
            <div class="rvx-option">
                <div class="rvx-option-title">
                    <input type="checkbox" name="rvx-option-title" id="rvx-option-id{idx}" {checked}>
                    <span for="rvx-option-id{idx}" data-original-text="{title}">
                        <span class="Label-Text">{idx}. {title}</span>
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
            
            <!-- 복사 아이콘 공간 -->
            <span class="id-copy-selection">
                <a href="#main-{idx}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>
                </a>
            </span> 
                
            <!-- 사진 공간 -->
            
            <hr>

            <div class="Reference">
                <div class="Reference-Flex">
                    <div>
                        {images}
                    </div>
                </div>
                
                
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

        if list(patch.keys())[0] != "patches-version":
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


def StartHTML(UserName, RepoName):
    PatchesData = InitResponse(f'https://github.com/{UserName}/{RepoName}/releases')
    PatchesData = json.dumps(PatchesData)
    PatchesData = json.loads(PatchesData)
    
    new_html = generate_html(PatchesData, UserName)

    SaveHTML(
        rf"rvx-tips\rvx-patches\rvx-patches-menu\normal\rvx-{UserName}.html", 
        init_html().format(
            Patches_website=f"https://github.com/{UserName}/revanced-patches/releases",
            patches_version=PatchesData[len(PatchesData) - 1]["patches-version"],
            name=UserName, 
            insert_html=new_html, 
            time=CurrentTime()
            )
    )
    
    print(f"{UserName} 완료!")



StartHTML("anddea", "revanced-patches")
StartHTML("inotia00", "revanced-patches")

