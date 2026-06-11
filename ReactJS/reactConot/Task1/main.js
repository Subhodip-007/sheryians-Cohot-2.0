import app from './app.js'

let root=document.querySelector('#root');
let rootelem=ReactDOM.createRoot(root);
console.log(root)
rootelem.render(app())