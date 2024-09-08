function get_saved_link_text(saved_name) {
    // 로컬 스토리지에서 저장된 링크 텍스트 가져오기
    const items = localStorage.getItem(saved_name);

    // 저장된 텍스트가 있는 경우 출력
    if (items !== null) {
        console.log("저장된 링크 텍스트:", items);
        return items
    } else {
        console.log("저장된 링크 텍스트가 없습니다.");
        return null
    }
}


function body_style() {
    // 부모 요소 스타일 정의 (예: body)
    document.body.style.display = "block";
    document.body.style.justifyContent = "center"; // 가로 중앙 정렬
}

function apply_style_based_on_user_agent(element, max_height) {
    const userAgent = navigator.userAgent;

    // User-Agent에 따라 스타일 설정
    if (userAgent.includes("Windows")) {
        // PC 기기일 경우
        element.style.minWidth = "600px";
        element.style.maxWidth = "1000px";
        element.style.minHeight = max_height;
        element.style.maxHeight = max_height;
    } else {
        // 모바일 기기일 경우
        element.style.minWidth = "300px";
        element.style.maxWidth = "800px";
        element.style.minHeight = max_height;
        element.style.maxHeight = max_height;
    }
}

function error_display_screen_handler(error_message) {
    const error_screen = document.createElement("div")
    apply_style_based_on_user_agent(error_screen, "200px")

    error_screen.innerText = error_message
    error_screen.classList = "error-scrren"
    error_screen.id = "error-scrren"

    error_screen.style.display = "flex"; // 플렉스 박스 사용
    error_screen.style.flexDirection = "column"; // 세로 방향으로 정렬

    error_screen.style.margin = "5px"; // 상하 px, 좌우 중앙 정렬
    error_screen.style.marginTop = "10px"
    error_screen.style.marginBottom = "10px"
    error_screen.style.marginLeft = "auto";
    error_screen.style.marginRight = "auto";

    error_screen.style.borderRadius = "20px"; // 둥근 모서리
    error_screen.style.backgroundColor = "#aeb3bd"; // 배경 색상
    error_screen.style.color = "white"; // 글자 색상
    error_screen.style.fontWeight = "bold";
    error_screen.style.fontSize = "15px"; // 폰트 사이즈
    error_screen.style.textAlign = "center"; // 텍스트 중앙 정렬
    error_screen.style.alignItems = "center"; // 수직 중앙 정렬
    error_screen.style.justifyContent = "center"; // 수평 중앙 정렬

    // body에 오류 화면 태그 추가
    document.body.appendChild(error_screen)
}


function display_saved_link_text(saved_name1, saved_name2) {
    const error_message = "데이터를 불러오는 중에 문제가 생겼습니다.";
    const text = get_saved_link_text(saved_name1) || get_saved_link_text(saved_name2);

    if (text) {
        document.body.textContent = text;
    } else {
        error_display_screen_handler(error_message);
    }
}


// 초기 스타일 설정
body_style();

display_saved_link_text("revanced-setting-items", "other-setting-items");
