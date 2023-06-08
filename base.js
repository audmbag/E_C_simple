let incat = 0;
let tableau_nom = ['Air-Max', 'Huarache-Sneakers', 'Nike-mag','Air-Max', 'Nike-mag', 'Air-Jordan', 'Air-Max', 'Air-Force', 'Bascket-shose', 'Air-force', 'Nike-shox', 'Air-jordan', 'Air-jordan', 'Adidas-jordan', 'Air-jordan', 'Air-Max', 'Nike-shox', 'Nike-hyperdunk', 'Air-Jordan', 'Air-Jordan', 'Air-Jordan', 'Joging', 'Nike', 'Air-Jordan', 'Joging', 'Adidas-jordan', 'Joging', 'Joging', 'Joging', 'Joging'];

let tableau_prix = ['27', '25', '30','25', '30', '30', '25', '25', '20', '25', '20', '30', '30', '30', '30', '25', '20', '20', '30', '30', '30', '15', '20', '30', '15', '30', '15', '15', '15', '15'];

let tableau_prix_ded = ['35', '30', '40','30', '35', '35', '30', '30', '25', '35', '25', '35', '35', '35', '35', '30', '25', '25', '35', '35', '35', '20', '25', '35', '20', '35', '20', '20', '20', '20'];

let tableau_tars = ['fa-star', 'fa-star-half-alt', 'fa-star-half-alt', 'fa-star', 'fa-star-half-alt', 'fa-star', 'fa-star-half-alt', 'fa-star-half-alt', 'fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-star-half-alt', 'fa-star-half-alt', 'fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-star-half-alt', 'fa-star-half-alt', 'fa-star', 'fa-star-half-alt', 'fa-star', 'fa-star', 'fa-star-half-alt', 'fa-star-half-alt', 'fa-star', 'fa-star', 'fa-star-half-alt', 'fa-star'];

let container = document.querySelector('.nos_produits .container_prod');


function listProduits(nom, prix, prix_red, star){
    this.nom = nom,
    this.prix = prix,
    this.prix_red = prix_red,
    this.star = star
}

for(let i = 0; i < 30; i++){
    incat++;
    const produit = new listProduits(`${tableau_nom[incat - 1]}` , `${tableau_prix[incat - 1]}`, `${tableau_prix_ded[incat - 1]}`, `${tableau_tars[incat - 1]}`)

    let listeDeProduits = document.createElement('div');
    listeDeProduits.setAttribute('class', 'item_prod');
    listeDeProduits.setAttribute('data-search', `${tableau_nom[incat - 1]}`)
    container.appendChild(listeDeProduits);

    listeDeProduits.innerHTML = `
    <div class="icones">
        <i class="fas fa-shopping-cart"></i>
        <i class="fas fa-search-plus"></i>
        <i class="fas fa-heart"></i>
        <i class="fas fa-share"></i>
    </div>
    <div class="image">
    <img src="images/chaussures/produits/produit${incat}.png">
    </div>
    <h2>${produit.nom}</h2>
    <p class="prix">
        <span class="prix_produit">${produit.prix}$</span>
        <span class="prix_produit_red">${produit.prix_red}$</span>
    </p>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas ${produit.star}"></i>
    `
}
//filtrer nos elements avec l'input de la page des produits


let itemRechercher = document.querySelectorAll('.item_prod');
let localValSearch = localStorage.getItem("recherche");

