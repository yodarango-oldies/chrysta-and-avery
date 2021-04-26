
const pullList = async() =>{
  const data =  await fetch('/rsvp');
  const response = await data.json();
  const name = document.querySelector('.nog-top');
  const yesComing = document.querySelector('.y-top');
  const noComing = document.querySelector('.n-top');
  const number = document.querySelector('.number-of-guest');
  const total = document.querySelector('#total-guests');
  let totalCount = 0;

console.log(response)

  for (item of response)
  {
    const  guest = document.createElement('DIV');
    guest.textContent = item.name;
    name.appendChild(guest)

    const numberr = document.createElement('DIV');
    numberr.textContent = item.count
    number.appendChild(numberr)

    if(item.coming == 'I am Coming'){
        const  yes = document.createElement('DIV');
        yes.textContent = '✅';
        yesComing.appendChild(yes)
        const  no = document.createElement('DIV');
        no.textContent = '.';
        no.style.color = 'rgba(22, 15, 54, 0.8)'
        noComing.appendChild(no)
    } else if (item.coming== "Sorry, I won't be able to come"){
        const  yes = document.createElement('DIV');
        yes.textContent = '.';
        yesComing.appendChild(yes)
        yes.style.color = 'rgba(22, 15, 54, 0.8)'
        const  no = document.createElement('DIV');
        no.textContent = '❌';
        noComing.appendChild(no)
    }
    totalCount = totalCount + item.count
  }
  total.textContent = totalCount

}

pullList()