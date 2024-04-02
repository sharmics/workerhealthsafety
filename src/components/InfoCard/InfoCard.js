import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MoreIcon from "../../assets/more.svg"
import "./InfoCard.css"

function InfoCard({InfoCardDetails}) {
    const [filterOption, setFilterOption] = useState(InfoCardDetails?.filterOptions.length ? InfoCardDetails.filterOptions[0] : "")
    const navigate = useNavigate()

    return(
        <div className="info-card-main-outer-cnt">
            <div className="info-card-main-inner-cnt">
                <div className="info-card-title-cnt">
                    <span>{InfoCardDetails.title}</span>
                    <img src={MoreIcon} alt="More Icon" className="info-card-more" />
                </div>
                {InfoCardDetails?.subtitle && 
                    <span className="info-card-subtitle">{InfoCardDetails.subtitle}</span>
                }
                {InfoCardDetails?.count &&
                    <div className="info-card-count">
                        <span>{InfoCardDetails.count}</span>
                    </div>
                }
                {InfoCardDetails?.location?.length > 0 && InfoCardDetails?.location.map(location => {
                    return (
                        <div className="info-card-location-cnt">
                            <div className="info-card-location-type-cnt">
                                <span className="location-title">{location.location}</span>
                                <span className="location-type">{location.type}</span>
                            </div>
                            <div className="info-card-location-status-cnt">
                                <span>{location.status}</span>
                            </div>
                        </div>
                    )})
                }
                {InfoCardDetails?.dueTask.length > 0 && InfoCardDetails?.dueTask.map(task => {
                    return <span className="info-card-due-task">{task}</span>
                })}
                <div className="info-card-links">
                    {InfoCardDetails?.links.length > 0 && 
                        InfoCardDetails?.links.map(link => {
                            return <span onClick={() => navigate(link.path)}>{link.title}</span>
                        })
                    }
                </div>
                {InfoCardDetails?.filterOptions.length > 0 &&  
                    <div className="info-card-select-box-cnt">
                        <FormControl
                            fullWidth
                            classes={{root: "info-card-mui-form-control-root"}}
                        >
                            <Select
                                value={filterOption}
                                onChange={(e) => setFilterOption(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                classes={{select: "info-card-mui-select"}}
                            >
                                {InfoCardDetails.filterOptions.map(option => { 
                                    return <MenuItem classes={{root: "info-card-mui-menu-item-root"}} value={option}>{option}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                }
                {InfoCardDetails?.incidentsDetails.length > 0 && InfoCardDetails?.incidentsDetails.map(incident => {
                    return(
                        <div className="info-card-incidents-cnt">
                            <div className="info-card-incident-count-cnt">
                                <span className="incident-title">{incident.incident}</span>
                                <span className="incident-count">{incident.count}</span>
                            </div>
                            <div className="info-card-incident-time-status-cnt">
                                <div className="incident-time-cnt"><span>{incident.time}</span></div>
                                <span className="incident-status">{incident.status}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default InfoCard