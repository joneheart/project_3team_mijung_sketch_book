
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

// 실행부
myButtons = document.querySelectorAll('.btn-my');

for (let i=0; i<myButtons.length; i++) {
    myButtons[i].addEventListener('mouseenter', mouseEnterMyBtn);
    myButtons[i].addEventListener('mouseleave', mouseLeaveMyBtn);
    myButtons[i].addEventListener('click', mouseClickMyBtn);
}
