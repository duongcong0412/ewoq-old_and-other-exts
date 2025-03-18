console.log("Imported test script");

window.onload = function () {

    // Global variable
    var headerContainer = document.getElementsByClassName("dense-header")[0];
    var audioElement = document.createElement('audio');
    var taskTimeCounter = 1;
    var isNotiSoundPlaying = false;
    var isNotiShowing = false;
    var notiCountdown = 0;
    var isInteract = false;
    var autoReloadCounter = 0;
    var isAlertNetworkErrBoxShowing = false;
    var isSubmitBtnEnabled = false;
    var isVpnConnected = false;
    var currentIp = null;
    var checkVpnMessage = "First Fetch";

    var headerContainer = document.getElementsByClassName("dense-header")[0];
    setTimeout(() => {
        // let btnstart = document.getElementsByClassName("start-button")[0];
        // btnstart.style.backgroundColor = "blue";
        // btnstart.style.color = "white";
        // btnstart.disabled = false;
    }, 5000)

    // ewoq-stack-rank-box dragdrop-dropTarget
    var box = document.getElementsByClassName("ewoq-stack-rank-box")
    var wd = box[0].offsetWidth + "px"

    // instructions
    var hd = document.getElementsByClassName("instructions")
    for (let i = 0; i < hd.length; i++) {
        hd[i].style.display = "none"
    }


    for (let i = 0; i < box.length; i++) {
        box[i].style.width = wd
    }

   



}


