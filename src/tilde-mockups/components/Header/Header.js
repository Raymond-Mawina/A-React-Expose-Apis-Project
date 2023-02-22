import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => (
  <AppBar position="relative" variant="elevation">
    <Toolbar>
      <Typography fontSize={35}>Be Productive.</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
