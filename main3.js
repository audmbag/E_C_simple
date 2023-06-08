

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
        <i class="fas fa-star"></i>
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
let nosProduits = [...document.querySelectorAll('.nos_produits .container_prod .item_prod')];
let inde = 3;
let cond = false;

window.onscroll = () =>{
    overlay.classList.remove('active');
    navigation_bar.classList.remove('active');
    reunit()
    if(window.scrollY > 0){
        document.querySelector('.navigation').classList.add('active');
        document.querySelector('.lien_haut_page').classList.add('active');
    }
    else{
        document.querySelector('.navigation').classList.remove('active');
        document.querySelector('.lien_haut_page').classList.remove('active');
    }

    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

    if(scrollTop + clientHeight === scrollHeight){
        for(var i = inde; i < inde + 3; i++){
            if(cond === false){
                nosProduits[i].style.display = 'block';
            }
        }
        inde += 3;
        if(inde >= nosProduits.length){
            cond = true;
            document.querySelector('.footer_prod').style.display = 'grid';
            document.querySelector('.copy_prod').style.display = 'block';
        }
    }
}

let arrayProduct = [];
ajoutProduitPanier()
function ajoutProduitPanier(){
    let nosProduits = document.querySelectorAll('.nos_produits .container_prod .item_prod');
    nosProduits.forEach(prod => {
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
                localStorage.setItem('produitPageProduit', JSON.stringify(arrayProduct));

                sweetalert()
                alertpanier.querySelector('h2').innerText = 'Produit Ajouté dans votre panier'
                alertpanier.querySelector('.fa-check').classList.remove('fa-exclamation-triangle')
            }
            else{
                alertpanier.querySelector('h2').innerText = 'Produit existant'
                alertpanier.querySelector('.fa-check').classList.add('fa-exclamation-triangle')
                sweetalert()
            }
            
            if(localStorage.getItem('produitPageProduit') != null){
                let resultat = JSON.parse(localStorage.getItem('produitPageProduit'))
                let findproduct = resultat.find(p => p.image_lien == ProduitPackage.image_lien);

                if(findproduct.image_lien == ProduitPackage.image_lien){
                    condition = true;
                }
            }
        }
    })
}





// produit du jour 
let image_du_jour = document.querySelectorAll('.produits_du_jour .item_prod_jour .images_left .image img');

image_du_jour.forEach(image => {
    image.onclick = (e) => {
        let image_attribut = image.getAttribute('src');

        e.target.parentNode.parentNode.parentNode.querySelector('.image_target img').src = image_attribut;
    }
})








// valeur proposés par l'input lors d'une recherche
// proposition des resultat lors de la recherche et sauvegarge des donnée dans le locla storage
let resu_propArray = ['Air-Max', 'Huarache-Sneakers', 'Nike-mag','Air-Jordan', 'Air-Force', 'Bascket-shose', 'Nike-shox', 'Adidas-jordan', 'Nike-hyperdunk', 'Nike', 'Joging', 'jordan']

let container_input = document.querySelector('.navigation .input_container')
let resu_prop = document.querySelector('.navigation .input_container .resu_prop')
let input = document.querySelector('.navigation .input_container input')
let lien =  document.querySelector('.navigation .input_container a')

resu_propArray.forEach(res => {
    let li = document.createElement('li')
    resu_prop.appendChild(li)
    li.innerText = res;
})

