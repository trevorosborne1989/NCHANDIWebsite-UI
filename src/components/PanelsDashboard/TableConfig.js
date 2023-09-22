const TableConfig = {
  tableTitle: 'Panels',
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
      value: d => d.facility.name
    },
    {
			columnName: 'address',
			numeric: true,
			disablePadding: false,
			label: 'Address',
      value: d => d.facility.address
    },
    {
			columnName: 'city',
			numeric: true,
			disablePadding: false,
			label: 'City',
      value: d => d.facility.city
    },
    {
			columnName: 'gender',
			numeric: true,
			disablePadding: false,
			label: 'Gender',
      value: d => d.gender
    },
    {
			columnName: 'membersAreNeeded',
			numeric: true,
			disablePadding: false,
			label: 'Members are Needed?',
      value: d => d.membersAreNeeded ? 'true' : 'false'
    },
    {
			columnName: 'numberNeeded',
			numeric: true,
			disablePadding: false,
			label: '# Needed',
      value: d => d.numberNeeded
    },
    {
			columnName: 'boardChampion',
			numeric: true,
			disablePadding: false,
			label: 'Board Champion',
      value: d => d.boardChampion
    },
    {
			columnName: 'panelCoordinator',
			numeric: true,
			disablePadding: false,
			label: 'Panel Coordinator',
      value: d => d.panelCoordinator
    },
    {
			columnName: 'panelLeader',
			numeric: true,
			disablePadding: false,
			label: 'Panel Leader',
      value: d => d.panelLeader
    },
    {
			columnName: 'panelMember1',
			numeric: true,
			disablePadding: false,
			label: 'Panel Member 1',
      value: d => d.panelMember1
    },
    {
			columnName: 'panelMember2',
			numeric: true,
			disablePadding: false,
			label: 'Panel Member 2',
      value: d => d.panelMember2
    },
    {
			columnName: 'panelMember3',
			numeric: true,
			disablePadding: false,
			label: 'Panel Member 3',
      value: d => d.panelMember3
    },
    {
			columnName: 'panelMember4',
			numeric: true,
			disablePadding: false,
			label: 'Panel Member 4',
      value: d => d.panelMember4
    },
    {
			columnName: 'panelMember5',
			numeric: true,
			disablePadding: false,
			label: 'Panel Member 5',
      value: d => d.panelMember5
    },
  ]
};
export default TableConfig;