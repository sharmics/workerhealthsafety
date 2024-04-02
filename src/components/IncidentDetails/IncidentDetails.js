import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CircularProgress from '@mui/material/CircularProgress'
import getIncidentsData from "../../Services/DataService.jsx"
import BreadcrumbsContainer from "../BreadcrumbsContainer/BreadcrumbsContainer.js";
import IncidentDetailsCard from "../IncidentDetailsCard/IncidentDetailsCard"
import AllUpdatesCard from "../AllUpdatesCard/AllUpdatesCard";
import AttachedResultsCard from "../AttachedResultsCard/AttachedResultsCard"
import ActivityHistoryCard from "../ActivityHistoryCard/ActivityHistoryCard"
import Articles from "../Articles/Articles"
import "./IncidentDetails.css"

function IncidentDetails() {
    const [selectedIncident, setSelectedIncident] = useState("")
    const [currIncidentData, setCurrIncidentData] = useState({})
    const [incidentsList, setIncidentsList] = useState([])
    const [showFeed, setShowFeed] = useState(true)
    const [showPost, setShowPost] = useState(true)
    const navigate = useNavigate()
    const { incidentId } = useParams()
    const breadcrumbsData = [
        { breadcrumbOption: "Dashboard", route: "/dashboard"},
        { breadcrumbOption: "Incidents", route: "/dashboard/incidents"},
        { breadcrumbOption: "Incidents Details", route: `/dashboard/incidents/${incidentId}`}
    ]

    useEffect(() => {
        setCurrIncidentData(getIncidentsData().incidents.filter(incident => incident.incident_id == incidentId)[0])
        createIncidentsList()
    }, [incidentId])
    
    const createIncidentsList = () => {
        let currIncident
        setIncidentsList(getIncidentsData().incidents.map(incident => {
            if(incident.incident_id == incidentId) currIncident = { option : incident.incident, id: incident.incident_id } 
            return { option : incident.incident, id: incident.incident_id }
        }))
        setSelectedIncident(currIncident.option)
    }

    const handleIncidentSelect = (incident) => {
        navigate(`/dashboard/incidents/${incident.id}`)
    }

    return(
        <>
            {Object.keys(currIncidentData).length ? 
                <div className="incident-details-outer-cnt">
                    <BreadcrumbsContainer BreadcrumbsData={breadcrumbsData}/>
                    {incidentsList.length > 0 && <div className="incidents-select-box-cnt">
                        <FormControl fullWidth classes={{root: "incidents-mui-form-control-root"}}>
                            <Select
                                value={selectedIncident}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                classes={{select: "incidents-mui-select"}}
                            >
                                {incidentsList.map(incident => {
                                    return <MenuItem classes={{root: "incidents-mui-menu-item-root"}} value={incident.option} onClick={() => handleIncidentSelect(incident)}>{incident.option}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>}
                    <IncidentDetailsCard IncidentDetailsData={currIncidentData}/>
                    <div className="incident-feed-related-articles-cnt">
                        <div className="incident-feed-related-cnt">
                            <div className="incident-feed-related-header-cnt">
                                <div className="card-title-active-tab-indicator-cnt" onClick={() => setShowFeed(true)}>
                                    <span style={{color: showFeed ? "#0072BC" : "#000000"}}>Feed</span>
                                    <div style={{visibility: showFeed ? "visible" : "hidden"}} className="active-card-indicator-cnt"></div>                        
                                </div>
                                <div className="card-title-active-tab-indicator-cnt" onClick={() => setShowFeed(false)}>
                                    <span style={{color: !showFeed ? "#0072BC" : "#000000"}}>Related</span>
                                    <div style={{visibility: !showFeed ? "visible" : "hidden"}} className="active-card-indicator-cnt"></div>                        
                                </div>
                            </div>
                            <div className="incident-feed-related-info-cnt">
                                {showFeed ?
                                    <>                        
                                        <div className="feed-post-call-card-cnt">
                                            <div className="feed-post-call-card-title">
                                                <div className="card-title-active-tab-indicator-cnt" onClick={() => setShowPost(true)}>
                                                    <span style={{color: showPost ? "#0072BC" : "#000000"}}>Post</span>
                                                    <div style={{visibility: showPost ? "visible" : "hidden"}} className="active-card-indicator-cnt"></div>                        
                                                </div>
                                                <div className="card-title-active-tab-indicator-cnt">
                                                    <span style={{color: !showPost ? "#0072BC" : "#000000"}}>Log A Call</span>
                                                    <div style={{visibility: !showPost ? "visible" : "hidden"}} className="active-card-indicator-cnt"></div>                        
                                                </div>                                      
                                            </div>
                                            <div className="feed-post-call-info-cnt">
                                                {showPost ? 
                                                    <div className="post-share-update-cnt">
                                                        <input type="text" placeholder="Share An Update..." />
                                                        <button>Share</button>
                                                    </div>
                                                : <></>
                                                }
                                            </div>
                                        </div>
                                        <AllUpdatesCard AllUpdatesData={currIncidentData.all_updates}/>
                                    </>    
                                :<> 
                                    <AttachedResultsCard AttachedResultsData={currIncidentData.attached_results}/>
                                    <div className="open-activity-card-cnt">
                                        <div className="open-activity-card-title">
                                            <span>Open Activity</span>
                                            <div className="open-activity-card-action-cnt">
                                                <button>Next Task</button>
                                                <button>Next Event</button>
                                            </div>
                                        </div>
                                    </div>
                                    <ActivityHistoryCard ActivityHistoryData={currIncidentData.activity_history}/>
                                </>}
                            </div>
                        </div>
                        <div className="incident-articles-cnt">
                            <Articles articleData={currIncidentData.articles}/>
                        </div>
                    </div>
                </div>
            :
                <div className="incidents-details-loader-cnt">
                    <CircularProgress />
                </div>
            }
        </>
    )
}

export default IncidentDetails