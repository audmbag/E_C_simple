// // pour changer le theme
// let theme_containt = document.querySelector('.theme p');
// let condTog = true;
// theme_containt.onclick = () => {
//     theme_containt.classList.add('active')
    
    
//     localStorage.setItem('themetoggle', JSON.stringify(condTog))
//     let val_local = JSON.parse(localStorage.getItem('themetoggle'))

//     if(val_local == true){
//         theme_containt.classList.add('active')
        
//         if(theme_containt.classList.contains('active')){
//             document.querySelector(':root').classList.add('active');
//             document.body.classList.add('active');
//         }
//     }
//     else{
//         document.querySelector(':root').classList.remove('active');
//         document.body.classList.remove('active');
//     }
// }


// pour changer le theme
let theme_containt = document.querySelector('.theme p');
// localStorage.setItem('themetoggle', JSON.stringify(condTog))

window.onload = () => {
    theme_containt.onclick = () => {
        theme_containt.classList.toggle('active')
    
        if(theme_containt.classList.contains('active')){
            localStorage.setItem('themetoggle', true);
        }else{
            localStorage.setItem('themetoggle', false);
        }

        if(localStorage.getItem('themetoggle') != null){
    
            if(JSON.parse(localStorage.getItem('themetoggle')) == true){
                document.querySelector(':root').classList.add('active');
                document.body.classList.add('active');
                theme_containt.classList.add('active')
            }
            else if(JSON.parse(localStorage.getItem('themetoggle')) == false){
                document.querySelector(':root').classList.remove('active');
                document.body.classList.remove('active');
                theme_containt.classList.remove('active')
            }
        }
        else{
            localStorage.setItem('themetoggle', false);
        }
    }
}
if(localStorage.getItem('themetoggle') != null){
    
    if(JSON.parse(localStorage.getItem('themetoggle')) == true){
        document.querySelector(':root').classList.add('active');
        document.body.classList.add('active');
        theme_containt.classList.add('active')
    }
    else if(JSON.parse(localStorage.getItem('themetoggle')) == false){
        document.querySelector(':root').classList.remove('active');
        document.body.classList.remove('active');
        theme_containt.classList.remove('active')
    }
}
else{
    localStorage.setItem('themetoggle', false);
}





let menu_btn = document.querySelector('.navigation .icones .fa-bars');
let navigation_bar = document.querySelector('.navigation .links');
let overlay = document.querySelector('.overlay');
menu_btn.onclick = () => {
    navigation_bar.classList.add('active');
    overlay.classList.add('active');
}


let close_menu = document.querySelector('.navigation .links .fa-times');
close_menu.onclick = () => {
    navigation_bar.classList.remove('active');
    overlay.classList.remove('active');
}

overlay.onclick = () => {
    navigation_bar.classList.remove('active');
    overlay.classList.remove('active');
    savoirplus_box?.classList.remove('active')
}

document.querySelector('.navigation .icones .fa-search').onclick = () => {
    document.querySelector('.navigation .input_container').classList.toggle('active');
}

// let load = document.querySelector('.load')
// window.onload = () => {
//     load.style.visibility = 'hidden';
// }
window.onscroll = () => {
    overlay.classList.remove('active');
    navigation_bar.classList.remove('active');
    if(window.scrollY > 0){
        document.querySelector('.navigation').classList.add('active');
        document.querySelector('.lien_haut_page').classList.add('active');
    }
    else{
        document.querySelector('.navigation').classList.remove('active');
        document.querySelector('.lien_haut_page').classList.remove('active');
    }
}

let btn_plus_acc = document.querySelector('.plus');
let cartes = [...document.querySelectorAll('.meilleurs .carte')];
let inc = 3;

btn_plus_acc.onclick = () => {
    for(var i = inc; i < inc + 3; i++){
        cartes[i].style.display = 'block';
    }
    inc += 3;
    if(inc >= cartes.length){
        btn_plus_acc.style.display = 'none';
    }
}

// voir les produits offre special acceuil
let cartes_target = document.querySelectorAll('.meilleurs .carte');
let overlay2 = document.querySelector('.overlay2');

cartes_target.forEach(carte =>{
    carte.onclick = () => {
        let carte_data_name = carte.getAttribute('data-name');
        document.querySelectorAll('.item').forEach(item => {
            let item_data_target = item.getAttribute('data-target');
            
            if(carte_data_name == item_data_target){
                item.classList.add('active');
                overlay2.classList.add('active');
            }
        })
    }
})
overlay2.onclick = () => {
    overlay2.classList.remove('active');
    document.querySelectorAll('.item').forEach(ovclose =>{
        ovclose.classList.remove('active');
    })
}
document.querySelectorAll('.item').forEach(close_btn => {
    close_btn.querySelector('.fa-times').onclick = () => {
        close_btn.classList.remove('active');
        overlay2.classList.remove('active');
    }
})



// liker notre page 


let heart =  document.querySelector('.navigation .icones .fa-heart')

heart.onclick = () => {
    heart.classList.add('active')
    let heartContainer =  document.createElement('div')
    heartContainer.setAttribute('class', 'heartCont')
    document.body.appendChild(heartContainer)



    heartContainer.innerHTML = `
        <i id="fermer" class="fas fa-times"></i>
        <i class="fas fa-smile-beam"></i>
        <h2>Merci Beaucoup !!!</h2>

        <p>shoppy vous dis merci d'avoir liker son site et vous promet qu'il ne vous décevra pas</p>
        <button id="fermer">OK</button>
        <div class="indic"></div>
    `
    setTimeout(() => {
        heartContainer.remove();
        heart.classList.remove('active')
    }, 6000)


    heartContainer.querySelectorAll('#fermer').forEach(close => {
        close.onclick = () => {
            heartContainer.remove();
            heart.classList.remove('active')
        }
    })
}
// if(heartContainer != undefined){
//     heart.style.pointerEvents = 'none';
// }
// else (heartContainer == undefined){
//     heart.style.pointerEvents = 'initial';
// }