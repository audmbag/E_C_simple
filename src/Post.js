import DomProduct from "./DomProduct.js"
import Notification from "./Notification.js"

export default class Posts {


    static showMore ()
    {
        let buttons = document.querySelectorAll('.nos_blog .container_blog .item_blog button.show')

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                Posts.show(button)
                Posts.likes()
            })
        })
    }

    static show (element = null, includePost = null)
    {
        DomProduct.showModal(element, function (post) {
            if(post === undefined) {
                post = includePost
            }
            return `
                <div class="blog_toggle">
                    <div class="femer">
                        <i class="fas fa-times close"></i>
                    </div>
                    <img src="../${post.image}">
                    <h2>${post.title}</h2>

                    <div class="details">
                        <button class="like" data-content="${post.likes}">
                            <i class="far fa-thumbs-up"></i>
                            <span>${post.likes}</span>
                        </button>
                        <button class="share" data-content="${location.origin + location.pathname + '#' + post.id}">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
            
                    <div>
                        ${post.content}
                    </div>
                    
                    <div class="detail">
                        <p>
                            <span>Sources :</span>
                            <span>
                                <a href="${post.source}">${post.source}</a>
                            </span>
                        </p>
                        <p>
                            <span>Auteur :</span>
                            <span>${post.author}</span>
                        </p>
                    </div>
                    
                    <div class="footer_blg">
                        <div class="date">
                            <i class="fas fa-calendar"></i>
                            <span>${post.created_at}</span>
                        </div>
                        <div class="auteur">
                            <i class="fas fa-user"></i>
                            <span>${post.author}</span>
                        </div>
                    </div>
                </div>
            `
        })
    }

    static likes ()
    {
        let likesBtns = document.querySelectorAll('.details .like')
        likesBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.querySelector('i').classList.replace('far', 'fas')
                btn.querySelector('span').innerHTML = parseInt(btn.dataset.content) + 1
            })
        })
        let shareBtns = document.querySelectorAll('.details .share')
        shareBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(btn.dataset.content)
                Notification.succes('Lien Copié')
            })
        })
    }
}