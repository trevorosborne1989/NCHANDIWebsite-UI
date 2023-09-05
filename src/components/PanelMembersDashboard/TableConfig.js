const TableConfig = {
  tableTitle: 'Panel Members',
  dataKey: d => d.id,
  columns: [
    {
			columnName: 'firstName',
			numeric: true,
			disablePadding: false,
			label: 'First Name',
      value: d => d.firstName
    },
    {
			columnName: 'lastName',
			numeric: true,
			disablePadding: false,
			label: 'Last Name',
      value: d => d.lastName
    },
    {
			columnName: 'email',
			numeric: true,
			disablePadding: false,
			label: 'Email',
      value: d => d.email
    },
    {
      columnName: 'phoneNumber',
			numeric: true,
			disablePadding: false,
			label: 'Phone Number',
      value: d => d.phoneNumber
    },
    {
			columnName: 'contactMethod',
			numeric: true,
			disablePadding: false,
			label: 'Contact Method',
      value: d => d.contactMethod
    }
  ]
};
export default TableConfig;