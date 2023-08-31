import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Typography,
  Box } from '@mui/material';
  import { nchandiTheme } from '../../App';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: nchandiTheme.handiSecondaryWhite, display: 'flex', height: '100%' }}
    >
      <Tabs textColor='secondary'
        orientation="vertical"
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        indicatorColor='secondary'
        sx={{ borderRight: 3, borderColor: 'divider' }}
        tabsTemplate
      >
        <Tab label="Admin Dashboard" {...a11yProps(0)} />
        <Tab label="Committee Dashboard" {...a11yProps(1)} />
        <Tab label="Panel Members Dashboard" {...a11yProps(2)} />
        <Tab label="Panels Dashboard" {...a11yProps(3)} />
        <Tab label="Facilities Dashboard" {...a11yProps(4)} />
        <Tab label="Pending Volunteers" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
    </Box>
  );
}