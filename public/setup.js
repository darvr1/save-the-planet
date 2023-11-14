const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const PI = Math.PI; // Too lazy to type 5 extra characters

// Distance formula
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Keyboard Input
const key = {left: false, right: false, space: false};
window.addEventListener("keydown", event => {
    switch (event.code) {
        case "KeyA":
            key.left = true;
            break;
        case "KeyD":
            key.right = true;
            break;
        case "Space":
            key.space = true;
            break;
    }
})

window.addEventListener("keyup", event => {
    switch (event.code) {
        case "KeyA":
            key.left = false;
            break;
        case "KeyD":
            key.right = false;
            break;
        case "Space":
            key.space = false;
            break;
    }
})