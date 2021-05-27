//require('dotenv').config()
const express  = require('express');
const app =  express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID)

////Middeware
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const connectDB = async ()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_DB, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify: false
        })

        console.log(`mongoDB is connected to: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

connectDB();

const rsvpSchema = new mongoose.Schema({
    name: String,
    count: Number,
    message: String,
    coming: String,
    date: Date

  })
  
  const Rsvp = mongoose.model('Rsvp', rsvpSchema);

  app.post('/rsvp', async (req, res)=>{

    if (!req.body.adultsNumber) return req.body.adultsNumber = 0;
    if (!childrenNumber) return req.body.adultsNumber = 0;
    const saveRsvp = new Rsvp({ ...req.body, date: Date.now() })
      const msg = {
          to: 'avery.christa.wedding@gmail.com',
          //to: 'paradymuseless@gmail.com',  // Development
          from: 'alayna_miracle@outlook.com', // verified sender
          subject: `${req.body.name} has RSVP'd for your wedding`,
          html: `
          <svg style="width: 50vw; margin: 5rem 25vw;" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 507.2 507.2" style="enable-background:new 0 0 507.2 507.2;" xml:space="preserve">
     <circle style="fill:#32BA7C;" cx="253.6" cy="253.6" r="253.6"/>
     <path style="fill:#0AA06E;" d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"/>
     <g>
         <path style="fill:#FFFFFF;" d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
             c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"/>
         <path style="fill:#FFFFFF;" d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
             c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"/>
     </g>
     </svg>
     <h1 style="font: 600 2rem Arial; color: #242424; width: 100%; text-align: center;">HEY CRISTA!</h1>
     <p style="font: 300 1.5rem Arial; color: #0AA06E; width: 100%; text-align: center;"><span style="color: #dc2f02; font: inherit;">${req.body.name}</span> has just rsvp'd for your wedding with a count of <span style="color: #dc2f02; font: inherit;">${req.body.adultsNumber} adults
     and ${req.body.childrenNumber} children</span>. 
    They said about coming: <span style="color: #dc2f02; font: inherit;">${req.body.coming}</span> </p>
    <div style="font: 300 1.2rem Arial; color: #242424; width: 100%; text-align: center;">If they left a message it will be displayed below.</div>
    <p style="font: 300 1.2rem Arial; color: #242424; width: 100%; text-align: center;">${req.body.message}</p>
 `
        }
        sgMail
        .send(msg)
        .then(() => {
          console.log(msg)
        })
        .catch((error) => {
          console.error(error)
        })
  
        try {
          await saveRsvp.save()
          res.redirect('/thank-you')
          
        } catch (error) {
          console.log(error)
        }
  })
  
  app.get('/rsvp', async (req, res)=>{
    try {
      const rsvps = await Rsvp.find({}).sort({date: -1}).exec()
      res.send(rsvps)
    } catch (error) {
     error.log(error) 
    }
  })
  

  app.get('/thank-you', (req, res)=>{
    res.sendFile(`${__dirname}/public/thankyou.html`)
  })

  app.get('/', (req, res)=>{
      res.send('index.html')
  })
  
  app.listen(PORT, (error)=>{
    if (error) return console.log(error)
    console.log(`connected on ${5000}`)
  })
  