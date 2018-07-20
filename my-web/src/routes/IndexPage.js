import React, { PureComponent } from 'react';
import { connect } from 'dva';
import WebWrap from '../components/WebWrap';
import First from './First';
import Second from './Second';
import styles from  './IndexPage.less';


class IndexPage extends PureComponent{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <WebWrap>
        <div className={styles.homeContent}>
          <First id="a" />
          <Second id="b" />
          <First id="c" />
          <First id="d" />
        </div>
      </WebWrap>
    );
  }
}


export default connect()(IndexPage);
