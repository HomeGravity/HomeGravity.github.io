function toggleImages(button) {
    var parentDiv = button.parentElement;
    var images = parentDiv.querySelectorAll(".reference-image");

    images.forEach(function(image) {
        if (image.classList.contains("show")) {
            image.classList.remove("show");
            setTimeout(function() {
                image.style.display = "none"; // 전환 효과 후 이미지를 숨깁니다
            }, 500); // 여기서 전환 시간(0.5초)을 맞춥니다
            button.textContent = "Show Images";
        } else {
            image.style.display = "block";
            setTimeout(function() {
                image.classList.add("show");
            }, 10); // 약간의 지연 시간 후에 클래스를 추가하여 전환 효과를 적용합니다
            button.textContent = "Hide Images";
        }
    });
}



function scrollToHash() {
    var hash = window.location.hash;
    
    if (hash !== '') {
        var target = document.querySelector(hash);
        
        if (target) {
            target.scrollIntoView({behavior: "smooth"});
        }
    }
}

// 해시 변경 이벤트 감지
window.addEventListener('hashchange', scrollToHash);

// 페이지 로드 시 해시가 있으면 해당 위치로 스크롤
document.addEventListener('DOMContentLoaded', function() {
    // DOMContentLoaded 이후 약간의 지연을 주어 스크롤
    setTimeout(scrollToHash, 1000);
});