const express = require("express");
const router = express.Router();

router.put("/add/:id", (req, res)=>{

    let el=req.params.id%10;
    let kat=(req.params.id-el)/10

    req.session.prodano[kat][el]++;

    req.session.ukosariBr=(req.session.ukosariBr ? req.session.ukosariBr+1 : 1)
    res.send({b:"B"});
})

router.put("/remove/:id", (req, res)=>{
    el=req.params.id%10
    kat=(req.params.id-el)/10
    req.session.prodano[kat][el]--;
    req.session.ukosariBr--
    res.send({b:"B"})
})

router.get("/getAll", (req, res)=>{
    kol=JSON.stringify(req.session.prodano)
    res.send({kol: kol})
})


router.get("/", (req, res)=>{
    res.render("cart.ejs")
})

module.exports = router;
