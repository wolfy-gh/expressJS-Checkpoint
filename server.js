const express = require('express')
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

// **********************
//      WORKING TIME 
// **********************
var day = new Date().getDay()
var hour = new Date().getHours()
var message = ""
var messageStyle = true

if((day==6)||(day==0)){
    message="Available : From Monday To Friday ( 9am to 5pm )"
    messageStyle = !messageStyle   
}else {
    if ((hour >= 17) && (hour <9)) {
        message = "Available : From Monday To Friday ( 9am to 5pm )"
        messageStyle = !messageStyle
    }
}

// **********************
//      WORKING TIME 
// **********************
app.use((req, res, next) => {
    switch (day) {
        case 1, 2, 3, 4, 5 :
            if ((hour >= 9) && (hour < 17)) {
                return next()
            }
            break
        default :
            res.render('work',{ ourDay: message, messageStyle: messageStyle })
            
    }
})

// **********************
//       HOME PAGE
// **********************

app.get('/', (req, res) => {
    res.render('index')
})
// **************************
//      OUR SERVICES PAGE 
// **************************
app.get('/services', (req, res) => {
    res.render('services')
})
// **********************
//      CONTACT PAGE
// **********************
app.get('/contact', (req, res) => {
    res.render('contact')
})


// PORT LISTEN : 3000
app.listen(3000, () => {
    console.log("Server started on port 3000")
})