import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';

const statusColor = {
    'Not Started': 'primary',
    'In Progress': 'secondary',
    'Completed': 'success',
}

const ProjectUI = ({ project }) => {
    const {
        id: projectId,
        name: projectName,
        description,
        status,
        client: {
            id: clientId,
            name: clientName,
            email,
            phone
        }
    } = project;

    const headerStyle = {
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: 'darkgray',
        padding: '0.5rem',
        borderRadius: '0.25rem'
    }

    return (
        <Container className="mt-3">
            <Row className="mb-3" style={{ placeItems: 'center', ...headerStyle }}>
                <Col>
                    <h1>{projectName}</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item as={Link} to='/projects'>
                            <Link to='/projects'>Projects</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item as={Link} to={`/projects/${projectId}`}>
                            <Link to={`/projects/${projectId}`}>{projectId}</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Badge pill bg={statusColor[status]}>{status}</Badge>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col lg='6'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Description</Card.Title>
                            <Card.Text>{description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg='6'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Client Information</Card.Title>
                            <Card.Text>
                                <p>Client Name: {clientName}</p>
                                <p>Client ID: {clientId}</p>
                                <p>Client Email: <a href={`mailto:${email}`}>{email}</a></p>
                                <p>Client Phone: {phone}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
}

ProjectUI.propTypes = {
    project: PropTypes.object.isRequired
}

export default ProjectUI;