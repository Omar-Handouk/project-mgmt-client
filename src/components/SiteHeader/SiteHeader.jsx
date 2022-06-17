import { useLayoutEffect, useState, useMemo } from 'react';
import { Link, matchRoutes, useLocation } from 'react-router-dom';

import plan from './plan.svg';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const routes = [
    { path: '/', linkBody: 'Home' },
    { path: '/clients', linkBody: 'Clients' }
];

const SiteHeader = () => {
    const location = useLocation();
    const [{ route }] = matchRoutes(routes, location);

    const [currentActiveLink, setCurrentActiveLink] = useState(undefined);

    useLayoutEffect(() => {
        setCurrentActiveLink(routes.find(({ path }) => path === route.path)?.linkBody);
    }, [route.path, setCurrentActiveLink]);

    const navLinks = useMemo(() => {
        return routes.map(({ path, linkBody }, index) => {
            return (
                <Nav.Link key={index.toString()} as={Link} to={path} active={currentActiveLink === linkBody}>{linkBody}</Nav.Link>
            );
        })
    }, [currentActiveLink]);

    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    <img
                        alt=''
                        src={plan}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Project Management
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        {navLinks}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SiteHeader;