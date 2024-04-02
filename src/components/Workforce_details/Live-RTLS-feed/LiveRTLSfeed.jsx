import React, { useEffect, useState } from 'react'
import "../Live-RTLS-feed/LiveRTLSfeed.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IndoorMap from '../../IndoorMap/IndoorMap';

function LiveRTLSfeed() {
    const { workerId } = useParams();
    const [fullscreenToggle, setFullscreenToggle] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === `/dashboard/live-rtls-feed/${workerId}`) {
            setFullscreenToggle(true)
        }
    }, [])

    return (
        <div className={fullscreenToggle ? 'RTLS-feed-outer' : 'RTLS-feed-outer2'}>
            <div onClick={() => navigate(`/dashboard/workforce/${workerId}`)} className={fullscreenToggle ? 'RTLS-feed-BackIcon' : 'RTLS-feed-BackIcon2'}>
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="19.5" fill="white" stroke="#DEDFE0" />
                    <path d="M23 25.4725L18.0553 20.5L23 15.5275L21.4777 14L15 20.5L21.4777 27L23 25.4725Z" fill="#407BFF" />
                </svg>
                <span>Back</span>
            </div>
            {fullscreenToggle ? "" :
                (<div className='rtls-feed-Large'>
                    <div style={{marginLeft:"10px"}}>Live RTLS feed</div>
                    <div  onClick={() => navigate(`/dashboard/live-rtls-feed/${workerId}`)} style={{ cursor: "pointer",marginRight:"10px", display:"flex", alignItems:"center" }}>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.20236 18.5152C1.5959 18.5152 1.07656 18.3164 0.644322 17.9188C0.212821 17.5205 -0.00292969 17.0419 -0.00292969 16.483V2.2576C-0.00292969 1.69875 0.212821 1.22017 0.644322 0.821854C1.07656 0.42422 1.5959 0.225403 2.20236 0.225403H8.81822C9.13064 0.225403 9.3927 0.32261 9.60441 0.517024C9.81538 0.712115 9.92087 0.953608 9.92087 1.2415C9.92087 1.5294 9.81538 1.77055 9.60441 1.96497C9.3927 2.16006 9.13064 2.2576 8.81822 2.2576H2.20236V16.483H17.6394V10.3864C17.6394 10.0985 17.7452 9.85702 17.9569 9.66193C18.1679 9.46751 18.4296 9.37031 18.742 9.37031C19.0544 9.37031 19.3161 9.46751 19.5271 9.66193C19.7388 9.85702 19.8447 10.0985 19.8447 10.3864V16.483C19.8447 17.0419 19.6289 17.5205 19.1974 17.9188C18.7652 18.3164 18.2458 18.5152 17.6394 18.5152H2.20236ZM6.61293 12.4186C6.41078 12.2323 6.30971 11.9952 6.30971 11.7073C6.30971 11.4194 6.41078 11.1824 6.61293 10.9961L16.0957 2.2576H13.2288C12.9164 2.2576 12.6547 2.16006 12.4437 1.96497C12.232 1.77055 12.1262 1.5294 12.1262 1.2415C12.1262 0.953608 12.232 0.712115 12.4437 0.517024C12.6547 0.32261 12.9164 0.225403 13.2288 0.225403H18.742C19.0544 0.225403 19.3161 0.32261 19.5271 0.517024C19.7388 0.712115 19.8447 0.953608 19.8447 1.2415V6.32201C19.8447 6.6099 19.7388 6.85106 19.5271 7.04547C19.3161 7.24056 19.0544 7.33811 18.742 7.33811C18.4296 7.33811 18.1679 7.24056 17.9569 7.04547C17.7452 6.85106 17.6394 6.6099 17.6394 6.32201V3.68014L8.12907 12.444C7.92692 12.6303 7.67882 12.7234 7.38478 12.7234C7.09075 12.7234 6.83346 12.6218 6.61293 12.4186Z" fill="#C6C6C6" />
                    </svg>
                    </div>
                </div>)}
            <div className={fullscreenToggle ? "RTLS-feed-live" : 'RTLS-feed-live2'}>
                    <IndoorMap />
            </div>
        </div>
    )
}

export default LiveRTLSfeed