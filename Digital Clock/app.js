function setClock() {
    const hours = document.querySelector("#hours");
    const minutes = document.querySelector("#minutes");
    const seconds = document.querySelector("#seconds");
    const ampm = document.querySelector("#ampm");

    var h = new Date().getHours();
    // console.log(h);
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();
    var am = 'AM';

    if (h > 12) {
        h = h - 12;
        am = 'PM';
    }

    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;

    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
    ampm.innerHTML = am;
}

var interval = setInterval(setClock, 1000);

setClock()
