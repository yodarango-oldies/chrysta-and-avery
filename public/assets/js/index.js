/******************TIMER************/
// Set the date we're counting down to
let countDownDate = new Date("August 06, 2021 19:00:00").getTime();
    
const wrapper = document.querySelector('#counterWrapper');

let countDown = setInterval(() =>{

    // Get todays date and time
    let now = new Date().getTime();
  
    // Find the distance between now an the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="countdown"
    document.querySelector('#days').innerHTML = `${days}D`;
    document.querySelector('#hours').innerHTML = `${hours}H`;
    document.querySelector('#minutes').innerHTML = `${minutes}M`;
    document.querySelector('#seconds').innerHTML = `${seconds}S`;
  
    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(x);
      wrapper.style.display = "none"

    }
  }, 1000);

  const rsvpButton = document.querySelector('#accsess-code-button');
  rsvpButton.addEventListener('click', ()=>{
  const password = document.querySelector('#accsess-code').value;
    if(password === 'diamond'){
      document.querySelector('#protect-rsvp').style.display = 'none';
      location.href = "/#contact"
    }
  })

  const comingRadioButton = document.querySelector('#coming');
  const notComingRadioButton = document.querySelector('#not-coming');
  const numberOfGuestsWrapper = document.querySelector('#number-of-guests-wrapper');
  const comingRadioButtonReception = document.querySelector('#coming-reception');
  const notComingRadioButtonReception = document.querySelector('#not-coming-reception');
  const numberOfGuestsReception = document.querySelector('#number-of-guests-wrapper-reception');

  const receptionWrapper = document.querySelector('.reception-attendance-wrapper')


  comingRadioButton.addEventListener('click', ()=>{
    receptionWrapper.style.display = 'block'
    numberOfGuestsWrapper.style.display = 'block'
  })

  notComingRadioButton.addEventListener('click', ()=>{
    receptionWrapper.style.display = 'none'
    numberOfGuestsWrapper.style.display = 'none'
  })

  comingRadioButtonReception.addEventListener('click', ()=>{
    numberOfGuestsReception.style.display = 'block'
  })

  notComingRadioButtonReception.addEventListener('click', ()=>{
    numberOfGuestsReception.style.display = 'none'
  })