import PropTypes from 'prop-types';
import { useRef } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const ProjectFormUI = ({
    name,
    description,
    status,
    clientId,
    clients,
    isValidated,
    isModalVisible,
    isSubmitButtonActive,
    isUpdate,
    onChange,
    onSubmit,
    onClose,
}) => {
    const formEl = useRef();
    //console.log(clientId);

    return (
        <Modal show={isModalVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? 'Update project' : 'Add a new project'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col>
                            <Form
                                noValidate
                                validated={isValidated}
                                onSubmit={onSubmit}
                                ref={formEl}
                            >
                                <FloatingLabel controlId='nameField' label='Project Name' className='mb-3'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='name'
                                        value={name}
                                        onChange={onChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>Project name is required</Form.Control.Feedback>
                                </FloatingLabel>
                                <Form.Group className="mb-3" controlId="descriptionField">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        type='text'
                                        name='description'
                                        rows={3}
                                        required
                                        value={description}
                                        onChange={onChange}
                                        placeholder='Write a description for the project'
                                    />
                                    <Form.Control.Feedback type='invalid'>Project description is required</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        required
                                        name='status'
                                        value={status}
                                        onChange={onChange}
                                    >
                                        <option hidden value=''>Open this select menu</option>
                                        <option value="new">Not Started</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="complete">Completed</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type='invalid'>Project status is required</Form.Control.Feedback>
                                </Form.Group>
                                {
                                    !isUpdate &&
                                    <Form.Group>
                                        <Form.Label>Client</Form.Label>
                                        <Form.Select
                                            required
                                            name='clientId'
                                            value={clientId}
                                            onChange={onChange}
                                        >
                                            <option hidden value=''>Open this select menu</option>
                                            {clients.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                                        </Form.Select>
                                        <Form.Control.Feedback type='invalid'>Please select the project's client</Form.Control.Feedback>
                                    </Form.Group>
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" disabled={!isSubmitButtonActive} onClick={() => {
                    if (formEl.current) {
                        formEl.current.requestSubmit();
                    }
                }}>
                    {isUpdate ? 'Update' : 'Add'} project
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ProjectFormUI.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    clients: PropTypes.array.isRequired,
    isValidated: PropTypes.bool.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    isSubmitButtonActive: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ProjectFormUI;