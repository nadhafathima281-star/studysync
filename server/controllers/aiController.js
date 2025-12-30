const AiChat=require("../models/AiChat");
const axios=require("axios");

// ai chat
exports.aiChat=async(req,res)=>{
    try{
        const{prompt}=req.body;

        if(!prompt || !prompt.trim()){
            return res.status(400).json({message:"Prompt is required"});
        }

        // call ai api (openai)
        const aiResponse=await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model:"gpt-3.5-turbo",
                messages:[
                    {
                        role:"system",
                        content:"You are a helpful study assistant.",
                    },
                    {
                        role:"user",
                        content:prompt,
                    },
                ],
            },
            {
                headers:{
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const answer=aiResponse.data.choices[0].message.content;

        // save chat to db
        const chat=await AiChat.create({
            user:req.user.id,
            prompt,
            response:answer,
            model:"gpt-3.5-turbo",
        });
    }catch(error){
        console.error("AI Error:",error.response?.data || error.message);
        res.status(500).json({message:"AI service failed"});
        
    }
}