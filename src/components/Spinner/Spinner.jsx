import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import BootstrapSpinner from 'react-bootstrap/Spinner';

const Spinner = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <BootstrapSpinner animation='border' variant='primary' />
                </Col>
            </Row>
        </Container>
    );
}

export default Spinner;