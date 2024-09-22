import {element_btn_default_style } from "../../utils.js";


async function fetch_patches_data(user_name, repo_name) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/${user_name}/${repo_name}/dev/patches.json`, {
            method: 'GET', // GET 요청
            headers: {
            'Accept': 'application/json, text/html, */*; q=0.9', // Accept 헤더 설정
            'User-Agent': navigator.userAgent, // 사용자 에이전트
            'DNT': navigator.doNotTrack === "1" ? '1' : '0', // Do Not Track 설정
            'Referer': 'https://raw.githubusercontent.com/', // 기본값 설정
            },
        });

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
        get_patches(user_name, repo_name);

        // 패치 선택자 이름 변경
        const selector_name = document.querySelector("#selector_name")
        selector_name.innerText = "패치 선택자 이름" + " : " + user_name
    });

    return btn
}

// 패치 데이터 가져오기
function get_patches(user_name, repo_name) {
    fetch_patches_data(user_name, repo_name)
    .then(data => {
        console.log(data); // JSON 데이터 처리
    })
    .catch(error => {
        console.error('Failed to fetch data:', error);
    });
}