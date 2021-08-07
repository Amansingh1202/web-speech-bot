import React, { useEffect } from 'react';
import './JokeComponent.css'
import robotImage from "../images/robot.gif"

function JokeComponent() {
    let voices;
    let currentVoice;
    useEffect(() => {
        document.addEventListener('keydown',function(event){
            if(event.key === 'j'){
                tellJoke();
            }
        })
        const voiceSelect = document.getElementById('voices');
        const populateVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            voiceSelect.innerHTML = '';
      
            availableVoices.forEach(voice => {
              const option = document.createElement('option');
              let optionText = `${voice.name} (${voice.lang})`;
              if (voice.default) {
                optionText += ' [default]';
                if (typeof currentVoice === 'undefined') {
                  currentVoice = voice;
                  option.selected = true;
                }
              }
              if (currentVoice === voice) {
                option.selected = true;
              }
              option.textContent = optionText;
              voiceSelect.appendChild(option);
            });
            voices = availableVoices;
          };
    
          populateVoices();
          speechSynthesis.onvoiceschanged = populateVoices;
    
          voiceSelect.addEventListener('change', event => {
            const selectedIndex = event.target.selectedIndex;
            currentVoice = voices[selectedIndex];
          });

      
    }, []);

    function tellJoke(){
        fetch('https://official-joke-api.appspot.com/jokes/programming/random')
        .then(response => response.json())
        .then(data => {
            let joke = data[0].setup + data[0].punchline;
            const utterance = new SpeechSynthesisUtterance(joke);
            utterance.voice = currentVoice;
            speechSynthesis.speak(utterance);
        });
    }
    return (
      <div>
        <img className="robot-image" src={robotImage} /><br />
        <button className='joke-button' id='joke-btn1' onClick={tellJoke}>Tell me a joke</button> <span className="or-word">Or</span> <span className="key-j">Press j to listen to a joke</span><br />
        <select id="voices"></select>
      </div>
    );
  }
  
  export default JokeComponent;
  