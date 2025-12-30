const{Parser}=require("json2csv");

exports.generateCSV=(data,fields)=>{
    const parser=new Parser({fields});
    return parser.parse(data);
};