// en savoir plus 
let btn_savoirplus = document.querySelector('.apropos_principale .container .containt .btn')
let savoirplus_box = document.querySelector('.enSavoirPLus')
let close_savoirplus_box = document.querySelector('.enSavoirPLus .fa-times')
btn_savoirplus.onclick = () => {
    savoirplus_box.classList.add('active')
    overlay.classList.add('active')
}
close_savoirplus_box.onclick = () => {
    overlay.classList.remove('active')
    savoirplus_box.classList.remove('active')
}



let questions = document.querySelectorAll('.container_ap .item_ap');

questions.forEach(question => {
    question.onclick = (e) => {

        let chevron = e.target.querySelector('i');
        e.target.classList.toggle('active');
        chevron.classList.toggle('fa-chevron-up');

        for(var i = 0; i < questions.length; i++){
            if(e.target != questions[i]){
                questions[i].classList.remove('active');
                questions[i].querySelector('i').classList.remove('fa-chevron-up');
            }
        }
    }
})
// voir plus question
let question_btn = document.querySelector('.plus_questions');
let question_separe = [...document.querySelectorAll('.apropos_questions .container_ap .item_ap')];

let nombre = 3;
question_btn.onclick = () => {
    
    for(var i = nombre; i < nombre + 3; i++){
        question_separe[i].style.display = 'block';
    }
    nombre += 3;
    if(nombre >= question_separe.length){
        question_btn.style.display = 'none';
    }
}
