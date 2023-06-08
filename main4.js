let plus_blogs = document.querySelector('.voir_plus_bogs');
let items_blogs = [...document.querySelectorAll('.nos_blog .container_blog .item_blog')];


let nbr = 3;
plus_blogs.onclick = () => {
    for(let i = nbr; i < nbr + 3; i++){
        items_blogs[i].style.display = 'block';
    }
    nbr += 3;
    if (nbr >= items_blogs.length){
        plus_blogs.style.display = 'none';
    }
}


let btn_blog = document.querySelectorAll('.container_blog .item_blog button')
let blog_toggle = document.querySelectorAll('.blog_toggle')
let ov_blog = document.querySelector('.ov_blog')

btn_blog.forEach(btn => {
    btn.onclick = () => {
        ov_blog.classList.add('active')
        let data_btn = btn.getAttribute('data-blog')

        blog_toggle.forEach(item => {
            let data_item = item.getAttribute('data-blog')

            if(data_btn == data_item){
                item.classList.add('active')
            }
            item.querySelector('.femer .fa-times').onclick = () => {
                item.classList.remove('active')
                ov_blog.classList.remove('active')
            }
        })
    }
})

ov_blog.onclick = () => {
    ov_blog.classList.remove('active')
    blog_toggle.forEach(cls => cls.classList.remove('active'))
}