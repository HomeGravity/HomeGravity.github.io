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
        <a href="../index.html">홈</a>
    </div>

    <!-- 리밴스드 로고 설정 -->
    <figure class="main-logo">
        <img src="../images/main-images/revancify_blue-main-logo.png" alt="">
        
    </figure>

    <h3 class="title">ReVanced Extended <span class="main-title">{title}</span> 설정</h3>

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
        <ul>
            {id_values}     
        </ul>
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
                <ol>
                    {title}
                            <ul>
                            <br>
                            {desc}
                        </ul>
                    </li>
                </ol>
            </div>
        """


def TitleInsert():
    return """
                <li class="variable-title">{title_text}"""

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