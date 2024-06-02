document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('input[type="checkbox"][name="rvx-option-title"]').forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
            saveCheckedLabelsToJson(); // 체크박스 상태가 변경될 때마다 실행
            updateButtonWithCheckedCount(); // 체크된 체크박스 개수로 버튼 텍스트 업데이트
        });
    });

    document.getElementById('download-button').addEventListener('click', function() {
        saveCheckedLabelsToJson(true); // 다운로드 버튼 클릭 시 실행
    });

    document.getElementById('checked-none').addEventListener('click', function() {
        uncheckAllCheckboxes(); // 모든 체크박스를 해제하는 함수 호출
    });

    document.querySelectorAll('.rvx-option').forEach(option => {
        option.addEventListener('click', function(event) {
            // rvx-option-desc 내부의 span 클릭 이벤트도 처리하도록 조건 추가
            let isDescSpanClicked = event.target.closest('.rvx-option-desc') && event.target.tagName === "SPAN";
            let isVersionSpanClicked = event.target.closest('.rvx-option-version') && event.target.tagName === "SPAN";
            let isOptionsSpanClicked = event.target.closest('.rvx-Detailed-options') && event.target.tagName === "SPAN";
            let isLabelTextSpanClicked = event.target.closest('.Label-Text') && event.target.tagName === "SPAN";


            // Ignore the event if the checkbox is directly clicked to avoid duplication
            if (event.target.type === "checkbox" && !isDescSpanClicked && !isVersionSpanClicked && !isOptionsSpanClicked && !isLabelTextSpanClicked) {
                return;
            }


            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            // Trigger the change event on the checkbox
            const changeEvent = new Event('change');
            checkbox.dispatchEvent(changeEvent);
        });
    });

    // 초기 로딩 시 버튼 텍스트 업데이트
    updateButtonWithCheckedCount();
    
});

function saveCheckedLabelsToJson(download = false) {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"][name="rvx-option-title"]:checked');
    const checkedLabels = Array.from(checkedCheckboxes).map(checkedCheckbox => {
        let label = document.querySelector(`span[for="${checkedCheckbox.id}"]`);
        return label.dataset.originalText; // 'data-original-text' 속성 사용
    });

    let jsonData = {
        "com.google.android.youtube": checkedLabels
    };

    const json = JSON.stringify(jsonData, null, 2);

    if (download) {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'checked-labels.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        // 실시간 데이터 저장 로직 (예: 로컬 스토리지에 저장, 콘솔에 출력 등)
        console.log(json);
    }
}

// 모든 checkked 개수
function updateButtonWithCheckedCount() {
const checkedCount = document.querySelectorAll('input[type="checkbox"][name="rvx-option-title"]:checked').length;
document.getElementById('download-button').innerText = `JSON으로 저장하기 (${checkedCount})`;
}


// 모든 체크 해제
function uncheckAllCheckboxes() {
document.querySelectorAll('input[type="checkbox"][name="rvx-option-title"]').forEach((checkbox) => {
    checkbox.checked = false;
    // 체크박스의 change 이벤트 트리거
    const changeEvent = new Event('change');
    checkbox.dispatchEvent(changeEvent);
});
}


// id 감지
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



// 페이지의 hash가 변경될 때 실행될 함수를 정의합니다.
window.addEventListener('hashchange', async function() {
    try {
        // 현재 페이지의 URL을 가져옵니다.
        const url = window.location.href;
        
        // 클립보드에 복사합니다.
        await navigator.clipboard.writeText(url);
        
        // 사용자에게 알림 (선택적)
        alert("URL이 클립보드에 복사되었습니다.");
    } catch (err) {
        console.error('클립보드에 복사를 실패하였습니다: ', err);
    }
});


// 사진 표시
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