import Layout from '../src/Layouts.js';

import '../src/App.js'

import DomProduct from '../src/DomProduct.js';

Layout.setHeader()
Layout.setFooter()


let aboutUsBtn = document.querySelector('.aboutUsBtn')

aboutUsBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    await fetch('../layout/about.html').then(res => res.text())
    .then(response => {
        DomProduct.showModal(aboutUsBtn, function () {
            return response
        })
    })
})

document.addEventListener('DOMContentLoaded', async () => {
    let domProduct = new DomProduct('../datas/questions.json', '.apropos_questions .container_ap')

    domProduct.fill(function (question) {
        return `
            <div class="item_ap">
                <h2>${question.question} <i class="fas fa-chevron-down"></i></h2>
                <p>${question.response}</p>
            </div>
        `
    }, 3, function () {
        DomProduct.activeGroup('.apropos_questions .container_ap .item_ap')
    }).then(response => {
        DomProduct.activeGroup('.apropos_questions .container_ap .item_ap')
    })

    await fetch('../datas/clientsAvis.json').then(res => res.json())
    .then(response => {
        Layout.slide('.container_avis', response, function (data, index) {
            return `
                <div class="item_app it${index}">
                    <div class="icones">
                        <a href="${data.facebook}"><i class="fab fa-facebook-f"></i></a>
                        <a href="${data.instagram}"><i class="fab fa-instagram"></i></a>
                        <a href="${data.twitter}"><i class="fab fa-twitter"></i></a>
                        <a href="${data.pinterest}"><i class="fab fa-pinterest"></i></a>
                    </div>
                    <div class="image_app">
                        <img src="../${data.photo}">
                    </div>
                    <div class="containt_app">
                        <h2>${data.name}</h2>
                        <p>${data.paragraph}</p>
                        ${DomProduct.stars(data.stars)}
                    </div>
                </div>
            `
        })
    })

})