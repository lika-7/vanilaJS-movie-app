import fetch from 'node-fetch' //node 환경에서 실행 할거고, node환경에서는 fetch 함수가 없어서 필요함

const {APIKEY} = process.env

export default async function handler(request, response){
    const {title, page, id} = JSON.parse(request.body)
    const url = id 
        ?`https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full`
        :`https://www.omdbapi.com/?apikey=${APIKEY}&s=${title}&page=${page}`
    const res = await fetch(url)
    const json = await res.json()
    response.status(200).json(json)
}