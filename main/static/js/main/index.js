
const mouseEnterMyBtn = (e) => {
    const curClassName = e.target.classList[1];
    const lastIndexOfUrl = e.target.getAttribute('src').lastIndexOf('/');
    const baseUrl = e.target.getAttribute('src').substring(0, lastIndexOfUrl);
    
    const imgSrc = `${baseUrl}/my-${curClassName}-activate.gif`
    e.target.setAttribute('src', imgSrc);
}

const mouseLeaveMyBtn = (e) => {
    const curClassName = e.target.classList[1];
    const lastIndexOfUrl = e.target.getAttribute('src').lastIndexOf('/');
    const baseUrl = e.target.getAttribute('src').substring(0, lastIndexOfUrl);
    
    const imgSrc = `${baseUrl}/my-${curClassName}-normal.png`
    e.target.setAttribute('src', imgSrc);
}

const mouseClickMyBtn = (e) => {
    const curClassName = e.target.classList[1];
    const isClickedMyPaintings = curClassName === "paintings" ? true : false;
    
    if (isClickedMyPaintings) {
        location.href = "/mypage" 
    } else { 
        if (selectedPainting) {
            location.href = `/paint/${selectedPainting.parentElement.dataset.id}`
        } else {
            alert("앗! 작업 할 명화를 놓고 가셨나요?");
        }
    } 
}

const getImgElement = (imgSrc) => {
    const imgTag = document.createElement('img')
    imgTag.setAttribute('src', imgSrc);    
    return imgTag;
}

const showPaintingInfo = (e) => {
    if (selectedPainting != null) {
        releaseAllPaintings();
        return;
    }

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

const selectPainting = (e) => {
    clickedPaintingElement.classList.add('selected');
    const allPaintings = document.querySelectorAll('.famous-paintings');
    allPaintings.forEach(element => {
        if (element != clickedPaintingElement) {
            element.classList.add('disabled');
        }
    });
    selectedPainting = clickedPaintingElement;
    closeModal(document.querySelector('.modal-window'));
}

const selectCancel = (e) => {
    closeModal(document.querySelector('.modal-window'));
}

const isSelectedPainting = () => {
    const allPaintings = document.querySelectorAll('.famous-paintings');
    const amountsOfClass = allPaintings[0].classList.length + allPaintings[1].classList.length;
    return amountsOfClass != 2 ? true : false;
}

const releaseAllPaintings = () => {
    const allPaintings = document.querySelectorAll('.famous-paintings');
    allPaintings.forEach(element => {
        element.classList.remove('disabled');
    });
    selectedPainting.classList.remove('selected');
    selectedPainting = null;
}

const escCancel = (e) => {
    if (e.keyCode == "27" && isSelectedPainting()) {
        releaseAllPaintings();
    } else {
        const cntModalBackClass = document.querySelector('.modal-background').classList.length;
        if (cntModalBackClass == 2) {
            closeModal(document.querySelector('.modal-window'));
        }
    }
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

// 실행부
let clickedPaintingElement = null;
let selectedPainting = null;
let lazyloadThrottleTimeout;

const myButtons = document.querySelectorAll('.btn-my');
for (let i=0; i<myButtons.length; i++) {
    myButtons[i].addEventListener('mouseenter', mouseEnterMyBtn);
    myButtons[i].addEventListener('mouseleave', mouseLeaveMyBtn);
    myButtons[i].addEventListener('click', mouseClickMyBtn);
}

document.querySelector('.modal-window').addEventListener('click', clickModalWindow);
document.querySelector('#select-painting').addEventListener('click', selectPainting);
document.querySelector('#select-cancel').addEventListener('click', selectCancel);

window.addEventListener('keydown', escCancel);

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
