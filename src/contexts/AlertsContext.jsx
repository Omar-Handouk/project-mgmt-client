import { v4 as uuid } from 'uuid';
import { useState, createContext } from 'react';

const AlertsContext = createContext();

const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    /**
     * 
     * @param {String} body Alert body
     * @param {String} variant Alert variant, default: primary
     * @param {Number} delay Delay in milliseconds
     */
    const createAlert = (body, variant = 'primary', delay = 5000) => {
        const newAlert = {
            id: uuid(),
            body,
            variant
        };

        setAlerts(alerts => [ ...alerts, newAlert ]);

        setTimeout(() => {
            setAlerts(alerts => alerts.filter(({ id }) => id !== newAlert.id ));
        }, delay);
    }

    return (
        <AlertsContext.Provider value={{ alerts, createAlert }}>
            {children}
        </AlertsContext.Provider>
    );
}

export default AlertsContext;
export { AlertsProvider };