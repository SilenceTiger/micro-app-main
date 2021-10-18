import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import Loading from 'components/Loading';
import Home from './Home';
import Dashboard from './Dashboard';
import MenuSetting from './ConfigCenter/MenuSetting';
import SystemRegister from './ConfigCenter/SystemRegister';
import { start, registerMicroApps } from 'qiankun';
import api from 'api/config-center';
import './style.scss';

const { SubMenu } = Menu;

export const MenuData = [
  {
    key: 'home',
    title: '首页'
  },
  {
    key: 'dashboard',
    title: 'Dashboard',
    children: [] // if children && children.length
  },
  {
    key: 'config-center',
    title: '配置中心',
    children: [
      {
        key: 'system-register',
        title: '应用注册'
      },
      {
        key: 'menu-setting',
        title: '菜单配置'
      }
    ]
  },
  {
    key: 'sub-system',
    title: '子应用',
    children: [
      {
        key: 'app-react',
        title: 'app-react'
      },
      {
        key: 'app-vue',
        title: 'app-vue'
      }
    ]
  }
];

const getMenu = (menus: any[]) =>
  menus.map((m) => {
    if (m.children?.length) {
      const subMenus: any = m.children;
      return (
        <SubMenu key={m.key} title={m.title}>
          {getMenu(subMenus)}
        </SubMenu>
      );
    } else {
      return <Menu.Item key={m.key}>{m.title}</Menu.Item>;
    }
  });

const AppLayout: React.FC<{}> = () => {
  const history = useHistory();
  const [menuData, setMenuData] = useState([]);
  useLayoutEffect(() => {
    if (!(window as any).qiankunStarted) {
      api.getApp().then((res: any) => {
        registerMicroApps(
          res.data.list.map((item: any) => {
            return {
              name: item.appName,
              entry: item.entry,
              container: '#third-app-container',
              activeRule: item.activeRule
            };
          })
        );
        (window as any).qiankunStarted = true;
        start();
      });
    }
  }, []);
  useEffect(() => {
    api.getMenu().then((res: any) => {
      setMenuData(res.data || []);
    });
  }, []);
  return (
    <div className="main-container">
      <div className="menu-container">
        <div className="logo-wrap">LOGO</div>
        <Menu
          onClick={(value) => {
            history.push('/main/' + value.key);
          }}
          style={{ width: '100%' }}
          defaultSelectedKeys={['home']}
          mode="inline">
          {getMenu(menuData)}
        </Menu>
      </div>

      <div className="right-container">
        <div className="head-container"></div>
        <div className="content-container">
          <div id="third-app-container"></div>
          <div className="route-view-container">
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/main" render={() => <Redirect to="/main/home" />} />
                <Route path="/main/home" render={() => <Home />} />
                <Route path="/main/dashboard" render={() => <Dashboard />} />

                <Route path="/main/menu-setting" render={() => <MenuSetting />} />
                <Route path="/main/system-register" render={() => <SystemRegister />} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
