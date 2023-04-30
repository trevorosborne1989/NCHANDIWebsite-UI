import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import makeStyles from '@mui/material/styles/makeStyles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import lightBlue from '@mui/material/colors/lightBlue';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

// const hoverColor = lightBlue[100];
// const darkHoverColor = lightBlue[700];
// const selectedColor = lightBlue[300];
// const darkSelectedColor = lightBlue[900];

// const useStyles = makeStyles(theme => ({
//   tableButtons: {
//     marginLeft: 'auto'
//   },
//   tablePaper: {
//     overflowX: 'auto'
//   },
//   selected: {
//     backgroundColor: (theme.palette.type === 'light') ? selectedColor : darkSelectedColor
//   },
//   pointer: {
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: (theme.palette.type === 'light') ? hoverColor : darkHoverColor
//     }
//   },
//   sortAction: {
//     cursor: 'pointer'
//   }
// }));

const SimpleTable = (props) => {
  const classes = useStyles(props);
  const { data, onSelection, onAdd, onFilter, onSort, sortBy, sortdir, tableTitle, children, ...configProps } = props;
  const [selectedRow, setSelectedRow] = useState();

  const handleSelect = (row) => {
    if (onSelection) {
      setSelectedRow(row);
      onSelection(row);
    }
  };

  return (
    <Paper className={classes.tablePaper}>
      <TableContainer>
        <Toolbar>
          <Box flexGrow={3}>
            <Typography variant='h5'>
              {tableTitle}
            </Typography>
          </Box>
          {Boolean(onFilter) &&
            <Tooltip TransitionComponent={Zoom} title={<Typography>Filter</Typography>}>
              <IconButton data-cy='table-filter-button' className={classes.tableButtons} onClick={onFilter} color='primary'><FilterListIcon /></IconButton>
            </Tooltip>}
          {Boolean(onAdd) &&
            <Tooltip TransitionComponent={Zoom} title={<Typography>Add</Typography>}>
              <IconButton data-cy='table-add-button' className={classes.tableButtons} onClick={onAdd} color='primary'><AddIcon /></IconButton>
            </Tooltip>}
        </Toolbar>
        <Table sx={{ minWidth: 650 }} aria-label='simple table' data-cy='simple-table'>
          <TableHead>
            <TableRow>
              {configProps.columns.map((column, colIndex) => {
                return column.sortable
                  ? (
                    <TableCell key={'header' + colIndex} data-cy='table-header-cell'>
                      <TableSortLabel
                        onClick={() => onSort(column.columnName, sortdir === 'desc' ? 'asc' : 'desc')}
                        className={classes.sortAction}
                        direction={sortdir}
                        IconComponent={ArrowDropDown}
                      >
                        <Typography>{column.headerText}</Typography>
                      </TableSortLabel>
                    </TableCell>
                    )
                  : (
                    <TableCell key={'header' + colIndex} data-cy='table-header-cell'>
                      <Typography>{column.headerText}</Typography>
                    </TableCell>
                    );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => {
              return (
                <TableRow
                  data-cy='simple-table-row'
                  classes={(onSelection) ? { root: classes.pointer } : {}}
                  className={row === selectedRow ? classes.selected : ''}
                  key={configProps.dataKey(row)}
                  onClick={onSelection && (() => handleSelect(row))}
                >
                  {configProps.columns.map((col, colIndex) =>
                    <TableCell key={'TblCell' + colIndex} data-cy='simple-table-cell'>{col.value(row)}</TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {children}
    </Paper>
  );
};

const ColumnPropTypes = PropTypes.arrayOf(PropTypes.shape({
  headerText: PropTypes.string,
  columnName: PropTypes.string,
  value: PropTypes.func,
  sortable: PropTypes.bool,
  filterComponent: PropTypes.func
})).isRequired;

SimpleTable.propTypes = {
  /**
   * array of object to be displayed
   */
  data: PropTypes.arrayOf(PropTypes.object),
  /**
   * function that returns the unique id property
   */
  dataKey: PropTypes.func,
  /**
   * function that runs when a user clicks on a row
   */
  onSelection: PropTypes.func,
  /**
   * function that runs when a user clicks the add button
   */
  onAdd: PropTypes.func,
  /**
   * Array of objects that describes each column and how the data is displayed; should include headerText, columnName, value, and if a filter component should be used
   */
  columns: ColumnPropTypes,
  /**
   * array of <col> elements to customize column styles, specifically column width
   */
  colgroup: PropTypes.arrayOf(PropTypes.element)
};

SimpleTable.defaultProps = {
  data: []
};

export default SimpleTable;
