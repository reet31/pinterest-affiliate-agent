const {GoogleGenerativeAI} = require('@google/generative-ai');
require('dotenv').config();

const genAI=new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);
async function generateContent(product){
    //step1 prompt const moe
    const model=genAI.getGenerativeModel({model:'gemini-2.5-flash'});
    const prompt = `
    You are a Pinterest content expert for Indian ethnic fashion.
    
    Product details:
    - Title: ${product.title} 
    - Price:${product.price} 
    - Rating: ${product.rating}
    
    Please generate:
    1. A Pinterest pin title (max 100 characters)
    2. A description (max 500 characters) with a call to action
    3. 10-15 hashtags for Indian ethnic fashion
    
    Reply in this exact JSON format:
    {
      "title": "...",
      "description": "...",
      "hashtags": ["...", "..."]
    }
  `;
 try{
    const result=await model.generateContent(prompt);
    const text=result.response.text();
    //json response
    const jsonMatch=text.match(/{[\s\S]*}/);
    if(!jsonMatch)throw new Error('No JSON found in response');

    const parsed=JSON.parse(jsonMatch[0]);
    return parsed;
 }catch(error){
    console.error('Gemini error:',error.message);
    throw error;
 }
}
module.exports={generateContent};
