const multer=require("multer")
const storage=multer.memoryStorage()

const upload=multer({
    storage,
    limits:{fileSize:2*1024*1025},//2mb
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==="text/plain"){
            cb(null,true);
        }else{
            cb(new Error("Only .txt files are allowed"));
        }
    }
})

module.exports=upload