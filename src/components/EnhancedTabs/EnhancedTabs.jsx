import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Typography,
  Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

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

export default function VerticalTabs({ direction, tabLabels, components, style }) {
  const [value, setValue] = React.useState(0);
  // const { direction, tabLabels, components, style } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      { direction === 'vertical' &&
        <Box
          sx={{ flexGrow: 1, display: 'flex', height: '100%' }}
        >
          <Tabs
            textColor='inherit'
            orientation={direction}
            variant='scrollable'
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            indicatorColor='secondary'
            sx={style}
          >
            {tabLabels?.map((tabLabel, index) => (
              <Tab key={index} label={tabLabel} {...a11yProps(index)} />
            ))}
          </Tabs>
          <Grid container sm={10} justifyContent={'center'} >
            <Grid sm={11}>
              {components?.map((component, index) => (
                <TabPanel key={index}  value={value} index={index}>
                  {component}
                </TabPanel>
              ))}
            </Grid>
          </Grid>
        </Box>
      }
      { direction === 'horizontal' &&
        <Box sx={{ width: '100%' }}>
          <Tabs
            textColor='inherit'
            orientation={direction}
            variant='fullWidth'
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            indicatorColor='secondary'
            sx={style}
          >
            {tabLabels?.map((tabLabel, index) => (
              <Tab key={index} label={tabLabel} {...a11yProps(index)} />
            ))}
          </Tabs>
          <Grid container sm={12} justifyContent={'center'} >
            <Grid sm={12}>
              {components?.map((component, index) => (
                <TabPanel key={index}  value={value} index={index}>
                  {component}
                </TabPanel>
              ))}
            </Grid>
          </Grid>
        </Box>
      }
    </>
  );
}

VerticalTabs.propTypes = {
  direction: PropTypes.string.isRequired,
  tabLabels: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired
};