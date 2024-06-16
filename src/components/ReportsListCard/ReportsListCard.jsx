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
  Link,
  IconButton,
  } from '@mui/material';
  import { DeleteForever } from '@mui/icons-material';
  import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
  import { nchandiTheme } from '../../App';

const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June' , 'July', 'August', 'September', 'October', 'November', 'December'];

const ReportsListCard = ({resourceData, handleClick, isOpen, entityName, cardTitle, primaryText, secondaryText, handleClose, handleDelete, handleDeleteConfirm}) => {

  return (
    <>
      <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue }} variant="elevation" elevation={10}>
        <CardContent>
          <Typography variant='h5' color='white' py={2} textAlign={'center'} >
            Current {cardTitle}
          </Typography>
          <Box display="flex" py={1.5} justifyContent="center">
            <List>
              {monthsOfYear.map((month, i) =>
                <div key={i}>
                  <ListItem disablePadding>
                    <ListItemText
                      sx={{ color: nchandiTheme.handiDarkYellow }}
                      primary={month}
                    />
                  </ListItem>
                  {resourceData.find(resource => resource.monthOfYear === month && resource.type === 'Financial') &&
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <IconButton>
                          <DeleteForever
                            fontSize='large'
                            color={'error'}
                            onClick={e => handleDelete(e, resourceData.find(resource => resource.monthOfYear === month && resource.type === 'Financial'))}
                            data-cy='list-delete-btn'
                            sx={{"&:hover": { color: nchandiTheme.handiDarkRed }}}
                          />
                        </IconButton>
                      </ListItemIcon>
                      <Link underline='hover' color={nchandiTheme.handiDarkYellow} onClick={e => handleClick(e, resourceData.find(resource => resource.monthOfYear === month && resource.type === 'Financial'))}>
                        Financial Report
                      </Link>
                    </ListItem >
                  }
                  {resourceData.find(resource => resource.monthOfYear === month && resource.type === 'Minutes') &&
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <IconButton>
                          <DeleteForever
                            fontSize='large'
                            color={'error'}
                            onClick={e => handleDelete(e, resourceData.find(resource => resource.monthOfYear === month && resource.type === 'Minutes'))}
                            data-cy='list-delete-btn'
                            sx={{"&:hover": { color: nchandiTheme.handiDarkRed }}}
                          />
                        </IconButton>
                      </ListItemIcon>
                      <Link underline='hover' color={nchandiTheme.handiDarkYellow} onClick={e => handleClick(e, resourceData.find(resource => resource.monthOfYear === month && resource.type === 'Minutes'))}>
                        Minutes
                      </Link>
                    </ListItem>
                  }
                </div>
              )}
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