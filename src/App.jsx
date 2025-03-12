import React from 'react';
import PropTypes from 'prop-types';
import { Root, Header, EdgeSidebar, EdgeTrigger, Content, Footer, SidebarContent, } from '@mui-treasury/layout';
import Grid from '@mui/material/Unstable_Grid2';
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
  Tooltip,
  SvgIcon,
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
  Logout,
  CardGiftcard,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Link as RouterLink,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import snackbarMessages from './lib/snackbarMessages';
import NCHANDIWebsiteService from './lib/NCHANDIWebsiteService';
import { ReactComponent as NchandiSvg } from './resources/icons/nchandiLogo.svg';

const nchandiWebsiteService = new NCHANDIWebsiteService();

export const nchandiTheme = {
  handiBlue: "#245980",
  handiDarkBlue: "#2b3440",
  handiGreen: "#31a36e",
  handiDarkGreen: "#007343",
  handiSecondaryWhite: "#e6e6e6",
  handiGrey: "#747373",
  handiYellow: "#ffc107",
  handiDarkYellow: "#c79100",
  handiDarkRed: '	#8B0000'
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

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});


function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      {
        <ListItem button component={Link} to={to} >
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} sx={{ color: 'white'}} />
        </ListItem>
      }
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function ListItemAdminLink(props) {
  const { icon, primary, to } = props;
  const { enqueueSnackbar } = useSnackbar();

  return (
    <li>
      {
        <ListItem button component={Link} to={Cookies.get('isAdmin') ? to : '/unathorized'} onClick={Cookies.get('isAdmin') ? null : () => enqueueSnackbar('You must be an Admin and logged in.', snackbarMessages.warning.configuration)}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} sx={{ color: Cookies.get('isAdmin') ? 'white' : 'grey'}} />
        </ListItem>
      }
    </li>
  );
}

ListItemAdminLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();

  /**
   *
   */
  const handleLogout = async () => {
    try {
      await nchandiWebsiteService.logout();
      Cookies.remove('JSESSIONID');
      Cookies.remove('isAdmin');
      enqueueSnackbar('Logout Successful', snackbarMessages.success.configuration);
      history('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error logging out!', snackbarMessages.error.configuration);
    }
  }

  return (
    <>
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
            <Grid container sm={12}>
              <Grid sm={9}>
                <Box flex={1} display={'flex'} px={2} gap={1} alignItems='center' >
                  <EdgeTrigger target={{ anchor: "left", field: "open" }} >
                    {(open, setOpen) => (
                      <IconButton onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowLeft sx={{ color: 'white' }} /> : <Menu sx={{ color: 'white' }} />}
                      </IconButton>
                    )}
                  </EdgeTrigger>
                  <Box display={'flex'} alignItems='center' pt={1} >
                    <SvgIcon sx={{ fontSize: '45px', boxShadow: '3'}} >
                      <NchandiSvg  />
                    </SvgIcon>
                    <Typography variant='h5' color={'white'}  pl={2} data-cy='header-title'>
                      North County H&I
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid sm={3} >
                {Cookies.get("isAdmin") &&
                  <Box display={'flex'} pr={1} justifyContent={'right'} >
                    {/* <Logout sx={{ color: 'white', fontSize: 45 }}/> */}
                    <Tooltip title="Logout" placement='left' arrow>
                      <IconButton onClick={handleLogout}>
                        {/* <Typography sx={{fontSize: 'large'}} color={'white'} pr={1} data-cy='logout'>
                          Logout
                        </Typography> */}
                        <Logout sx={{ color: 'white', fontSize: 50 }}/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              </Grid>
            </Grid>
          </Header>
          <EdgeSidebar anchor="left" >
            <Paper sx={{ width: 320, maxWidth: '100%', backgroundColor: nchandiTheme.handiDarkGreen }}>
              <Divider />
              <List>
                <ListItemLink to="/" primary="Home" icon={<Home fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/about" primary="About" icon={<Info fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/orientation" primary="Orientation" icon={<School fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/panels" primary="Panels" icon={<LocalHospital fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/resources" primary="Resources" icon={<LibraryBooks fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="/contact" primary="Contact" icon={<ContactPhone fontSize="medium"  sx={{ color: 'white'}} />} />
                <ListItemLink to="/login-page" primary="Login" icon={<LockOpen fontSize="medium" sx={{ color: 'white'}} />} />
                <ListItemLink to="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PB3PFLL9AW4KU&source=url" primary="Donate" icon={<CardGiftcard fontSize="medium" sx={{ color: nchandiTheme.handiYellow }} />} />
                {/* <ListItemLink to="/unathorized" primary="Unathorized" icon={<Warning fontSize="medium" sx={{ color: 'white'}} />} /> */}
              </List>
              <Divider />
              <List >
                <ListItemAdminLink
                  to={"/admin-container"}
                  primary="Admin"
                  icon={<AdminPanelSettings
                  fontSize="medium"
                  sx={{ color: 'white'}} />}
                />
              </List>
            </Paper>
            <SidebarContent sx={{ backgroundColor: nchandiTheme.handiDarkGreen }}> </SidebarContent>
          </EdgeSidebar>
          <Content>
            <Box height='100%' sx={{backgroundColor: nchandiTheme.handiBlue}}>
              <Paper variant='outlined' sx={{backgroundColor: nchandiTheme.handiBlue}}>
                <Outlet /> {/* Nested routes render here */}
              </Paper>
            </Box>
          </Content>
          <Footer>
            <Box height='100%' sx={{backgroundColor: nchandiTheme.handiBlue}} position={''}>
            <Paper variant='outlined' sx={{backgroundColor: nchandiTheme.handiDarkBlue}}>
            <Grid container sm={12}  sx={{backgroundColor: nchandiTheme.handiDarkBlue}} justifyContent={'center'} alignItems={'center'} py={1}>
              <Grid sm={1} textAlign={'right'} pr={1.5} pt={1}>
                <SvgIcon sx={{ fontSize: '50px', boxShadow: '3'}} >
                  <NchandiSvg  />
                </SvgIcon>
              </Grid>
              <Grid sm={2}>
                <Typography variant='h6' color='white' >
                  North County H&I
                </Typography>
              </Grid>
              <Grid sm={5}>

              </Grid>
              <Grid container sm={4} direction='column' justifyContent={'center'} alignItems={'end'} textAlign={'end'} pr={4}>
                <Grid sm={10}>
                  <Typography variant='h7' color='white' >
                    PO Box 4013, Carlsbad, CA 92018
                  </Typography>
                </Grid>
                <Grid sm={10}>
                  <Typography variant='h7' color='white'>
                    info@nchandi.org
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            </Paper>
            </Box>
          </Footer>
        </Root>
      </ThemeProvider>
    </>
  );
}

export default App;
