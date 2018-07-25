/*
* 更新一条img数据
* 方式post
* /:id方式获取  req.params.id
* post req.body
*/ 

import Image from '../../models/image';

export const updateOneImg = (req, res) => {
    console.log('getOneImg',req.body);
    const param = Object.assign({}, req.body);
    // param.show = Number(param.show)
    console.log('req.body.id',req.body.id)
    Image.findByIdAndUpdate(
        req.body.id,
        param,
        { new: true },
        function(err,image){
            if (err) {
                console.log("image update error", err);
                res.status(500).json({ errCode: 3, result: err });
            } else {
                console.log("image update by id success ========", image);
                res.status(200).json({
                    errCode: 0,
                    result: image
                });
            }
        }
    )
}