import React,{ Fragment } from 'react';
import { connect } from 'dva';
import {
    Table,
    // Button,
    // Modal,
    // Input,
    // Form,
    // Popconfirm,
    // Divider,
    // Select,
    // Row,
    // Col,
    // Popover,
    // Checkbox,
    // message,
  } from 'antd';
import WebWrap from '../../components/WebWrap';
import styles from './index.less'

@connect(({ userList }) => ({
    userList,
}))

class UserList extends React.Component {
    render(){
        console.log(this.props,'this.props')
        const { userList:{ userList } } = this.props;
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        }];
        return (
            <WebWrap>
                <div className={styles.userList}>
                    <Fragment>
                        <Table dataSource={userList} rowKey={record => record._id} columns={columns} />
                    </Fragment>
                </div>
            </WebWrap>
        );
    }
};

export default UserList;