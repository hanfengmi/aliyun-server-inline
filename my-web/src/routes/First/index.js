import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ example }) => ({
  example,
}))

class First extends React.Component {

  render(){
      return (
        <div className={styles.bg}>
          <div className={styles.effect}>
            <div className={styles.blackball}></div>
            <div className={styles.redball}></div>
          </div>
        </div>
      );
  }
  
};


export default First;