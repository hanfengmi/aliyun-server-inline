import React from 'react';
import { Link } from 'dva/router';
import styles from  './Header.less';
const Header = () => {
  return (
    <div className={styles.header}>
        <Link to="/" className={styles.logo}></Link>   
        <div className={styles.center}>
            <div className={styles.thressd}>
                <span>吱</span>
                <span>吱</span>
                <span>吱</span>
                <span>吱</span>
                <span>吱</span>
                <div className={styles.background}>
                    猴王驾到
                </div>
            </div>

        </div>
    </div>
  );
};


export default Header;
