import React, { useEffect, useState } from 'react'
import "../Workforce_details/WorkforceDetails.css"
import LiveBodycam from './Live-Bodycam/LiveBodycam'
import LiveRTLSfeed from './Live-RTLS-feed/LiveRTLSfeed'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WorkerVitalMonitor from './Worker-vital-sign-details/WorkerVitalMonitor'
import data_set from "../../Services/DataService"
import { useNavigate, useParams } from 'react-router-dom'
import BreadcrumbsContainer from "../BreadcrumbsContainer/BreadcrumbsContainer.js"
function WorkforceDetails() {
    const [AllWorkersData, setAllWorkersData] = useState();
    const [workerData, setWorkerData] = useState({});
    const navigate = useNavigate();
    const { workerId } = useParams();
    const breadcrumbsData = [
        { breadcrumbOption: "Dashboard", route: "/dashboard" },
        { breadcrumbOption: "Workforce", route: "/dashboard/workforce" },
        { breadcrumbOption: "Workforce Details", route: `/dashboard/workforce/${workerId}` }
    ]
    useEffect(() => {
        setAllWorkersData(data_set().workers)
        setWorkerData(data_set().workers.filter(worker => worker.worker_id == workerId)[0])
    }, [workerId])

    return (
        <div className='Workforce-Details-outer'>
            <div className='Workforce-Details-routing'>
                <BreadcrumbsContainer BreadcrumbsData={breadcrumbsData} />
                <div className='Workforce-selectBox'>
                    {
                        AllWorkersData?.length > 0 && (<FormControl fullWidth size='small'>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className='workforce-demo-simple-select'
                                value={workerData?.name || ''}
                                style={{ fontSize: "14px" }}
                            >
                                {AllWorkersData.map((worker) => (
                                    <MenuItem className='workforce-menu-item' key={worker.worker_id} value={worker.name} onClick={() => navigate(`/dashboard/workforce/${worker.worker_id}`)}>
                                        {worker.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>)
                    }
                </div>
            </div>
            <div className='Workforce-Details-component'>
                <div className='Workforce-Details-vital'>
                    <WorkerVitalMonitor />
                </div>
                <div className='Workforce-Details-live'>
                    <div className='Workforce-Details-livefeed'>
                        <LiveRTLSfeed />
                    </div>
                    <div className='Workforce-Details-livefeed'>
                        <LiveBodycam />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default WorkforceDetails