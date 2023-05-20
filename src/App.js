import logo from './logo.svg';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import { Root, Header, EdgeSidebar, EdgeTrigger, Content, Footer } from '@mui-treasury/layout';
import { Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import CssBaseline from "@mui/material/CssBaseline";

import NCHANDIWebsiteService from './lib/NCHANDIWebsiteService';
import IconMenu from './components/IconMenu/IconMenu';


const nchandiWebsiteService = new NCHANDIWebsiteService();

function App() {
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = useCallback(async () => {
    try {
      // setLoading(true);
      const { data: membersData } = await nchandiWebsiteService.getMembers();
      setTableData(membersData);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  /**
     *
     */
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  return (
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
        <IconMenu />
      </EdgeSidebar>
      <Content>
        <Container>
          <Box>
            <Typography variant='h2'>
              North County Hospital & Institutions
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5'>
              Sharing the AA message to those who cannot get to a meeting in North County San Diego
            </Typography>
          </Box>
          <Box>
            <Typography variant='h3'>
              Interested in joining North County H&I?
            </Typography>
          </Box>
        </Container>
      </Content>
      <Footer>Footer</Footer>
    </Root>
  );
}

export default App;
