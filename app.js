const express = require("express");
const {randomUUID} =require("crypto");
const fs = require("fs")

const app = express();

app.use(express.json());

const products = [];

fs.readFile("products.json", "utf-8", (err, data) =>{
    if(err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
})

/**
 * POST => Inserir um dado
 * GET => Busca um ou mias dados
 * PUT => Altera um dado
 * DELETE=> Remover um dado
 */
/**
 * body - qnd eu quero enviar dados para a minha aplicação
 * params - /product/543554343s
 * query - /product?id=6544513543 "são ex."
 */

app.post("/products", (request, response) => {
    //nome e preço
    const {name, price} = request.body;

    const product ={
        name,
        price,
        id: randomUUID(),
    }

    products.push(product);

    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Produto inserido");
        }
    });

    return response.json(product);

});

app.get("/products", (request, response) => {
    return response.json(products)
});

app.get("/products/:id", (request, response) => {
    const {id} = request.params;
    const product = products.find(product.id === id);
    return response.json(product);
})

app.put("/products/:id", (request, response) => {
    const {id} = request.params;
    const {name, price} = request.body;

    const productIndex = products.findIndex(product.id == id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    };
    return response.json({message: "Produto alterado!"});
})
app.delete("/products/:id", (request, response) =>{
    const {id} = request.params;

    const productIndex = products.findIndex(product.id == id);

    products.splice(productIndex, 1);
    return response.json({ message: "Produto removido!"});
})

app.listen(4002, () => console.log("Servidor esta rodando na porta 4002"));
