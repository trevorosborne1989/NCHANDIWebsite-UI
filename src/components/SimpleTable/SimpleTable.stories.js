import React from 'react';
import Button from '@mui/material/Button';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import SimpleTable from './SimpleTable.jsx';

/**
 * To use the SimpleTable component, you must at least pass in the 
 * array of data, a dataKey, and the columns array.
 */

// default table config
const tableConfig = {
    title: 'Fruit Table',
    dataKey: d => d.id,
    columns: [
        { headerText: 'Number Column', columnName: 'id', value: d => d.id },
        { headerText: 'Text Column', columnName: 'text', value: d => d.text },
        { headerText: 'Date Column', columnName: 'date', value: d => moment(d.date).format('MM/DD/YYYY') },
        { headerText: 'Bool Column', columnName: 'bool', value: d => d.bool ? 'Yes' : 'No' },
        { headerText: 'Active Column', columnName: 'active', value: d => d.active ? 'Active' : 'Inactive'},
        { headerText: 'Deleted Column', columnName: 'deleted', value: d => d.deleted ? 'Yes' : 'No' },
        { headerText: 'Dropdown Column', columnName: 'dropdown', value: d => d.dropdown },
        { value: d => <Button onClick={(e) => { e.stopPropagation(); }}>Test</Button> }
    ],
    colgroup: [
        <col key='numCol' style={{ width: '12.5%' }} />,
        <col key='textCol' style={{ width: '12.5%' }} />,
        <col key='dateCol' style={{ width: '12.5%' }} />,
        <col key='boolCol' style={{ width: '12.5%' }} />,
        <col key='activeCol' style={{ width: '12.5%' }} />,
        <col key='deleteCol' style={{ width: '12.5%' }} />,
        <col key='dropdownCol' style={{ width: '12.5%' }} />,
        <col key='buttonCol' style={{ width: '12.5%' }} />
    ]};

    const data = [
      { "id": 1, "text": "Apple", "date": "2019-08-05", "bool": false, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Yummy" },
      { "id": 2, "text": "Banana", "date": "2019-05-31", "bool": true, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Gross" },
      { "id": 3, "text": "Orange", "date": "2018-01-05", "bool": false, "active": false, "deleted": true, "hiddenColumn": true, "dropdown": "Yummy" },
      { "id": 4, "text": "Cherry", "date": "2019-01-05", "bool": false, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Yummy" },
      { "id": 5, "text": "Strawberry", "date": "2019-05-31", "bool": false, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Yummy" },
      { "id": 6, "text": "Apricot", "date": "2019-05-31", "bool": true, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Okay" },
      { "id": 7, "text": "Blackberry", "date": "2019-05-31", "bool": false, "active": false, "deleted": true, "hiddenColumn": true, "dropdown": "Yummy" },
      { "id": 8, "text": "Blueberry", "date": "2019-05-31", "bool": false, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Yummy" },
      { "id": 9, "text": "Cranberry", "date": "2018-05-31", "bool": false, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Okay" },
      { "id": 10, "text": "Lemon", "date": "2019-05-31", "bool": true, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Sour" },
      { "id": 11, "text": "Lime", "date": "2019-05-31", "bool": true, "active": false, "deleted": true, "hiddenColumn": true, "dropdown": "Sour" },
      { "id": 12, "text": "Grape", "date": "2019-05-31", "bool": false, "active": true, "deleted": false, "hiddenColumn": true, "dropdown": "Yummy"},
      { "id": 13, "text": "Testing null values", "date": null, "bool": null, "active": null, "deleted": null, "hiddenColumn": true, "dropdown": "No flavor" }
    ];

    const handleSelection = (selection) => {
      //props.onSelection();
      console.log('Selection', selection);
    };
    const handleAdd = () => {
      console.log('Add');
    };
  

export default {
  title: 'SimpleTable',
  component: SimpleTable,
};

export const Primary = ({...props}) => {

    return (
      <>
        <SimpleTable 
          {...tableConfig}
          {...props}
          tableTitle='Simple Table'
          data={data}
          onSelection={handleSelection}
          onAdd={handleAdd}
        >
        </SimpleTable>
      </>
    );
  };

  // Here is the other arg format that passes props to your component.
  // export const SimpleStory = {
  //   args: {
  //     phrase: 'helloSimple'
  //   },
  // };