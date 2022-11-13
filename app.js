const { Router, response } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose'); //8EYD3e-r_rCRPwe  user:eshopApplication

require('dotenv/config');
//Middleware
app.use(express.json())
app.use(morgan('tiny'));


//app.use(Router());
const api_url = process.env.API_URL;
console.log(process.env.CONNECTION_STRING)
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName:'EshopDatabase'
})
.then(()=>{
    console.log('Database Conected Sucessfully!!');    
})
.catch(error =>{
    console.log(error);
})

const productSchema = mongoose.Schema({
    id:Number,
    name:String,
    image: String,
    countInStock: Number
});

const Products =  mongoose.model('Products',productSchema);
app.listen(3000, ()=>{
    console.log(api_url);
    console.log("App is running on http://localhost:3000");
}
);

app.get(`${api_url}/products`,(req,res)=>{
    const product= {
        id:1,
        name:'Dell InspireOn'
    }
    res.send(
    product);
})
app.post(`${api_url}/products`,(req,res)=>{
    const newProduct  = new Products(
        {
            id:req.body.id,
            name:req.body.name,
            image:req.body.image,
            countInStock:req.body.countInStock
        }
    )
    newProduct.save().then(
       (createdProduct =>{
            res.status(201).json(newProduct)
       })
    ).catch(error=>{
        res.status(500).json({
            error:error,
            success:false
        })
    })
    res.send(newProduct);
    //const newcproduct = req.body;
    //console.log(newcproduct)
    //res.send(
    // newcproduct);
})