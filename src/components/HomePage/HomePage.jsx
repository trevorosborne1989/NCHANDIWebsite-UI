import React from 'react';
import { Box, Container, Typography, Card, CardActions, CardContent, Divider } from '@mui/material';
import { Button } from '@mui/material';


const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        North County Hospital & Institutions
      </Typography>
      <Typography variant="h5" component="div">
        Sharing the AA message to those who cannot get to a meeting in North County San Diego
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Come join us!
      </Typography>
      <Typography variant="body2">
        Get Connected
        <br />
        Join our mailing list to receiving limited emails about orientation dates, panel openings and special events.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Register</Button>
    </CardActions>
  </React.Fragment>
);

const HomePage = () => {

  return (
    <Container>
      <Box sx={{ maxWidth: 275 }} py={3} mb={2}>
        <Card variant="outlined">{card}</Card>
      </Box>
      <Box py={3}>
        <Divider />
      </Box>
      <Box sx={{ minWidth: 275 }} py={3} mb={2}>
        <Card variant="outlined">{card}</Card>
      </Box>
      <Box sx={{ minWidth: 275 }} py={3} mb={2}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Container>
  )
  // You can pass in a card variable or just nest all of the Card MUI components for each section of the homepage that you want to be a Card.
  // Probably easiest since you will have multiple cards on the homepage
}

export default HomePage;