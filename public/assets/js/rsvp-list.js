const pullList = async() =>{
  const data =  await fetch('/rsvp');
  const response = await data.json();
  const name = document.querySelector('.nog-top');
  const yesComing = document.querySelector('.y-top');
  const noComing = document.querySelector('.n-top');

  for (item of response)
  {
    const  guest = document.createElement('DIV');
    guest.textContent = item.name;
    name.appendChild(guest)

    if(item.coming == 'yes-coming'){
        const  yes = document.createElement('DIV');
        yes.textContent = 'YES';
        yesComing.appendChild(yes)
        const  no = document.createElement('DIV');
        no.textContent = '.';
        no.style.color = 'rgba(22, 15, 54, 0.8)'
        noComing.appendChild(no)
    } else if (item.coming == 'no-coming'){
        const  yes = document.createElement('DIV');
        yes.textContent = '.';
        yesComing.appendChild(yes)
        yes.style.color = 'rgba(22, 15, 54, 0.8)'
        const  no = document.createElement('DIV');
        no.textContent = 'NO';
        noComing.appendChild(no)
    }
  }
}

pullList()