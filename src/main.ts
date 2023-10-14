import App from "./App"
import routes from "./routes"

const root = document.querySelector('#root')
root?.append(new App().el)
routes()