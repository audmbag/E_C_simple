import Card from "./Card.js"
import DomProduct from "./DomProduct.js"
import Notification from "./Notification.js"


export default class CartController {


    static setFooter ()
    {
        let container_footer = document.querySelector('.total_a_payer')

        const { totalAll, totalForPayement, totalReduction } = Card.totals()

        container_footer.innerHTML = `
            <p>
                <span>Total articles :</span>
                <span>${Card.count()} Article${Card.count() <= 1 ? '' : 's'}</span>
            </p>
            <p>
                <span>Total :</span>
                <span>${totalAll}$</span>
            </p>
            <p>
                <span>Total à payer :</span>
                <span>${totalForPayement}$</span>
            </p>
            <p>
                <span>Total réduction :</span>
                <span>${totalReduction}$</span>
            </p>

            <button>Procedez au payement</button>
        `
        return container_footer
    }


    static setProducts (callable)
    {
        let container = document.querySelector('.vos_produits .cont_char')
        let products = Card.content()
        let result = ""

        products.forEach(product => {
            result += `
                <div class="item" data-content='${JSON.stringify(product)}'>
                    <div class="left">
                        <div class="image">
                            <img src="../${product.image}" alt="">
                        </div>
                        <div class="content">
                            <h2>${product.title}</h2>
                            <p class="price">
                                <span>Prix : </span>
                                <span>${product.price}$</span>
                            </p>
                            <div class="quantity">
                                <button class="dec">-</button>
                                <span class="productQuantity">${product.quantity}</span>
                                <button class="inc">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <p>
                        ${product.quantity * product.price}$
                        </p>
                        <button class="remove">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `
        });
        container.innerHTML = result

        CartController.interactWithCart()
    }

    static interactWithCart()
    {
        let buttonsQuantity = document.querySelectorAll('.vos_produits .cont_char .item .left .content .quantity button')
        let removeBtns = document.querySelectorAll('.vos_produits .cont_char .item .buttons button')
        
        buttonsQuantity.forEach(btn => {
            btn.addEventListener('click', () => {
                let product = JSON.parse(btn.parentNode.parentNode.parentNode.parentNode.dataset.content)
                if(btn.classList.contains('dec')) {
                    if(product.quantity != 1) {
                        Card.updateQuantity(product, (- 1))
                        CartController.setProducts()
                    }
                }else if(btn.classList.contains('inc')) {
                    Card.updateQuantity(product, 1)
                    CartController.setProducts()
                }
            })
        })

        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                Notification.confirm("Vous ête sûr de vouloir suppriler le produit ?", function () {
                    let product = JSON.parse(btn.parentNode.parentNode.dataset.content)
                    DomProduct.remove(btn.parentNode.parentNode, true, 400)
    
                    setTimeout(() => {
                       Card.remove(product.id)
                    }, 400)
                })
            })
        });
    }
}