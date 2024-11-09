let naslov=document.getElementById("kat");      //Naslov kategorije

let slika=[document.getElementById("slika1"),   //Slike proizvoda
            document.getElementById("slika2"),
            document.getElementById("slika3"),
            document.getElementById("slika4"),
            document.getElementById("slika5")];
let ime=[document.getElementById("pp1"),        //Imena proizvoda
        document.getElementById("pp2"),
        document.getElementById("pp3"),
        document.getElementById("pp4"),
        document.getElementById("pp5")];

let kol=[document.getElementById("invi1"),      //Broj proizvoda na slici u kosari
        document.getElementById("invi2"),
        document.getElementById("invi3"),
        document.getElementById("invi4"),
        document.getElementById("invi5")];


let kosara =document.getElementById("par")
kosara.addEventListener("click", ()=>{
    window.location.href="cart"
})






let kos=document.getElementById("invi");    //Broj proizvoda u kosari
let ukosari=0;

(async () => {
        const response = await fetch("/home/kolikoU", {
            method: "POST"
        });
        const data = await response.json();
        ukosari = parseInt(data.kol);
        if (ukosari != 0) {
            kos.innerHTML = ukosari;
            kos.style.display = "inline";
        }
})();










let kategor=1;                      //Koja kat je prikazana

let prodani=[];
(async () => {
    const response = await fetch("/cart/getAll", {
        method: "GET"
    });
    const data = await response.json();
    prodani = JSON.parse(data.kol);
    for(let i=0; i<5; i++){
        if(prodani[kategor-1][i]!=0){
            kol[i].innerHTML=prodani[kategor-1][i];
            kol[i].style.display="inline";
        }
    }
})();

















fetch("/home/getCategories", {
    method: "POST"
}).then(data=>data.json()).then(data=>{
    for(let i=1; i<11; i++){
        let el = document.getElementById(`b${i}`)
        el.innerHTML=data.kats[i-1].name
    }
    naslov.innerHTML=data.kats[0].name
})

fetch("/home/getProducts/1", {
    method: "POST"
}).then(data=>data.json()).then(data=>{
    for(let i = 1; i<6; i++){
        ime[i-1].innerHTML = data.prods[i-1].name;
        slika[i-1].src = data.prods[i-1].image;
    }
})














async function proizvod(i) {  
        res = await fetch("/cart/getAll", {
            method: "GET"
        });
        dat = await res.json();
        prodani = JSON.parse(dat.kol);
        for(let i=0; i<5; i++){
            if(prodani[kategor-1][i]!=0){
                kol[i].innerHTML=prodani[kategor-1][i];
                kol[i].style.display="inline";
            }else{kol[i].style.display="none";}
        }
        res = await fetch("/home/kolikoU", {
            method: "POST"
        });
        dat = await res.json();
        ukosari = parseInt(dat.kol);
        kos.innerHTML = ukosari;
        
    ukosari++;                                  // Jedan element kupljen
    kos.innerHTML = ukosari;
    kos.style.display = "inline";
    kol[i-1].style.display = "inline";
    prodani[kategor-1][i-1]++;
    kol[i-1].innerHTML = prodani[kategor-1][i-1];

        const response = await fetch(`/cart/add/${10*(kategor-1)+i-1}`, {  // Šaljem serveru informaciju o promjenama
            method: "PUT"
        });
}

function promKat(j){
    for(let i=0; i<5; i++){
        if(prodani[j-1][i]==0){
            kol[i].style.display="none";
        }
        else{
            kol[i].style.display="inline";
            kol[i].innerHTML=prodani[j-1][i];
        }
    }
    kategor=j;
    naslov.innerHTML=document.getElementById(`b${j}`).innerHTML;

    fetch(`/home/getProducts/${j}`, {
        method: "POST"
    }).then(data=>data.json()).then(data=>{
        for(let i = 1; i<6; i++){
            ime[i-1].innerHTML = data.prods[i-1].name;
            slika[i-1].src = data.prods[i-1].image;
        }
    })
}
