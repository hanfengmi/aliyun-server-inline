/*
* action 是改变state时发的event；
* reducer 是静态改变state；
* effect 是动态改变state;//处理异步
* subscrib 是监听，如路由等。
*
*/
import { message } from 'antd';
import { queryImageList, addImage, deleteImage, updateImage, getImageDetail } from '../services/marryList';
export default {
    namespace: 'marryImage',
    state: {
        marryImage: [], // 列表
        imageDetails: {}, // 详情
        imageId: '',
        // 当前页数
        pageIndex: 1,
        // 每页条数
        pageSize: 10,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if( location.pathname === '/marry'){
                    dispatch({
                        type: 'fetch',
                        payload: {
                            pageIndex: 1,
                            pageSize: 10,
                        },
                    })
                }
            })
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryImageList);
            if (response.errCode === 0 && response.result) {
                yield put({
                    type: 'save',
                    payload: {
                        marryImage: response.result.images,
                    },
                });
            } else {
                message.destroy();
                message.error(response.err.errmsg);
            }
        },
        *add({ payload, callback },{ call, put }) {
            const response = yield call(addImage, payload);
            if (response.errCode === 0) {
                message.destroy();
                message.success('提交成功');
                if (callback) callback();
                yield put({
                    type: 'fetch',
                    payload: {
                        pageIndex: 1,
                        pageSize: 10,
                    },
                  });
            } else {
                message.destroy();
                message.error(response.err.errmsg);
            }
        },
        *delete({ payload, callback },{ call, put }) {
            const response = yield call(deleteImage, payload);
            if (response.errCode === 0) {
                message.destroy();
                message.success('删除成功');
                if (callback) callback();
                yield put({
                    type: 'fetch',
                    payload: {
                        pageIndex: 1,
                        pageSize: 10,
                    },
                  });
            } else {
                message.destroy();
                message.error(response.err.errmsg);
            }
        },
        *getImageDetail({ payload, callback },{ call, put }) {
            const response = yield call(getImageDetail, payload);
            if (response.errCode === 0) {
                if (callback) callback();   
                yield put({
                    type: 'details',
                    payload: {
                        imageId:response.result._id,
                        imageDetails: response.result,
                    },
                });
            } else {
                message.destroy();
                message.error(response.err.errmsg);
            }
        },
        *update({ payload, callback },{ call, put }) {
            const response = yield call(updateImage, payload);
            if (response.errCode === 0) {
                message.destroy();
                message.success('更新成功');
                if (callback) callback();   
                yield put({
                    type: 'fetch',
                    payload: {
                        pageIndex: 1,
                        pageSize: 10,
                    },
                  });
            } else {
                message.destroy();
                message.error(response.err.errmsg);
            }
        },
        *formatForm({ payload, callback },{ call, put }){
            yield put({
                type: 'details',
                payload: {
                    imageId:'',
                    imageDetails: {},
                },
            });
        }
    },

    reducers: {
        save(state, action) {
            return {
              ...state,
              ...action.payload,
            };
        },
        details(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
}