/*
* 添加一条img数据
* 方式post
* req.body
* 
*/ 

import Image from '../../models/image';

export const addOneImg = (req, res) => {
    console.log('ImageImage')
    // console.log('ImageImage',Image)
    // console.log('========createImg', req.body, '========createImg')
    Image.create(req.body, function(err, img) {
        console.log(err,req.body,img)
        if (err) {
            console.log("Image表create错误=>", err);
            res.status(500).json({ errCode: 3, err: err });
        } else {
            console.log("Image表create成功");
            res.status(200).json({
                errCode: 0,
                image: img
            });
        }
    });
}