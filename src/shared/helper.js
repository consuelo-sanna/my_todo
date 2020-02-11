export const headersConfig = () => {
    // Get token from local storage
    const token = localStorage.getItem('jwtToken');
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};
