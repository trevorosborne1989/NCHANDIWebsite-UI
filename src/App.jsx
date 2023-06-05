// import React, { useState, useEffect, useCallback } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Root, Header, EdgeSidebar, EdgeTrigger, Content, Footer } from '@mui-treasury/layout';
import {
  Typography,
  Box,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText,
  Paper,
  List,
  ListItem
} from '@mui/material';
import {
  Home,
  Info,
  AdminPanelSettings,
  ContactPhone,
  LockOpen,
  School,
  LocalHospital,
  LibraryBooks,
  Menu,
  KeyboardArrowLeft
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { yellow } from '@mui/material/colors';
import CssBaseline from "@mui/material/CssBaseline";
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation
} from "react-router-dom";
import { StaticRouter } from 'react-router-dom/server';

// import NCHANDIWebsiteService from './lib/NCHANDIWebsiteService';
import HomePage from './components/HomePage/HomePage';
import About from './components/About/About';
import Orientation from './components/Orientation/Orientation';
import Panels from './components/Panels/Panels';
import Resources from './components/Resources/Resources';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';


// const nchandiWebsiteService = new NCHANDIWebsiteService();

const theme = createTheme({
  palette: {
    primary: {
      main: "#245980"
    },
    secondary: {
      main: "#007343"
    }
  }
});

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/homepage">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/homepage']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});


function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


function RouterContent() {
  const location = useLocation();
  return (
    <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
      Current route: {location.pathname}
    </Typography>
  );
}


function App() {
  // const [loading, setLoading] = useState(false);
  // const [tableData, setTableData] = useState([]);

  // const fetchTableData = useCallback(async () => {
  //   try {
  //     // setLoading(true);
  //     const { data: membersData } = await nchandiWebsiteService.getMembers();
  //     setTableData(membersData);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     // setLoading(false);
  //   }
  // }, []);

  /**
     *
     */
  // useEffect(() => {
  //   fetchTableData();
  // }, [fetchTableData]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Root
          scheme={{
            header: {
              config: {
                xs: {
                  position: "sticky",
                  height: 56,
                },
              },
            },
            leftEdgeSidebar: {
              config: {
                xs: {
                  variant: "temporary",
                  width: "auto"
                },
              },
            },
          }}
        >
          <CssBaseline />
          <Header>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", px: 2, gap: 1 }} >
            <EdgeTrigger target={{ anchor: "left", field: "open" }}>
              {(open, setOpen) => (
                <IconButton onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowLeft /> : <Menu />}
                </IconButton>
              )}
            </EdgeTrigger>
            <Box>
              <Typography variant='h5' data-cy='header-title'>
                North County H&I
              </Typography>
            </Box>
          </Box>
          </Header>
          <EdgeSidebar anchor="left">
            <Paper sx={{ width: 320, maxWidth: '100%' }}>
                <Box display='flex' justifyContent='center'>
                  <Box>
                      <Typography variant="h5" color={yellow}>
                          NCHANDI
                      </Typography>
                  </Box>
                </Box>
                <Divider />
                <List>
                  <ListItemLink to="/homepage" primary="Home" icon={<Home fontSize="medium" />} />
                  <ListItemLink to="/about" primary="About" icon={<Info fontSize="medium" />} />
                  <ListItemLink to="/orientation" primary="Orientation" icon={<School fontSize="medium" />} />
                  <ListItemLink to="/panels" primary="Panels" icon={<LocalHospital fontSize="medium" />} />
                  <ListItemLink to="/resources" primary="Resources" icon={<LibraryBooks fontSize="medium" />} />
                  <ListItemLink to="/contacts" primary="Contacts" icon={<ContactPhone fontSize="medium" />} />
                  <ListItemLink to="/login" primary="Login" icon={<LockOpen fontSize="medium" />} />
                </List>
                <Divider />
                <List>
                  <ListItemLink to="/admin" primary="Admin" icon={<AdminPanelSettings fontSize="medium" />} />
                </List>
            </Paper>
          </EdgeSidebar>
          <Content>
            <Routes>
              <Route path="*" element={<RouterContent />} />
              <Route path='/homepage' element={<HomePage />} />
              <Route path='/about' element={<About />} />
              <Route path='/orientation' element={<Orientation />} />
              <Route path='/panels' element={<Panels />} />
              <Route path='/resources' element={<Resources />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/login' element={<Login />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </Content>
          <div id="detail">
          </div>
          <Footer>Footer</Footer>
        </Root>
      </ThemeProvider>
    </Router>
  );
}

export default App;
