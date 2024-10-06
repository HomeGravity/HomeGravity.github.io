import {body_style, apply_style_based_on_user_agent, element_default_style, element_btn_default_style, scrollbar_style } from "../utils.js";
import {display_patches_btn, display_patches_data} from "./revanced-patches/display-revanced-patches.js"
import {tips_column_handler, tips_row_handler, tips_style_handler, tips_row_style_handler,} from "./revanced-tips/display-revanced-tips.js"
import {getCategories} from "../dataset.js"


// 임시 데이터
const category_head = {
    "플레이어": {
    "player_button": {"head_name": "플레이어 버튼"},

    "action_button": {"head_name": "액션 버튼"},

    "ambient_mode": {"head_name": "앰비언트 모드"}
    }
};

// 임시 데이터
const category_data = {
    "플레이어": {
    "player_button": [{"title": "제목_1", "descriptions": ["설명_1", "설명_2"], "images": ["../no-img-1.png"]},
                    {"title": "제목_2", "descriptions": ["설명_1", "설명_2"], "images": ["../no-img-1.png"]}],

    "action_button": [{"title": "제목_3", "descriptions": ["설명_1", "설명_2"], "images": ["../no-img-1.png"]},
                    {"title": "제목_4", "descriptions": ["설명_1", "설명_2"], "images": ["../no-img-1.png"]}],

    "ambient_mode": [{"title": "제목_5", "descriptions": ["설명_1", "설명_2"], "images": ["../no-img-1.png"]},
                    {"title": "제목_6", "descriptions": ["설명_1", "설명_2"], "images": ["../no-img-1.png"]}]
    }
};

const { categories, subCategories } = getCategories();

function get_local_storage(saved_name) {
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

// 오류 화면
function error_screen_handler(error_message) {
    const error_screen = document.createElement("div")
    apply_style_based_on_user_agent(error_screen, "auto")

    error_screen.innerText = error_message
    error_screen.className = "error-scrren"
    error_screen.id = "error-scrren"
    error_screen.style.paddingTop = "50px"
    error_screen.style.paddingBottom = "50px"
    
    // body에 오류 화면 태그 추가
    document.body.appendChild(error_screen)
    element_default_style(error_screen, "15px", "tomato")

    // 홈 버튼 추가
    error_screen.appendChild(home_button());

}

// 정상 화면
function normal_screen_handler(normal_text) {
    const normal_screen = document.createElement("div")
    apply_style_based_on_user_agent(normal_screen, "auto")

    normal_screen.innerText = normal_text
    normal_screen.className = "normal-scrren"
    normal_screen.id = "normal-scrren"
    normal_screen.style.paddingTop = "30px"
    normal_screen.style.paddingBottom = "30px"

    // body에 정상 화면 태그 추가
    document.body.appendChild(normal_screen)
    element_default_style(normal_screen, "15px", "black")

    // 홈 버튼 추가
    normal_screen.appendChild(home_button());

    // 리밴스드 사용 관련 팁 헤드 추가
    if (categories.includes(normal_text)) {
        tips_column_handler(category_head, normal_text)
        tips_row_handler(category_data, normal_text)
        tips_row_style_handler()
        tips_style_handler()
    
    // 리밴스드 패치 확인
    } else if (normal_text == subCategories[0]) {

        // 패치 선택자 화면 표시
        display_patches_btn()

        // 패치 데이터 표시
        display_patches_data()
    }
}

// 홈 버튼 추가 함수
function home_button() {
    // 홈으로 이동 버튼 추가
    const home_btn = document.createElement("button")
    home_btn.innerText = "홈으로 이동"
    home_btn.className = "go-home"
    home_btn.id = "go-home"

    element_btn_default_style(home_btn)

    // 버튼 클릭 시 특정 페이지로 이동
    home_btn.addEventListener("click", () => {
        window.location.href = "../home.html"; // 이동할 URL
    });
    

    return home_btn
}



function screen_handler(saved_name1, saved_name2) {
    const error_message = "데이터를 불러오는 중에 문제가 생겼습니다.";
    const text = get_local_storage(saved_name1) || get_local_storage(saved_name2);

    if (text) {
        normal_screen_handler(text);
        document.querySelector("head > title").innerText = `tips - ${text}`
    } else {
        error_screen_handler(error_message);
        document.querySelector("head > title").innerText = "tips - Error"

    }
}


// 초기 스타일 설정
body_style();

// 스크롤바 스타일
scrollbar_style()


// 초기 화면 표시
screen_handler("revanced_setting_items", "other_setting_items");
