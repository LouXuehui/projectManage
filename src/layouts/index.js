import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { menuList } from '../common/menu.js';
import router from 'umi/router';

const { SubMenu } = Menu;
class Index extends Component {
  handleClick = (e) => {
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
            style={{ width: 240 }}
            theme="dark"
          >
            {menuList.map((menu) => {
              let children = menu.children;
              if (children) {
                return (
                  <SubMenu
                    key={menu.id}
                    title={
                      <span>
                        <MailOutlined />
                        <span>{menu.name}</span>
                      </span>
                    }
                  >
                    {children.map((child) => {
                      return (
                        <Menu.Item key={child.id}>
                          <UserOutlined />
                          <span className="nav-text">{child.name}</span>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={menu.id}>
                    <UserOutlined />
                    <span className="nav-text">{menu.name}</span>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.top}></div>
          <div className={styles.content}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Index;
