import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ example }) => ({
  example,
}))

class Third extends React.Component {

  render(){
      return (
        <div className={styles.bg}>
          null
        </div>
      );
  }
  
};


export default Third;