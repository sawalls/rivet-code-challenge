import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { EmphasizedTitle, ErrorAlert } from "./ErrorPage";

function RTKQueryError({
  error,
  operation,
}: {
  error: FetchBaseQueryError | SerializedError;
  operation?: string;
}) {
  let components = [];
  if ("status" in error) {
    if (typeof error.status === "number") {
      components.push(
        <EmphasizedTitle>HTTP Error {error.status}</EmphasizedTitle>
      );
    } else {
      components.push(<EmphasizedTitle>Error {error.status}</EmphasizedTitle>);
      switch (error.status) {
        case "FETCH_ERROR":
          components.push(
            <p>
              "With this status it is possible the backend is not running or you
              aren't pointing at it correctly"
            </p>
          );
          break;
        case "PARSING_ERROR":
          components.push(
            <p key="error-comp-status">
              Original Status: {error.originalStatus}
            </p>
          );
          components.push(
            <p>
              "With this status it is possible the backend is not returning
              valid JSON. See originalStatus above to see if the endpoint passed
              or failed"
            </p>
          );
          break;
        default:
          break;
      }
      components.push(<p key="error=comp-error">Error: {error.error}</p>);
    }
    if ("data" in error) {
      components.push(<p key="error-comp-data">Data: {String(error.data)}</p>);
    }
  } else {
    if ("name" in error) {
      components.push(<EmphasizedTitle>Error {error.name}</EmphasizedTitle>);
    } else {
      components.push(<EmphasizedTitle>Unknown Error</EmphasizedTitle>);
    }
    const errorProperties = ["message", "stack", "code"] as const;
    errorProperties.forEach((prop) => {
      if (prop in error) {
        components.push(
          <p key={`error-comp-${prop}`}>
            <b>{prop.charAt(0).toUpperCase() + prop.slice(1)}: </b>
            {String(error[prop])}
          </p>
        );
      }
    });
  }

  return (
    <ErrorAlert>
      {components}
      {operation && (
        <em>{`This error found while attempting operation: ${operation}`}</em>
      )}
    </ErrorAlert>
  );
}

export default RTKQueryError;
