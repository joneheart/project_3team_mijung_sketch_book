
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
    document.querySelector('.info-share').classList.add('hide');;
}

const clickModalWindow = (e) => {
    const clickedClassName = e.target.className;
    
    if (clickedClassName == "modal-window") {
        closeModal(e.target);
    }
}

const doDownload = () => {
    const imgDownloadUrl = `${clickedPaintingElement.currentSrc.split('png')[0]}png`;
    const imgTitle = imgDownloadUrl.split('/').pop();
    
    const link = document.createElement('a');
    link.href = imgDownloadUrl;
    link.setAttribute('download', imgTitle);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

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
    const sharePlatform = e.target.parentElement.id;
    const paintId = clickedPaintingElement.parentElement.dataset.id;
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
        bubble.style.top = `${e.target.offsetTop - 12}px`;

        // hide
        setTimeout(() => {
            document.querySelector('.speech-bubble').classList.add('hide');
        }, 1000);
    }
}

const doDelete = () => {
    const selectPaintingId = clickedPaintingElement.parentElement.dataset.id;
    const confirmAnswer = confirm("정말 삭제 하시겠습니까?");
    if (confirmAnswer) {
        const form = document.createElement("form");
        form.setAttribute("charset", "UTF-8");
        form.setAttribute("method", "Post");  //Post 방식
        form.setAttribute("action", "/delete/"); //요청 보낼 주소

        let hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "id");
        hiddenField.setAttribute("value", selectPaintingId);
        form.appendChild(hiddenField);

        const csrfToken =document.querySelector('#info-bottom').children[2];
        hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", csrfToken.getAttribute('name'));
        hiddenField.setAttribute("value", csrfToken.getAttribute('value'));
        form.appendChild(hiddenField);

        document.body.appendChild(form);
        form.submit();
    }
}

const doCancel = () => {
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

// 실행부
let clickedPaintingElement;
let lazyloadThrottleTimeout;

document.querySelector('#img-logout').addEventListener('mouseover', enterLogout);
document.querySelector('#img-logout').addEventListener('mouseleave', leaveLogout);
document.querySelector('#img-logout').addEventListener('click', logout);
document.querySelector('#back-arrow-wrapper > img').addEventListener('click', goToMain);

document.querySelector('.modal-window').addEventListener('click', clickModalWindow);
document.querySelector('#do-download').addEventListener('click', doDownload);
document.querySelector('#do-share').addEventListener('click', doShare);
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

    const shareButtons = document.querySelectorAll('.share-button');
    for (let i=0; i<shareButtons.length; i++) {
        shareButtons[i].addEventListener('click', clickShareButton);
    }
}
