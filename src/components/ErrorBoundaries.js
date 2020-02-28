import React, { Component } from 'react';

class ErrorBoundaries extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
        console.log("gotta catch 'em all");
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h3>Something went wrong.</h3>;
        }
        return this.props.children;
    }
}
export default ErrorBoundaries;
