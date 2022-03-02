$(document).ready(function () {
    $("#load").show();
    console.log("스케치북")
});
setTimeout(function () {
    $("#load").hide();
    console.log("10초뒤 사라짐")
}, 5000);
