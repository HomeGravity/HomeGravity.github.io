import {body_style, apply_style_based_on_user_agent, element_default_style } from "./utils.js";

// 임시 데이터
let category_head = {
    "플레이어": {
    "player_button": {"head_name": "플레이어 버튼"},

    "action_button": {"head_name": "액션 버튼"},

    "ambient_mode": {"head_name": "앰비언트 모드"}
    }
};

// 임시 데이터
let category_data = {
    "플레이어": {
    "player_button": [{"title": "제목_1", "descriptions": ["설명_1", "설명_2"], "images": ["/revanced-tips/test1.png", "/revanced-tips/test2.png", "/revanced-tips/test1.png", "/revanced-tips/test3.png"]},
                    {"title": "제목_2", "descriptions": ["설명_1", "설명_2"], "images": ["/revanced-tips/test1.png"]}],

    "action_button": [{"title": "제목_3", "descriptions": ["설명_1", "설명_2"], "images": ["/revanced-tips/test1.png", "/revanced-tips/test1.png"]},
                    {"title": "제목_4", "descriptions": ["설명_1", "설명_2"], "images": ["/revanced-tips/test1.png"]}],

    "ambient_mode": [{"title": "제목_5", "descriptions": ["설명_1", "설명_2"], "images": ["/revanced-tips/test1.png"]},
                    {"title": "제목_6", "descriptions": ["설명_1", "설명_2"], "images": ["/revanced-tips/test1.png"]}]
    }
};


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

    element_default_style(error_screen, "15px", "red")

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

    // 리밴스드 사용 관련 팁 헤드 추가
    tips_column_handler(category_head, normal_text)
    tips_row_handler(category_data, normal_text)
    tips_row_style_handler()
    images_style_handler()
}

// 리밴스드 카테고리 처리자
function tips_column_handler(category_head, access_key) {
    // access_key가 category_head에 있는지 검사
    if (!(access_key in category_head)) {
        console.error(`Access key "${access_key}" not found in category data.`);
        return; // access_key가 없으면 함수 종료
    }

    // 카테고리 컨테이너 div 생성
    let category_container = document.createElement("div");
    category_container.className = "category_container"; // 클래스 추가

    
    for (let key in category_head[access_key]) {
        const item = category_head[access_key][key];
        // console.log(item["head_name"]);
        
        // 새로운 div 요소 생성
        let category_items = document.createElement("div");
        category_items.className = "category_items"
        category_items.id = key; // ID 값 설정
        category_items.style.paddingTop = "30px"
        category_items.style.paddingBottom = "30px"

        let category_title = document.createElement("div");
        category_title.innerText = item["head_name"];
        category_title.className = "category_title"; // 클래스 추가

        // 여백
        category_title.style.margin = "5px"; // 상하 px, 좌우 중앙 정렬
        category_title.style.marginTop = "10px"
        category_title.style.marginBottom = "10px"
        
        
        // 스타일 적용 함수 호출
        element_default_style(category_items, "15px", "#4d3996");
        apply_style_based_on_user_agent(category_items, "auto");

        // 카테고리 컨테이너에 추가
        category_items.appendChild(category_title)
        category_container.appendChild(category_items);
    }
    
    // 카테고리 컨테이너를 document.body에 추가
    document.body.appendChild(category_container);
}

// 카테고리 데이터에서 요소 반복하여 HTML 생성
function tips_row_handler(category_data, access_key) {
    // access_key에 해당하는 카테고리 데이터가 존재하는지 확인
    if (!category_data[access_key]) {
        console.error(`Access key "${access_key}" not found in category_data.`);
        return;
    }

    // 해당 access_key의 모든 category_key에 대해 반복
    for (const category_key in category_data[access_key]) {
        const row_element = document.getElementById(category_key); // category_key에 해당하는 요소 가져오기

        // row_element가 null인지 확인
        if (!row_element) {
            console.error(`Element with id "${category_key}" not found.`);
            continue; // row_element가 없으면 다음 반복으로 넘어감
        }

        let category_values = document.createElement("div");
        category_values.className = "category_values";
        let item_html = '';

        // category_data에서 요소 반복
        for (const element of category_data[access_key][category_key]) {
            item_html += create_item_html(element);
        }

        // item_html을 category_values에 추가
        category_values.innerHTML = item_html;

        // category_values를 row_element에 추가
        row_element.appendChild(category_values);
    }
}

