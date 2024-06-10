def initHTML():
    return """<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./Feature Comparison.css">
</head>
<body>
    <div class="home">
        <div class="set-img-svg">
            <a href="../index.html" class="path-svg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
            </a>
        </div>
    </div>

    <!-- 본문 -->
    {FullSpacesInsert}

    
    <!-- 구분 -->

    <!-- 갤러리 주소 -->
    <div class="contact">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
        <address>
            리밴스드 갤러리(DC): <a target="_blank" href="https://gall.dcinside.com/vanced">리밴스드 갤러리로 이동</a> <br>
            문의: <a target="_blank" href="https://gall.dcinside.com/vanced/3817">Kotlin</a> <br>
            <footer>마지막 수정: <time>{time}</time></footer>
        </address>
    </div>
</body>
</html>"""

def FullSpacesTemp():
    return"""
    <div class="Full-Spaces">
        <div class="comparison-container">
            <table class="feature-comparison-table">
                <caption class="feature-comparison-table-title">
                    {icon}
                    <span class="feature-comparison-table-title-text">{title}</span>
                </caption>
                <thead>
                    <tr>
                        <th>기능</th>
                        <th>YouTube</th>
                        <th>Revanced Extended</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody_text}
                </tbody>
            </table>
        </div>
    </div>
"""

def tbodyTemp():
    return """
                    <tr>
                        <td>{Feature_name}</td>
                        {Supported_insert}
                    </tr>
"""


def tbodyTempInsert():
    return """          
                        <td class="{Revanced_Extended}">{Revanced_Extended_Supported}</td>"""