import Layout from '../src/Layouts.js';

import '../src/App.js'
import DomProduct from '../src/DomProduct.js';
import Product from '../src/Product.js';

Layout.setHeader()
Layout.setFooter()

document.addEventListener("DOMContentLoaded", () => {
    let domproducts = new DomProduct('../datas/dailyProducts.json', '.produits_du_jour')

    domproducts.fill(function (product) {
        return `
            <div class="item_prod_jour">
                <div class="images_left">
                    <div class="image"><img src="../${product.image1}"></div>
                    <div class="image"><img src="../${product.image2}"></div>
                    <div class="image"><img src="../${product.image3}"></div>
                    <div class="image"><img src="../${product.image4}"></div>
                </div>

                <div class="image_target">
                    <img src="../${product.image2}">
                </div>

                <div class="containt">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    
                    <div class="prix">
                        <span>${product.price}$</span>
                        <span${product.old_price}$</span>
                    </div>
                    <a href="" class="btn"><span>Acheter maintenant</span> <i class="fas fa-shopping-cart"></i></a>
                </div>
            </div>
        `
    }).then(response => {
        Product.changeImage('.produits_du_jour .item_prod_jour .images_left .image img', '.image_target img', 3)
    })


    let domproducts_all = new DomProduct('../datas/all.json', '.nos_produits .container_prod')

    domproducts_all.fill(function (product) {
        return `
            <div class="item_prod">
                <div class="icones" data-content='${JSON.stringify(product)}'>
                    <i class="fas fa-shopping-cart"></i>
                    <i data-content='${JSON.stringify(product)}' class="fas fa-search-plus"></i>
                    <i class="fas fa-star"></i>
                    <i data-content="${location.origin + location.pathname + '#' + product.id}" class="fas fa-share"></i>
                </div>
                <div class="image">
                <img src="../${product.image}">
                </div>
                <h2>${product.title}</h2>
                <p class="prix">
                    <span class="prix_produit">${product.price}$</span>
                    <span class="prix_produit_red">${product.old_price}$</span>
                </p>
                ${DomProduct.stars(product.stars)}
            </div>
        `
    }, 3, function () {
        Product.interactWithProducts()
    }).then(response => {
        Product.interactWithProducts()
    })

    DomProduct.hash('../datas/all.json', function (product) {
        Product.showProduct(null, product)
    })
})