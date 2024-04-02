import React from 'react'
import "../LiveCCTVTwo/LiveCCTVTwo.css"

function LiveCCTVTwo({ cctv }) {

    return (
        <div className='LiveCCTV-two-Outer'>
            <div className='LiveCCTV-two-text'>{cctv?.cam_name}</div>
            <div className='LiveCCTV-two-live'>

                {cctv && (<video
                    width="100%"
                    height="100%"
                    autoPlay
                    muted
                    controls={false}
                >
                    <source src={cctv?.cam_stream_url} type="video/mp4" />
                </video>)}
            </div>
        </div>
    )
}

export default LiveCCTVTwo