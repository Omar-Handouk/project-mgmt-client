import error from './error.png';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const NotFound = () => {
    return (
        <Container className='mt-5'>
            <Row>
                <Col className='pm--center-element'>
                    <img src={error} alt='404 Not Found' />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col className='pm--center-element'>
                    <h1>404: Not Found</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;