// 개별 아이템 HTML 생성
function create_item_html(element) {
    return `
    <div id="item_data" style="margin: 10px 0;">
        <div class="item_title" id="item_title">
            ${element["title"]}
        </div>
        <div class="item_descriptions" id="item_descriptions">
            ${revanced_tips_descriptions_handler(element["descriptions"])}
        </div>
        <div class="item_images" id="item_images">
            ${revanced_tips_images_handler(element["images"])}
        </div>
    </div>`;
}

// 설명 추가 처리자
function revanced_tips_descriptions_handler(descriptions) {
    return descriptions.map(description => `
        <div class="item_description">
            ${description}
        </div>
    `).join('');
}

// 사진 추가 처리자
function revanced_tips_images_handler(images) {
    return images.map(image => `<img src="${image}" class="item_image" id="item_image">`).join('');
}

// 사진 스타일 처리자
function images_style_handler() {
    const imgs_elements = document.querySelectorAll(".item_images");

    imgs_elements.forEach(imgs_element => {
        imgs_element.style.display = "inline-flex"; // 디스플레이로 변경
        imgs_element.style.borderRadius = "20px"; // 모서리 둥글게
        imgs_element.style.border = "3px solid #ccc"; // 경계선 추가
        imgs_element.style.overflowX = "auto"; // 가로 스크롤 활성화
        imgs_element.style.overflowY = "auto"; // 세로 스크롤 활성화
        imgs_element.style.whiteSpace = "nowrap"; // 이미지가 한 줄에 표시되도록 설정
        imgs_element.style.padding = "5px"; // 패딩 추가
        imgs_element.style.maxWidth = "auto"; // 부모 요소의 너비
        imgs_element.style.maxHeight = "auto"; // 부모 요소의 높이
        imgs_element.style.alignItems = "center"; // 중앙 정렬

        // imgs_element.style.marginTop = "5px"
        imgs_element.style.marginLeft = "8px";
        imgs_element.style.marginRight = "8px";
        // imgs_element.style.marginBottom = "5px"
    });

    const img_elements = document.querySelectorAll(".item_image");

    img_elements.forEach(img_element => {
        img_element.style.display = "inline-block"; // 디스플레이로 변경
        img_element.style.borderRadius = "20px"; // 이미지를 둥글게

        img_element.style.marginTop = "8px"
        img_element.style.marginLeft = "3px";
        img_element.style.marginRight = "3px";
        img_element.style.marginBottom = "8px"

        img_element.style.maxWidth = "100%"; // 사진의 최대 너비를 부모 요소에 맞춤
        img_element.style.maxHeight = "100%"; // 최대 높이
        img_element.style.width = "auto"; // 너비 자동 조정
        img_element.style.height = "auto"; // 높이는 자동 조정
        img_element.style.flexShrink = "0"; // 이미지가 줄어들지 않도록 설정

    });
}





// 리밴스드 팁 데이터 스타일 적용 처리자
function tips_row_style_handler() {
    let elements = document.querySelectorAll("div.category_values")

    for (const element of elements) {
        // element 내에서 클래스가 "item_title"인 요소 찾기
        let titles = element.querySelectorAll(".item_title"); // 클래스 선택자 사용

        // 각 title에 대해 스타일 적용
        titles.forEach(title => {
            // 원하는 스타일을 적용
            title.style.color = "white"; // 예시: 글자 색상 변경
            title.style.fontWeight = "bold"; // 예시: 글자 두껍게

            // 여백
            title.style.margin = "5px"; // 상하 px, 좌우 중앙 정렬
            title.style.marginTop = "10px"
            title.style.marginBottom = "10px"
        });
    }
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

screen_handler("revanced-setting-items", "other-setting-items");
