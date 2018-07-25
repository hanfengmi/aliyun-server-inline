/*
* 获取一条img数据详情
* 方式get
* req.params.id
* 
*/ 

import Image from '../../models/image';

export const getOneImgDetails = (req, res) => {
    console.log('getOneImg',req.params.id);
    Image.findById(req.params.id).exec(function(err, image) {
        if (err) {
            console.log("image query by id 错误: ", err);
            res.status(500).json({ errCode: 3, result: err });
        } else {
            console.log("read image by id success", image);
            res.status(200).json({
                errCode: 0,
                result: image
            });
        }
    });
}