import express from 'express';
const router = express.Router();
import { findUser } from './findUser';


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('route /api/user reques Time: ', Date.now());
  next()
});

// route: /api/user 查询user表全部数据 
router.get('/', findUser);
// 以id删除user 
// router.delete('/:id',deleteUserById);

// 不确定废弃的router
// // route: /api/user/courses 更新user表的courses字段，购买课程。 
// router.get('/courses', authorization, courses);

export default router