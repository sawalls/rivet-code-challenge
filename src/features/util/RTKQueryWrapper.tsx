import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import RTKQueryError from "./RTKQueryError";
import { LinearProgress, styled } from "@mui/material";

const HideableLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "hide",
})(({ hide }: { hide: boolean }) => ({
  visibility: hide ? "hidden" : "visible",
}));

function RTKQueryWrapper({
  children,
  useQueryHookResult,
  operation,
}: {
  children: React.ReactNode;
  useQueryHookResult: UseQueryHookResult<any, any>;
  operation?: string | undefined;
}) {
  const { isError, error, isLoading, isSuccess, isFetching } =
    useQueryHookResult;
  if (isError) {
    return <RTKQueryError error={error} operation={operation} />;
  } else if (isLoading) {
    return (
      <>
        <LinearProgress sx={{ width: "100%" }} />
        <p>Loading... current operation: {operation}</p>
      </>
    );
  } else if (!isSuccess) {
    throw new Error(
      "Assertion failed. Unexpected state. isSuccess is false but isError and isLoading are also false."
    );
  }

  return (
    <>
      <HideableLinearProgress hide={!isFetching} />
      {children}
    </>
  );
}

export default RTKQueryWrapper;
