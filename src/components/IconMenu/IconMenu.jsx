import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography, Box, Divider } from '@mui/material';
import {
  Home,
  Info,
  AdminPanelSettings,
  ContactPhone,
  LockOpen,
  School,
  LocalHospital,
  LibraryBooks} from '@mui/icons-material';
import { yellow } from '@mui/material/colors';

export default function IconMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
    <Box display='flex' justifyContent='center'>
    <Box>
        <Typography variant="h5" color={yellow}>
            NCHANDI
        </Typography>
    </Box>
    </Box>
    <Divider />
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Home fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Info fontSize="medium" />
          </ListItemIcon>
          <ListItemText>About</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <School fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Orientation</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LocalHospital fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Panels</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LibraryBooks fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Resources</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContactPhone fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Contacts</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LockOpen fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Login</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AdminPanelSettings fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Admin</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}