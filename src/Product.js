import Card from "./Card.js";
import DomProduct from "./DomProduct.js";
import Notification from "./Notification.js";

export default class Product {

    static offerModal (product)
    {
        return `
            <div class="item" data-target="carte1">
                <button class="close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="image">
                    <img src="${product.image}">
                </div>
                <h2>${product.title}</h2>
        
                <p>${product.description}</p>
                ${DomProduct.stars(product.stars)}
        
                <p class="prix">${product.price}$</p>
        
                <div class="boutons">
                    <button class="ajouter">Ajouter au panier</button>
                    <button class="acheter">Acheter maintenant</button>
                </div>
            </div>
        `
    }


    static offerRefreshModal ()
    {
        document.querySelectorAll('.carte.offer').forEach(card => {
            card.addEventListener('click', function () {

                let { teleportElement, product } = DomProduct.showModal(card, function (product) {
                    return Product.offerModal(product)
                })

                let addButton = teleportElement.querySelector('button.ajouter')

                addButton.addEventListener('click', function () {
                    Card.add(product)

                    Notification.succes("Vous avez ajouté le produit \"" + product.title + "\" de " + product.price + "$ avec succès")
                    DomProduct.remove(teleportElement)
                })
            })
        })
    }


    static changeImage (src, target, parrent = 1)
    {
        let src_elements = document.querySelectorAll(src)

        const targetParent = (element, prof, cible) => {
            switch (prof) {
                case 1:
                    return element.parentNode.querySelector(cible)
                    break;
            
                case 2:
                    return element.parentNode.parentNode.querySelector(cible)
                    break;
            
            
                case 3:
                    return element.parentNode.parentNode.parentNode.querySelector(cible)
                    break;
            }
        }

        src_elements.forEach(element => {
            element.addEventListener('click', () => {
                targetParent(element, parrent, target).src = element.src
            })
        })
    }


    static interactWithProducts ()
    {
        let choppingCartBtns = document.querySelectorAll('.nos_produits .container_prod .item_prod .icones i.fa-shopping-cart')
        let showProducts = document.querySelectorAll('.nos_produits .container_prod .item_prod .icones i.fa-search-plus')
        let evalProduct = document.querySelectorAll('.nos_produits .container_prod .item_prod .icones i.fa-star')
        let copyLink = document.querySelectorAll('.nos_produits .container_prod .item_prod .icones i.fa-share')
    
        choppingCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let product = JSON.parse(btn.parentNode.dataset.content)
                Card.add(product)
                Notification.succes('Produit ajouté au panier')
            })
        })

        showProducts.forEach(btn => {
            btn.addEventListener('click', () => {
                Product.showProduct(btn)
            })
        })

        evalProduct.forEach(btn => {
            btn.addEventListener('click', () => {
                let { teleportElement } = DomProduct.showModal(btn, function () {
                    return `
                        <div class="boite_eval">
                            <div class="close">
                                <i class="fas fa-times close_btn"></i>
                            </div>
                            <h2>Evaluer le produit !!!</h2>
                            <div class="emoji">
                                <span class="active visible">-</span>
                                <span data-emoji="star1">&#128545;</span>
                                <span data-emoji="star2">&#128542;</span>
                                <span data-emoji="star3">&#128527;</span>
                                <span data-emoji="star4">&#128562;</span>
                                <span data-emoji="star5">&#128515;</span>
                            </div>
                            <div class="stars">
                                <i class="fas fa-star" data-emoji="star1"></i>
                                <i class="fas fa-star" data-emoji="star2"></i>
                                <i class="fas fa-star" data-emoji="star3"></i>
                                <i class="fas fa-star" data-emoji="star4"></i>
                                <i class="fas fa-star" data-emoji="star5"></i>
                            </div>
                            <div class="boutons">
                                <button class="evaluer">Evaluer</button>
                            </div>
                        </div>
                    `
                })
                let stars = teleportElement.querySelectorAll('.stars i')
                let emojis = teleportElement.querySelectorAll('.emoji span')
                let button = teleportElement.querySelector('.boutons button')

                stars.forEach((star, index) => {
                    star.addEventListener('click', () => {
                        teleportElement.querySelectorAll('.stars i').forEach(e => e.classList.remove('active'))
                        teleportElement.querySelectorAll('.emoji span').forEach(e => e.classList.remove('active'))
                        
                        for(let i = 0; i <= index; i++) {
                            stars[i].classList.add('active')
                        }
                        emojis.forEach(emoji => {
                            if(star.dataset.emoji == emoji.dataset.emoji) {
                                emoji.classList.add('active')
                            }
                        })

                    })
                })

                button.addEventListener('click', () => {
                    teleportElement.click()
                    Notification.succes('Produit evalué avec succès')
                })
            })
        })

        copyLink.forEach(btn => {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(btn.dataset.content)
                Notification.succes('Lien copié')
            })
        })
    }


    static showProduct (btn = null, includeProduct = null)
    {
        const { teleportElement, product } = DomProduct.showModal(btn, function (product) {
            if(product === undefined) {
                product = includeProduct
            }
            return `
                <div class="enSavoirPLus showProducts">
                    <div class="close">
                        <i class="fas fa-times"></i>
                    </div>
                    <div class="content">
                        <a download href="../${product.image}" class="image">
                            <img src="../${product.image}">
                        </a>
            
                        <div class="details">
                            <h2>${product.title}</h2>
                            <p>
                                ${product.description}
                            </p>
                            <div class="stars">
                                ${DomProduct.stars(product.stars)}
                            </div>
                            <p class="price">
                                ${product.price}$
                                <span>${product.old_price}$</span>
                            </p>
                            <div class="buttons">
                                <button class="btn">
                                    <span>Ajouter au panier</span>
                                    <i class="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
        teleportElement.querySelector('.buttons button').addEventListener('click', () => {
            Card.add(product == undefined ? includeProduct : product)
            Notification.succes('Produit ajouté au panier')
        })
    }
}