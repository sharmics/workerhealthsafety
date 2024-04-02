import React from 'react';
import TableFrame from '../TableFrame/TableFrame'
import data_set from '../../Services/DataService'

export default function WorkforceTable() {

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => {
        console.log(a.name.props.children.props.children, b.name);
        return a.name.props.children.props.children.toString().localeCompare(b.name.props.children.props.children.toString())
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      responsive: ['sm'],
    },
    {
      title: 'Phone No.',
      dataIndex: 'phoneNo',
      sorter: (a, b) => a.phoneNo - b.phoneNo,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a.gender - b.gender,
      filters: [
        {
          text: 'Male',
          value: 'Male',
        },
        {
          text: 'Female',
          value: 'Female',
        },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      responsive: ['md'],
    },
    {
      title: 'Location',
      dataIndex: 'location',
      sorter: (a, b) => a.location - b.location,
      filters: [
        {
          text: 'Chicago',
          value: 'Chicago',
        },
        {
          text: 'Austin',
          value: 'Austin',
        },
        {
          text: 'Houston',
          value: 'Houston',
        }
      ],
      onFilter: (value, record) => record.location.indexOf(value) === 0,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },

  ];

  const data = data_set().workers;

  const onChange = (sorter, filters) => {
    console.log("params", sorter, filters);
  };

  return (
    <div>
      <TableFrame column={column} data={data} onChange={onChange} tableType="Workforce" />
    </div>
  )
}