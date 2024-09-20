export async function fetch_patches_data(user_name, repo_name) {
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
            throw new Error('Network response was not ok');
        }

        const json = await response.json(); // 응답 객체를 JSON으로 변환
        return json; // JSON 데이터 리턴

    } catch (error) {
        console.error('Error:', error); // 오류 처리
        throw error; // 오류를 외부로 전달
    }
}
