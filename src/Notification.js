import DomProduct from './DomProduct.js';

export default class Notification
{


    static succes (message)
    {
        Notification.mount(message, false)
    }


    static confirm (message, callable)
    {
        let div = Notification.mount(message, true)

        document.body.style.pointerEvents = 'none'
        document.body.style.userSelect = 'none'
        div.style.pointerEvents = 'auto'
        div.style.userSelect = 'text'

        let confirmBtn = div.querySelector('.confirm')
        let cancelmBtn = div.querySelector('.cancel')
        
        confirmBtn.addEventListener('click', () => {
            callable()
            document.body.style.removeProperty('pointer-events')
            document.body.style.userSelect = 'auto'
        })
        cancelmBtn.addEventListener('click', () => {
            document.body.style.removeProperty('pointer-events')
            document.body.style.userSelect = 'auto'
        })
    }

    static mount (message, isquestion)
    {
        let div = document.createElement('div')
        div.classList.add('heartCont', 'panier_alert', 'active')
        if(isquestion) {
            div.classList.add('question')
        }

        let buttons = '<button id="fermer" class="fermer">OK</button>'
        if(isquestion) {
            buttons = `<button id="fermer" class="fermer confirm">Confirmer</button>
                        <button id="fermer" class="fermer cancel">Annuler</button>`
        }

        div.innerHTML = `
            <i id="fermer" class="fermer" class="fas fa-times"></i>
            <i class="fas ${isquestion ? 'fa-question' : 'fa-check'}"></i>
            <h2>${message}</h2>
            <div class="buttons">
                ${buttons}
            </div>
            <div class="indic"></div>
        `

        DomProduct.teleport(div, 'body', false)

        div.querySelectorAll('.fermer').forEach(btn => {
            btn.addEventListener('click', () => {
                div.classList.remove('active')
                div.remove()
            })
        })
        if(!div.classList.contains('question')) {
            setTimeout(() => {
                div.remove()
            }, 5000);
        }

        return div
    }
}