import React, { PureComponent, Fragment } from 'react';
import { Menu, Icon, Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Header from '../components/Header';
import { isUrl } from '../utils/utils'
import menu from '../common/menu'

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class IndexPage extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      // current:'index',
      SelectedKeys:['1'],
      collapsed: false,
      OpenKeys:[''],
      menu:menu// 外部引入的json
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
    const menu = this.formatter(this.state.menu)
    console.log(menu, 'menumenu')
    return (
      <Fragment>
        <Header />
        <div style={{ width: 256}}>
          <Button type="primary" onClick={this.toggleCollapsed.bind(this)}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Menu
            defaultSelectedKeys={this.state.SelectedKeys}
            defaultOpenKeys={this.state.OpenKeys}
            mode="inline"
            // theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
          {menu}
          {/* <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="inbox" />
              <span>Option 3</span>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu> */}
          </Menu>
        </div>
      </Fragment>
    );
  }
}


export default connect()(IndexPage);
