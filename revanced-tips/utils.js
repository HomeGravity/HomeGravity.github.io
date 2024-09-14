export function body_style() {
    // 부모 요소 스타일 정의 (예: body)
    document.body.style.display = "block";
    document.body.style.justifyContent = "center"; // 가로 중앙 정렬
}


export function apply_style_based_on_user_agent(element, max_height) {
    const userAgent = navigator.userAgent;

    // User-Agent에 따라 스타일 설정
    if (userAgent.includes("Windows")) {
        // PC 기기일 경우
        element.style.minWidth = "auto";
        element.style.maxWidth = "1200px";
        element.style.minHeight = max_height;
        element.style.maxHeight = max_height;
    } else {
        // 모바일 기기일 경우
        element.style.minWidth = "auto";
        element.style.maxWidth = "1000px";
        element.style.minHeight = max_height;
        element.style.maxHeight = max_height;
    }
}

// 기본 스타일
export function element_default_style(element, font_size, color) {
    element.style.display = "flex"; // 플렉스 박스 사용
    element.style.flexDirection = "column"; // 세로 방향으로 정렬

    element.style.marginTop = "15px"
    element.style.marginBottom = "15px"
    element.style.marginLeft = "auto";
    element.style.marginRight = "auto";

    element.style.borderRadius = "20px"; // 둥근 모서리
    element.style.backgroundColor = "#aeb3bd"; // 배경 색상
    element.style.color = color; // 글자 색상
    element.style.fontWeight = "bold";
    element.style.fontSize = font_size; // 폰트 사이즈
    element.style.textAlign = "center"; // 텍스트 중앙 정렬
    element.style.alignItems = "center"; // 수직 중앙 정렬
    // element.style.justifyContent = "center"; // 수평 중앙 정렬
}