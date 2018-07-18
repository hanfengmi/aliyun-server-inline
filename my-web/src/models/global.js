/*
* action 是改变state时发的event；
* reducer 是静态改变state；
* effect 是动态改变state;//处理异步
* subscrib 是监听，如路由等。
*
*/
export default {
    namespace: 'global',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {  
            
        },
    },

    effects: {

    },

    reducers: {

    }
}