import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = {
            hasError: false,
            error: '',
            errorInfo: ''
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        })
    }
    render() {
        if (this.state.hasError) {
            // return <h1>Error 404 </h1>

            <div>
                <h2>Something went wrong.</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                </details>
            </div>
        };
        return this.props.children
    };
};