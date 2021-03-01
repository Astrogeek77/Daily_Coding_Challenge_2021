setInterval(setClock, 1000);

const secondHand = document.querySelector('[data-second-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const hourHand = document.querySelector('[data-hour-hand]');

function setClock() {
    const current = new Date();
    const secondsRatio = current.getSeconds() / 60;
    const minuteRatio = (secondsRatio + current.getMinutes()) / 60;
    const hourRatio = (minuteRatio + current.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minuteRatio);
    setRotation(hourHand, hourRatio);
    
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

setClock()
