
// 태그 생성 함수
function create_element(tag, id, class_name, inner_text) {
    const element = document.createElement(tag);
    if (id) element.id = id;
    if (class_name) element.className = class_name;
    if (inner_text) element.innerText = inner_text;
    return element;
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

function top_main_search_input_handler() {
    const element = document.getElementById("top-main");
    const search_input = create_element("input", "revanced-search-input", null, null);
    search_input.type = "text";

    search_input.style.minWidth = "70%";
    search_input.style.minHeight = "40px";

    search_input.style.margin = "5px"
    search_input.style.marginTop = "5px";
    search_input.style.marginBottom = "15px";
    
    search_input.style.borderRadius = "20px";
    search_input.style.border = "none";
    search_input.placeholder = "여기에 입력하세요"

    element.appendChild(search_input)
}


function top_main_handler() {
    const element = document.getElementById('top-main');
    apply_style_based_on_user_agent(element, "auto")

    // 메인 타이틀 추가
    const revanced_features = create_element("div", "revanced-features", null, null);
    revanced_features.innerText = "리밴스드 기능 설명/팁"
    revanced_features.style.margin = "5px"
    revanced_features.style.marginTop = "15px";
    revanced_features.style.marginBottom = "5px";
    element.appendChild(revanced_features)


    element.style.display = "flex"; // 플렉스 박스 사용
    element.style.flexDirection = "column"; // 세로 방향으로 정렬
    
    element.style.margin = "5px"; // 상하 px, 좌우 중앙 정렬
    element.style.marginTop = "10px"
    element.style.marginBottom = "10px"
    element.style.marginLeft = "auto";
    element.style.marginRight = "auto";
    
    element.style.borderRadius = "20px"; // 둥근 모서리
    element.style.backgroundColor = "#aeb3bd"; // 배경 색상
    element.style.color = "white"; // 글자 색상
    element.style.fontWeight = "bold";
    element.style.fontSize = "25px"; // 폰트 사이즈
    element.style.textAlign = "center"; // 텍스트 중앙 정렬
    element.style.alignItems = "center"; // 수직 중앙 정렬
    element.style.justifyContent = "center"; // 수평 중앙 정렬

    top_main_search_input_handler()
}


function top_category_handler(title, id, dataset, class_name, category_title) {
    const element = document.getElementById(id);
    apply_style_based_on_user_agent(element, `auto`)

    // 카테고리 항목 추가
    let insert_html = '';

    // 각 카테고리 항목을 <a> 태그로 추가 (for 문 사용)
    for (let i = 0; i < dataset.length; i++) {
        insert_html += `
        <div class="item">
            <a href="./tips.html">
                ${dataset[i]}
            </a>
        </div>
        `;
    }

    element.innerHTML = `
    <div class="revanced-setting-category">
        <div class=${category_title} id=${category_title}>
            ${title}
        </div>
        <div class="items" id="items">
            ${insert_html}
        </div>
    </div>`;


    element.style.display = "flex"; // 플렉스 박스 사용
    element.style.flexDirection = "column"; // 세로 방향으로 정렬

    element.style.margin = "5px"; // 상하 px, 좌우 중앙 정렬
    element.style.marginTop = "10px"
    element.style.marginBottom = "10px"
    element.style.marginLeft = "auto";
    element.style.marginRight = "auto";

    element.style.borderRadius = "20px"; // 둥근 모서리
    element.style.backgroundColor = "#aeb3bd"; // 배경 색상
    element.style.color = "white"; // 글자 색상
    element.style.fontWeight = "bold";
    element.style.fontSize = "15px"; // 폰트 사이즈
    element.style.textAlign = "center"; // 텍스트 중앙 정렬
    element.style.alignItems = "center"; // 수직 중앙 정렬
    element.style.justifyContent = "center"; // 수평 중앙 정렬

    top_category_title_handler(category_title);
    top_category_items_handler(class_name);

    
}

function top_category_title_handler(category_title) {
    const element = document.getElementById(category_title);
    element.style.fontSize = "20px"
    element.style.marginTop = "15px";
    element.style.marginBottom = "15px";
}
function top_category_items_handler(class_name) {
    const element = document.getElementsByClassName(class_name);
    for (const item of element) {
        item.style.marginTop = "15px";
        item.style.marginBottom = "15px";

        let a = item.getElementsByTagName("a");
        for (const link of a) {
            link.style.textDecoration = "none"; // 밑줄 없애기
            link.style.color = "#4d3996";
        }
    }
}

function local_storage(dataset) {
    // 모든 링크 요소 선택
    const links = document.querySelectorAll('.items > div > a');

    // 각 링크에 클릭 이벤트 리스너 추가
    links.forEach(link => {
        link.addEventListener('click', function(event) {

            // 클릭한 링크의 텍스트 가져오기
            const textToSave = this.textContent.trim();

            if (dataset.includes(textToSave)) {
                // localStorage에 텍스트 저장
                localStorage.setItem('savedLinkText', textToSave);
                console.log("저장된 텍스트: ", textToSave);
            } else {
                localStorage.removeItem('savedLinkText'); // 아예 삭제
                console.log("저장된 텍스트: ", null);
            }
        });
    });
}

// 태그 정의
const home_top = create_element("div", "home-top", null, null);
const top_main = create_element("div", "top-main", null, null);
const top_category = create_element("div", "top-category", null, null);
const top_sub_category = create_element("div", "top-sub-category", null, null);

// 태그 추가
home_top.appendChild(top_main);
document.body.appendChild(home_top);
document.body.appendChild(top_category);
document.body.appendChild(top_sub_category);

const category_value = ["일반", "광고", "대체 썸네일", "피드", "플레이어", "Shorts", "스와이프 제스처", "동영상", "Return YouTube Dislike", "SponsorBlock", "기타"];
const category_sub_value = ["테스트1", "테스트2", "테스트3", "테스트4", "테스트5"]

// 초기 스타일 설정
body_style();
top_main_handler();
top_category_handler("리밴스드 설정", "top-category", category_value, "item", "category-title");
top_category_handler("기타 설정", "top-sub-category", category_sub_value, "item", "category-sub-title");
local_storage(category_value);