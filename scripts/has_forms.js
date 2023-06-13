import '../src/App.js'
import Layout from '../src/Layouts.js';

Layout.setHeader()
Layout.setFooter()

let inputs = document.querySelectorAll('form div input');

inputs.forEach(input => input.oninput = (e) => {

    if(e.target.value !== ''){
        e.target.parentNode.classList.add('active');
    }
    else if(e.target.value == ''){
        e.target.parentNode.classList.remove('active');
    }
})

let textarea = document.querySelector('form div textarea');

textarea.oninput = (e) => {
    if(e.target.value !== ''){
        e.target.parentNode.classList.add('active');
    }
    else if(e.target.value == ''){
        e.target.parentNode.classList.remove('active');
    }
}
