import User from '../../models/user';

export const findUser = (req, res) => {
    User.find(function (err, users) {
        if (err) {
            // errCode 3 服务器错误
            res.status(500).json({ errCode: 3, result: err });
        } else {
            res.status(200).json({
                errCode: 0,
                result: { users: users }
            });
        }
    });
}