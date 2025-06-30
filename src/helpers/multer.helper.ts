// const multer = require('multer');
import {Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const upload = multer();
export const uploadimg = multer({ 
    dest: 'public/uploads', 
    limits: {fileSize: 1000*1024},
    fileFilter: (req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback) => {
        if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
            cb(null,true);
        }
        else{
            cb(new Error('wrong filetype'))
        }
    }
});
export const uploadpdf = multer({ 
    dest: 'public/uploads', 
    limits: {fileSize: 1000*1000*1024},
    fileFilter: (req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback) => {
        if(file.mimetype==='application/pdf'){
            cb(null,true);
        }
        else{
            cb(new Error('wrong filetype'))
        }
    }
});