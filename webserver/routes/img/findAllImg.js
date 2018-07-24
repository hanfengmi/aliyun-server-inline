import Image from '../../models/image';

export const findAllImg = (req, res) => {
    Image.find({show: 1},function (err, img) {
        if (err) {
            // errCode 3 服务器错误
            res.status(500).json({ errCode: 3, result: err });
        } else {
            res.status(200).json({
                errCode: 0,
                result: { images: img }
            });
        }
    });
}