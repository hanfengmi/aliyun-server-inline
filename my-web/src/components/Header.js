import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from  './Header.less';
import { isUrl } from '../utils/utils';
import menuList from '../common/menu';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current : ''
        }
        // console.log(menuList)
    }
    
    formatter(data, parentPath = '/', child) {
        // console.log(data)
        return data.map(item => {
            let { path } = item;
            if (!isUrl(path)) {
                path = parentPath + item.path;
            }
            let result;
            if(child){
                result = (
                    <Menu.Item key={item.index}><Link to={path}>{item.title}</Link></Menu.Item>
                )
            }else {
                result = (
                <Menu.Item key={item.index}>
                    <Link to={item.path}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                )
            }
        
            if (item.submenu) {
                result = (
                <SubMenu key={item.index} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                    <MenuItemGroup title={item.title}>
                        {this.formatter(item.submenu, `${parentPath}${item.path}/`,true)}
                    </MenuItemGroup>
                </SubMenu>
                )
            }
            return result;
        });
    }
    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
    }
    render(){
        const menu = this.formatter(menuList);
        return (
            <div className={styles.header}>
                <Link to="/" className={styles.logo}></Link>
                <Menu 
                // style={{border:'none',background:'transparent'}}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                { menu }
                </Menu>
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
    }
  
};

export default Header;
