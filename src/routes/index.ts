import { createRouter } from '../core/heropy'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter([
    {path: '#/', component: Home},
    {path: '#/movie', component: Movie},
    {path: '#/about', component: About},
    {path: '.*', component: NotFound}
    //위의 라우츠를 지나 제일 마지막 까지 도착 하면 모든 정규표현식을 만족하는 내용인 본 코드를 실행
    //0개 이상의 일치를 의미하는 정규표현식
    //{path: '.{0,}', component: NotFound}
])