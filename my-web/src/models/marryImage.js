/*
* action 是改变state时发的event；
* reducer 是静态改变state；
* effect 是动态改变state;//处理异步
* subscrib 是监听，如路由等。
*
*/
import { message } from 'antd';
import { queryImageList, addImage } from '../services/marryList';
export default {
    namespace: 'marryImage',
    state: {},
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
        }
    },

    reducers: {
        save(state, action) {
            return {
              ...state,
              ...action.payload,
            };
        },
    }
}