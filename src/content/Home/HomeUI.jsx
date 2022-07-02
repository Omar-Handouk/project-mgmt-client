import plan from 'components/SiteHeader/plan.svg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { FaRuler, FaDesktop, FaPlusCircle } from 'react-icons/fa';

const HomeUI = () => {
    return (
        <Container className='mt-3 mb-5'>
            <Row>
                <Col className="pm--center-element">
                    <img
                        alt=''
                        src={plan}
                        width="250"
                        height="250"
                        className="d-inline-block align-top"
                    />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col className='pm--center-element'>
                    <h1>Project Management</h1>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col className="pm--center-element" style={{ textAlign: 'center' }}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus faucibus mauris, ac fermentum libero commodo eget. Suspendisse fringilla dui vitae diam feugiat semper. Donec imperdiet bibendum ligula. Donec scelerisque pellentesque mauris, nec scelerisque diam dictum posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla in molestie risus, sit amet sodales nulla. Aliquam elementum eu tellus et tristique. Vivamus eget risus quam. Etiam molestie nisi in sem pretium sagittis. Suspendisse eget nunc vel sapien iaculis imperdiet rhoncus vitae tellus. Praesent iaculis pellentesque risus, ac porttitor elit eleifend quis. Duis id velit diam. Donec ullamcorper imperdiet erat a tincidunt. Nam lectus lacus, semper eget nunc at, hendrerit gravida nisl. Duis ornare erat nisl, ut vestibulum ligula condimentum at. Sed porta erat non tortor aliquam, id eleifend diam dictum.
                    </p>
                </Col>
            </Row>
            <Row>
                <span className="pm--center-element">
                    <Col className='pm--center-element' lg={4}>
                        <Card border='primary' style={{ width: '18rem' }}>

                            <Card.Header className='pm--center-element'>
                                <FaPlusCircle style={{ width: '280px', height: '180px' }} />
                            </Card.Header>

                            <Card.Body>
                                <Card.Title className='pm--center-element'>Add Projects/Clients</Card.Title>
                                <hr />
                                <Card.Text>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est amet voluptates, eligendi quis illo magnam minus sapiente, fugit sint laudantium quos deleniti atque reprehenderit molestiae?
                                </Card.Text>
                                <Button variant="dark">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='pm--center-element' lg={4}>
                        <Card border='success' style={{ width: '18rem' }}>
                            <Card.Header className='pm--center-element'>
                                <FaRuler style={{ width: '280px', height: '180px' }} />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className='pm--center-element'>Plan Projects</Card.Title>
                                <hr />
                                <Card.Text>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est amet voluptates, eligendi quis illo magnam minus sapiente, fugit sint laudantium quos deleniti atque reprehenderit molestiae?
                                </Card.Text>
                                <Button variant="dark">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='pm--center-element' lg={4}>
                        <Card border='danger' style={{ width: '18rem' }}>
                            <Card.Header className='pm--center-element'>
                                <FaDesktop style={{ width: '280px', height: '180px' }} />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className='pm--center-element'>Monitor Projects</Card.Title>
                                <hr />
                                <Card.Text>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est amet voluptates, eligendi quis illo magnam minus sapiente, fugit sint laudantium quos deleniti atque reprehenderit molestiae?
                                </Card.Text>
                                <Button variant="dark">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </span>
            </Row>
        </Container>
    );
}

export default HomeUI;