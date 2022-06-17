import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from 'graphql/queries/clientQueries';
import { DELETE_CLIENT } from 'graphql/mutations/clientMutations';
import { Fragment, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';

const ClientTableRow = ({ client }) => {
    const { id, name, email, phone } = client;

    const [isModalVisible, setModalVisibility] = useState(false);

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id },
        //refetchQueries: [{ query: GET_CLIENTS }],
        update: (cache, { data: { deleteClient } }) => {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter(client => client.id !== deleteClient.id)
                }
            });
        }
    });

    return (
        <Fragment>
            <Modal centered show={isModalVisible} onHide={() => setModalVisibility(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete {name}?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalVisibility(false)}>Close</Button>
                    <Button variant="danger" onClick={() => {
                        deleteClient();
                        setModalVisibility(false);
                    }}>Delete User</Button>
                </Modal.Footer>
            </Modal>
            <tr>
                <th scope='row'>{id}</th>
                <td>{name}</td>
                <td><a href={`mailto:${email}`}>{email}</a></td>
                <td>{phone}</td>
                <td style={{
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center'
                }}><button type="button" className="btn btn-danger btn-sm" onClick={() => setModalVisibility(true)}><FaTrash /></button></td>
            </tr>
        </Fragment>
    );
}

ClientTableRow.propTypes = {
    client: PropTypes.object.isRequired
}

export default ClientTableRow;