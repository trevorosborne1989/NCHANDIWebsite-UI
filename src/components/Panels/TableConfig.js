const TableConfig = {
  tableTitle: 'Open Panels',
  dataKey: d => d.id,
  columns: [
    {
			columnName: 'dayOfWeek',
			numeric: true,
			disablePadding: false,
			label: 'Day of Week',
      value: d => d.dayOfWeek
    },
    {
			columnName: 'weekOfMonth',
			numeric: true,
			disablePadding: false,
			label: 'Week of Month',
      value: d => d.weekOfMonth
    },
    {
			columnName: 'time',
			numeric: true,
			disablePadding: false,
			label: 'Time',
      value: d => d.time
    },
    {
      columnName: 'facility',
			numeric: true,
			disablePadding: false,
			label: 'Facility',
      value: d => d.facility
    },
    {
      columnName: 'gender',
			numeric: true,
			disablePadding: false,
			label: 'Gender',
      value: d => d.gender
    },
    {
			columnName: 'numberNeeded',
			numeric: true,
			disablePadding: false,
			label: '# Needed',
      value: d => d.numberNeeded
    }
  ]
};
export default TableConfig;