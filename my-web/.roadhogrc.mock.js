import mock from 'mockjs'
export default {
  'GET /han/all':(req, res)=>{
    const data = mock.mock({
      code:0,
      result:{
       'data|5':[{
        'titlt|1':['标题','伪标题'],
        'state|1':[1,2,3,4,5,6]
       }]
      }
    })
    res.json(data)
  }
};
