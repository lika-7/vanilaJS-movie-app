import { Component } from '../core/heropy'

export default class MovieItem extends Component{
    constructor(props){ //props로 영화 정보 받아와서 {movie}에 할당함
        super({
            props,
            tagName: 'a'
        })
    }
    render(){
        const { movie } = this.props
        this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`)
        this.el.classList.add('movie')
        this.el.style.backgroundImage = `url(${movie.Poster})` // 이미지 테그를 쓰는게 아니라 backgroundImage를 쓰는 이유는 사진의 크기가 달라서, 화면에 출력되는 내용은 같은 크기로 하고 싶어서임
        this.el.innerHTML = /* html */`
            <div class="info">
                <div class="year">
                    ${movie.Year}
                </div>
                <div class="title">
                    ${movie.Title}
                </div>
            </div>
        `
    }
}