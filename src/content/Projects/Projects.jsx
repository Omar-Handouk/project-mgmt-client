import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from 'graphql/queries/projectQueries';

import ProjectsUI from './ProjectsUI';
import Spinner from 'components/Spinner';

const Projects = () => {
    const [projectUpdateFormData, setProjectUpdateFormData] = useState({ name: '', description: '', status: '', clientId: '' });

    const {
        loading,
        error,
        data
    } = useQuery(GET_PROJECTS);

    if (loading) {
        return (
            <Spinner />
        );
    }
    return (
        !loading &&
        !error &&
        <ProjectsUI
            projects={data.projects}
            projectUpdateFormData={projectUpdateFormData}
            setProjectUpdateFormData={setProjectUpdateFormData}
        />
    );
}

export default Projects;