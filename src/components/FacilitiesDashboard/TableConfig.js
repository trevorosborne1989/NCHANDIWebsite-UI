const TableConfig = {
  tableTitle: 'Facilities',
  dataKey: d => d.id,
  columns: [
    {
			columnName: 'facilityName',
			numeric: true,
			disablePadding: false,
			label: 'Facility Name',
      value: d => d.facilityName
    },
    {
			columnName: 'facilityType',
			numeric: true,
			disablePadding: false,
			label: 'Facility Type',
      value: d => d.facilityType
    },
    {
			columnName: 'address',
			numeric: true,
			disablePadding: false,
			label: 'Address',
      value: d => d.address
    },
    {
      columnName: 'city',
			numeric: true,
			disablePadding: false,
			label: 'City',
      value: d => d.city
    },
    {
			columnName: 'state',
			numeric: true,
			disablePadding: false,
			label: 'State',
      value: d => d.state
    },
    {
			columnName: 'website',
			numeric: true,
			disablePadding: false,
			label: 'Website',
      value: d => d.website
    },
    {
			columnName: 'primaryContactName',
			numeric: true,
			disablePadding: false,
			label: 'Primary Contact Name',
      value: d => d.primaryContactName
    },
    {
			columnName: 'primaryContactEmail',
			numeric: true,
			disablePadding: false,
			label: 'Primary Contact Email',
      value: d => d.primaryContactEmail
    },
    {
			columnName: 'primaryPhoneNumber',
			numeric: true,
			disablePadding: false,
			label: 'Primary Phone Number',
      value: d => d.primaryPhoneNumber
    },
    {
			columnName: 'altContactName',
			numeric: true,
			disablePadding: false,
			label: 'Alternate Contact Name',
      value: d => d.altContactName
    },
    {
			columnName: 'altContactEmail',
			numeric: true,
			disablePadding: false,
			label: 'Alternate Contact Email',
      value: d => d.altContactEmail
    },
    {
			columnName: 'altPhoneNumber',
			numeric: true,
			disablePadding: false,
			label: 'Alternate Phone Number',
      value: d => d.altPhoneNumber
    },
    {
			columnName: 'active',
			numeric: true,
			disablePadding: false,
			label: 'Active',
      value: d => d.active
    }
  ]
};
export default TableConfig;