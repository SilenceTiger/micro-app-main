import React from 'react';
import { ConfigProvider } from 'antd';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import Loading from 'components/Loading';

const AppEntrance = React.lazy(() => import('pages/app'));
const PreviewEntrance = React.lazy(() => import('pages/preview'));

const App: React.FC<{}> = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter basename="/">
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/main" />} />
            <Route path="/main" render={() => React.createElement(AppEntrance)} />
            <Route path="/preview" render={() => React.createElement(PreviewEntrance)} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
