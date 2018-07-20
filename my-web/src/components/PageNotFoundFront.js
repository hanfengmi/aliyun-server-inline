import React from 'react';
import { Link } from 'dva/router';
import styles from './PageNotFoundFront.less';

const PageNotFoundFront = () => {
  return (
    <div className={styles.notFound}>
        <div className={styles.number}>
            <span>4</span>
            <span>0</span>
            <span>4</span>
        </div>
        <div>页面暂时找不到</div>
        <Link to="/">返回</Link>
    </div>
  );
};

PageNotFoundFront.propTypes = {
};

export default PageNotFoundFront;
