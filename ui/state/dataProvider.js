import React from 'react';

export const DataContext = React.createContext();

export function DataProvider({ children }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/key')
            .then(response => response.text())
            .then(data => setData({
                apiKey: data
            }))
            .catch(error => console.error(error));
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}

