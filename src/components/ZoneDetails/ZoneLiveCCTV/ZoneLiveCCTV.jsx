import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./ZoneLiveCCTV.css"
import data_set from '../../../Services/DataService';

function ZoneLiveCCTV() {
    const [zoneData, setZoneData] = useState()
    const [selectVal, setSelectVal] = useState(0)
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
    console.log(selectVal)
    console.log(zoneData?.live_cctv)
    return (
        <div className="Live-cctv-outer2">
            <div className='feed-Large-CCTV'>
                <div style={{ marginLeft: "15px" }}>Live CCTV</div>
                <select name="select" onChange={(e) => setSelectVal(e.target.value)} id="" style={{ width: "40%", height: "50%", fontSize: "10px", paddingLeft: "2%" }}>
                    {
                        zoneData?.live_cctv.map((cctv, i) => <option value={i}>{cctv?.cam_name}</option>)
                    }

                </select>

                <div onClick={() => navigate(`/dashboard/live-cctv/${zoneId}`)} style={{ cursor: "pointer", marginRight: "15px", display: "flex", alignItems: "center" }}><svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.20236 18.5152C1.5959 18.5152 1.07656 18.3164 0.644322 17.9188C0.212821 17.5205 -0.00292969 17.0419 -0.00292969 16.483V2.2576C-0.00292969 1.69875 0.212821 1.22017 0.644322 0.821854C1.07656 0.42422 1.5959 0.225403 2.20236 0.225403H8.81822C9.13064 0.225403 9.3927 0.32261 9.60441 0.517024C9.81538 0.712115 9.92087 0.953608 9.92087 1.2415C9.92087 1.5294 9.81538 1.77055 9.60441 1.96497C9.3927 2.16006 9.13064 2.2576 8.81822 2.2576H2.20236V16.483H17.6394V10.3864C17.6394 10.0985 17.7452 9.85702 17.9569 9.66193C18.1679 9.46751 18.4296 9.37031 18.742 9.37031C19.0544 9.37031 19.3161 9.46751 19.5271 9.66193C19.7388 9.85702 19.8447 10.0985 19.8447 10.3864V16.483C19.8447 17.0419 19.6289 17.5205 19.1974 17.9188C18.7652 18.3164 18.2458 18.5152 17.6394 18.5152H2.20236ZM6.61293 12.4186C6.41078 12.2323 6.30971 11.9952 6.30971 11.7073C6.30971 11.4194 6.41078 11.1824 6.61293 10.9961L16.0957 2.2576H13.2288C12.9164 2.2576 12.6547 2.16006 12.4437 1.96497C12.232 1.77055 12.1262 1.5294 12.1262 1.2415C12.1262 0.953608 12.232 0.712115 12.4437 0.517024C12.6547 0.32261 12.9164 0.225403 13.2288 0.225403H18.742C19.0544 0.225403 19.3161 0.32261 19.5271 0.517024C19.7388 0.712115 19.8447 0.953608 19.8447 1.2415V6.32201C19.8447 6.6099 19.7388 6.85106 19.5271 7.04547C19.3161 7.24056 19.0544 7.33811 18.742 7.33811C18.4296 7.33811 18.1679 7.24056 17.9569 7.04547C17.7452 6.85106 17.6394 6.6099 17.6394 6.32201V3.68014L8.12907 12.444C7.92692 12.6303 7.67882 12.7234 7.38478 12.7234C7.09075 12.7234 6.83346 12.6218 6.61293 12.4186Z" fill="#C6C6C6" />
                </svg>
                </div>
            </div>
            {zoneData?.live_cctv.length > 0 &&
                <video
                    key={selectVal}
                    width="100%"
                    height="90%"
                    controls={false}
                    autoPlay
                    muted
                >
                    <source src={zoneData?.live_cctv[selectVal].cam_stream_url} type="video/mp4" />
                </video>
            }
        </div>
    )
}

export default ZoneLiveCCTV