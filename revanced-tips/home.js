// 태그 생성 함수
function create_element(tag, id, className, innerText) {
    const element = document.createElement(tag);
    if (id) element.id = id;
    if (className) element.className = className;
    if (innerText) element.innerText = innerText;
    return element;
}


function update_body_style() {
    // 부모 요소 스타일 정의 (예: body)
    document.body.style.display = "block";
    document.body.style.justifyContent = "center"; // 가로 중앙 정렬
}


function apply_style_based_on_user_agent(element) {
    const userAgent = navigator.userAgent;

    // User-Agent에 따라 스타일 설정
    if (userAgent.includes("Windows")) {
        // PC 기기일 경우
        element.style.minWidth = "600px";
        element.style.maxWidth = "1200px";
        element.style.minHeight = "200px";
        element.style.maxHeight = "200px";
    } else {
        // 모바일 기기일 경우
        element.style.minWidth = "300px";
        element.style.maxWidth = "800px";
        element.style.minHeight = "200px";
        element.style.maxHeight = "200px";
    }
}

function update_top_main_search_input_handler() {
    const element = document.getElementById("top-main");
    const search_input = create_element("input", "revanced-search-input", null, null);
    search_input.type = "text";

    search_input.style.minWidth = "70%";
    search_input.style.minHeight = "40px";

    search_input.style.marginTop = "10px";
    search_input.style.margin = "5px"

    search_input.style.borderRadius = "15px";
    search_input.style.border = "none";
    search_input.placeholder = "여기에 입력하세요"

    element.appendChild(search_input)
}


function update_top_main_handler() {
    const element = document.getElementById('top-main');
    apply_style_based_on_user_agent(element)

    // 메인 타이틀 추가
    const revanced_features = create_element("div", "revanced-features", null, null);
    revanced_features.innerText = "리밴스드 기능 설명/팁"
    revanced_features.style.marginBottom = "10px"
    element.appendChild(revanced_features)


    element.style.display = "flex"; // 플렉스 박스 사용
    element.style.flexDirection = "column"; // 세로 방향으로 정렬
    
    element.style.margin = "5px"; // 상하 px, 좌우 중앙 정렬
    element.style.marginTop = "5px"
    element.style.marginBottom = "5px"
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

    update_top_main_search_input_handler()
}


function update_top_category_handler() {
    const element = document.getElementById('top-category');
    apply_style_based_on_user_agent(element)

    // 카테고리 항목 추가
    const category_value = ["test1", "test2"];
    let insert_html = '';

    // 각 카테고리 항목을 <a> 태그로 추가 (for 문 사용)
    for (let i = 0; i < category_value.length; i++) {
        insert_html += `
        <div class="item">
            <a href="#">
                ${category_value[i]}
            </a>
        </div>
        `;
    }

    element.innerHTML = `
    <div class="revanced-setting-category">
        <div class="category-title" id="category-title">
            리밴스드 설정
        </div>
        <div class="items" id="items">
            ${insert_html}
        </div>
    </div>`;


    element.style.display = "flex"; // 플렉스 박스 사용
    element.style.flexDirection = "column"; // 세로 방향으로 정렬

    element.style.margin = "5px"; // 상하 px, 좌우 중앙 정렬
    element.style.marginTop = "5px"
    element.style.marginBottom = "5px"
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

    update_top_category_title_handler();
    update_top_category_items_handler();

    
}

function update_top_category_title_handler() {
    const element = document.getElementById('category-title');
    element.style.fontSize = "20px"
    element.style.marginTop = "5px";
    element.style.marginBottom = "5px";
}
function update_top_category_items_handler() {
    const element = document.getElementsByClassName('item');
    for (const item of element) {
        item.style.marginTop = "5px";
        item.style.marginBottom = "5px";

        let a = item.getElementsByTagName("a");
        for (const link of a) {
            link.style.textDecoration = "none"; // 밑줄 없애기
            link.style.color = "#4d3996";
        }
    }
} 

// 태그 정의
const home_top = create_element("div", "home-top", null, null);
const top_main = create_element("div", "top-main", null, null);
const top_category = create_element("div", "top-category", null, null);

// 태그 추가
home_top.appendChild(top_main);
document.body.appendChild(home_top);
document.body.appendChild(top_category)

// 초기 스타일 설정
update_body_style();
update_top_main_handler();
update_top_category_handler();