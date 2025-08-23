// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({

// destination: function(req,file,cb){
//     cb(null,'uploads/')
// },

// filename:function(req,file,cb){
//  const uniqueName = `${Date.now()}_${file.originalname}`;
//     cb(null , uniqueName)

// }
// })

// const fileFilter = (req,file,cb)=>{
//     const allowedType = ['image/jpeg', 'image/png', 'image/jpg'];
//     cb(null , allowedType.includes(file.mimetype))
// };

// const upload = multer({storage,fileFilter});

// module.exports = upload;

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); 

// إعداد التخزين على Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'inventory_system',               // الصور هتتحفظ في فولدر باسم ده في Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],  // الامتدادات المسموح بيها
    transformation: [{ width: 1200, crop: 'limit' }], // (اختياري) تحديد أقصى عرض
  },
});

// فلتر للتأكد من نوع الملف
const fileFilter = (req, file, cb) => {
  const allowedType = ['image/jpeg', 'image/png', 'image/jpg'];
  cb(null, allowedType.includes(file.mimetype));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // أقصى حجم 5MB (اختياري)
});

module.exports = upload;
