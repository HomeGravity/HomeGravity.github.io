import {element_btn_default_style } from "../../utils.js";

const PATCHES_CHK_ON = "#6a8eb8"
const PATCHES_CHK_OFF = "#c74e70"

async function fetch_patches_data(user_name, repo_name) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/${user_name}/${repo_name}/dev/patches.json`);

        if (!response.ok) {
            throw new Error('네트워크 응답이 실패했습니다.');
        }

        const json = await response.json(); // 응답 객체를 JSON으로 변환
        return json; // JSON 데이터 리턴

    } catch (error) {
        console.error('Error:', error); // 오류 처리
        throw error; // 오류를 외부로 전달
    }
}

// 패치 선택자 버튼
export function patches_selection_button(user_name, repo_name) {
    const btn = document.createElement("button")
    btn.innerText = user_name
    btn.className = "patches_btn"
    btn.id = "patches_btn"

    element_btn_default_style(btn)

    btn.style.marginLeft = "8px"
    btn.style.marginRight = "8px"

    // 버튼 클릭 시 특정 페이지로 이동
    btn.addEventListener("click", () => {
        get_patches(user_name, repo_name)

        // 패치 선택자 이름 변경
        const selector_name = document.querySelector("#selector_name")
        selector_name.innerText = "패치 선택자 이름" + " : " + user_name

        // 패치 데이터 화면 표시
        const patches_data_screen = document.querySelector("#patches_data_screen")
        patches_data_screen.style.display = "block";
    });

    return btn
}

// 패치 데이터 가져오기
function get_patches(user_name, repo_name) {
    fetch_patches_data(user_name, repo_name)
    .then(data => {
        add_patches(data);
        patches_items_style();

    })
    .catch(error => {
        console.error('Failed to fetch data:', error);
        // return null;
    });
}

// 패치 데이터 추가
function add_patches(patches_data) {
    // null 이면 종료
    if (patches_data === null) {
        return null;
    };


    const patches_items = document.querySelector("#patches_items")

    // 공용 패치 숨기기
    const hide_public_patches = document.querySelector(".hide_public_patches")

    let patches_chk_list = []
    let patches_items_html = ""

    for (const patches of patches_data) {
        const patches_name = patches["name"]
        const patches_description = patches["description"]
        const packages = patches["compatiblePackages"]
        const packages_use = patches["use"]

        let packages_versions = "ALL Versions"
        
        // 패키지명 필터링
        if (packages !== null) {
            const packages_name = packages[0]["name"]
            const _packages_versions = packages[0]["versions"]
            packages_versions = patches_max_version(_packages_versions)

            // 패키지명이 유튜브이면
            if (packages_name === "com.google.android.youtube") {
                // Chk List Push
                patches_chk_list.push(packages_use)
                patches_items_html += patches_items_html_create(patches_name, patches_description, packages_name, packages_versions)
            }

        } else {
            // 공용 패치 숨기기 조건문
            if ((hide_public_patches.getAttribute("hide-status") === "true") ? false : true) {
                // Chk List Push
                patches_chk_list.push(packages_use)
                patches_items_html += patches_items_html_create(patches_name, patches_description, "ALL Packages", packages_versions)
            } else {
                console.log("공용 패치 숨겨짐")
                
            }

        }
    }

    patches_items.innerHTML = patches_items_html

    // 체크박스 초기 선택값 설정
    set_patches_checkbox(patches_chk_list)

    // 체크된 체크박스 데이터 출력
    patches_chk_on_data();

    // 체크박스 선택 이벤트
    patches_chk_click_event()
}

// 가장 높은 버전 찾기
function patches_max_version(versions) {
    return versions.reduce((max, version) => {
        // 버전 문자열을 비교하여 가장 높은 버전 결정
        const maxParts = max.split('.').map(Number);
        const versionParts = version.split('.').map(Number);

        for (let i = 0; i < Math.max(maxParts.length, versionParts.length); i++) {
            const maxPart = maxParts[i] || 0;
            const versionPart = versionParts[i] || 0;

            if (versionPart > maxPart) return version; // version이 더 크면 version 반환
            if (versionPart < maxPart) return max; // max가 더 크면 max 반환
        }
        return max; // 두 버전이 같으면 max 반환
    });
}

// html 생성
function patches_items_html_create(patches_name, patches_description, patches_packages_name, patches_versions) {
    // 체크박스 옵션 값 선택 
    return `
    <div class="patches_item">
        <input class="patches_chk" type="checkbox" id="${patches_name.replace(/\s+/g, '_')}">
        <div class="patches_space">
            <label class="patches_title" for="${patches_name.replace(/\s+/g, '_')}" data-original-text="${patches_name}">
                ${patches_name}

                <div class="patches_description">
                    ${patches_description}
                </div>

                <div class="patches_packages_name">
                    ${patches_packages_name}
                </div>

                <div class="patches_versions">
                    ${patches_versions}
                </div>

            </label>
        </div>
    </div>
    `;
}

function set_patches_checkbox(checkedArray) {
    const patches_chk = document.querySelectorAll("#patches_items > .patches_item > .patches_chk");
    patches_chk.forEach((element, index) => {
        element.style.display = "none"; // 체크박스 표시 없애기
        element.checked = checkedArray[index] !== undefined ? checkedArray[index] : false; // 기본값 
        // element.checked = false
    });
}


// 스타일
function patches_items_style() {
    const patches_items = document.querySelectorAll("#patches_items > .patches_item");
    patches_items.forEach(element => {
        element.style.border = '3px solid lightgray';
        element.style.borderRadius = "15px"
        element.style.marginTop = "20px";
        element.style.marginBottom = "20px";
        element.style.marginLeft = "10px";
        element.style.marginRight = "10px";
        element.style.paddingTop="3px";
        element.style.paddingBottom="3px";
        element.style.cursor="pointer";


        // 체크박스 값 가져오기
        const patches_chk = element.querySelectorAll(".patches_chk");
        patches_chk.forEach(chk_element=> {
            // 선택값에 따라 배경색 변경
            element.style.backgroundColor = chk_element.checked ? PATCHES_CHK_ON : PATCHES_CHK_OFF;

        })

        const patches_space = element.querySelectorAll(".patches_space");
        patches_space.forEach(element=> {
            element.style.marginTop="10px";
            element.style.marginBottom="10px";
        })

        // 패치 제목
        const patches_title = element.querySelectorAll(".patches_title");
        patches_title.forEach(element=> {
            element.style.color = "white";
            element.style.fontSize = "15px";
            element.style.cursor="pointer";
        })

        // 패치 설명
        const patches_description = element.querySelectorAll(".patches_description");
        patches_description.forEach(element=>{
            element.style.color = "black";
            element.style.marginTop = "15px";
            element.style.fontSize = "15px";
        })

        // 패치 패키지명
        const patches_packages_name = element.querySelectorAll(".patches_packages_name");
        patches_packages_name.forEach(element=>{
            element.style.color = "black";
            element.style.marginTop = "15px";
            element.style.fontSize = "15px";
        })

        // 패치 지원 버전
        const patches_versions = element.querySelectorAll(".patches_versions");
        patches_versions.forEach(element=>{
            element.style.color = "white";;
            element.style.marginTop = "15px";
            element.style.fontSize = "15px";
        })

    })
}

// 클릭 이벤트
function patches_chk_click_event() {
    const patches_items = document.querySelectorAll("#patches_items > .patches_item");
    
    patches_items.forEach((item) => {
        item.addEventListener("click", function() {
            const patches_chk = item.querySelector(".patches_chk"); // 체크박스 선택

            // 선택값에 따라 배경색 변경
            item.style.backgroundColor = patches_chk.checked ? PATCHES_CHK_ON : PATCHES_CHK_OFF;
            
            // 체크된 체크박스 데이터 출력
            patches_chk_on_data();
        });
    });
}


function patches_chk_on_data() {
    const patches_items = document.querySelectorAll("#patches_items > .patches_item");
    const patches_data_count = document.querySelector(".patches_data_count");

    let chk_on_count = 0;

    patches_items.forEach((element) => {
        const patches_chk = element.querySelector(".patches_chk"); // 체크박스 선택
        if (patches_chk.checked === true) {
            chk_on_count += 1;
        }
    });

    const all_chk_count = patches_items.length;
    patches_data_count.innerText = `선택된 패치 개수: ${chk_on_count}/${all_chk_count}개`;
}