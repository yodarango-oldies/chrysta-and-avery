
const pullList = async() =>{

  const data =  await fetch('/rsvp');
  const response = await data.json();

  const wrapper = document.querySelector('#wrapper-grid');
  const guestCount = document.querySelector('.total-guests');
  const guestCountReception = document.querySelector('.total-guests-reception');
  let count = 0;
  let countReception = 0;

  for (item of response){

    const guestCard = document.createElement('DIV');
    guestCard.className = 'guest-card'
    const guestCardData = `

    <div class = "guest-card_name">${item.name}</div>
    <div class="guest-card_attending"><span>Coming to the Wedding?</span> ${item.coming}</div>
    <br>
    <br>
    <div class="guest-card_ceremony"><span>Adults coming to Ceremony</span> ${item.adultsNumber}</div>
    <div class="guest-card_ceremony"><span>Children coming to Ceremony</span> ${item.childrenNumber}</div>
    <br>
    <br>
    <div class="guest-card_reception"><span>Adults coming to Reception</span> ${item.adultsNumberReception}</div>
    <div class="guest-card_reception"><span>Children coming to Reception</span> ${item.childrenNumberReception}</div>
`
    guestCard.innerHTML = guestCardData
    wrapper.appendChild(guestCard)

    count += (parseInt(item.adultsNumber) + parseInt(item.childrenNumber))
    countReception += (parseInt(item.adultsNumberReception) + parseInt(item.childrenNumberReception))
  }
  guestCount.textContent = `C: ${count}`;
  guestCountReception.textContent = `R: ${countReception}`;
  console.log(response)
}

pullList()