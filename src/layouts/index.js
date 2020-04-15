import { Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import styles from './index.less';
import { menuList } from '../common/menu.js';
import router from 'umi/router';

const { SubMenu } = Menu;
class Index extends Component {
  handleClick = e => {
    router.push({
      pathname: `/${e.key}`,
      query: {},
    });
  };

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.logo} />
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['projects']}
            defaultOpenKeys={['approval']}
            mode="vertical"
            style={{ width: 80 }}
            theme="dark"
          >
            {menuList.map(menu => {
              let children = menu.children;
              if (children) {
                return (
                  <SubMenu
                    key={menu.id}
                    title={
                      <span>
                        <span>{menu.name}</span>
                      </span>
                    }
                  >
                    {children.map(child => {
                      return (
                        <Menu.Item key={child.id}>
                          <span className="nav-text">{child.name}</span>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={menu.id}>
                    <span className="nav-text">{menu.name}</span>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div></div>
            <div>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <span>修改密码</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>系统注册</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>退出系统</span>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomCenter"
              >
                <div>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  <span style={{marginLeft:5}}>超级管理员</span>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className={styles.content}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Index;
