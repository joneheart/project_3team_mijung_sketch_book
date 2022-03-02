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
document.getElementById('picture').addEventListener('change', (e) => {
    readImage(e.target);
})