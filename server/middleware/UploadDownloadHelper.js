import formidable from 'formidable';
import fs from 'fs';

const uploadDir = process.cwd()+'/storages/'

const uploadImages = async (req, res, next) =>{
    const option = {
        multiple : false,
        keepExtensions : true,
        uploadDir : uploadDir,
        maxFileSize : 50 * 1024 * 1024,
    }
    const form = formidable(option)
    let files = {};
    let fields = []

    form 
        .on('field', (fieldName, value)=>{
            fields.push({fieldName,value})
        })
        .on('file', (fieldName, file)=>{
            files = {...{fieldName, file}}
        })
        .on('end', ()=>{
            console.log('upload done');
            req.fileAttrb = ({
                files : files,
                fields:fields
            })
            next()
        })
        form.parse(req)
}
export default{
    uploadImages
}