itemRechercher.forEach(item => {
    let data_item = item.getAttribute('data-search').toLocaleLowerCase().replace('-', '');

    if(localValSearch !== ''){
        item.style.display = 'none';
        
        if (data_item.includes(localValSearch)){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    }
    else if (localValSearch == ''){
        item.style.display = 'block';
    }
    if(container.innerText != ''){
        document.querySelector('.titreh2 span').innerHTML = localValSearch;
    }
    else{
        document.querySelector('.titreh2').innerHTML = 'Aucun resultat';
    }
})
let input = document.querySelector('.navigation .input_container input')
let lien =  document.querySelector('.navigation .input_container a')


lien.onclick = () => {
    let valeur_inp = input.value.toLowerCase().replace(/\s/g, '').replace('-', '');

    if(valeur_inp != ''){
        localStorage.setItem("recherche", valeur_inp);
        document.querySelector('.attenterecherche').classList.add('active')

        itemRechercher.forEach(item => {
            let data_item = item.getAttribute('data-search').toLocaleLowerCase().replace('-', '');
            
            setTimeout(() => {
                if (data_item.includes(valeur_inp)){
                    item.style.display = 'block';
                }else{
                    item.style.display = 'none';
                }
            }, 1000)

            setTimeout(() => {
                document.querySelector('.attenterecherche').classList.remove('active')
            }, 1050);
        })
    }
    if(container.innerText != ''){
        document.querySelector('.titreh2 span').innerHTML = localStorage.getItem("recherche");
    }

    document.querySelectorAll('.navigation .input_container .resu_prop li').forEach(close => {
        close.style.display = 'none'
    })
    input.value = "";
}





let arrayProduct = [];
ajoutBDDPanier()
function ajoutBDDPanier(){
    itemRechercher.forEach(prod => {
        let panierBtn = prod.querySelector('.icones .fa-shopping-cart')
        
        let id = 0;
        let condition = false

        panierBtn.onclick = () => {
            let image_lien = panierBtn.parentNode.parentNode.querySelector('.image img').src;
            let nom_produit = panierBtn.parentNode.parentNode.querySelector('h2').innerText;
            let prix_produit = parseFloat(panierBtn.parentNode.parentNode.querySelector('.prix .prix_produit').innerText.replace('$', ''))
            let prix_produit_red = parseFloat(panierBtn.parentNode.parentNode.querySelector('.prix .prix_produit_red').innerText.replace('$', ''))
            id++
            let alertpanier = document.querySelector('.panier_alert')
            const ProduitPackage = {
                id,
                image_lien,
                nom_produit,
                prix_produit,
                prix_produit_red,
            }
            function sweetalert(){
                alertpanier.classList.add('active')
                setTimeout(() => {
                    alertpanier.classList.remove('active')
                }, 6000)
    
                alertpanier.querySelector('.fa-times').onclick = () => {
                    alertpanier.classList.remove('active')
                }
                alertpanier.querySelector('button').onclick = () => {
                    alertpanier.classList.remove('active')
                }
            }
            if(condition === false){
                arrayProduct.push(ProduitPackage);
                localStorage.setItem('produitPageBDD', JSON.stringify(arrayProduct));

                sweetalert()
                alertpanier.querySelector('h2').innerText = 'Produit Ajouté dans votre panier'
                alertpanier.querySelector('.fa-check').classList.remove('fa-exclamation-triangle')
            }
            else{
                alertpanier.querySelector('h2').innerText = 'Produit existant'
                alertpanier.querySelector('.fa-check').classList.add('fa-exclamation-triangle')
                sweetalert()
            }
            
            if(localStorage.getItem('produitPageBDD') != null){
                let resultat = JSON.parse(localStorage.getItem('produitPageBDD'))
                let findproduct = resultat.find(p => p.image_lien == ProduitPackage.image_lien);

                if(findproduct.image_lien == ProduitPackage.image_lien){
                    condition = true;
                }
            }
        }
    })
}

// valeur proposés par l'input lors d'une recherche
// proposition des resultat lors de la recherche
let resu_propArray = ['Air-Max', 'Huarache-Sneakers', 'Nike-mag','Air-Jordan', 'Air-Force', 'Bascket-shose', 'Nike-shox', 'Adidas-jordan', 'Nike-hyperdunk', 'Nike', 'Joging', 'jordan']

let container_input = document.querySelector('.navigation .input_container')
let input_res = container_input.querySelector('input')
let resu_prop = document.querySelector('.navigation .input_container .resu_prop')


resu_propArray.forEach(res => {
    let li = document.createElement('li')
    resu_prop.appendChild(li)
    li.innerText = res;
})

input_res.oninput = () => {
    let input = input_res.value.toLowerCase().replace(/\s/g, '').replace('-', '');
    document.querySelectorAll('.navigation .input_container .resu_prop li').forEach(li => {
        let li_inner = li.innerText.toLowerCase().replace(/\s/g, '').replace('-', '');

        if(input != ""){
            if(li_inner.startsWith(input)){
                li.style.display = "block";
            }
            else{
                li.style.display = "none";
            }
        }
        else{
            li.style.display = "none";
        }

        li.onclick = (e) => {
            input_res.value = e.target.innerText;
            document.querySelectorAll('.navigation .input_container .resu_prop li').forEach(cls => {
                cls.style.display = 'none'
            })
        }
    })
}

