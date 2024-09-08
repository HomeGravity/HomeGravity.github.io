import {body_style, apply_style_based_on_user_agent, element_default_style } from "./utils.js";


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


function error_display_screen_handler(error_message) {
    const error_screen = document.createElement("div")
    apply_style_based_on_user_agent(error_screen, "200px")

    error_screen.innerText = error_message
    error_screen.classList = "error-scrren"
    error_screen.id = "error-scrren"

    element_default_style(error_screen, "15px")

    // body에 오류 화면 태그 추가
    document.body.appendChild(error_screen)
}


function display_saved_link_text(saved_name1, saved_name2) {
    const error_message = "데이터를 불러오는 중에 문제가 생겼습니다.";
    const text = get_saved_link_text(saved_name1) || get_saved_link_text(saved_name2);

    if (text) {
        document.body.textContent = text;
        document.querySelector("head > title").innerText = `tips - ${text}`
    } else {
        error_display_screen_handler(error_message);
        document.querySelector("head > title").innerText = "tips - Error"

    }
}


// 초기 스타일 설정
body_style();

display_saved_link_text("revanced-setting-items", "other-setting-items");
