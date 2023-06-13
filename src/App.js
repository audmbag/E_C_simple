import Card from "./Card.js"
import DomProduct from "./DomProduct.js";
import Notification from "./Notification.js";

class CardBtn extends HTMLElement {

    connectedCallback() {
        this.setAttribute('count', Card.count())

        this.render();
    }

    static get observedAttributes() {
        return ['count'];
    }

    render()
    {
        this.innerHTML = `
            <a href="/pages/panier.html" target="bank">
                <i class="fas fa-shopping-cart"></i>
                ${ this.getAttribute('count') == 0 ? '' : `<span>${ this.getAttribute('count') }</span>`}
            </a>
        `
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        this.render()
    }
}

class SearchProduct extends HTMLElement {
    
    constructor ()
    {
        super()
        this.onInput = this.onInput.bind(this)

        this.classList.add('input_container')
        this.innerHTML = `
            <input type="search" autocomplete="off" id="search" placeholder="Rechercher un produit...">
            <label for="search" target="blank" style="pointer-events: none;"><i class="fas fa-search"></i></label>
        `

        this.querySelector('input').addEventListener('input', this.onInput)
    }

    async onInput (e)
    {
        let valueSearch = e.target.value

        this.querySelector('.container_search')?.remove()

        
        let container = document.createElement('div')
        container.classList.add('container_search')

        
        await fetch('../datas/all.json').then(res => res.json())
        .then(async (response) => {
            await fetch('../datas/posts.json').then(data => data.json())
                .then(dataBlog => {
                    let filterProducts = response.filter(product => product.title.toLowerCase().includes(valueSearch.toLowerCase()) || valueSearch == product.price)
                    let Posts = dataBlog.filter(post => post.title.toLowerCase().includes(valueSearch.toLowerCase()) || post.content.toLowerCase().includes(valueSearch.toLowerCase()))
                    this.fill(container, filterProducts, Posts)
                })
            
        })

        if(valueSearch.trim() != '') {
            DomProduct.teleport(container, '.input_container')
        }else {
            DomProduct.remove(container)
        }
        
        document.addEventListener('click', () => {
            DomProduct.remove(container)
            e.target.value = ""
        })

        container.addEventListener('click', (e) => {
            e.stopPropagation()
        })
        this.addEventListener('click', (e) => {
            e.stopPropagation()
        })
    }

    fill (container, filterProducts, filterPosts)
    {
        // console.log(filterProducts);
        let products = '<li class="title">PRODUITS</li>'
        let  posts = '<li class="title">BLOG</li>'

        filterProducts.forEach(product => {
            products += `
                <li>
                    <img src="../${product.image}">
                    <div>
                        <a href="/pages/produits.html#${product.id}">${product.title}</a>
                        <p>
                            ${product.description.slice(0, 50)}...
                        </p>
                        <p class="price">
                            <span>
                                ${product.price}$
                            </span>
                            <button data-content='${JSON.stringify(product)}'>
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </p>
                    </div>
                </li>
            `
        });
        filterPosts.forEach(post => {
            posts += `
                <li>
                    <img src="../${post.image}">
                    <div>
                        <a href="/pages/blogs.html#${post.id}">${post.title}</a>
                        <p>
                            ${post.content.slice(0, 50)}...
                        </p>
                        <p class="price">
                            <a href="/pages/blogs.html#${post.id}" class="link">
                                Voir plus
                                <i class="fas fa-long-arrow-alt-right"></i>
                            </a>
                        </p>
                    </div>
                </li>
            `
        });
        
        let ul = document.createElement('ul')
        ul.innerHTML = (filterProducts.length != 0 ? products : '') + (filterPosts.length != 0 ? posts : '')
        
        if(filterProducts.length === 0 && filterPosts.length === 0) {
            ul.innerHTML = `
                <li class="notfound">
                    Aucun resultat
                </li>
            `
        }
        container.appendChild(ul)

        ul.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                let product = JSON.parse(button.dataset.content);

                Card.add(product)
                Notification.succes('Produit ajouté au panier')
            })
        });
    }
}


customElements.define('cart-btn', CardBtn)
customElements.define('search-product', SearchProduct)

document.addEventListener('productsUpdated', function (e) {
    document.querySelector('cart-btn').setAttribute('count', e.detail.count)
})