const { Router } = require('express');
const express = require('express');
const app = express();
require('dotenv/config');
app.use(express.json())
//app.use(Router());
const api_url = process.env.API_URL;
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
    const newcproduct = req.body;
    console.log(newcproduct)
    res.send(
     newcproduct);
})