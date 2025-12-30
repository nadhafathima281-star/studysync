const Resource=require("../models/Resource")

// create resource
exports.createResource=async(req,res)=>{
    try{
        const{title,link,type}=req.body;

        const resource=await Resource.create({
            title,
            link,
            type,
            user:req.user.id,
        });

        res.status(201).json(resource);
    }catch(error){
        res.status(500).json({message:"Failed to create resource"});
    }
};

// get all resources for user
exports.getResources=async(req,res)=>{
    try{
        const resources=await Resource.find({user:req.user.id}).sort({
            createdAt:-1,
        });

        res.json(resources);
    }catch(error){
        res.status(500).json({message:"Failed to fetch resources"});
    }
};

// delete resource
exports.deleteResource=async(req,res)=>{
    try{
        const resource=await Resource.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id,
        });

        if(!resource){
            return res.status(404).json({message:"Resource not found"});
        }

        res.json({message:"Resource deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to delete resource"});
    }
};