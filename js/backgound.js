
let background = document.getElementById('background');

let bg = [
    {
        character: "Sora",
        pic: 'assets/sora1.png'
    },
    {
        character: "Sora",
        pic: 'assets/sora2.png'
    },
    {
        character: "Sora",
        pic: 'assets/sora3.png'
    },

]
function bg_change() {
    let index = Math.floor(Math.random() * bg.length);
    background.src = bg[index].pic

}


bg_change()
setInterval(bg_change, 60000);