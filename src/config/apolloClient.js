import config from 'config/config';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: `${config.serverURL}/graphql`,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    clients: {
                        merge: (_exsisting, incoming) => incoming
                    },
                    projects: {
                        merge: (_exsisting, incoming) => incoming
                    }
                }
            }
        }
    })
});

export default apolloClient;