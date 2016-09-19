/**
 * Created by Alex on 16/3/13.
 */
window.onload = function() {
    var page1 = document.getElementById("page1");
    var page2 = document.getElementById("page2");
    var page3 = document.getElementById("page3");

    var music = document.getElementById("music");
    var audio = document.getElementsByTagName("audio")[0];

    var p2_circle = document.getElementById("p2_circle");

    audio.addEventListener('ended', function () {
        music.childNodes[1].setAttribute("class","music_disc");
    }, false);


    music.addEventListener("touchstart", function() {
        if (audio.paused) {
            audio.play();
            this.childNodes[1].setAttribute("class","music_disc music_play");
        } else {
            audio.pause();
            this.childNodes[1].setAttribute("class","music_disc");
        };
        // if (audio.paused) {
        //     audio.play();
        //     this.childNodes[1].style.animationPlayState = "running";
        //     this.childNodes[1].style.webkitAnimationPlayState = "running";
        // } else {
        //     audio.pause();
        //     this.childNodes[1].style.animationPlayState = "paused";
        //     this.childNodes[1].style.webkitAnimationPlayState = "paused";
        // };
    }, false);




    page1.addEventListener("touchstart", function() {
        this.style.display = "none";
        page2.style.display = "block";

        setTimeout(function() {
            page2.setAttribute("class","page fadeout")
            page3.setAttribute("class","page fadein")
            //page2.style.display = "none";
            //page3.style.display = "block";
        }, 5500);
    }, false);
};