import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Covid = React.lazy(() => import('src/pages/covid'));
const Auth = React.lazy(() => import('src/pages/auth'));


export default (
  <Routes>
    <Route path='/' index={1} key="home" exact={true} element={<Covid />} />
    <Route path='/auth' index={2} key="auth" exact={true} element={<Auth />} />
    {/* {routers.map(({ component: Component, path, key, exact }, index) => {
        return (
          <Route path={path} index={index} key={key} exact={exact} element={<Component />} />
        )
      })} */}
  </Routes>
)