import { Store } from '../core/heropy'

interface State{
    photo: string,
    name: string,
    email: string,
    blog: string,
    github: string,
    repository: string
}

export default new Store <State>({
    photo: 'https://avatars.githubusercontent.com/u/143234752?v=4',
    name: 'LIKA-7 / OhJongSoo',
    email: 'ohjongso514@gmail.com',
    blog: 'https://lika7.tistory.com/',
    github: 'https://github.com/lika-7',
    repository: 'https://github.com/lika-7'
})