import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  } from '@mui/material';
  import { DeleteForever } from '@mui/icons-material';
  import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
  import { nchandiTheme } from '../../App';

const ShowUploadsCard = ({resourceData, isOpen, entityName, primaryText, handleClose, handleDelete, handleDeleteConfirm}) => {
  const [ highlight, setHighlight] = useState('');

  const handleHover = () => {
    setHighlight('info');
  };

  return (
    <>
      <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue }} variant="elevation" elevation={10}>
        <CardContent>
          <Typography variant='h5' color='white' py={2} textAlign={'center'} >
            Current Panel Materials
          </Typography>
          <Box display="flex" py={1.5} justifyContent="center">
            <List>
              {resourceData.map(resource => (
                <ListItem key={resource.id} value={resource.label}>
                  <ListItemIcon>
                    <DeleteForever onHover={handleHover} fontSize='large' color={highlight || 'error'} onClick={e => handleDelete(e, resource)} data-cy='list-delete-btn' />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: nchandiTheme.handiDarkYellow }}
                    primary={resource.label}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        isOpen={isOpen}
        entityName={entityName}
        primaryText={primaryText}
        handleClose={handleClose}
        handleDelete={handleDeleteConfirm}
        />
    </>
  )
}

export default ShowUploadsCard;