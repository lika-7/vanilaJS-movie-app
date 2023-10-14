import { Component } from '../core/heropy'
import movieStore, { searchMovies } from '../store/movie'
export default class Search extends Component{
    render(){
        this.el.classList.add('search')
        this.el.innerHTML = /*html*/`
            <input 
                value="${movieStore.state.searchText}"
                placeholder = "Enter the movie title to search!" 
            />
            <button class="btn btn-primary">
                Search!
            </button>
        `
        //검색 기능이 필요, 데이터 입력 할 때, 버튼 누르거나 엔터키 눌렀을 때 실행되어야 함
        const inputEl = this.el.querySelector('input')
        inputEl?.addEventListener('input', ()=>{
            movieStore.state.searchText = inputEl.value
        })
        inputEl?.addEventListener('keydown', event=>{
            if(event.key==='Enter' && movieStore.state.searchText.trim()){ //앞,뒤 공백의 제거이며, 공백을 제거했을 때 데이터가 없으면 false 있으면 true를 반환한다
                searchMovies(1)
            }
        })
        const btnEl = this.el.querySelector('.btn')
        btnEl?.addEventListener('click', ()=>{
            if(movieStore.state.searchText.trim()){ //앞,뒤 공백의 제거이며, 공백을 제거했을 때 데이터가 없으면 false 있으면 true를 반환한다
                searchMovies(1)
            }
        })
    }
}