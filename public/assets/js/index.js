/******************TIMER************/
// Set the date we're counting down to
let countDownDate = new Date("June 19, 2021 18:30:00").getTime();

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
    }
  }, 1000);

