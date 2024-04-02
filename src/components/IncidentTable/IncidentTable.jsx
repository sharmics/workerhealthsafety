import React from 'react'
import TableFrame from '../TableFrame/TableFrame';
import data_set from '../../Services/DataService'

export default function IncidentTable() {

  const column = [
    {
      title: "Incident",
      dataIndex: "incident",
      sorter: (a, b) => a.incident.length - b.incident.length,
    },
    {
      title: "Number",
      dataIndex: "case_no",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sorter: (a, b) => a.subject - b.subject,
      responsive: ['sm'],
    },
    {
      title: "Priority",
      dataIndex: "priority",
      sorter: (a, b) => a.priority - b.priority,
      filters: [
        {
          text: 'High',
          value: 'High',
        },
        {
          text: 'Medium',
          value: 'Medium',
        },
        {
          text: 'Critical',
          value: 'Critical',
        },
        {
          text: 'Low',
          value: 'Low',
        }
      ],
      onFilter: (value, record) => record.priority.indexOf(value) === 0,
      responsive: ['sm'],
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status - b.status,
      filters: [
        {
          text: 'New',
          value: 'New',
        },
        {
          text: 'Old',
          value: 'Old',
        },
        {
          text: 'In process',
          value: 'In process',
        }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,

    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data = data_set().incidents;

  return (
    <div>
      <TableFrame column={column} data={data} tableType='Incident' />
    </div>
  )
}
