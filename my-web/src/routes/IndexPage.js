import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import Wrap from '../components/Wrap';
// import styles from  './IndexPage.less';


class IndexPage extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return (
      <Wrap SelectedKeys={['1']} showMenu>

      </Wrap>
    );
  }
}


export default connect()(IndexPage);
