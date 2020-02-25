export const headersConfig = (isMulti = false) => {
    // Get token from local storage
    const token = localStorage.getItem('jwtToken');
    //Headers
    const headerValue = isMulti
        ? {}
        : { 'Content-type': 'application/json' };
    const config = {
        headers: headerValue,
    };
    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};
