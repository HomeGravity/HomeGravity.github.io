def InitHTML():
    return """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} 설정</title>
    <link rel="stylesheet" href="./settings.css">

</head>
<body>
    <div class="home">
        <div class="set-img-svg">
            <a href="../index.html" class="path-svg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            </a>
        </div>
    </div>

    <div class="main-top">
        <!-- 리밴스드 로고 설정 -->
        <figure class="main-logo">
            <img src="../images/main-images/revancify_blue-main-logo.png" alt="">
        </figure>

        <h3 class="title">ReVanced Extended <span class="main-title">{title}</span> 설정</h3>

    </div>
    
    <!-- 표시선 그리기 -->
    <br>
    <hr>
    <br>

    {category}

    <!-- 표시선 그리기 -->
    <br>
    <hr>
    <br>
    

    <div class="content">
        {TitleAndDescAndButtonAndImagesContent}
        
        <!-- 갤러리 주소 -->
        <div class="contact">
            <address>
                리밴스드 갤러리(DC): <a target="_blank" href="https://gall.dcinside.com/vanced">리밴스드 갤러리로 이동</a> <br>
                문의: <a target="_blank" href="https://gall.dcinside.com/vanced/3817">Kotlin</a> <br>
                <footer>마지막 수정: <time>{time}</time></footer> <br>
            </address>
        </div>
    </div>

    <script src="./settings.js"></script>

    
</body>
</html>"""

""" 카테고리 탬플렛 """

def TemplateCategory():
    return """<div class="variable">
        <h2 class="category">목차▼</h2>
        <div>
            {id_values}     
        </div>
    </div>"""


def CategoryInsert():
    return"""
            <li><a href="{id_number}">{title_text}</a></li>"""

""" 제목 & 설명 탬플렛 """

def TemplateTitleAndDesc():
    return """
        <!-- 구분 -->

        <!-- 여기서 질문 & 설명 -->
        
        <!-- Full-Spaces 클래스는 여기부터 -->
        <div class="Full-Spaces">
            <div class="variable-main" id="{id_values}">
                {title}
                <div class="main-variable-desc">
                    {desc}
                </div>
            </div>
        """


def TitleInsert():
    return """
                <li class="variable-title">{title_text}</li>"""

def DescInsert():
    return """
                    <li class="variable-desc">{desc_text}</li>"""


""" 버튼 & 사진 탬플렛 """

def TemplateImages():
    return """
        
            <br>
            <hr class="image-line-wrap">
            <br>
            
            <div class="Reference">
                {images}
                <button class="images-open" onclick="toggleImages(this)">
                    Show Images
                </button>
            </div>
        </div>
        <!-- Full-Spaces 클래스는 여기 바로위에 div 까지 -->

        <!-- 표시선 그리기 -->
        <br>
        <hr>
        <br>"""


def ImagesInsert():
    return """
            <img class="reference-image" src="{image_url}" alt="">"""