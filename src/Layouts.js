import DomProduct from "./DomProduct.js"

export default class Layout {

    static async content (link)
    {
        let response = await fetch(link)

        if(response.ok === true) {
            return response.text()
        }
    }

    static async setHeader (link = '../layout/header.html')
    {
        return await Layout.content(link).then(response => {
            document.querySelector('header').innerHTML = response

            let nav_btn = document.querySelector('.navigation .icones i.fa-bars')
            let links = document.querySelector('.navigation .links')

            
            let div = document.createElement('div')
            div.classList.add('overlay')

            nav_btn.addEventListener('click', function () {
                DomProduct.teleport(div, 'header .navigation')

                links.classList.add('active')
                DomProduct.hidscrool()
            })

            links.querySelector('i.fa-times').addEventListener('click', () => {
                links.classList.remove('active')
                DomProduct.showscrool()
                DomProduct.remove(div)
            })
            
            div.addEventListener('click', () => {
                links.classList.remove('active')
                DomProduct.showscrool()
                DomProduct.remove(div)
            })


            let themeBtn = links.querySelector('.theme p')

            themeBtn.addEventListener('click', () => {
                Layout.toogleTheme()
            })
        }).then(response => {
            Layout.applyTheme()
        }) 
    }


    static setFooter (link = '../layout/footer.html')
    {
        Layout.content(link).then(response => {
            document.querySelector('footer').innerHTML = response
        })
    }


    static toogleTheme ()
    {
        let currentTheme = localStorage.getItem('theme') || 0
        let body = document.body

        let themeBtn = document.querySelector('.theme p')
        
        if(currentTheme == 0) {
            body.classList.add('active')
            body.classList.remove('default')

            themeBtn.classList.add('active')

            localStorage.setItem('theme', 1)
        }else {
            body.classList.remove('active')
            body.classList.add('default')

            themeBtn.classList.remove('active')

            localStorage.setItem('theme', 0)
        }
    }

    static applyTheme ()
    {
        let currentTheme = localStorage.getItem('theme') || 0
        let body = document.body

        if(currentTheme == 1) {
            body.classList.add('active')
            body.classList.remove('default')

            document.querySelector('.theme p').classList.add('active')
        }else {
            body.classList.remove('active')
            body.classList.add('default')
        }
    }


    static slide (tag, datas, callable)
    {
        let radios = ""
        let control_left = ""
        let control_right = ""

        let result = ''

        for(let i = 0; i < datas.length; i++) {
            radios += `<input type="radio" name="slide" id="s${i + 1}" ${i == 3 ? 'checked' : ''}>`
            control_left += `<label class="sl${i + 1}" for="s${i + 1}"><i class="fas fa-angle-left"></i></label>`
            control_right += `<label class="sl${i + 1}" for="s${i + 1}"><i class="fas fa-angle-right"></i></label>`
        
            result += callable(datas[i], i + 1)
        }
        
        let controles = `
            ${radios}
            <div class="controles left">
                ${control_left}
            </div>

            <div class="controles right">
                ${control_right}
            </div>
        `


        let container = document.createElement('div')
        container.classList.add('container_app_slide')
        
        container.innerHTML = `
            <div class="container_app">
                ${result}
            </div>
        `
        document.querySelector(tag).innerHTML = controles
        document.querySelector(tag).appendChild(container)
    }
}