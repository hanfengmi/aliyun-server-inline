import React, { PureComponent } from 'react';
import { connect } from 'dva';
import WebWrap from '../components/WebWrap';
import First from './First';
import Second from './Second';
import Third from './Third'
import styles from  './IndexPage.less';


class IndexPage extends PureComponent{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <WebWrap fixed>
        <div className={styles.homeContent}>
          <Second id="b" />
          <Third />
          <First id="a" />
          
          {/* <First id="c" />
          <First id="d" /> */}
        </div>
      </WebWrap>
    );
  }
}


export default connect()(IndexPage);
