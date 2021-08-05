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
    coming: String,
    date: Date,
    receptionAttendance: String,
    adultsNumber: String,
    childrenNumber: String,
    adultsNumberReception: String,
    childrenNumberReception: String

  })
  
  const Rsvp = mongoose.model('Rsvp', rsvpSchema);

  app.post('/rsvp', async (req, res)=>{

    if (!req.body.adultsNumber){ req.body.adultsNumber = 0;}
    if (!req.body.childrenNumber) {req.body.childrenNumber = 0;}
    if (!req.body.adultsNumberReception){ req.body.adultsNumberReception = 0;}
    if (!req.body.childrenNumberReception) {req.body.childrenNumberReception = 0;}
    if (!req.body.receptionAttendance) {req.body.receptionAttendance = 'No one is coming to the reception';}
    if (req.body.receptionAttendance && !req.body.adultsNumberReception) {req.body.adultsNumberReception = req.body.adultsNumber; req.body.childrenNumberReception = req.body.childrenNumber ; }

    const saveRsvp = new Rsvp({ ...req.body, date: Date.now() })
      const msg = {
          to: 'avery.christa.wedding@gmail.com',
          //to: 'paradymuseless@gmail.com',  // Development
          from: 'alayna_miracle@outlook.com', // verified sender
          subject: `${req.body.name} has RSVP'd for your wedding`,
          html: `
     <h1 style="font: 600 2rem Arial; color: #242424; width: 100%; text-align: center;">HEY CRISTA! 🎉🎉</h1>
     <p style= "font: 400 1.2rem Arial; color: #242424;">${req.body.name} has RSVP'd for your wedding. Here is the info:<p>
     <div style = "background: #f0f0f0; padding: 1rem; font-family: Arial, sans-serif"> 
     <div style= "font: 400 1.2rem Arial; color: #1d3557;"> <span style = "color: #fca311; font: 800 1.4rem Arial;">Name: </span>${req.body.name}</div> <br><br>
     <div style= "font: 400 1.2rem Arial; color: #1d3557;"> <span style = "color: #e63946; font: 800 1.4rem Arial;">Attending: </span>${req.body.coming}</div> <br><br>
     <div style= "font: 400 1.2rem Arial; color: #1d3557;"> <span style = "color: #06d6a0; font: 800 1.4rem Arial;">Adults in Ceremony: </span>${req.body.adultsNumber}</div>
     <div style= "font: 400 1.2rem Arial; color: #1d3557;"> <span style = "color: #06d6a0; font: 800 1.4rem Arial;">Children in Ceremony: </span>${req.body.childrenNumber}</div> <br><br>
     <div style= "font: 400 1.2rem Arial; color: #1d3557;"> <span style = "color: #8338ec; font: 800 1.4rem Arial;">Adults in Reception: </span>${req.body.adultsNumberReception}</div>
     <div style= "font: 400 1.2rem Arial; color: #1d3557;"> <span style = "color: #8338ec; font: 800 1.4rem Arial;">Children in Reception: </span>${req.body.adultsNumberReception}</div>
     </div>
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

    app.get('/watch', (req, res)=>{
    res.sendFile(`${__dirname}/public/watch.html`)
  })

  app.get('/', (req, res)=>{
      res.send('index.html')
  })
  
  app.listen(PORT, (error)=>{
    if (error) return console.log(error)
    console.log(`connected on ${PORT}`)
  })
  