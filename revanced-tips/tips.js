function get_saved_link_text() {
    // 로컬 스토리지에서 저장된 링크 텍스트 가져오기
    const savedLinkText = localStorage.getItem('savedLinkText');

    // 저장된 텍스트가 있는 경우 출력
    if (savedLinkText !== null) {
        console.log("저장된 링크 텍스트:", savedLinkText);
        return savedLinkText
    } else {
        console.log("저장된 링크 텍스트가 없습니다.");
        return null
    }
}

function test() {
    const text = get_saved_link_text()
    if (text !== null) {
        document.body.textContent = text    
    } else {
        document.body.textContent = "데이터를 불러오는데 문제가 생겼습니다."
    }
}

test()