// import React, { useState, useEffect, useCallback } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Root, Header, EdgeSidebar, EdgeTrigger, Content, Footer, SidebarContent, } from '@mui-treasury/layout';
import {
  Typography,
  Box,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText,
  Paper,
  List,
  ListItem,
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
  KeyboardArrowLeft,
  ExtensionTwoTone,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
// import NchandiIcon from './components/NchandiIcon/NchandiIcon';


// const nchandiWebsiteService = new NCHANDIWebsiteService();

export const nchandiTheme = {
  handiBlue: "#245980",
  handiDarkBlue: "#2b3440",
  handiGreen: "#31a36e",
  handiDarkGreen: "#007343",
  handiSecondaryWhite: "#e6e6e6",
  handiGrey: "#747373",
  handiYellow: "#ffc107",
  handiDarkYellow: "#c79100"
}

const theme = createTheme({
  palette: {
    primary: {
      main: nchandiTheme.handiBlue
    },
    secondary: {
      main: nchandiTheme.handiDarkGreen
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
        <ListItemText primary={primary} sx={{ color: 'white' }} />
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
                md: {
                  position: "permanent",
                  height: 64,
                  clipped: false, // Add this if you uncomment the bottom
                },
              },
            },
            leftEdgeSidebar: {
              config: {
                xs: {
                  variant: "temporary",
                  width: "auto"
                },
                // md: {
                //   variant: "permanent", // eliminate md property to make non permenant sidebar
                //   width: 256,
                //   collapsible: true,
                //   collapsedWidth: 64,
                // },
              },
            },
          }}
        >
          <CssBaseline />
          <Header elevation={8} sx={{ backgroundColor: nchandiTheme.handiDarkGreen }}>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", px: 2, gap: 1 }} >
            <EdgeTrigger target={{ anchor: "left", field: "open" }} >
              {(open, setOpen) => (
                <IconButton onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowLeft sx={{ color: 'white' }} /> : <Menu sx={{ color: 'white' }} />}
                </IconButton>
              )}
            </EdgeTrigger>
            <Box display={'flex'} sx={{  alignItems: 'center' }}>
              <ExtensionTwoTone sx={{ color: 'white', fontSize: 50, mr: 1, my: 0.5 }}/>
              <Typography variant='h5' color={'white'} textAlign='justify' data-cy='header-title'>
                North County H&I
              </Typography>
            </Box>
          </Box>
          </Header>
          <EdgeSidebar anchor="left" >
            <Paper sx={{ width: 320, maxWidth: '100%', backgroundColor: nchandiTheme.handiDarkGreen }}>
              <Divider />
              <List>
                <ListItemLink to="/homepage" primary="Home" icon={<Home fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/about" primary="About" icon={<Info fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/orientation" primary="Orientation" icon={<School fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/panels" primary="Panels" icon={<LocalHospital fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/resources" primary="Resources" icon={<LibraryBooks fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/contacts" primary="Contacts" icon={<ContactPhone fontSize="medium"  sx={{ color: 'white'}} />} />
                <ListItemLink to="/login" primary="Login" icon={<LockOpen fontSize="medium" sx={{ color: 'white'}} />} />
              </List>
              <Divider />
              <List>
                <ListItemLink to="/admin" primary="Admin" icon={<AdminPanelSettings fontSize="medium" sx={{ color: 'white'}} />} />
              </List>
            </Paper>
            <SidebarContent sx={{ backgroundColor: nchandiTheme.handiDarkGreen }}> </SidebarContent>
          </EdgeSidebar>
          <Content >
            <Paper variant="outlined" elevation={1} sx={{backgroundColor: nchandiTheme.handiBlue}}>
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
            </Paper>
          </Content>
          <Footer sx={{backgroundColor: nchandiTheme.handiDarkBlue, minHeight: 50}}>
            <Box display='flex' sx={{ flexDirection: 'row', minWidth: 100 }} alignItems="center" py={1} mb={1}>
              <ExtensionTwoTone sx={{ color: 'white', fontSize: 50, ml: 3, my: 0.5 }}/>
              <Typography variant='h6' color='white' sx={{ minWidth: 125 }} marginRight={3}>
                North County H&I
              </Typography>
              <Box sx={{ flexDirection: 'column', minWidth: 275 }} display='flex' alignItems='right' py={3} mb={2} >
                <Typography variant='h7' color='white' sx={{ minWidth: 125 }}  marginLeft={3} marginRight={3} mb={1}>
                  PO Box 4013, Carlsbad, CA 92018
                </Typography>
                <Typography variant='h7' color='white' sx={{ minWidth: 125 }} align='right' marginLeft={3} marginRight={3} >
                  info@nchandi.org
                </Typography>
              </Box>
            </Box>
          </Footer>
        </Root>
      </ThemeProvider>
    </Router>
  );
}

export default App;
