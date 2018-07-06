import React, {Fragment} from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'dva/router';
import Header from './Header';
import Footer from './Footer';
import { isUrl } from '../utils/utils';
import menu from '../common/menu';

const SubMenu = Menu.SubMenu;
class Wrap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menu:menu,// 外部引入的json
            collapsed: false,
        }
        this.formatter = this.formatter.bind(this)
    }
    toggleCollapsed(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    formatter(data, parentPath = '/', child) {
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
                {this.formatter(item.submenu, `${parentPath}${item.path}/`,true)}
              </SubMenu>
            )
          }
          return result;
        });
    }

    render(){
        const menu = this.formatter(this.state.menu);
        // console.log(this.props,this.state.collapsed,this.ptops.OpenKeys)
        return (
            <Fragment>
                <Header global={this.props.global} openAuth={this.props.openAuth} />
                <div style={{display:'flex'}}>
                    {this.props.showMenu?
                        <div style={{ width: '2.56rem', position:'relative',marginTop:'-4px'}}>
                            <Button type="primary" onClick={this.toggleCollapsed.bind(this)} style={{position:'absolute',zIndex:'10',left:'10%',bottom:0}}>
                                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                            </Button>
                            <Menu
                                defaultSelectedKeys={this.props.SelectedKeys}
                                // defaultOpenKeys={this.props.OpenKeys}
                                mode="inline"
                                // theme="dark"
                                inlineCollapsed={this.state.collapsed}
                                style={{height:"calc(100vh - 1.5rem"}}
                            >
                            {menu}
                            </Menu>
                        </div>:
                        ''
                    }
                    <div className="header-to-content" style={{width:'100%'}}>
                        {this.props.children}
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
  
};


export default Wrap;
