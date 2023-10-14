import { Store } from '../core/heropy'

export interface SimpleMovie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
  }  
interface DetailedMovie {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    Ratings: {
        Source: string
        Value: string
    }[]
    Metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: string
}

  
interface State {
    searchText:string,
    page: number,
    pageMax: number,
    movies: SimpleMovie[],
    loading: boolean,
    message: string,
    movie: DetailedMovie
}
const store = new Store<State>({
    //영화 목록
    searchText:'',
    page: 1,
    pageMax:1,
    movies: [],
    loading: false,
    message: 'Search for the movie title!',
    //영화 상세 정보
    movie: {} as DetailedMovie
})

export default store
export const searchMovies = async (page:number) =>{
    store.state.loading = true
    store.state.page= page
    if(page===1){
        store.state.movies = []
        store.state.message = ''
    }
    try{
        const res = await fetch('/api/movie', {/*컴퓨팅 서버에 데이터 요청, 컴퓨팅 서버가 API키 가지고 있음*/
            method: 'POST',
            body: JSON.stringify({
                title:store.state.searchText,
                page
            })
        })
        const { Search, totalResults, Response, Error } = await res.json()
        console.log('Response:',Response,'Error:',Error)
        if(Response === 'True'){
            store.state.movies=[
                ...store.state.movies, //1page
                ...Search   //store.state.movies에 1page 들어 있으면 2페이지 3페이지, store.state.movies에 1,2 page들어 있으면 3page, 4page 들어 감 
            ]
            store.state.pageMax = Math.ceil(Number(totalResults) / 10)
        }else{
            store.state.message= Error
            store.state.pageMax = 1
        }
    }catch(error){
        console.log('searchMovies error', error)
    }finally{
        store.state.loading = false
    }
}
export const getMovieDetails = async (id:string) => {
    try{
        const res = await fetch('/api/movie', {/*컴퓨팅 서버에 데이터 요청, 컴퓨팅 서버가 API키 가지고 있음*/
            method: 'POST',
            body: JSON.stringify({
                id
            })
        })
        store.state.movie = await res.json()
    }catch(error){
        console.log('getMovieDetails error', error)
    }
}