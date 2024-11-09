let stupciu = document.getElementById("kosdiv");

let ukosari=[];





let podatci=[];


async function fetchCartItems() {
    try {
        let response = await fetch("/cart/getAll", {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        if (data.kol) {
            ukosari = JSON.parse(data.kol); // Pretpostavljamo da je data.kol već ispravan niz
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
    }

// Funkcija za dohvaćanje podataka o proizvodima
async function fetchProductData() {
    try {
        let response = await fetch(`/home/getProducts/0`, { // Nula će vratiti cijeli data.categories
            method: "POST"
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        result = await response.json(); // Pretpostavljamo da je data već ispravan niz
        podatci=result.prods
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Funkcija koja čeka dohvaćanje podataka prilikom učitavanja stranice
console.log("HHHHHHHHH")
async function loadData() {
    await fetchCartItems();
    await fetchProductData();
    console.log(ukosari)

    for(let i=0; i<10; i++){
        for(let j=0; j<5; j++){
            if(ukosari[i][j]!=0){
                    let noviel = document.createElement("div"); //Stvori novi red
                    stupciu.appendChild(noviel);
                    noviel.className = "flexaj";
    
                    let r1 = document.createElement("div");     //Stvaranje stupaca
                    let r2 = document.createElement("div");
                    noviel.appendChild(r1);
                    noviel.appendChild(r2);
                    r1.className="stupac";
                    r2.className="stupac";
    
                    
    
                    r1.innerHTML=podatci[i].products[j].name;
                    let tekst = document.createElement("span");
                    tekst.innerHTML=ukosari[i][j];
                    tekst.className="tekstic";
                    let gumb1 = document.createElement("button");
                    gumb1.innerHTML="-";
                    gumb1.onclick=()=>umanji(i, j, gumb1);
                    let gumb2 = document.createElement("button");
                    gumb2.innerHTML="+";
                    gumb2.onclick=()=>uvecaj(i, j, gumb2);
                    r2.appendChild(gumb1);
                    r2.appendChild(tekst);
                    r2.appendChild(gumb2);
    
    
                    console.log("EYYO");
            }
        }
    }
}

loadData()











async function umanji(ii, jj, gumb){
    if(ukosari[ii][jj]>0){
        ukosari[ii][jj]--;

        await fetch(`/cart/remove/${ii*10+jj}`, {
            method: "PUT"
        })

        let par = gumb.parentElement;
        par.querySelector('.tekstic').innerHTML=parseInt(par.querySelector('.tekstic').innerHTML)-1;
    }
}
async function uvecaj(ii, jj, gumb){
    ukosari[ii][jj]++;

    await fetch(`/cart/add/${ii*10+jj}`, {
        method: "PUT"
    })

    let par = gumb.parentElement;
    par.querySelector('.tekstic').innerHTML=parseInt(par.querySelector('.tekstic').innerHTML)+1;
}