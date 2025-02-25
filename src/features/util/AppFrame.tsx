import React from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";

interface AppFrameProps {
  children: React.ReactNode;
}

function AppFrame({ children }: AppFrameProps) {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header className="App-header">
        <Box
          sx={{
            flexGrow: 1,
            width: "50em",
            boxSizing: "border-box",
            padding: ".5em",
            margin: "0 auto",
            maxWidth: "100%",
            alignItems: "center",
          }}
        >
          <AppBar position="static">
            <Toolbar sx={{ justifyContent: "center" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <CameraEnhanceIcon />
                  &nbsp;schalafile
                </Link>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>{" "}
      </header>
      {children}
    </div>
  );
}

export default AppFrame;
