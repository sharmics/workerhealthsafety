import React from 'react'
import TableFrame from '../TableFrame/TableFrame'
import data_set from '../../Services/DataService'

export default function ZoneTable() {

  const column = [
    {
      title: "Zone",
      dataIndex: "zone",
      sorter: (a, b) => a.zone.length - b.zone.length,
      filters: [
        {
          text: 'Quality Control',
          value: 'Quality Control',
        },
        {
          text: 'Maintenance',
          value: 'Maintenance',
        },
        {
          text: 'Production',
          value: 'Production',
        },
        {
          text: 'Logistics',
          value: 'Logistics',
        },
        {
          text: 'Security',
          value: 'Security',
        }
      ],
      onFilter: (value, record) => record.zone.indexOf(value) === 0,
    },
    {
      title: "Workers Count",
      dataIndex: "workersCount",
      sorter: (a, b) => a.workersCount - b.workersCount,
    },
    {
      title: "Location",
      dataIndex: "location",
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
      responsive: ['sm'],
    },
    {
      title: "CCTV Count",
      dataIndex: "cctvCount",
      sorter: (a, b) => a.cctvCount - b.cctvCount,
      responsive: ['sm'],
    },
    {
      title: "Active Incidents",
      dataIndex: "activeIncidents",
      sorter: (a, b) => a.activeIncidents - b.activeIncidents,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

  const data = data_set().zone_details;

  return (
    <div>
      <TableFrame column={column} data={data} tableType="Zone"></TableFrame>
    </div>
  )
}
