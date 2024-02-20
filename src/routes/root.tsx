import { Box } from '@mui/material';
import { Link, Outlet } from "react-router-dom";

import { Status } from '../features/profile/Status';

function Root() {  
    return (
      <div className="App">
        <header className="App-header" style={{textAlign: 'center'}}>
          <Box>
            <Link to={'/'}>
              <h1>Schala Challenge Solution</h1>
             </Link>
          </Box>
          <Box sx={{width: '32em', boxSizing: 'border-box', padding: '.5em', margin: '0 auto', maxWidth: '100%'}}>
            <Outlet />
          </Box>
          <Status></Status>
        </header>
      </div>
    );
}
  
export default Root;