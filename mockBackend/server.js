const express = require("express");
const cors = require("cors");
const fs = require("fs");
const makeid = require("./makeId");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    res.sendFile("C:/Users/tommy/Documents/ecommerce/ecommerce/test.html");
})

app.get("/products", (req, res)=>{
    console.log("HIT")
    fs.readFile('./products.json', 'utf-8', (err, data)=>{
        if (err){
            console.log(err);
            res.sendStatus(500);
        }

        let parsedData = JSON.parse(data);

        res.send(parsedData.products);
    })
})

app.get("/products/:name", (req, res)=>{
    console.log("HIT")
    fs.readFile('./products.json', 'utf-8', (err, data)=>{
        if (err){
            console.log(err);
            res.sendStatus(500);
        }

        let name = req.params.name.toLowerCase();
        let productData = JSON.parse(data);
        const prod = productData.products.find((product)=> product.productName.toLowerCase() === name )
        res.json(prod);
    })
})

app.post("/products", (req, res)=>{
    fs.readFile('./products.json', 'utf-8', (err, data)=>{
        if (err){
            console.log(err);
            res.sendStatus(500);
        }

        let payload = req.body.products;
        let productData = JSON.parse(data);
        for (let i = 0; i < payload.length; i++){
            payload[i]['id'] = makeid(7);
            productData.push(payload[i]);
        } 

        let productString = JSON.stringify(productData, null, 4);

        fs.writeFile('./products.json', productString, 'utf-8', function (err) {
            if (err) throw err;
            console.log('write complete');
            res.send("sucess");
        });

        
    })
})

const PORT = process.env.PORT || 3700
app.listen( PORT, ()=>{
    console.log(`Mock server listening on port ${PORT}`)
})

