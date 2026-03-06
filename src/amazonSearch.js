const axios=require('axios');
const cheerio=require('cheerio');
require('dotenv').config();

const ASSOCIATE_TAG=process.env.AMAZON_ASSOCIATE_TAG
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'en-IN,en;q=0.9',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
};

async function searchProducts(keyword,minRating=4.0,maxResults=5){
    try{
        const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(keyword)}&i=apparel`;
        console.log(`🔍 Searching: ${searchUrl}`);

        const response= await axios.get(searchUrl,{headers,timeout:10000});
        const $= cheerio.load(response.data);
        const products=[];

        $('[data-component-type="s-search-result"]').each((i,el)=>{
            try{
                const asin=$(el).attr('data-asin');
                if(!asin) return;

                //getting title
                const titleEl=$(el).find('h2[aria-label]');
                const title=titleEl.attr('aria-label') || titleEl.text().trim();
                if(!title) return;
                //getting rating 
                let rating = 0;
        const ariaRating = $(el).find('[aria-label*="out of 5 stars"]').first().attr('aria-label');
        if (ariaRating) {
          rating = parseFloat(ariaRating.split(' ')[0]) || 0;
        }
        if (!rating) {
          const ratingText = $(el).find('.a-icon-alt').first().text().trim();
          rating = parseFloat(ratingText.split(' ')[0]) || 0;
        }

                //review count
                const reviewsEl = $(el).find('[aria-label$="ratings"], [aria-label$="rating"]').first();
                const reviewsText =reviewsEl.attr('aria-label')|| '';
                const reviews=parseInt(reviewsText.replace(/[^0-9]/g, '')) || 0;

                //price getting 

                const price = $(el).find('.a-price .a-offscreen').first().text().trim();
                //image url
                const image=$(el).find('img.s-image').attr('src');

                //building al
                const productUrl = `https://www.amazon.in/dp/${asin}?tag=${ASSOCIATE_TAG}`;

                if(rating>=minRating && image && asin)
{
    products.push({
        asin,title,rating,reviews,price,image,productUrl
    })
}
    
            }
            catch(err){
                console.error('Error parsing product:',err);
            }
        });

        products.sort((a,b)=>b.rating-a.rating || b.reviews-a.reviews);
        console.log(`✅ Found ${products.length} qualifying products`);
    return products.slice(0, maxResults);
    }
    catch(error){
        console.error('Error fetching search results:',error.message);
        return [];

    }
}
module.exports={searchProducts};
