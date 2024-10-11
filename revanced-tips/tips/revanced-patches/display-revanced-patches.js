import {apply_style_based_on_user_agent, element_btn_default_style, element_default_style } from "../../utils.js";
import {patches_selection_button} from "./revanced-patches.js"


// 패치 선택지 이름
export function display_patches_btn() {
    // 패치 선택자 태그
    const patches_container = document.createElement("div");
    apply_style_based_on_user_agent(patches_container, "auto");

    patches_container.className = "patches_screen"; // 클래스 이름 수정
    patches_container.id = "patches_screen"; // ID 수정

    // 스타일 설정
    patches_container.style.paddingTop = "30px";
    patches_container.style.paddingBottom = "30px";
    element_default_style(patches_container, "15px", "black");

    // 패치 선택자 명 추가
    const patches_selector_name = share_name("패치 선택자 이름", "selector_name", "selector_name")

    // 버튼 컨테이너 생성
    const patches_btn_container = share_container("div", "inline-flex", true)
    patches_btn_container.style.marginBottom = "15px";
    

    // 옵션
    const patches_btn_options_name = share_name("패치 옵션", "options_name", "options_name")
    const patches_select_options_name = share_name("패치 앱 선택 옵션", "options_app_name", "options_app_name")


    // 버튼 컨테이너 생성
    const patches_btn_options_container = share_container("div", "block", true)
    const patches_select_app_options_container = share_container("div", "block", false)
    

    // 부모 태그에 추가
    document.body.appendChild(patches_container);
    patches_container.appendChild(patches_selector_name);
    patches_container.appendChild(patches_btn_container)
    patches_container.appendChild(patches_btn_options_name)
    patches_container.appendChild(patches_btn_options_container)
    patches_container.appendChild(patches_select_options_name)
    patches_container.appendChild(patches_select_app_options_container)

    //  버튼 추가
    patches_btn_container.appendChild(patches_selection_button("anddea", "revanced-patches"))
    patches_btn_container.appendChild(patches_selection_button("inotia00", "revanced-patches"))

    // 옵션 버튼 추가
    patches_btn_options_container.appendChild(toggle_public_patches_button("공용 패치 숨기기: ON", "hide_public_patches", "hide_public_patches", "hide-status", "on"))

    // 옵션 패치 앱 메뉴 추가 (로직 없음)
    patches_select_app_options_container.appendChild(app_menu())
    

}

// 공용 컨테이너
function share_container(create_tag, display_type, is_margin_b) {
    // 버튼 컨테이너 생성
    const container = document.createElement(create_tag);
    container.style.display = display_type; // 디스플레이 변경
    container.style.borderRadius = "20px"; // 모서리 둥글게
    container.style.whiteSpace = "nowrap"; // 한 줄에 표시되도록 설정
    container.style.alignItems = "center"; // 중앙 정렬
    container.style.maxWidth = "100%"; // 최대 너비를 부모의 100%로 설정
    container.style.maxHeight = "100%"; // 최대 높이를 부모의 100%로 설정
    
    container.style.marginLeft = "4px";
    container.style.marginRight = "4px";

    if (is_margin_b) {
        container.style.marginBottom = "15px";
        
    }

    return container;
}

// 공용 메인 제목
function share_name(text, class_name, id) {
    // 패치 선택자 명 추가
    const name = document.createElement("div");
    apply_style_based_on_user_agent(name, "auto");

    name.innerText = text;
    name.className = class_name; // 클래스 이름 수정
    name.id = id; // ID 수정

    return name;
}


// 공용 패치 옵션 숨기기 버튼
function toggle_public_patches_button(text, class_name, id, setAt_name, setAt_value) {
    const btn = document.createElement("button")
    btn.innerText = text;
    btn.className = class_name;
    btn.id = id;
    btn.setAttribute(setAt_name, setAt_value)

    // 스타일
    element_btn_default_style(btn);
    btn.style.display = "block"

    // 버튼 클릭 시 텍스트 변경
    btn.addEventListener("click", () => {
        if (btn.textContent === "공용 패치 숨기기: ON") {
            btn.textContent = "공용 패치 숨기기: OFF";
            btn.setAttribute(setAt_name, "off")
        } else {
            btn.textContent = "공용 패치 숨기기: ON";
            btn.setAttribute(setAt_name, setAt_value)
        }
    });

    return btn;
}

