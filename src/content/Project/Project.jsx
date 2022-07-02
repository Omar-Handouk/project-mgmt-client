import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PROJECT } from 'graphql/queries/projectQueries';

import ProjectUI from './ProjectUI';

import Spinner from 'components/Spinner';

const Project = () => {
    const { id: projectId } = useParams();

    const {
        loading,
        error,
        data
    } = useQuery(GET_PROJECT, {
        variables: { id: projectId }
    });

    if (loading) {
        return (<Spinner />);
    }

    return (
        !loading &&
        !error &&
        <ProjectUI
            project={data.project}
        />
    );
}

export default Project;