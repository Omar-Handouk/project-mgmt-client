import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from 'graphql/queries/clientQueries';

import ClientsUI from './ClientsUI';
import Spinner from 'components/Spinner';

const Clients = () => {
    const [clientUpdateFormData, setClientUpdateFormData] = useState({ name: '', email: '', phone: '' });

    const {
        loading,
        error,
        data
    } = useQuery(GET_CLIENTS);

    if (loading) {
        return (
            <Spinner />
        );
    }

    return (
        !loading &&
        !error &&
        <ClientsUI
            clients={data.clients}
            clientUpdateFormData={clientUpdateFormData}
            setClientUpdateFormData={setClientUpdateFormData}
        />
    );
}

export default Clients;