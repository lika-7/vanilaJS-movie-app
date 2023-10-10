import App from "./App"
import routes from "./routes"

const root = document.querySelector('#root')
root.append(new App().el)
routes()

/*(async ()=>{
    const res = await fetch('/api/test')
    const json = await res.json()
    console.log('/api/test',json)
})()*/