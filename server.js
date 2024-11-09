const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 3000;          //port od render stranice ili 3000
const bodyParser = require('body-parser');

app.use(session({
    secret:"abcdefgh",
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge: 5*60*1000}
}))
app.use(express.static('public'));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'))         //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
app.set('view engine' , 'ejs')

const mainRouter = require("./routes/home.routes.js")
const cartRouter = require("./routes/cart.routes.js")

app.get("/", (req, res)=>{
    res.redirect("/home")
})

app.use("/home", mainRouter)

app.use("/cart", cartRouter)




app.listen(PORT);
