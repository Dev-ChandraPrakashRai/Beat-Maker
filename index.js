class DrumKit {
    constructor() {
        this.currentkick = "./allSounds/kick-classic.wav"
        this.currentsnare = "./allSounds/snare-acoustic01.wav"
        this.currenthithat = "./allSounds/hihat-acoustic01.wav"
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hithatAudio = document.querySelector(".hithat-sound");
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select")
        this.muteBtn = document.querySelectorAll(".mute")


    }
    activePad() {
        console.log(this)
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // console.log(activeBars)
        // console.log(`${this.index}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;

                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hithat-pad")) {
                    this.hithatAudio.currentTime = 0;
                    this.hithatAudio.play();

                }
            }
        })
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;

        if (!this.isPlaying) {

            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
        else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.playBtn.classList.add("active");

        }
        else {
            this.playBtn.innerHTML = '<i class="fas fa-play" />';
            this.playBtn.classList.remove("active")

        }


    }
    changesounds(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":

                this.snareAudio.src = selectionValue;
                break;

            case "hithat-select":
                this.hithatAudio.src = selectionValue;
                break;
        }


    }
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0
                    break;
                case "2":
                    this.hithatAudio.volume = 0;
                    break;
            }
        }
        else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hithatAudio.volume = 1;
                    break;
            }
        }

    }
}






const drumkit = new DrumKit();
drumkit.playBtn.addEventListener("click", () => {
    drumkit.updateBtn();
    drumkit.start();
})
drumkit.pads.forEach(pad => {
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    })
})
drumkit.selects.forEach(select => {
    select.addEventListener("change", function (e) {
        drumkit.changesounds(e);
    })
})
drumkit.muteBtn.forEach(btn => {
    btn.addEventListener("click", function (e) {
        drumkit.mute(e);
    })

})