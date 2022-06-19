import PropTypes from 'prop-types';
import AlertsContext from 'contexts/AlertsContext';

import { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENTS } from 'graphql/queries/clientQueries';
import { GET_PROJECTS } from 'graphql/queries/projectQueries';
import { ProjectStatusEnum } from 'graphql/queries/projectQueries';
import { ADD_PROJECT, UPDATE_PROJECT } from 'graphql/mutations/projectMutation';

import Spinner from 'components/Spinner';
import ProjectFormUI from './ProjectFormUI';

const initialFormState = {
    name: '',
    description: '',
    status: '',
    clientId: ''
}

const ProjectForm = ({ isModalVisibile, setModalVisibility, isUpdate, project }) => {
    if (isUpdate && !project) {
        throw new Error('Client prop must be set if isUpdate prop is true!');
    }

    const { createAlert } = useContext(AlertsContext);

    const [isSubmitButtonActive, setSubmitButtonActivity] = useState(true);
    const [isValidated, setValidity] = useState(false);
    const [formData, setFormData] = useState(initialFormState);

    const {
        loading,
        error,
        data
    } = useQuery(GET_CLIENTS);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: formData,
        refetchQueries: [{ query: GET_PROJECTS }]
    });

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id: project?.id,
            ...formData
        },
        update: (cache, { data: { updateProject }}) => {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.map(project => {
                        if (project.id !== updateProject.id) {
                            return project;
                        }

                        return {
                            ...project,
                            ...formData,
                            status: Object.entries(ProjectStatusEnum).find(([_key, value]) => formData.status === value)[0]
                        }
                    })
                }
            });
        }
    });

    useEffect(() => {
        if (isUpdate) {
            setFormData({ ...project, status: ProjectStatusEnum[project.status] });
        }

    }, [isUpdate, project]);

    const onClose = () => {
        setFormData(initialFormState);
        setValidity(false);
        setModalVisibility(false);
        setSubmitButtonActivity(true);
    }

    const onChange = ({ target: { name, value } }) => {
        setFormData(formData => ({ ...formData, [name]: value }))
    }

    const onSubmit = async e => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            if (isUpdate) {
                updateProject();
            } else {
                addProject();
            }

            onClose();
            createAlert(`${isUpdate ? 'Update' : 'Added'} project: ${formData.name} successfully!`);
        } else {
            setValidity(true);
        }
    }

    if (loading) {
        return (
            <Spinner/>
        );
    }

    return (
        !loading &&
        !error &&
        <ProjectFormUI
            {...formData}
            clients={data.clients}
            isValidated={isValidated}
            isModalVisible={isModalVisibile}
            isSubmitButtonActive={isSubmitButtonActive}
            isUpdate={isUpdate}
            onChange={onChange}
            onSubmit={onSubmit}
            onClose={onClose}
        />
    );
}

ProjectForm.propTypes = {
    isModalVisibile: PropTypes.bool.isRequired,
    setModalVisibility: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool,
    project: PropTypes.object
}

ProjectForm.defaultProps = {
    isUpdate: false
}

export default ProjectForm;