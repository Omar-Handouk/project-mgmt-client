import { Fragment } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from 'content/Home';
import Clients from 'content/Clients';
import SiteHeader from 'components/SiteHeader';

function App() {
  return (
    <Fragment>
        <SiteHeader />
        <Routes>
          <Route path='/' element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path='clients' element={<Clients />} />
          </Route>
        </Routes>
    </Fragment>
  );
}

export default App;
