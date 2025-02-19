import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

function getBackendSuggestion(status: string): string | null {
  switch (status) {
    case "FETCH_ERROR":
      return "With this status it is possible the backend is not running or you aren't pointing at it correctly";
    case "PARSING_ERROR":
      return "With this status it is possible the backend is not returning valid JSON. See originalStatus above to see if the endpoint passed or failed";
    default:
      return null;
  }
}

function RTKQueryError({
  error,
  operation,
}: {
  error: FetchBaseQueryError | SerializedError;
  operation?: string;
}) {
  const errorDetails = [
    { label: "Status", value: "status" in error ? String(error.status) : null },
    { label: "Error", value: "error" in error ? error.error : null },
    {
      label: "Data",
      value: "data" in error ? JSON.stringify(error.data) : null,
    },
    {
      label: "Original Status",
      value: "originalStatus" in error ? String(error.originalStatus) : null,
    },
    {
      label: "Backend Suggestion",
      value:
        "status" in error && typeof error.status !== "number"
          ? getBackendSuggestion(error.status)
          : null,
    },
    { label: "Message", value: "message" in error ? error.message : null },
    { label: "Name", value: "name" in error ? error.name : null },
    { label: "Stack", value: "stack" in error ? error.stack : null },
    { label: "Code", value: "code" in error ? error.code : null },
  ];

  return (
    <div style={{ textAlign: "center", justifySelf: "center" }}>
      <h2>{`ERROR`}</h2>
      {operation && <h3>{`While attempting operation: ${operation}`}</h3>}
      {errorDetails.map(
        ({ label, value }) =>
          value && (
            <p key={label}>
              <b>{label}: </b>
              {value}
            </p>
          )
      )}
    </div>
  );
}

export default RTKQueryError;
