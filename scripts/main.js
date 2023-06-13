import DomProduct from "../src/DomProduct.js";
import Product from "../src/Product.js";

import '../src/App.js'
import Layout from "../src/Layouts.js";

Layout.setHeader('../layout/header.html')

Layout.setFooter('./layout/footer.html')


document.addEventListener('DOMContentLoaded', function () {

    let domproduct = new DomProduct('./datas/offer.json', '.meilleurs')

    domproduct.fill(function (product) {
        return `
            <div class="carte offer" data-content='${JSON.stringify(product)}'>
                <img src="${product.image}">
                <div class="containt">
                    <h2>jusqu'a 50% de reduction</h2>
                    <h3>offre speciale</h3>
                </div>
            </div>
        `
    }, 3, function () {
        Product.offerRefreshModal()
    }).then(response => {
        Product.offerRefreshModal()
    })


    let domproductNew = new DomProduct('./datas/newProducts.json', '.nouvaux_produits .container')

    domproductNew.fill(function (product) {
        return `
            <div class="carte">
                <div class="images">
                    <img src="${product.image}" class="image">
                    <img src="${product.imagehover}" class="image_hover">
                </div>
                <div class="containt">
                    <h3>${product.title}</h3>
                    <p class="prix">
                        <span>${product.price}$</span>
                        <span>${product.old_price}$</span>
                    </p>
                    ${DomProduct.stars(product.stars)}
                    <button>Acheter</button>
                </div>
            </div>
        `
    })
})