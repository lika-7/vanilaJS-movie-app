import { Component } from '../core/heropy'
import aboutStore from '../store/about'

interface State{
    [key:string]:unknown
    menus: {
        name:string,
        href:string,
    }[]
}

export default class TheHeader extends Component{
    public state!: State
    constructor(){
        super({
            tagName: 'header',
            state:{
                menus: [//프론트엔드는 데이터를 기반으로 사고 해야 함. HTML을 가지고 구조를 일일이 짜는게 아니고
                    {   //아래의 예시와 같이 데이터를 가지고 html을 출력한다고 생각해야 함
                        name: 'Search',
                        href: '#/'
                    },
                    {
                        name: 'Movie',
                        href: '#/movie?id=tt4520988'
                    },
                    {
                        name: 'About',
                        href: '#/about'
                    }
                ]
            }
        })
        window.addEventListener('popstate', ()=>{
            this.render()
        })
    }
    render(){
        this.el.innerHTML = /*html*/`
            <a href="#/"class="logo">
                <span>OMDbAPI</span>.COM
            </a>
            <nav>
                <ul>
                    ${this.state.menus.map(menu=>{
                        const href = menu.href.split('?')[0]
                        const hash = location.hash.split('?')[0]
                        const isActive = href===hash
                        return /*html*/`
                            <li>
                                <a 
                                    class="${isActive? 'active':''}"
                                    href="${menu.href}">
                                    ${menu.name}
                                </a>
                            </li>
                        `
                    }).join('')}
                </ul>
            </nav>
            <a href="#/about" class="user">
                <img src="${aboutStore.state.photo}" alt="User">
            </a>
        `
    }
}