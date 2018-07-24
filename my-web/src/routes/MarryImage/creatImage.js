import React, { PureComponent } from 'react';
import { Modal,Form, Input, Select } from 'antd';
import isEmpty from 'lodash/isEmpty';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
export default class CreatImage extends PureComponent {
  checkCKEditor = (rule, value, callback) => {
    if (!isEmpty(value)) {
      callback();
      return;
    }
    callback('请输入课程描述');
  };

  handleAdd = () => {
    this.setState({
        confirmLoading: true,
    })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  handleCancel(){
    this.props.cancle();
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const { videoDetail, edit, visible, confirmLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
        <Modal title="添加Image"
                visible={visible}
                onOk={()=>{this.handleAdd()}}
                confirmLoading={confirmLoading}
                onCancel={()=>{this.handleCancel()}}
                okText='确定'
                cancelText='取消'
        >
            <Form onSubmit={this.handleAdd} hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem {...formItemLayout} label="url">
                    {getFieldDecorator('url', {
                        // initialValue: edit ? videoDetail.title : '',
                        rules: [
                        {
                            required: true,
                            message: '请输入图片链接',
                        },
                        ],
                    })(<Input placeholder="图片链接" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="title">
                    {getFieldDecorator('title', {
                        // initialValue: edit ? videoDetail.url : '',
                        rules: [
                        {
                            required: true,
                            message: '请输入标题',
                        },
                        ],
                    })(<Input placeholder="图片标题" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="describtion">
                    {getFieldDecorator('describtion', {
                        // initialValue: edit ? videoDetail.poster : '',
                    })(<Input placeholder="照片描述" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="show">
                {getFieldDecorator('show', {
                    // initialValue: edit ? String(videoDetail.level) : '',
                    rules: [
                    {
                        required: true,
                        message: '是否展示',
                    },
                    ],
                })(
                    <Select placeholder="是否展示" style={{ width: '100%' }}>
                        <Option value="">是否展示</Option>
                        <Option value="0">不展示</Option>
                        <Option value="1">展示</Option>
                    </Select>
                )}
                </FormItem>
            </Form> 
        </Modal>  
    );
  }
}
