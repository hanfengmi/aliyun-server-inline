import express from 'express';
const router = express.Router();
import { findAllImg } from './findAllImg';
import { addOneImg } from './addOneImg';


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('route /api/img reques Time: ', Date.now());
  next()
});

// route: /api/img 查询img表全部数据 
router.get('/', findAllImg);
//  route: /api/img/add 添加一条img
router.post('/add', addOneImg);

// 以id删除img 
// router.delete('/:id',deleteImgById);

export default router