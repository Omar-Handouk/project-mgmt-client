import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { FaPlus } from 'react-icons/fa';

import ClientForm from './Forms/ClientForm';
import ClientTableRow from './ClientsTableRow';

const ClientsUI = ({ clients, clientUpdateFormData, setClientUpdateFormData }) => {
    const [isClientAddModalVisible, setClientAddModalVisibility] = useState(false);
    const [isClientUpdateModalVisible, setClientUpdateModalVisibility] = useState(false);

    const tableRows = useMemo(() => {
        return clients.map(client => (<ClientTableRow
            key={client.id}
            client={client}
            setUpdateModalVisibility={setClientUpdateModalVisibility}
            setClientUpdateFormData={setClientUpdateFormData}
        />));
    }, [clients, setClientUpdateFormData]);

    return (
        <Container className="mt-3">
            <ClientForm isModalVisibile={isClientAddModalVisible} setModalVisibility={setClientAddModalVisibility} />
            <ClientForm isModalVisibile={isClientUpdateModalVisible} setModalVisibility={setClientUpdateModalVisibility} isUpdate client={clientUpdateFormData} />
            <Row className='mb-2'>
                <Col>
                    <h1>Clients</h1>
                    <small>Clientele information</small>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Button variant='primary' onClick={() => setClientAddModalVisibility(true)} size='sm'>
                        <span>
                            <FaPlus /> Add Client
                        </span>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table bordered responsive striped>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

ClientsUI.propTypes = {
    clients: PropTypes.array.isRequired,
    clientUpdateFormData: PropTypes.object.isRequired,
    setClientUpdateFormData: PropTypes.func.isRequired
}

export default ClientsUI;