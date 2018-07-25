import express from 'express';
const router = express.Router();
import { findAllImg } from './findAllImg';
import { addOneImg } from './addOneImg';
import { deleteOneImg } from './deleteOneImg';
import { updateOneImg } from './updateOneImg';
import { getOneImgDetails } from './getOneImgDetails'


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('route /api/img reques Time: ', Date.now());
  next()
});

// route: /api/img 查询img表全部数据 
router.get('/', findAllImg);
//  route: /api/img/add 添加一条img
router.post('/add', addOneImg);
// router: /api/img/delete 删除image 
router.get('/delete/:id', deleteOneImg);
// router :/api/img/details 获取一条详情
router.get('/details/:id', getOneImgDetails);
// router :/api/img/update/:id 更新一条image
router.post('/update', updateOneImg);


export default router