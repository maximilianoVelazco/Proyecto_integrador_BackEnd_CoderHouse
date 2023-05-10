import express from "express";
import ProductManager from "./index.js";
const app = express();

app.use(express.urlencoded({extended: true}))

const productManager = new ProductManager();

app.get('/products', async (req, res) =>{
    let productos = await productManager.getProducts();
    res.send(productos);
})

app.get('/products', async (req, res) =>{
    let productos = await productManager.getProducts();
    let { limit } = req.query;
    let acotarProductos = limit ? productos.slice(0, limit) : productos;
    res.send(acotarProductos);
})

app.get('/products/:pid', async (req, res) =>{
    let pid = req.params.pid;
    let producto = await productManager.getProductsByID(pid);
    producto ? res.send(producto) : res.send('El id ingresado no existe o no es valido')
})


const server = app.listen(8080, () => console.log('Server running on port 8080'));

