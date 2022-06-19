import PropTypes from 'prop-types';
import AlertsContext from 'contexts/AlertsContext';
import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from 'graphql/queries/projectQueries';
import { DELETE_PROJECT } from 'graphql/mutations/projectMutation';
import { Fragment, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaTrash, FaPen } from 'react-icons/fa';

const ProjectTableRow = ({ project, setProjectUpdateModalVisibility, setProjectUpdateFormData }) => {
    const { id, name, status } = project;
    const { createAlert } = useContext(AlertsContext);

    const [isModalVisible, setModalVisibility] = useState(false);

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id },
        update: (cache, { data: { deleteProject }}) => {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.filter(project => project.id !== deleteProject.id)
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
                        deleteProject();
                        setModalVisibility(false);
                        createAlert(`Deleted project: ${name} successfully!`);
                    }}>Delete User</Button>
                </Modal.Footer>
            </Modal>
            <tr>
                <th scope='row'>{id}</th>
                <td>{name}</td>
                <td>{status}</td>
                <td style={{
                    display: 'flex',
                    justifyContent: 'center',
                    justifyItems: 'center'
                }}>
                    <ButtonGroup>
                        <Button variant='danger' onClick={() => setModalVisibility(true)}><FaTrash /></Button>
                        <Button variant='secondary' onClick={() => {
                            setProjectUpdateFormData({ ...project, clientId: project.client.id });
                            setProjectUpdateModalVisibility(true);
                        }}><FaPen /></Button>
                    </ButtonGroup>
                </td>
            </tr>
        </Fragment>
    )
}

ProjectTableRow.propTypes = {
    project: PropTypes.object.isRequired,
    setProjectUpdateModalVisibility: PropTypes.func.isRequired,
    setProjectUpdateFormData: PropTypes.func.isRequired,
}

export default ProjectTableRow;