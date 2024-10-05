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
        element.style.maxWidth = "1100px";
        element.style.minHeight = "auto";
        element.style.maxHeight = max_height;
    } else {
        // 모바일 기기일 경우
        element.style.minWidth = "auto";
        element.style.maxWidth = "800px";
        element.style.minHeight = "auto";
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
    element.style.justifyContent = "center"; // 수평 중앙 정렬
}

// 버튼 기본 스타일
export function element_btn_default_style(btn_element) {
    // 스타일 적용
    btn_element.style.borderRadius = "20px";
    btn_element.style.marginTop = "15px";
    btn_element.style.padding = "15px"
    btn_element.style.backgroundColor = "#4798a1"; // 기본 배경색
    btn_element.style.color = "white"; // 텍스트 색상
    btn_element.style.border = "none"; // 기본 테두리 제거
    btn_element.style.fontSize = "16px"; // 폰트 크기
    btn_element.style.cursor = "pointer"; // 마우스 커서 변경
    btn_element.style.transition = "background-color 0.3s, transform 0.2s"; // 애니메이션 효과

    // 호버 효과
    btn_element.addEventListener("mouseover", () => {
        btn_element.style.backgroundColor = "#4a888f"; // 호버 시 배경색 변경
        btn_element.style.transform = "scale(1.25)"; // 호버 시 크기 증가
    });

    // 클릭 효과
    btn_element.addEventListener("mousedown", () => {
        btn_element.style.transform = "scale(0.85)"; // 클릭 시 크기 감소
    });

    // 마우스가 버튼을 떠날 때 원래 상태로 복원
    btn_element.addEventListener("mouseout", () => {
        btn_element.style.backgroundColor = "#4798a1"; // 원래 배경색
        btn_element.style.transform = "scale(1)"; // 원래 크기로 복원
    });

}




export function scrollbar_style() {
    // 스크롤바 색상을 변경하는 CSS 스타일 생성
    const style = document.createElement('style');
    style.innerHTML = `
        /* Chrome, Safari, Edge */
        ::-webkit-scrollbar {
            width: 12px; /* 스크롤바 너비 */
        }
        ::-webkit-scrollbar-thumb {
            background-color: lightblue; /* 스크롤바 색상: 초록색 */
            border-radius: 15px; /* 스크롤바 둥글게 */
    `;
    document.head.appendChild(style);
}