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
          <div className={styles.myWorld}> 
          {/* 视距层 */}
            <div className={styles.worldInner}>
            {/* 3D父级层 */}
              <div className={styles.innerBox}>
              {/* 3D转换层 */}
                <div className={styles.boxAll}>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
  
};


export default Third;