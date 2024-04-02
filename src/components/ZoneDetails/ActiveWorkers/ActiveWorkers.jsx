import React, { useEffect, useState } from 'react'
import "../ActiveWorkers/ActiveWorkers.css"
import { useNavigate, useParams } from 'react-router-dom'
import data_set from '../../../Services/DataService'


function ActiveWorkers() {
  const { zoneId } = useParams();
  const navigate = useNavigate()
  const [activeData, setActiveData] = useState()
  useEffect(() => {
    let filteredWorkers = data_set().workers.filter(worker => worker.zone_id === zoneId);
    setActiveData(filteredWorkers)
  }, [zoneId])
  return (
    <div className='ActiveWorkers-outer'>
      <div className='ActiveWorkers-head'><span>Active Workers</span> <div >{activeData?.length}</div></div>
      <div className='ActiveWorkers-list'>
        {
          activeData?.map((i) => (<div className='ActiveWorker-data'><img src={i.profileImage} alt="image" />
            <div className='ActiveWorker-data1' onClick={() => navigate(`/dashboard/workforce/${i.worker_id}`)}> {i?.name}</div></div>))
        }

      </div>
    </div>
  )
}

export default ActiveWorkers