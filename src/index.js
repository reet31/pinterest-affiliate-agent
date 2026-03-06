require('dotenv').config();
const express = require('express');
const path =require('path');
const { searchProducts } = require('./amazonSearch');
const { generateContent } = require('./contentGenerator');
const app= express();
app.use(express.json());
app.use(express.static(__dirname));

let productqueue=[];
let curridx=0;
let acceptedprod=null;

//s1 search agent will search product 
app.post('/search',async(req,res)=>{
  const {keyword,minRating,maxResults}=req.body;
  console.log(`\n searching for:${keyword}`);
  try{
    productqueue=await searchProducts(keyword,minRating || 4.0 ,maxResults || 10);
    curridx=0;

    if(productqueue.length===0){
      return res.json({success:false, message:'No product accepted yet'});
    }
    console.log(`Found ${productqueue.length} products, sending first one`);
    res.json({success:true , product:productqueue[0],total:productqueue.length , index:0});
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({message:'Internal server error'});
  }
});

//s2 accept or reject 
app.post('/decision',(req,res)=>{
    const {decision}=req.body;

    if(decision==='accept'){
        acceptedprod=productqueue[curridx];
        console.log('Product accepted:',acceptedprod.title);
        return res.json({success:true, accepted:true, product:acceptedprod});
    }
    //if rejected 
    curridx++;
    if(curridx>=productqueue.length){
        console.log('No more products to show');
        return res.json({success:true, accepted:false, message:'No more products'});
    }
    console.log('REJECTED - showing next product')
    res.json({success:true, accepted:false, product:productqueue[curridx], index:curridx});
})

//s3 give ui
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/approvalUI.html'));
});
//s4 generate content for accepted product
app.post('/generate',async(req,res)=>{
  try{
    if(!acceptedprod){
      return res.json({success:false,message:'No product accepted yet'});
    }
    console.log('Generating content for accepted product:',acceptedprod.title);
    const content=await generateContent(acceptedprod);
    console.log('Content generated successfully');
    res.json({success:true, content});
  } catch (error) {
    console.error('Error generating content:',error);
    res.status(500).json({success:false,message:'Failed to generate content'});
  }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Agent running at http://localhost:${PORT}`);
  console.log(`Open your browser and go to http://localhost:${PORT}`);
});