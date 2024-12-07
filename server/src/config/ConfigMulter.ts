// import multer from "multer";
// import fs from 'fs/promises'
// import path from "path";
// import parseFileName from "@/utils/parseFileName";

// const configMulter = () => {
//     const multerStorage = multer.diskStorage({
//         destination(_, file, callback) {
//             const {base} = parseFileName(file.originalname);
    
//             fs.mkdir(path.join('uploads', base), {recursive: true})
//             .then(() => {
//                 callback(null, `/uploads/${base}`)
//             })
//         },
//         filename: (_, file, cb) => cb(null, `full${parseFileName(file.originalname).ext}`)
//     })

//     const upload = multer({storage: multerStorage})
//     return upload;
// }

