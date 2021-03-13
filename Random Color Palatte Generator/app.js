for (let i = 1; i <= 100; i++) {
    const box = document.createElement('div')
    box.classList.add('box')
    document.querySelector('.container').appendChild(box)
}

const button = document.querySelector('.btn')
const randomColorBlock = document.querySelectorAll('.box')

function randomHexColorCode() {
    var chars = "0123456789abcdef"
    var colorLength = 6
    var color = ""

    for (var i = 0; i < colorLength; i++){
        var randomColor = Math.floor(Math.random() * chars.length);
        color += chars.substring(randomColor, randomColor + 1)
    }

    return '#' + color;
}

function colorAdder() {
    randomColorBlock.forEach(e => {
        var newColor = randomHexColorCode()
        e.style.backgroundColor = newColor
        e.innerText = newColor
    })
}

colorAdder()