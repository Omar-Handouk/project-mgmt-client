import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const HomeUI = () => {
    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <h1>Hello, React-Bootstrap!</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default HomeUI;