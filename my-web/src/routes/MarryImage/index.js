import React,{ Fragment } from 'react';
import { connect } from 'dva';
import {
    Table,
    Button,
    // Modal,
    // Input,
    // Form,
    Popconfirm,
    Divider,
    // Select,
    // Row,
    // Col,
    // Popover,
    Badge,
    // Checkbox,
    // message,
  } from 'antd';

import WebWrap from '../../components/WebWrap';
import CreatImage from './creatImage';
import styles from './index.less';

const statusMap = ['error', 'success'];
const status = ['不展示', '展示',];

@connect(({ marryImage,loading }) => ({
    marryImage,
    loading: loading.models.marryImage,
}))



class MarryImage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            confirmLoading: false,
            imgVisible: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    imageEdit(id){
        this.props.dispatch({
            type: 'marryImage/getImageDetail',
            payload:{id}
        })
        this.showModal();
    }
    // 表单弹框
    formModal(state){
        const { visible, confirmLoading } = state;
        const { marryImage:{ imageDetails, imageId }  } = this.props;
        const parentMethods = {
            handleSubmit: this.handleSubmit,
            cancle: this.handleCancel,
            visible: visible,
            confirmLoading: confirmLoading,
            imageDetails,
        }
        return (
            imageId?
            <CreatImage {...parentMethods} edit></CreatImage>:
            <CreatImage {...parentMethods} ></CreatImage>
        )
    }
    // 提交表单
    handleSubmit = val => {
        // console.log(this.props.)
        this.setState({
            confirmLoading: true,
        })
        if(this.props.marryImage.imageId){
            console.log(val,'valvalval修改修改')
            this.props.dispatch({
                type: 'marryImage/update',
                payload:{
                    ...val,
                    id:this.props.marryImage.imageId
                },
                callback:()=>{
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                }
            })
        }else {
            console.log(val,'valvalval新增新增')
            this.props.dispatch({
                type: 'marryImage/add',
                payload:val,
                callback:()=>{
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                }
            })
        }
           
    }
    // 取消表单弹框
    handleCancel(){
        this.setState({
            visible: false,
            confirmLoading: false,
        });
        //清除全局保存的details
        this.props.dispatch({
            type: 'marryImage/formatForm',
        })
    }
    // 展示表单弹框
    showModal = () => {
        this.setState({
            visible: true,
        });
        
    }
    // 关闭图片预览
    imgClose = ()=>{
        this.setState({
            imgVisible: false,
        });
    }
    // 删除img
    delete(id){
        console.log(id)
        this.props.dispatch({
            type: 'marryImage/delete',
            payload:{id},
        }) 
    }
    render(){
        // console.log(this.props,'this.props')
        const { marryImage:{ marryImage },loading } = this.props;
        const columns = [
        {
            title: 'index',
            key:'i',
            render: (text, val, index) => (index+1),
            width:80
        },{
            title: '图片',
            dataIndex: 'url',
            key: 'url',
            width:300,
            render: (text) => {
                return (
                    text
                    // <Popover
                    //     placement="rightTop"
                    //     content={
                    //         <div>
                    //             <img style={{width:'10rem'}} alt="图片" src={`${text}`} /> 
                    //         </div>
                    //     }
                    //     title='图片预览'
                    //     trigger='click'
                    // >
                    //     <img alt="图片" src={`${text}?x-oss-process=image/resize,w_200,h_100/quality,Q_80`} /> 
                    // </Popover>
                )
            }
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '描述',
            dataIndex: 'describtion',
            key: 'describtion',
        }, {
            title: '展示',
            dataIndex: 'show',
            key: 'show',
            filters: [
                {
                    text: status[0],
                    value: 0,
                },
                {
                    text: status[1],
                    value: 1,
                },
            ],
            render(val) {
                return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },{
            title:'组别',
            dataIndex: 'group',
            key: 'group',
            render:val=> val+` `
        },{
            
        title: 'handle',
        render: val => (
          <Fragment>
            <a onClick={() => { this.imageEdit(val._id) }} >
              修改
            </a>
            <Popconfirm
                title="确定删除吗?"
                onConfirm={() => this.delete(val._id)}
                okText="Yes"
                cancelText="No"
            >
            <Divider type="vertical" />
                <a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      }];
        return (
            <WebWrap>
                {this.formModal(this.state)}
                <div className={styles.imgList}>
                    <Button onClick={()=>{this.showModal()}}>添加</Button>
                    <Fragment>
                        <Table loading={loading} dataSource={marryImage} rowKey={record => record._id} columns={columns} />
                    </Fragment>
                </div>
            </WebWrap>
        );
    }
};

export default MarryImage;