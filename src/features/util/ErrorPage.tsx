import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import AppFrame from "./AppFrame";

function ErrorPage() {
    let error = useRouteError();
    return <AppFrame>
            <ErrorReport error={error} />
            <Link to={"/"}>Back to Home</Link>
        </AppFrame>
}

function ErrorReport({error}: {error: unknown}) {
    const components = [<h2 key='error-comp-header'>Error</h2>];
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            components.push(<h2 key='error-comp-404'>Page not found.</h2>);
            components.push(<p key='error-comp-404-explanation'>If you were sent here by the app, or are sure the address is correct, contact Schala. Otherwise, please check that you typed the URL correctly.</p>)
        } else {
            components.push(<h3 key='error-comp-status'>Status: {error.status}</h3>);
            components.push(<h3 key='error-comp-status-text'>Status Text: {error.statusText}</h3>);
            components.push(<h3 key='error-comp-data'>Data: {String(error.data)}</h3>);
        }
    } else if (error instanceof Error) {
        components.push(<h3 key='error-comp-name'>Name: {error.name}</h3>);
        components.push(<h3 key='error-comp-message'>Message: {error.message}</h3>);
        if (error.stack) {
            components.push(<pre key='error-comp-stack' style={{ textAlign: "left" }}>{error.stack}</pre>)
        }
        if (error.cause) {
            components.push(<h3 key='error-comp-cause'>Cause: {String(error.cause)}</h3>);
        }
    } else {
        components.push(<h2 key='error-comp-2'>Message: {String(error)}</h2>);
    }
    return <div style={{ textAlign: "center", width: "75%", justifySelf: "center" }}>{components}</div>;
}

export { ErrorReport, ErrorPage };

export default ErrorPage;