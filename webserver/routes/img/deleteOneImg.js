/*
* 删除一条img数据
* 方式get
* req.body
* 
*/ 

import Image from '../../models/image';

export const deleteOneImg = (req, res) => {
    console.log('deleteOneImg',req.params.id);
    Image.findByIdAndUpdate(
        req.params.id,
        { stage: 0 },
        { new: true },
        function(err,quiz){
            if (err) {
                console.log("image delete error", err);
                res.status(500).json({ errCode: 3, result: err });
            } else {
                console.log("image delete by id success ========", quiz);
                res.status(200).json({
                    errCode: 0,
                    result: quiz
                });
            }
        }
    )
}