export function getCategories() {
    const category_value = [
        "일반", 
        "광고", 
        "대체 썸네일", 
        "피드", 
        "플레이어", 
        "Shorts", 
        "스와이프 제스처", 
        "동영상", 
        "Return YouTube Dislike", 
        "SponsorBlock", 
        "기타"
    ];
    
    const category_sub_value = [
        "RVX 매니저 패치 데이터 (한국어로 확인)", 
        "테스트2", 
        "테스트3", 
        "테스트4", 
        "테스트5"
    ];

    return {
        categories: category_value,
        subCategories: category_sub_value
    };
}