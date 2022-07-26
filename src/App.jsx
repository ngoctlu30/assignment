import React from 'react';
import { BrowserRouter } from 'react-router-dom';


import './app.less';

import route from './router';
import Menu from './components/Menu';
import Spin from './components/spin';

const App = () => {

  return (
    <div className='app'>
      <BrowserRouter>
        <React.Suspense fallback={(<Spin />)}>
          <Menu />
          {route}
        </React.Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
