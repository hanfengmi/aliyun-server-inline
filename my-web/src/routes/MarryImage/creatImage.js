import React, { PureComponent } from 'react';
import { Modal,Form, Input, Select, Checkbox } from 'antd';
import isEmpty from 'lodash/isEmpty';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
// const defaultCheckedList = ['Apple'];

@Form.create()
export default class CreatImage extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            checkedList: [],
            indeterminate: true,
            checkAll: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            checkedList:nextProps.edit?nextProps.imageDetails.group:[],
            indeterminate: nextProps.edit?!(nextProps.imageDetails.group.length === plainOptions.length):false,
            checkAll: nextProps.edit?(nextProps.imageDetails.group.length === plainOptions.length):false,
        })
    };

    checkCKEditor = (rule, value, callback) => {
        if (!isEmpty(value)) {
        callback();
        return;
        }
        callback('请输入课程描述');
    };

  handleAdd = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit({
            ...values,
            group:this.state.checkedList
        });
        this.props.form.resetFields();
      }
    });
    
  };
  handleCancel(){
    this.props.cancle();
    this.props.form.resetFields();
  }

  onChange = (checkedList) => {
    this.setState({
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
        checkAll: checkedList.length === plainOptions.length,
    });
    console.log(!!checkedList.length && (checkedList.length < plainOptions.length),'onChangeonChangeonChange')
  }
  onCheckAllChange = (e)=> {
    this.setState({
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
    });
    // console.log(this.state.checkedList)
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
    // videoDetail, edit, 
    const { visible, confirmLoading, imageDetails, edit } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
        <Modal title="添加Image"
                visible={visible}
                onOk={this.handleAdd}
                confirmLoading={confirmLoading}
                onCancel={()=>{this.handleCancel()}}
                okText='确定'
                cancelText='取消'
        >
            <Form hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem {...formItemLayout} label="链接">
                    {getFieldDecorator('url', {
                        initialValue: edit ? imageDetails.url : '',
                        rules: [
                        {
                            required: true,
                            message: '请输入图片链接',
                        },
                        ],
                    })(<Input placeholder="图片链接" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="标题">
                    {getFieldDecorator('title', {
                        initialValue: edit ? imageDetails.title : '',
                        rules: [
                        {
                            required: true,
                            message: '请输入标题',
                        },
                        ],
                    })(<Input placeholder="图片标题" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('describtion', {
                        initialValue: edit ? imageDetails.describtion : '',
                    })(<Input placeholder="照片描述" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="展示">
                {getFieldDecorator('show', {
                    initialValue: edit ? String(imageDetails.show) : '',
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
                <FormItem {...formItemLayout} label="组别">
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        全选
                    </Checkbox>
                    <CheckboxGroup value={this.state.checkedList} options={plainOptions} onChange={this.onChange} />
                </FormItem>
            </Form> 
        </Modal>  
    );
  }
}
