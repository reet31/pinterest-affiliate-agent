//uploading content to pintrest
const axios=require('axios');
require('dotenv').config();

    async function uploadToPinterest(product,content){
        
        try {
            const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
            const boardId = process.env.PINTEREST_BOARD_ID;
            if(!accessToken )throw new Error('Pinterest access token is not set in environment variables');
            if(!boardId) throw new Error('Pinterest board ID is not set in environment variables');

            const fullDescription = `${content.description}\n\n${content.hashtags.join(' ')}`;
            console.log('Posting pin to Pinterest with the following details:');

            const response = await axios.post(`https://api.pinterest.com/v5/pins/`, {
                board_id: boardId,
                title: content.title,
                description: fullDescription,
                link: product.productUrl,
                media_source: {
                    source_type: 'image_url',
                    url: imageUrl
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Pin uploaded successfully:', response.data);
            return{
                success:true,
                pinId:response.data.id,
                pinUrl:`https://pintrest.com/pin/${response.data.id}`
            };
        } catch (error) {
            console.error('Error uploading pin:', error.response ? error.response.data : error.message);
            return {
                success: false,
                message: error.message? JSON.stringify(error.response.data):error.message
            };
        }
    }

module.exports={uploadToPinterest};