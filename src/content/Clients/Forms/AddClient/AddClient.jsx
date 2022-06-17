import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from 'graphql/queries/clientQueries';
import { ADD_CLIENT } from 'graphql/mutations/clientMutations';

import AddClientUI from './AddClientUI';

const initialFormState = {
    name: '',
    email: '',
    phone: ''
}

const AddClient = ({ isModalVisibile, setModalVisibility }) => {
    const [isSubmitButtonActive, setSubmitButtonActivity] = useState(true);
    const [isValidated, setValidity] = useState(false);
    const [formData, setFormData] = useState(initialFormState);

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: formData,
        refetchQueries: [{ query: GET_CLIENTS }]
    });

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
            addClient();
            onClose();
        } else {
            setValidity(true);
        }
    }
    return (
        <AddClientUI
            { ...formData }
            isValidated={isValidated}
            isModalVisible={isModalVisibile}
            isSubmitButtonActive={isSubmitButtonActive}
            onChange={onChange}
            onSubmit={onSubmit}
            onClose={onClose}
        />
    );
}

AddClient.propTypes = {
    isModalVisibile: PropTypes.bool.isRequired,
    setModalVisibility: PropTypes.func.isRequired
}

export default AddClient;