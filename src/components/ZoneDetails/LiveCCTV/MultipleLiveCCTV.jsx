import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../LiveCCTV/MultipleLiveCCTV.css"
import LiveCCTVTwo from '../LiveCCTVTwo/LiveCCTVTwo'
import data_set from '../../../Services/DataService'

function MultipleLiveCCTV() {
    const [zoneData, setZoneData] = useState()
    const navigate = useNavigate()
    const { zoneId } = useParams();
    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                let newObj1 = data_set().zone_details.filter(zone => zone.zone_id == zoneId)[0]
                setZoneData(newObj1)

            } catch (error) {
                console.error('Error fetching worker data:', error);
            }
        };
        fetchWorkers();
    }, [zoneId]);
    return (
        <div className='Multiple-LiveCCTV-Outer'>
            <div onClick={() => navigate(`/dashboard/zone/${zoneId}`)} className='Live-cctv-BackIcon'>
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="19.5" fill="white" stroke="#DEDFE0" />
                    <path d="M23 25.4725L18.0553 20.5L23 15.5275L21.4777 14L15 20.5L21.4777 27L23 25.4725Z" fill="#407BFF" />
                </svg>
                <span>Back</span>
            </div>
            {
                zoneData?.live_cctv?.map((i) => { return (<LiveCCTVTwo cctv={i} />) })
            }

        </div>
    )
}

export default MultipleLiveCCTV