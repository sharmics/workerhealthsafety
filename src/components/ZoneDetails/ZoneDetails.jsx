import React, { useEffect, useState } from 'react'
import ZoneMap from './ZoneMap/ZoneMap'
import ActiveWorkers from './ActiveWorkers/ActiveWorkers'
import LiveCCTV from './ZoneLiveCCTV/ZoneLiveCCTV'
import "../ZoneDetails/ZoneDetails.css"
import { useNavigate, useParams } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ZoneMonitor from './ZoneMonitor/ZoneMonitor'
import data_set from '../../Services/DataService'
import BreadcrumbsContainer from "../BreadcrumbsContainer/BreadcrumbsContainer.js"

function ZoneDetails() {
    const [zoneWorkersData, setZoneWorkersData] = useState()
    const [zoneIdData, setZoneIdData] = useState()
    const [allZoneData, setAllZoneData] = useState(data_set().zone_details)
    const [selectedZone, setZone] = useState()
    const navigate = useNavigate();
    const { zoneId } = useParams();

    const breadcrumbsData = [
        { breadcrumbOption: "Dashboard", route: "/dashboard" },
        { breadcrumbOption: "Zones", route: "/dashboard/zones" },
        { breadcrumbOption: "Zone Details", route: `/dashboard/zone/${zoneId}` }
    ]
    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                let newObj = data_set().workers.filter(worker => worker.zone_id == zoneId)
                setZoneWorkersData(newObj)
                let newObj1 = data_set().zone_details.filter(zone => zone.zone_id == zoneId)[0]
                setZoneIdData(newObj1)
                setZone(newObj1.zone)
            } catch (error) {
                console.error('Error fetching worker data:', error);
            }
        };
        fetchWorkers();
    }, [zoneId]);


    return (

        <div className='zone-Details-outer'>
            <div className='zone-Details-routing'>
                <BreadcrumbsContainer BreadcrumbsData={breadcrumbsData} />
                <div className='zone-selectBox'>
                    {allZoneData?.length > 0 && (
                        <FormControl fullWidth size='small'>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className='zone-demo-simple-select'
                                value={zoneIdData?.zone || ''}
                                style={{ fontSize: "14px" }}
                            >
                                {allZoneData?.map((zone) => (
                                    <MenuItem className='zone-menu-item' key={zone.zone_id} value={zone.zone} onClick={() => navigate(`/dashboard/zone/${zone.zone_id}`)}>
                                        {zone.zone}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                </div>
            </div>
            <div className='zone-Details-component'>
                <div className='zone-Details-Component1'>
                    <div className='zone-Details-Component1-block1'>
                        <div className='zone-Details-Component1-left'> <ZoneMonitor selectedZone={selectedZone} /></div>
                        <div className='zone-Details-Component1-right'> <LiveCCTV /></div>

                    </div>
                    <div className=' zonemap1'>
                        <ZoneMap />
                    </div>

                </div>
                <div className='zone-Details-live'>
                    <ActiveWorkers />
                </div>
            </div>

        </div>


    )
}

export default ZoneDetails