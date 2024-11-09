const express = require("express");
const router = express.Router();
const data = require("../data/mydata.js");






router.post("/getCategories", (req, res)=>{
    res.send({kats: data.categories})
})

router.get("/", (req, res)=>{
        req.session.prodano =(req.session.prodano ? req.session.prodano :
            [[0,0,0,0,0],           //Prodanost svih elemenata
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]])
    req.session.ukosariBr=(req.session.ukosariBr ? req.session.ukosariBr : 0)
    res.render("home");
})

router.post("/getProducts/:id", (req, res)=>{
    if(req.params.id==0){
        res.send({prods: data.categories})
    }else{
        kat = parseInt(req.params.id)-1
        res.send({prods: data.categories[kat].products})
    }
})





router.post("/kolikoU", (req, res)=>{
    kol=req.session.ukosariBr
    res.send({kol: kol})
})




module.exports = router;