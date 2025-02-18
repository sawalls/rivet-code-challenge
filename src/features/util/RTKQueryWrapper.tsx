import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import RTKQueryError from "./RTKQueryError";

function RTKQueryWrapper({children, useQueryHookResult, operation}: {children: React.ReactNode, useQueryHookResult: UseQueryHookResult<any, any>,operation?: string | undefined}) {
    const { isError, error, isLoading, isSuccess } = useQueryHookResult;
    if (isError) {
        return <RTKQueryError error={error} operation={operation} />;
    } else if (isLoading) {
        return <div>Loading... current operation: {operation}</div>;
    } else if (!isSuccess) {
        throw new Error("Assertion failed. Unexpected state. isSuccess is false but isError and isLoading are also false.");
    }
    return <>{children}</>;
}

export default RTKQueryWrapper;
