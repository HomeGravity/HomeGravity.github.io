import { apply_style_based_on_user_agent, element_default_style } from "../../utils.js";


// 리밴스드 카테고리 처리자
export function tips_column_handler(category_head, access_key) {
    // access_key가 category_head에 있는지 검사
    if (!(access_key in category_head)) {
        console.error(`Access key "${access_key}" not found in category head.`);
        return; // access_key가 없으면 함수 종료
    }

    // 카테고리 컨테이너 div 생성
    const category_container = document.createElement("div");
    category_container.className = "category_container"; // 클래스 추가
    category_container.style.maxHeight = "700px"
    category_container.style.overflowY = "auto";

    for (let key in category_head[access_key]) {
        const item = category_head[access_key][key];
        
        // 새로운 div 요소 생성
        const category_items = document.createElement("div");
        category_items.className = "category_items"
        category_items.id = key; // ID 값 설정
        category_items.style.paddingTop = "30px"
        category_items.style.paddingBottom = "30px"

        const category_title = document.createElement("div");
        category_title.innerText = item["head_name"];
        category_title.className = "category_title"; // 클래스 추가

        // 여백
        category_title.style.marginBottom = "5px"
        
        
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
export function tips_row_handler(category_data, access_key) {
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
        <div id="item-container" style="margin: 10px 0;">
            <div class="item-title" id="item-title">
                ${element["title"]}
            </div>
            <div class="item-description" id="item-description">
                ${revanced_tips_descriptions_handler(element["descriptions"])}
            </div>
            
            <div class="item-image-container" id="item-image-container">
                <div class="item-image-wrapper">
                    ${revanced_tips_images_handler(element["images"])}
                </div>
            </div>
        </div>`;
}

// 설명 추가 처리자
function revanced_tips_descriptions_handler(descriptions) {
    return descriptions.map(description => `
        <div class="item-description">
            ${description}
        </div>
    `).join('');
}

// 사진 추가 처리자
function revanced_tips_images_handler(images) {
    return images.map(image => `<img src="${image}" class="item-image" id="item-image">`).join('');}


// 스타일 처리자
export function tips_style_handler() {
    const imageContainer = document.querySelectorAll("#item-container");
    const imageWrapper = document.querySelectorAll(".item-image-wrapper");

    // imageContainer 스타일 적용
    imageContainer.forEach(element => {
        element.style.display = "block"; // 디스플레이 변경
        element.style.justifyContent = "center"; // 중앙 정렬
        element.style.alignItems = "center"; // 수직 중앙 정렬
        element.style.maxWidth = "450px"; // 최대 너비 설정
        element.style.width = "100%"; // 부모 요소의 너비를 100%로 설정

        element.style.margin = "0 auto"; // 중앙 정렬
    });

    // imageWrapper 스타일 적용
    imageWrapper.forEach(element => {
        // 기본 스타일 적용
        element.style.display = "inline-flex"; // 디스플레이 변경
        element.style.borderRadius = "20px"; // 모서리 둥글게
        element.style.border = "2px solid #ccc"; // 경계선 추가
        element.style.whiteSpace = "nowrap"; // 이미지가 한 줄에 표시되도록 설정
        element.style.alignItems = "center"; // 중앙 정렬
        element.style.overflowX = "auto"; // 가로 스크롤 활성화
        element.style.maxWidth = "100%"; // 사진의 최대 너비를 부모의 100%로 설정
        element.style.marginLeft = "4px";
        element.style.marginRight = "4px";
        element.style.padding = "5px";

        // 이미지 스타일 적용
        const imagesInWrapper = element.querySelectorAll("#item-image");
        imagesInWrapper.forEach(img_element => {
            img_element.style.borderRadius = "20px"; // 이미지를 둥글게
            img_element.style.maxWidth = "100%"; // 사진의 최대 너비를 부모 요소의 100%로 설정
            img_element.style.maxHeight = "450px"; // 사진의 최대 높이 설정 (필요에 따라 조정)
            img_element.style.flexShrink = "0"; // 이미지가 줄어들지 않도록 설정
            img_element.style.height = "auto"; // 높이는 자동 조정

            // 사진이 2개 이상인 경우 여백 적용
            if (imagesInWrapper.length >= 2) {
                console.debug("여백 적용됨")
                img_element.style.marginLeft = "4px";
                img_element.style.marginRight = "4px";
            } else {
                console.debug("여백 적용안됨")

            }
        });
    });
}



// 리밴스드 팁 데이터 스타일 적용 처리자
export function tips_row_style_handler() {
    const elements = document.querySelectorAll("div.category_values")

    for (const element of elements) {
        // element 내에서 클래스가 "item-title"인 요소 찾기
        const titles = element.querySelectorAll(".item-title"); // 클래스 선택자 사용

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