/* submit 버튼 */
var basicTimeline = anime.timeline({
    autoplay: false
});

var pathEls = $(".check");
for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute("stroke-dashoffset", offset);
}

basicTimeline
    .add({
        targets: ".text",
        duration: 1,
        opacity: "0"
    })
    .add({
        targets: ".button",
        duration: 1300,
        height: 10,
        width: 300,
        backgroundColor: "#2B2D2F",
        border: "0",
        borderRadius: 100
    })
    .add({
        targets: ".progress-bar",
        duration: 2000,
        width: 300,
        easing: "linear"

    })
    .add({
        targets: ".button",
        width: 0,
        duration: 1
    })
    .add({
        targets: ".progress-bar",
        width: 80,
        height: 73,
        delay: 500,
        top: -1550,
        duration: 750,
        borderRadius: 80,
        backgroundColor: "rgb(214,211,211)"
    })
    .add({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: 200,
        easing: "easeInOutSine"
    });

$(".button").click(function () {
    basicTimeline.play();
});

$(".text").click(function () {
    basicTimeline.play();
});

/* 파일 */
function readImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewImage = document.getElementById('preview');
            previewImage.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}
// 이벤트 리스너
document.querySelector('.picture').addEventListener('change', (e) => {
    readImage(e.target);
})

/* 공유!!!!! */
const doShare = () => {
    const infoShareElement = document.querySelector('.info-share');
    infoShareElement.classList.toggle('hide');
}

const copyToClipboard = (val) => {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}

const clickShareButton = (e) => {
    console.log(document.querySelector('#do-share').dataset.id);
    const sharePlatform = e.target.parentElement.id;
    const paintId = document.querySelector('#do-share').dataset.id;
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/detail/${paintId}`;

    if (sharePlatform == 'twitter') {
        // 트위터
        // window.open(`https://twitter.com/intent/tweet?text=${shareUrl}`);
        location.href = `https://twitter.com/intent/tweet?text=${shareUrl}`;
    } else if (sharePlatform == 'facebook') {
        // 페이스북
        // window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        location.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    } else {
        // 클립보드
        copyToClipboard(shareUrl);
        document.querySelector('.speech-bubble').classList.remove('hide');

        // position
        const bubble = document.querySelector('.speech-bubble');
        bubble.style.top = `${e.target.offsetTop + 35}px`;

        // hide
        setTimeout(() => {
            document.querySelector('.speech-bubble').classList.add('hide');
        }, 1000);
    }
}

document.querySelector('#do-share').addEventListener('click', doShare);

const shareButtons = document.querySelectorAll('.share-button');
    for (let i=0; i<shareButtons.length; i++) {
        shareButtons[i].addEventListener('click', clickShareButton);
    }