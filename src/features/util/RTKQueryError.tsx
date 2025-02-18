import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

function RTKQueryError({error, operation}: {error: FetchBaseQueryError | SerializedError, operation?: string | undefined}) {
    if ("status" in error) {
        const errMsg = "error" in error ? error.error : null;
        const errData = "data" in error ? JSON.stringify(error.data) : null;
        const originalStatus = "originalStatus" in error ? error.originalStatus : null;
        let backendSuggestion : string | null = null;
        if (error.status === "FETCH_ERROR") {
            backendSuggestion = "With this status it is possible the backend is not running or you aren't pointing at it correctly";
        } else if (error.status === "PARSING_ERROR") {
            backendSuggestion = "With this status it is possible the backend is not returning valid JSON. See originalStatus above to see if the endpoint passed or failed";
        }

        return <div style={{ textAlign: "center", justifySelf: "center" }}>
            <h2>{`ERROR with status: ${error.status}`}</h2>
            {operation && <h3>{`While attempting operation: ${operation}`}</h3>}
            {errMsg && <p><b>Error: </b>{errMsg}</p>}
            {errData && <p><b>Data: </b>{errData}</p>}
            {originalStatus && <p><b>Original Status: </b>{originalStatus}</p>}
            {backendSuggestion && <p>{backendSuggestion}</p>}
        </div>;
    } else {
        return <>{`ERROR with status: ${error.message}`}</>;
    }
}

export default RTKQueryError;
