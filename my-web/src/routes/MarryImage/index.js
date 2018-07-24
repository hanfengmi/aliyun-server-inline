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
    // Checkbox,
    // message,
  } from 'antd';

import WebWrap from '../../components/WebWrap';
import CreatImage from './creatImage'
import styles from './index.less'

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
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    imageEdit(id){
        console.log(id)
    }
    formModal(state){
        const { visible, confirmLoading } = state;
        const parentMethods = {
            handleSubmit: this.handleSubmit,
            cancle: this.handleCancel,
            visible: visible,
            confirmLoading: confirmLoading
            // videoDetail,
            // submitting,
        }
        return (
            // <Modal title="添加Image"
            //         visible={visible}
            //         onOk={()=>{this.handleSubmit()}}
            //         confirmLoading={confirmLoading}
            //         onCancel={()=>{this.handleCancel()}}
            //         okText='确定'
            //         cancelText='取消'
            // >
            //     dasdadassd
            <CreatImage {...parentMethods}></CreatImage>
            // </Modal>
        )
    }
    handleSubmit = val => {
        console.log(val)
        this.setState({
            confirmLoading: true,
        })
        console.log(val,'valvalval')
        this.props.dispatch({
            type: 'marryImage/add',
            payload:{
                url:'123',
                title:'title',
                show:1,
                describtion:'describtion',
                group:['1','2','3']
            },
            callback:()=>{
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }
        })   
    }
    handleCancel(){
        this.setState({
            visible: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    render(){
        // console.log(this.props,'this.props')
        const { marryImage:{ marryImage },loading } = this.props;
        const columns = [{
            title: '图片',
            dataIndex: 'url',
            key: 'url',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '描述',
            dataIndex: 'describtion',
            key: 'describtion',
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