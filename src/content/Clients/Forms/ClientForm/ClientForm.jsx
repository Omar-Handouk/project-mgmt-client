import PropTypes from 'prop-types';
import AlertsContext from 'contexts/AlertsContext';

import { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from 'graphql/queries/clientQueries';
import { ADD_CLIENT, UPDATE_CLIENT } from 'graphql/mutations/clientMutations';

import ClientFormUI from './ClientFormUI';

const initialFormState = {
    name: '',
    email: '',
    phone: ''
}

const ClientForm = ({ isModalVisibile, setModalVisibility, isUpdate, client }) => {
    if (isUpdate && !client) {
        throw new Error('Client prop must be set if isUpdate prop is true!');
    }

    const { createAlert } = useContext(AlertsContext);

    const [isSubmitButtonActive, setSubmitButtonActivity] = useState(true);
    const [isValidated, setValidity] = useState(false);
    const [formData, setFormData] = useState(initialFormState);

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: formData,
        refetchQueries: [{ query: GET_CLIENTS }]
    });

    const [updateClient] = useMutation(UPDATE_CLIENT,
        {
            variables: {
                id: client?.id,
                ...formData
            },
            update: (cache, { data: updateClient }) => {
                const { clients } = cache.readQuery({ query: GET_CLIENTS });

                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: {
                        clients: clients.map(client => {
                            if (updateClient.id !== client.id) {
                                return client;
                            }

                            return {
                                ...client,
                                ...formData
                            };
                        })
                    }
                });
            }
    });

    useEffect(() => {
        if (isUpdate) {
            setFormData({ ...client });
        }

    }, [isUpdate, client]);
    
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
                updateClient();
            } else {
                addClient();
            }

            onClose();
            createAlert(`${isUpdate ? 'Update' : 'Added'} user: ${formData.name} successfully!`);
        } else {
            setValidity(true);
        }
    }
    
    return (
        <ClientFormUI
            {...formData}
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

ClientForm.propTypes = {
    isModalVisibile: PropTypes.bool.isRequired,
    setModalVisibility: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool,
    client: PropTypes.object
}

ClientForm.defaultProps = {
    isUpdate: false
}

export default ClientForm;