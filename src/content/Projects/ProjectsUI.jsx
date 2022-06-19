import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { FaPlus } from 'react-icons/fa';

import ProjectForm from './Forms/ProjectForm';
import ProjectTableRow from './ProjectTableRow';

const ProjectsUI = ({ projects, projectUpdateFormData, setProjectUpdateFormData }) => {
    const [isProjectAddModalVisible, setProjectAddModalVisibility] = useState(false);
    const [isProjectUpdateModalVisible, setProjectUpdateModalVisibility] = useState(false);

    const tableRows = useMemo(() => {
        return projects.map(project => (
            <ProjectTableRow
                key={project.id}
                project={project}
                setProjectUpdateModalVisibility={setProjectUpdateModalVisibility}
                setProjectUpdateFormData={setProjectUpdateFormData}
            />
        ));
    }, [projects, setProjectUpdateFormData]);

    return (
        <Container className="mt-3">
            <ProjectForm isModalVisibile={isProjectAddModalVisible} setModalVisibility={setProjectAddModalVisibility} />
            <ProjectForm isModalVisibile={isProjectUpdateModalVisible} setModalVisibility={setProjectUpdateModalVisibility} isUpdate project={projectUpdateFormData} />
            <Row className='mb-2'>
                <Col>
                    <h1>Projects</h1>
                    <small>Projects information</small>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Button variant='primary' onClick={() => setProjectAddModalVisibility(true)} size='sm'>
                        <span>
                            <FaPlus /> Add Project
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
                                <th scope="col">Status</th>
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

ProjectsUI.propTypes = {
    projects: PropTypes.array.isRequired,
    projectUpdateFormData: PropTypes.object.isRequired,
    setProjectUpdateFormData: PropTypes.func.isRequired
}

export default ProjectsUI;