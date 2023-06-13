export default class DomProduct {

    /**
     * 
     * @param {String} link | lien de la source des produits
     * @param {String} tag | tage du container des produits
     */
    constructor (link, tag)
    {
        this.link = link
        this.container = document.querySelector(tag)
    }

    async #getProducts ()
    {
        let request = await fetch(this.link)
        
        if(request.ok === true) {
            return request.json()
        }
    }


    /**
     * 
     * @param {callback} callback | returne la structure html du produit
     */
    async fill (callback, step = null, reactivity = null)
    {
        let iterator = ""
        return this.#getProducts().then(products => {
            if(step === null) {
                products.forEach(product => {
                    iterator += callback(product)
                })
                this.container.innerHTML = iterator
            }
            else {
                let button = document.createElement('button')
                button.innerHTML = "Voir plus"
                button.classList.add('plus')

                let showProduct = (width = step) => {
                    iterator = ""
                    for(let i = 0; i < width; i++) {
                        iterator += callback(products[i])
                    }
                    this.container.innerHTML = iterator
                }
                showProduct()

                this.container.insertAdjacentElement('afterend', button)

                let len = step * 2

                button.addEventListener('click', () => {
                    showProduct(len)
                    
                    if(reactivity !== null) {
                        reactivity()
                    }

                    len += step

                    if(len - step >= products.length) {
                        DomProduct.remove(button)
                    }
                })
            }
        })
    }

    static teleport (element, to = 'body', animation = true)
    {
        let parrent = document.querySelector(to)
        element.style.opacity = "0"
        element.style.transition = ".2s linear"
        parrent.appendChild(element)

        setTimeout(() => {
            element.style.opacity = "1"
        }, animation ? 200 : 0)

        return element
    }
    static remove (element, animation = true, duration = 20)
    {
        element.style.transition = '.2s linear'
        element.style.opacity = '0'
        setTimeout(() => {
            element.remove()
        }, animation ? duration : 0)
        DomProduct.showscrool()
    }


    /**
     * 
     * @param {HTMLElement} container 
     * @param {callback} callback 
     */
    static showModal (element = null, callback)
    {
        DomProduct.hidscrool()

        let overflow = document.createElement('div')
        overflow.classList.add('overlay2')
        let teleportElement = DomProduct.teleport(overflow)

        
        const apply_close = () => {
            overflow.addEventListener('click', () => {
                DomProduct.remove(overflow)
                DomProduct.showscrool()
                location.hash = ""
            })
    
            let child = overflow.querySelector('div')
            child.addEventListener('click', e => e.stopPropagation())
            child.querySelector('.close').addEventListener('click', () => {
                DomProduct.remove(overflow)
                DomProduct.showscrool()
                location.hash = ""
            })
        }

        if(element && element.dataset.content) {
            let product = JSON.parse(element.dataset.content)
    
            teleportElement.innerHTML = callback(product)
            apply_close()
            
            return { teleportElement, product }
        }else {
            teleportElement.innerHTML = callback()
            apply_close()
            return { teleportElement }
        }
        
    }


    static stars (nbr)
    {
        let iterator_stars = [];
        let iterator_no = []
        let diff = 5 - nbr

        for(let i = 0; i <= nbr; i = i + 0.5) {
            if([1, 2, 3, 4, 5].indexOf(i) != -1) {
                iterator_stars.push('<i class="fas fa-star"></i>')
            }
            if(i == nbr && nbr.toString().length == 3) {
                iterator_stars.push('<i class="fas fa-star-half-alt"></i>')
            }
        }
        for(let i = 0; i <= diff; i = i + 0.5) {
            if([1, 2, 3, 4, 5].indexOf(i) != -1) {
                iterator_no.push('<i class="far fa-star"></i>')
            }
        }
        return iterator_stars.concat(iterator_no).join(' ')
    }


    static hidscrool ()
    {
        document.body.style.overflow = 'hidden'
    }

    static showscrool ()
    {
        document.body.style.removeProperty('overflow')
    }


    static activeGroup (tag)
    {
        let elements = document.querySelectorAll(tag)

        elements.forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll(tag).forEach(e => e.classList.remove('active'))
                e.target.classList.add('active')
            })
        })
    }


    static hash (link, callback)
    {
        let hash = parseInt(location.hash.replace('#', ""))

        if(hash) {
            fetch(link).then(res => res.json())
            .then(response => {
                let product = response.find(p => p.id == hash)
                if(product) {
                    callback(product)
                }
            })
        }
    }
}