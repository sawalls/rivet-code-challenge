import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface AppFrameProps {
  children: React.ReactNode;
}

function AppFrame({ children }: AppFrameProps) {
  return (
    <div className="App">
      <header className="App-header">
        <Box className="App-header-box">
          <HeaderBar />
        </Box>
      </header>
      <Box className="App-children-box">{children}</Box>
    </div>
  );
}

function HeaderBar() {
  return (
    <AppBar position="static">
      <Toolbar className="App-toolbar">
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <Link to="/" className="App-link">
            <CameraEnhanceIcon />
            &nbsp;schalfile
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppFrame;
