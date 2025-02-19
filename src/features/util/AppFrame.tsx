import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

interface AppFrameProps {
  children: React.ReactNode;
}

function AppFrame({ children }: AppFrameProps) {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header className="App-header">
        <Box>
          <Link to={"/"}>
            <h1>Schala Challenge Solution</h1>
          </Link>
        </Box>
      </header>
      {children}
    </div>
  );
}

export default AppFrame;
