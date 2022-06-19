import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
        addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            id,
            name,
            status,
            client {
                id
            }
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String, $description: String, $status: ProjectStatus) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
            id,
            name,
            status,
            client {
                id
            }
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id,
            name,
            status,
            client {
                id
            }
        }
    }
`;