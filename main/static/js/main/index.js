
const mouseEnterMyBtn = (e) => {
    const curClassName = e.target.classList[1];
    const imgSrc = `/static/images/my-${curClassName}-activate.gif`
    e.target.setAttribute('src', imgSrc);
}

const mouseLeaveMyBtn = (e) => {
    const curClassName = e.target.classList[1];
    const imgSrc = `/static/images/my-${curClassName}-normal.png`
    e.target.setAttribute('src', imgSrc);
}

const mouseClickMyBtn = (e) => {
    const curClassName = e.target.classList[1];
    const isClickedMyPaintings = curClassName === "paintings" ? true : false;
    if (isClickedMyPaintings) {
        location.href = "#" // go to my paintings
    } else {
        location.href = "#" // go to my workspace
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
    ]
    const paintingsAllInfo = document.querySelectorAll('.paintings-info h4');
    paintingsAllInfo.forEach((eachInfo, i) => {
        eachInfo.innerText = tempData[i];
    })

    const imgHeight = modalPopup.children[1].height; // 모달 속 명화 이미지 높이
    const paintingsInfoDiv = document.querySelector('.paintings-info'); // 명화 정보 div select
    const infoHeight = paintingsInfoDiv.offsetHeight;
    paintingsInfoDiv.style.top = `${imgHeight - infoHeight}px`;

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

// 실행부
let clickedPaintingElement = null;
let selectedPainting = null;

const myButtons = document.querySelectorAll('.btn-my');
for (let i=0; i<myButtons.length; i++) {
    myButtons[i].addEventListener('mouseenter', mouseEnterMyBtn);
    myButtons[i].addEventListener('mouseleave', mouseLeaveMyBtn);
    myButtons[i].addEventListener('click', mouseClickMyBtn);
}

const famousPaintings = document.querySelectorAll('.famous-paintings');
for (let i=0; i<famousPaintings.length; i++) {
    famousPaintings[i].addEventListener('click', showPaintingInfo);
}

document.querySelector('.modal-window').addEventListener('click', clickModalWindow);
document.querySelector('#select-painting').addEventListener('click', selectPainting);
document.querySelector('#select-cancel').addEventListener('click', selectCancel);

window.addEventListener('keydown', escCancel);