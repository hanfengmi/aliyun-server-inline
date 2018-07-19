/*
* action 是改变state时发的event；
* reducer 是静态改变state；
* effect 是动态改变state;//处理异步
* subscrib 是监听，如路由等。
*
*/
import { message } from 'antd';
import { queryUserList } from '../services/userList';
export default {
    namespace: 'userList',
    state: {},
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if( location.pathname === '/list'){
                    console.log(13213123)
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
            const response = yield call(queryUserList);
            if (response.errCode === 0 && response.result) {
                yield put({
                    type: 'save',
                    payload: {
                        userList: response.result,
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