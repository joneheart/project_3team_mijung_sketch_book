
const enterLogout = (e) => {
    e.target.style.opacity = '1';
}

const leaveLogout = (e) => {
    e.target.style.opacity = '0';
}

const logout = (e) => {
    document.forms[0].submit();
}

const goToMain = () => {
    location.href = "/main";
}

document.querySelector('#img-logout').addEventListener('mouseover', enterLogout);
document.querySelector('#img-logout').addEventListener('mouseleave', leaveLogout);
document.querySelector('#img-logout').addEventListener('click', logout);
document.querySelector('#back-arrow-wrapper > img').addEventListener('click', goToMain);

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#img-logout').style.opacity = '0';
    document.querySelector('#img-logout').style.transition = 'opacity 1.5s';
});