import {Component} from "../core/component";
import {apiService} from "../services/api.service";
import {renderPost} from "../templates/post.template"

export class FavoriteComponent extends Component{
    constructor(id, {loader}){
        super(id)
        this.loader = loader
    }

    init(){
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }

    onShow(){
        const favorites = JSON.parse(localStorage.getItem('favorites')) 
        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide(){
        this.$el.innerHTML=''
    }
}

async function linkClickHandler(event){
    event.preventDefault()
    if(event.target.classList.contains('js-link')){
        const postId = event.target.dataset.id
        this.$el.innerHTML=' '
        this.loader.show()
        const post = await apiService.fetchPostById(postId)
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}))
    }
}


function renderList(list = []){
    if(list && list.length){
        return `
            <ul>
                ${list.map(i => `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li >`).join(' ')}
            </ul>
        `
    }

    return `<p class="center">Ничего не добавлено</p>`
}