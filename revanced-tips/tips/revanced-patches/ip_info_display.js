export async function fetchIPInfo() {
    try {
        const response = await fetch('http://ip-api.com/json/');
        if (!response.ok) {
            throw new Error('네트워크 응답이 실패했습니다.');
        }
        const data = await response.json(); // JSON 형태로 응답을 파싱합니다.
        return data

    } catch (error) {
        console.error('오류:', error); // 에러는 콘솔에 출력
        return null
    }
}
