import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import AddClient from './Forms/AddClient';
import ClientTableRow from './ClientsTableRow';

const ClientsUI = ({ data: { clients } }) => {
    const [isModalVisibile, setModalVisibility] = useState(false);

    const tableRows = useMemo(() => {
        return clients.map(client => <ClientTableRow key={client.id} client={client} />);
    }, [clients]);

    return (
        <Container className="mt-5">
            <AddClient isModalVisibile={isModalVisibile} setModalVisibility={setModalVisibility} />
            <Row className='mb-2'>
                <Col>
                    <h1>Clients</h1>
                    <small>Clientele information</small>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Button variant='secondary' onClick={() => setModalVisibility(true)}>Add Client</Button>
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
    data: PropTypes.object
}

export default ClientsUI;