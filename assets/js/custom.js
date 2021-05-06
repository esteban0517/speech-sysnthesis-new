// my range design
var i;
const tickContainer = document.getElementById('tickContainer');
const tickContainerTow = document.getElementById('tickContainerTwo');
for (i = 1; i <= 100; i++) {
    var p = document.createElement('P');
    var pTwo = document.createElement('P');
    tickContainerTwo.appendChild(pTwo);
    tickContainer.appendChild(p);
}

const range = document.getElementById('range');
const rangeTwo = document.getElementById('rangeTwo');
const rangeV = document.getElementById('rangeValue');
const rangeVTwo = document.getElementById('rangeValueTwo');
const setValue = () => {
    const newValue = Number((range.value - range.min) * 100 / (range.max - range.min));
    const newValueTwo = Number((rangeTwo.value - rangeTwo.min) * 100 / (rangeTwo.max - rangeTwo.min));
    const newPosition = 35 - (newValue * 0.7);
    const newPositionTwo = 35 - (newValueTwo * 0.7);
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    rangeV.innerHTML = `<span>${range.value}%</span>`;
    rangeVTwo.style.left = `calc(${newValueTwo}% + (${newPositionTwo}px))`;
    rangeVTwo.innerHTML = `<span>${rangeTwo.value}%</span>`;
};
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
rangeTwo.addEventListener('input', setValue);


const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`)
    .join();
}

function setVoice(){
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true){
    speechSynthesis.cancel();
    if(msg.text){
        if(startOver){
            speechSynthesis.speak(msg);
        }

        text.style.border = "1px solid #ced4da";
    }else{
        text.style.border = "1px solid red";
        speechSynthesis.speak(new SpeechSynthesisUtterance("Textara is required!"));
    }
}

function setOption(){
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', toggle.bind(null, false));

