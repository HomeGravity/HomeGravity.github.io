import {apply_style_based_on_user_agent, element_default_style } from "../../utils.js";
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
    const patches_selector_name = document.createElement("div");
    apply_style_based_on_user_agent(patches_selector_name, "auto");

    patches_selector_name.innerText = "패치 선택자 이름"
    patches_selector_name.className = "selector_name"; // 클래스 이름 수정
    patches_selector_name.id = "selector_name"; // ID 수정

    // 버튼 컨테이너 생성
    const patches_btn_container = document.createElement("div");
    patches_btn_container.style.display = "inline-flex"; // 디스플레이 변경
    patches_btn_container.style.borderRadius = "20px"; // 모서리 둥글게
    patches_btn_container.style.whiteSpace = "nowrap"; // 한 줄에 표시되도록 설정
    patches_btn_container.style.alignItems = "center"; // 중앙 정렬
    patches_btn_container.style.maxWidth = "100%"; // 최대 너비를 부모의 100%로 설정
    patches_btn_container.style.maxHeight = "100%"; // 최대 높이를 부모의 100%로 설정
    
    patches_btn_container.style.marginLeft = "4px";
    patches_btn_container.style.marginRight = "4px";

    // 부모 태그에 추가
    document.body.appendChild(patches_container);
    patches_container.appendChild(patches_selector_name);
    patches_container.appendChild(patches_btn_container)

    //  버튼 추가
    patches_btn_container.appendChild(patches_selection_button("anddea", "revanced-patches"))
    patches_btn_container.appendChild(patches_selection_button("inotia00", "revanced-patches"))

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
    patches_data_container.appendChild(patches_items)

    patches_data_container.style.display = "none";
}