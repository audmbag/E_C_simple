import Notification from "./Notification.js"

const STORE = 'products'

export default class Card {

    /**
     * 
     * @param {object} product 
     */
    static add (product)
    {
        let productExist = Card.content()

        let product_find = productExist.find(store_product => store_product.id == product.id)

        if(product_find) {
            Card.updateQuantity(product_find, 1)
        }else {
            product.quantity = 1
            productExist.push(product)
            Card.store(productExist)
        }
        
        Card.emit()
    }


    static updateQuantity (product, quantity)
    {
        let productExist = Card.content()

        let newProducts = productExist.map(function (store_product) {
            if(product.id == store_product.id) {
                store_product.quantity = store_product.quantity + quantity
                return store_product
            }
            return store_product
        })
        Card.store(newProducts)

        Card.emit()
    }

    static remove (product_id)
    {
        let productExist = Card.content()

        let newProducts = productExist.filter(store_product => store_product.id != product_id)

        Card.store(newProducts)

        Card.emit()
    }


    static count ()
    {
        return this.content().length
    }


    static content ()
    {
        return JSON.parse(localStorage.getItem(STORE)) || []
    }


    static store (products)
    {
        localStorage.setItem(STORE, JSON.stringify(products))
    }

    static emit ()
    {
        let event = new CustomEvent("productsUpdated", {
            bubbles: true,
            detail: {
                content: Card.content(),
                count: Card.count()
            }
        });
        document.dispatchEvent(event);
    }

    static totals ()
    {
        let content = Card.content()

        const sum = (arr, key) => {
            let result = 0
            arr.forEach(element => {
                key == 'old' ? result += (element.old_price * element.quantity) : result += (element.price * element.quantity)
            });
            return result
        }

        let totalAll = sum(content, 'old')
        let totalForPayement = sum(content, 'current')
        let totalReduction = totalAll - totalForPayement

        return {
            totalAll,
            totalForPayement,
            totalReduction
        }
    }
}