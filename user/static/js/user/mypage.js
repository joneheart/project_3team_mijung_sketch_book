
const enterLogout = (e) => {
    e.target.style.opacity = '1';
    e.target.style.transition = 'opacity 2s';
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