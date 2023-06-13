import Layout from '../src/Layouts.js';

import '../src/App.js'
import DomProduct from '../src/DomProduct.js';
import Posts from '../src/Post.js';


Layout.setHeader()
Layout.setFooter()


document.addEventListener('DOMContentLoaded', () => {
    let domproducts = new DomProduct('../datas/posts.json', '.nos_blog .container_blog')
    domproducts.fill(function (post) {
        return `
            <div class="item_blog">
                <div class="image">
                    <img src="../${post.image}">
                </div>
                <h2>${post.title.substr(0, 20)}...</h2>
                <p>${post.content.substr(0, 50)}...</p>

                <div class="details">
                    <button class="like" data-content="${post.likes}">
                        <i class="far fa-thumbs-up"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button class="share" data-content="${location.origin + location.pathname + '#' + post.id}">
                        <i class="fas fa-share"></i>
                    </button>
                </div>

                <button class="show" data-content='${JSON.stringify(post)}' class="b">lire plus</button>

                <div class="foot_blog">
                    <p class="date">
                        <i class="fas fa-calendar"></i>
                        <span>${post.created_at}</span>
                    </p>
                    <p class="par_qui">
                        <i class="fas fa-user"></i>
                        <span>${post.author}</span>
                    </p>
                </div>
            </div>
        `
    }, 3, function () {
        Posts.showMore()
        Posts.likes()
    }).then(response => {
        Posts.showMore()
        Posts.likes()
    })

    DomProduct.hash('../datas/posts.json', function (post) {
        Posts.show(null, post)
        Posts.likes()
    })
})