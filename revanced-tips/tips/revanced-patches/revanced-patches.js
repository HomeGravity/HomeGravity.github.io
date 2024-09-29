import {element_btn_default_style } from "../../utils.js";


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
        // console.log(data); // JSON 데이터 처리
        // return data;
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
    let patches_items_html = ""

    for (const patches of patches_data) {
        const patches_name = patches["name"]
        const patches_description = patches["description"]
        const packages = patches["compatiblePackages"]
        const packages_use = patches["use"]
        
        let packages_versions = ""
        
        // 패키지명 필터링
        if (packages !== null) {
            const packages_name = packages[0]["name"]
            const _packages_versions = packages[0]["versions"]
            packages_versions = _packages_versions
            
            // 패키지명이 유튜브이면
            if (packages_name === "com.google.android.youtube") {
                console.log(patches_name)
                console.log(patches_description)
                console.log(packages_name)
                console.log(packages_versions)
                console.log(packages_use)
                patches_items_html += patches_items_html_create(patches_name, patches_description, packages_use)


            }

        } else {
            console.log(patches_name)
            console.log(patches_description)
            console.log("ALL Packages")
            console.log(packages_versions)
            console.log(packages_use)
            patches_items_html += patches_items_html_create(patches_name, patches_description, packages_use)

        }
    }

    patches_items.innerHTML = patches_items_html

}


// html 생성
function patches_items_html_create(patches_name, patches_description, patches_use) {
    // 체크박스 옵션 값 선택 
    let use = ""
    if (patches_use === true) {
        use = "checked"
    } 

    return `
    <div class="patches_item">
        <input type="checkbox" id="${patches_name.replace(/\s+/g, '_')}" ${use}>
        <label for="${patches_name.replace(/\s+/g, '_')}" data-original-text="${patches_name}">${patches_name}</label>

        <div class="patches_description">
            ${patches_description}
        </div>
    </div>
    `;
}

// 스타일
function patches_items_style() {
    const patches_items = document.querySelectorAll("#patches_items > .patches_item")
    patches_items.forEach(element => {
        element.style.marginTop = "20px";
        element.style.marginBottom = "20px";
    })
}