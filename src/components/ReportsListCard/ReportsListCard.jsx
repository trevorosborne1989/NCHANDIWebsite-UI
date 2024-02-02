import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  } from '@mui/material';
  import { DeleteForever } from '@mui/icons-material';
  import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
  import { nchandiTheme } from '../../App';

const ReportsListCard = ({resourceData, isOpen, entityName, cardTitle, primaryText, secondaryText, handleClose, handleDelete, handleDeleteConfirm}) => {

  return (
    <>
      <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue }} variant="elevation" elevation={10}>
        <CardContent>
          <Typography variant='h5' color='white' py={2} textAlign={'center'} >
            Current {cardTitle}
          </Typography>
          <Box display="flex" py={1.5} justifyContent="center">
            <List>
              {resourceData.map(resource => (
                <>
                  <List key={resource.id} value={resource.id}>
                    <ListItem disablePadding>
                      <ListItemText
                        sx={{ color: nchandiTheme.handiDarkYellow }}
                        primary={resource.monthOfYear}
                      />
                    </ListItem>
                    {resource.financialReport &&
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <IconButton>
                            <DeleteForever
                              fontSize='large'
                              color={'error'}
                              onClick={e => handleDelete(e, resource, 'Financial')}
                              data-cy='list-delete-btn'
                              sx={{"&:hover": { color: nchandiTheme.handiDarkRed }}}
                            />
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: nchandiTheme.handiDarkYellow }}
                          primary={'Financial Report'}
                        />
                      </ListItem >
                    }
                    {resource.minutes &&
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <IconButton>
                            <DeleteForever
                              fontSize='large'
                              color={'error'}
                              onClick={e => handleDelete(e, resource, 'Minutes')}
                              data-cy='list-delete-btn'
                              sx={{"&:hover": { color: nchandiTheme.handiDarkRed }}}
                            />
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: nchandiTheme.handiDarkYellow }}
                          primary={'Committee Minutes'}
                        />
                      </ListItem>
                    }
                  </List>
                </>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        isOpen={isOpen}
        entityName={entityName}
        primaryText={primaryText}
        secondaryText={secondaryText}
        handleClose={handleClose}
        handleDelete={handleDeleteConfirm}
      />
    </>
  )
}

export default ReportsListCard;