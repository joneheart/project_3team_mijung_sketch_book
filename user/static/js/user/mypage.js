
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

const getImgElement = (imgSrc) => {
    const imgTag = document.createElement('img')
    imgTag.setAttribute('src', imgSrc);    
    return imgTag;
}

const showPaintingInfo = (e) => {
    clickedPaintingElement = e.target;
    const famousPaintingSrc = e.target.currentSrc;
    const modalPopup = document.querySelector('.modal-popup');
    modalPopup.appendChild(getImgElement(famousPaintingSrc));

    const divHasInfo = e.target.parentElement;
    const tempData = [
        divHasInfo.getAttribute('data-title'),
        divHasInfo.getAttribute('data-year'),
        divHasInfo.getAttribute('data-author'),
        divHasInfo.getAttribute('data-intro'),    
    ]
    
    const paintingsAllInfo = document.querySelectorAll('.paintings-info h3');
    paintingsAllInfo.forEach((eachInfo, i) => {
        eachInfo.innerText = tempData[i];
    })

    const imgHeight = modalPopup.children[1].height; // 모달 속 명화 이미지 높이
    const paintingsInfoDiv = document.querySelector('.paintings-info'); // 명화 정보 div select
    paintingsInfoDiv.style.top = `${imgHeight}px`;

    const wholeBodyHeight = document.querySelector('#content-wrapper').offsetHeight;
    const infoHeight = paintingsInfoDiv.offsetHeight;
    modalPopup.style.top = `${(wholeBodyHeight - (imgHeight+infoHeight))/2}px`

    document.querySelector('.modal-background').classList.toggle("show");
}

const closeModal = (modalWindow) => {
    const imgElementInModal = modalWindow.children[0].children[1];
    document.querySelector('.modal-background').classList.toggle("show");
    document.querySelector('.modal-popup').removeChild(imgElementInModal);
}

const clickModalWindow = (e) => {
    const clickedClassName = e.target.className;
    
    if (clickedClassName == "modal-window") {
        closeModal(e.target);
    }
}

const doDelete = (e) => {
    closeModal(document.querySelector('.modal-window'));
}

const doCancel = (e) => {
    closeModal(document.querySelector('.modal-window'));
}

const removeLazyClass = () => {
    const divContentWrapper = document.body.children[0];
    const lazyloadImages = document.querySelectorAll("img.lazy");
    const scrollTop = divContentWrapper.scrollTop;
    lazyloadImages.forEach(function(img) {
        if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        }
    });
    if (lazyloadImages.length == 0) {
        divContentWrapper.removeEventListener('scroll', lazyload);
        window.removeEventListener('resize', lazyload);
        window.removeEventListener('orientationChange', lazyload);
    }
}

const lazyload = () => {
    if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
    }
    lazyloadThrottleTimeout = setTimeout(removeLazyClass, 20);
}

let lazyloadThrottleTimeout;

document.querySelector('#img-logout').addEventListener('mouseover', enterLogout);
document.querySelector('#img-logout').addEventListener('mouseleave', leaveLogout);
document.querySelector('#img-logout').addEventListener('click', logout);
document.querySelector('#back-arrow-wrapper > img').addEventListener('click', goToMain);

document.querySelector('.modal-window').addEventListener('click', clickModalWindow);
document.querySelector('#do-delete').addEventListener('click', doDelete);
document.querySelector('#do-cancel').addEventListener('click', doCancel);

document.addEventListener("DOMContentLoaded", function() {
    const famousPaintings = document.querySelectorAll('.famous-paintings');
    for (let i=0; i<famousPaintings.length; i++) {
        famousPaintings[i].addEventListener('click', showPaintingInfo);
    }

    const divContentWrapper = document.body.children[0];
    
    divContentWrapper.addEventListener('scroll', lazyload);
    window.addEventListener('resize', lazyload);
    window.addEventListener('orientationChange', lazyload);
});

window.onload = function() {
    // 로그아웃 버튼 효과
    document.querySelector('#img-logout').style.opacity = '0';
    document.querySelector('#img-logout').style.transition = 'opacity 1.5s';
}
