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
    componentDidMount(){
        console.log()
    }
    render(){
        const { userList } = this.props;
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <WebWrap>
                <div className={styles.userList}>
                    <Fragment>
                        <Table dataSource={userList.userList} columns={columns} />
                    </Fragment>
                </div>
            </WebWrap>
        );
    }
};

export default UserList;