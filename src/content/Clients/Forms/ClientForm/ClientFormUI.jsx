import PropTypes from 'prop-types';
import { useRef } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const ClientFormUI = ({
    name,
    email,
    phone,
    isValidated,
    isModalVisible,
    isSubmitButtonActive,
    isUpdate,
    onChange,
    onSubmit,
    onClose,
}) => {
    const formEl = useRef();

    return (
        <Modal show={isModalVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? 'Update client' : 'Add a new client'}</Modal.Title>
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
                                <FloatingLabel controlId='nameField' label='Client Name' className='mb-3'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='name'
                                        value={name}
                                        onChange={onChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>Client name is required</Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId='emailField' label='Client Email' className='mb-3'>
                                    <Form.Control
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={onChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>Client email is required</Form.Control.Feedback>
                                </FloatingLabel>
                                <FloatingLabel controlId='phoneField' label='Client Phone' className='mb-3'>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='phone'
                                        value={phone}
                                        onChange={onChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>Client phone is required</Form.Control.Feedback>
                                </FloatingLabel>
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
                    {isUpdate ? 'Update' : 'Add'} user
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ClientFormUI.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    isValidated: PropTypes.bool.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    isSubmitButtonActive: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ClientFormUI;