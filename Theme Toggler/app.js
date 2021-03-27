const themeMap = {
    dark: "light",
    light: "solar",
    solar: "minty",
    minty: "grey",
    grey: "dark"
};

const theme = localStorage.getItem('theme') ||
    (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);


function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
    document.querySelector(".theme_display").innerText = 
        next.toUpperCase() + " THEME";
 
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;
document.getElementById('themeButton').style.transition = "0.5s";