// 여러앱의 패치 옵션 표시 드롭다운 메뉴
function app_menu() {
    const select = document.createElement("select");
    select.className = "app-select";

    for (const element of ["com.google.android.youtube", "com.google.android.apps.youtube.music"]) {
        const option = document.createElement("option");
        option.className = "select";
        option.textContent = element;

        // style
        option.style.textAlign = "center"; // 텍스트 정렬
        option.style.fontWeight = "bold"; // 텍스트 굵게
        option.style.color = "black";

        // 마우스 호버 이벤트 추가
        option.addEventListener("mouseover", () => {
            option.style.backgroundColor = "gray"; // 마우스 오버 시 배경색 변경
            option.style.color = "white"; // 텍스트 색상 변경
        });

        option.addEventListener("mouseout", () => {
            option.style.backgroundColor = ""; // 기본 배경색으로 초기화
            option.style.color = ""; // 기본 텍스트 색상으로 초기화
        });

        select.appendChild(option);

    }

    if (select) {
        // 스타일 변경
        select.style.marginTop = "15px";
        select.style.color = "#007BFF"; // 텍스트 색상 변경
        select.style.fontWeight = "bold"; // 텍스트 굵게
        select.style.border = "1px solid #007BFF"; // 테두리 추가
        select.style.padding = "10px"; // 패딩 추가
        select.style.paddingLeft = "15px";
        select.style.paddingRight = "15px";
        select.style.backgroundColor = "#f0f8ff"; // 배경색 추가
        select.style.borderRadius = "10px"; // 모서리 둥글게
        select.style.maxWidth = "450px"; // 드롭다운 폭 설정
        select.style.cursor = "pointer"; // 커서 스타일 변경
    }
    
    return select;
}



// 패치 목록 표시
export function display_patches_data() {
    // 패치 목록 표시 태그
    const patches_data_container = document.createElement("div");
    apply_style_based_on_user_agent(patches_data_container, "auto");

    patches_data_container.className = "patches_data_screen"; // 클래스 이름 수정
    patches_data_container.id = "patches_data_screen"; // ID 수정

    // 스타일 설정
    patches_data_container.style.paddingTop = "30px";
    patches_data_container.style.paddingBottom = "30px";
    element_default_style(patches_data_container, "15px", "black");

    // 패치 목록 타이틀 표시
    const patches_data_title = document.createElement("div");
    apply_style_based_on_user_agent(patches_data_title, "auto");

    patches_data_title.innerText = "패치 표시"
    patches_data_title.className = "patches_data_title"; // 클래스 이름 수정
    patches_data_title.id = "patches_data_title"; // ID 수정
    patches_data_title.style.marginBottom = "3px"
    
    // 패치 목록 개수
    const patches_data_count = document.createElement("div");
    apply_style_based_on_user_agent(patches_data_title, "auto");

    patches_data_count.innerText = "선택된 패치 개수: null"
    patches_data_count.className = "patches_data_count"; // 클래스 이름 수정
    patches_data_count.id = "patches_data_count"; // ID 수정
    patches_data_count.style.marginTop = "3px"

    // 패치 목록 표시
    const patches_items = document.createElement("div");
    patches_items.className = "patches_items"; // 클래스 이름 수정
    patches_items.id = "patches_items"; // ID 수정
    patches_items.style.margin = "10px";
    patches_items.style.maxHeight = "500px"
    patches_items.style.overflowY = "auto";
    patches_items.style.border = '3px solid lightgray';
    patches_items.style.borderRadius = "15px"

    // 부모 태그에 추가
    document.body.appendChild(patches_data_container);
    patches_data_container.appendChild(patches_data_title);
    patches_data_container.appendChild(patches_data_count);
    patches_data_container.appendChild(patches_items);

    patches_data_container.style.display = "none";
}