import AlertsContext from 'contexts/AlertsContext';
import { Fragment, useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from 'content/Home';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Clients from 'content/Clients';
import Project from 'content/Project';
import Projects from 'content/Projects';
import NotFound from 'content/NotFound';
import SiteHeader from 'components/SiteHeader';
import Container from 'react-bootstrap/Container';

function App() {
  const { alerts } = useContext(AlertsContext);

  const alertsElements = alerts.map((alert, index) => (
    <Row key={index.toString()}>
      <Col>
        <Alert variant={alert.variant}>
          {alert.body}
        </Alert>
      </Col>
    </Row>
  ));

  return (
    <Fragment>
      <SiteHeader />
      <Container className='mt-3'>
        {alertsElements}
      </Container>
      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path='clients' element={<Clients />} />
          <Route path='projects' element={<Outlet />}>
            <Route index element={<Projects />} />
            <Route path=':id' element={<Project />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Fragment>
  );
}

export default App;
