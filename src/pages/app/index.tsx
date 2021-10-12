import React, { useLayoutEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Loading from 'components/Loading';
import Home from './Home';
import Dashboard from './Dashboard';
import { start } from 'qiankun';
import './style.scss';

const { SubMenu } = Menu;

const AppLayout: React.FC<{}> = () => {
  const history = useHistory()
  useLayoutEffect(() => {
    if (!(window as any).qiankunStarted) {
      (window as any).qiankunStarted = true;
      start();
    }
  }, []);
  return (
    <div className="main-container">
      <div className="menu-container">
        <div className="logo-wrap">LOGO</div>
        <Menu
          onClick={(value) => {
            history.push('/main/' + value.key)
          }}
          style={{ width: '100%' }}
          defaultSelectedKeys={['home']}
          mode="inline">
          <Menu.Item key="home">首页</Menu.Item>
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
          <Menu.Item key="app-react">app-react</Menu.Item>

          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.ItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>

      <div className="right-container">
        <div className="head-container"></div>
        <div className="content-container">
          <div id="third-app-container"></div>
          <div>
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/main" render={() => <Redirect to="/main/home" />} />
                <Route path="/main/home" render={() => <Home />} />
                <Route path="/main/dashboard" render={() => <Dashboard />} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;