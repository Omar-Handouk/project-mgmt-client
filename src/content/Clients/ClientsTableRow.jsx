import PropTypes from 'prop-types';
import AlertsContext from 'contexts/AlertsContext';
import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from 'graphql/queries/clientQueries';
import { GET_PROJECTS } from 'graphql/queries/projectQueries';
import { DELETE_CLIENT } from 'graphql/mutations/clientMutations';
import { Fragment, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaTrash, FaPen } from 'react-icons/fa';

const ClientTableRow = ({ client, setUpdateModalVisibility, setClientUpdateFormData }) => {
    const { id, name, email, phone } = client;
    const { createAlert } = useContext(AlertsContext);

    const [isModalVisible, setModalVisibility] = useState(false);

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id },
        //refetchQueries: [{ query: GET_CLIENTS }],
        update: (cache, { data: { deleteClient } }) => {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.filter(project => {
                        return project.client.id !== deleteClient.id;
                    })
                }
            });

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
                        createAlert(`Deleted user: ${client.name} successfully!`);
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
                    placeContent: 'center',
                    placeItems: 'center'
                }}>
                    <ButtonGroup>
                        <Button variant='danger' onClick={() => setModalVisibility(true)}><FaTrash /></Button>
                        <Button variant='secondary' onClick={() => {
                            setClientUpdateFormData(client);
                            setUpdateModalVisibility(true);
                        }}><FaPen /></Button>
                    </ButtonGroup>
                </td>
            </tr>
        </Fragment>
    );
}

ClientTableRow.propTypes = {
    client: PropTypes.object.isRequired,
    setUpdateModalVisibility: PropTypes.func.isRequired,
    setClientUpdateFormData: PropTypes.func.isRequired
}

export default ClientTableRow;