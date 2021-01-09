const express  = require('express');
const app =  express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(PORT, (error)=>
{
    console.log(`listening on ${PORT}`)
    if (error)
    {
        console.log(error)
    }
})

console.log(__dirname)