function rechercheProp(){
    let input_val = input.value.toLowerCase().replace(/\s/g, '').replace('-', '');
    document.querySelectorAll('.navigation .input_container .resu_prop li').forEach(li => {
        let li_inner = li.innerText.toLowerCase().replace(/\s/g, '').replace('-', '');

        if(input_val != ""){
            if(li_inner.startsWith(input_val)){
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
            input_val = e.target.innerText;
            input.value = input_val;
            localStorage.setItem("recherche", input.value.toLowerCase().replace(/\s/g, '').replace('-', ''));

            document.querySelectorAll('.navigation .input_container .resu_prop li').forEach(cls => {
                cls.style.display = 'none'
            })
        }
    })
    if(input_val == '' || input_val == ' '){
        lien.style.pointerEvents = "none";
    }
    else if (input_val != '' || input_val != ' '){
        lien.style.pointerEvents = "initial";
    }
    localStorage.setItem("recherche", input.value.toLowerCase().replace(/\s/g, '').replace('-', ''));
}

input.oninput = () => {
    rechercheProp()
}


// afficher l'image en grand
let container_image_show = document.querySelector('.container_image_show')
let close_cont = container_image_show.querySelector('.fa-times')
let download_img = container_image_show.querySelector('.fa-download')

nosProduits.forEach(prod => {
    
    prod.querySelector('.icones .fa-search-plus').onclick = () => {
        container_image_show.classList.add('active')

        let image = prod.querySelector('.image img').src;
        container_image_show.querySelector('.image img').src = image
        download_img.href = image;
    }
    //afficher la boite d'évaluation du produit
    let star_btn = prod.querySelector('.icones .fa-star')
    evaluerPorduit(star_btn, prod);
})
close_cont.onclick = () => {
    container_image_show.classList.remove('active')
}


//afficher la boite d'évaluation du produit
let boite_eval = document.querySelector('.boite_eval')
let close_eval = boite_eval.querySelectorAll('.close_btn')
let etoiles = boite_eval.querySelectorAll('.stars i')
let emojies = boite_eval.querySelectorAll('.emoji span')

function evaluerPorduit(btn){
    btn.onclick = () => {
        boite_eval.classList.add('active')
        document.querySelector('.overlay').classList.add('active')
    }
}
function reunit(){
    boite_eval.classList.remove('active')
    etoiles.forEach(cls => cls.classList.remove('active'))
    emojies.forEach(icone => icone.classList.remove('active'))
    boite_eval.querySelector('.visible').style.transform = "translate(-50%, -50%) scaleY(1)"
    boite_eval.querySelector('.evaluer').style.display = "none"
    document.querySelector('.overlay').classList.remove('active')
}
close_eval.forEach(closebtn => {
    closebtn.onclick = () => {
        reunit()
    }
})

boite_eval.querySelector('.evaluer').onclick = () => {
    document.querySelector('.lien_copie').classList.add('active')
    document.querySelector('.lien_copie').querySelector('h2').innerText = 'Produit Evalué'
    reunit()
    
    
    setTimeout(() => {
        document.querySelector('.lien_copie').classList.remove('active')
        document.querySelector('.lien_copie').querySelector('h2').innerText = 'Lien Copié'
    },3050)
}

etoiles.forEach((etoile, index) => {

    etoile.onclick = (e) => {
        let data_et = e.target.getAttribute('data-emores')
        boite_eval.querySelector('.evaluer').style.display = "block"
        let inde_of = index

        etoiles.forEach(cls => cls.classList.remove('active'))

        for(var i = 0; i <= inde_of; i++){
            
            if(i <= inde_of){
                etoiles[i].classList.add('active')
            }
        }

        emojies.forEach(icone => {
            let emoji_data = icone.getAttribute('data-emoj')
            icone.classList.remove('active')

            if(data_et == emoji_data){
                icone.classList.add('active')
            }
        })
    }
})
overlay.onclick = () => {
    reunit()
}



let icone_partage = document.querySelectorAll('.item_prod .icones .fa-share')

icone_partage.forEach(part => {
    part.onclick = (e) => {
        let image_link = e.target.parentNode.parentNode.querySelector('.image img').src
        navigator.clipboard.writeText(`${image_link}`)

        document.querySelector('.lien_copie').classList.add('active')
        
        setTimeout(() => {
            document.querySelector('.lien_copie').classList.remove('active')
        },3050)
    }
})