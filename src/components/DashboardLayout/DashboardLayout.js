import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Outlet, useLocation } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import NttLogo from "../../assets/NTTLogo.png"
import SearchIcon from "../../assets/search.svg"
import NotificationIcon from "../../assets/notification.svg"
import UserIcon from "../../assets/user.svg"
import DashboardSelectIcon from "../../assets/dashboard_Selected.svg"
import DashboardIcon from "../../assets/dashboard_black.svg"
import ZonesIcon from "../../assets/zone.svg"
import ZonesSelectIcon from "../../assets/zone_blue.svg"
import WorkforceSelectIcon from "../../assets/Workforce_blue.svg"
import WorkforceIcon from "../../assets/work_black.svg"
import IncidentsIcon from "../../assets/Incidents_blc.svg"
import IncidentsSelectIcon from "../../assets/incedent_blue.svg"
import ReportsIcon from "../../assets/Reports_blc.svg"
import DownloadIcon from "../../assets/Download_blc.svg"
import ProfileIcon from "../../assets/profile.svg"
import SettingsIcon from "../../assets/Settings_blc.svg"
import LogoutIcon from "../../assets/Log Out_blc.svg"
import OpenIcon from "../../assets/open_arrow.svg"
import CloseIcon from "../../assets/close_arrow.svg"
import "./DashboardLayout.css"

function DashboardLayout() {
    const [drawerState, setDrawerState] = useState(false)
    const [displayState, setDisplayState] = useState(true)
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        location?.pathname === "/dashboard" || location?.pathname === "/dashboard/workforce" || location.pathname.startsWith("/dashboard/workforce/") || location?.pathname === "/dashboard/incidents" || location.pathname.startsWith("/dashboard/incidents/") || location?.pathname === "/dashboard/zones" || location.pathname.startsWith("/dashboard/zone/") ? setDisplayState(true) : setDisplayState(false)
    }, [location.pathname])

    const handleDrawerOptionsClick = (path) => {
        navigate(path)
    }

    return(
        <>
            <div className="ntt-header-cnt">
                <div className="header-ntt-logo-search-cnt">
                    <img src={NttLogo} alt="NTT Logo" className='header-ntt-logo-cnt'/>
                    <div className="header-search-cnt" style={{display: location?.pathname == "/dashboard" ? "flex" : "none"}}>
                        <img src={SearchIcon} alt="Search Icon" />
                        <input placeholder="Search"/>
                    </div>
                </div>
                <div className="header-notification-user-cnt">
                    <img src={NotificationIcon} alt="Notification Icon"/>
                    <div className="header-profile-icon-name-cnt">
                        <img src={UserIcon} alt="User Icon" />
                        <span>John Smith</span>     
                    </div>
                </div>             
            </div>
            <Drawer
                open={drawerState}
                variant='persistent'
                sx={{borderRight: "0px !important", display: displayState ? 'flex' : 'none' }}
            >
                <div className="open-drawer-outer-cnt" style={{display: displayState ? 'flex' : 'none'}}>
                    <img src={CloseIcon} className='drawer-close-icon' onClick={() => setDrawerState(!drawerState)} alt="Close Icon" />
                    <div className="open-drawer-inner-cnt">
                        <div className="open-drawer-top-cnt">
                           <img src={NttLogo} className="open-drawer-logo" alt="NTT Logo" />
                            <div className="open-drawer-top-divider"></div>
                            <div className="open-drawer-logo-option-cnt" style={location?.pathname == "/dashboard" ? { background: 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)', pointerEvents: "none" } : { background: "#ffffff", pointerEvents: "auto" }} onClick={() => handleDrawerOptionsClick("/dashboard")}>
                                <div className="drawer-option-logo-cnt">
                                    <img src={location?.pathname == "/dashboard" ? DashboardSelectIcon : DashboardIcon} alt="Dashboard Icon" />
                                </div>
                                <span style={{color: location?.pathname == "/dashboard" ? '#0072BC' : '#303042'}}>Dashboard</span>
                            </div>
                            <div className="open-drawer-logo-option-cnt" style={location?.pathname == "/dashboard/zones" || location.pathname.startsWith("/dashboard/zone/") ? { background: 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)', pointerEvents: "none" } : { background: "#ffffff", pointerEvents: "auto" }} onClick={() => handleDrawerOptionsClick("/dashboard/zones")}>
                                <div className="drawer-option-logo-cnt">
                                    <img src={location?.pathname == "/dashboard/zones" || location.pathname.startsWith("/dashboard/zone/") ? ZonesSelectIcon : ZonesIcon} alt="Zones Icon" />
                                </div>
                                <span style={{color: location?.pathname == "/dashboard/zones" || location.pathname.startsWith("/dashboard/zone/") ? '#0072BC' : '#303042'}}>Zones</span>
                            </div>
                            <div className="open-drawer-logo-option-cnt" style={location?.pathname == "/dashboard/workforce" || location.pathname.startsWith("/dashboard/workforce/") ? { background: 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)', pointerEvents: "none" } : { background: "#ffffff", pointerEvents: "auto" }} onClick={() => handleDrawerOptionsClick("/dashboard/workforce")}>
                                <div className="drawer-option-logo-cnt">
                                    <img src={location?.pathname == "/dashboard/workforce" || location.pathname.startsWith("/dashboard/workforce/") ? WorkforceSelectIcon : WorkforceIcon} alt="Workforce Icon" />
                                </div>
                                <span style={{color: location?.pathname == "/dashboard/workforce" || location.pathname.startsWith("/dashboard/workforce/") ? '#0072BC' : '#303042'}}>Workforce</span>
                            </div>
                            <div className="open-drawer-logo-option-cnt" style={location?.pathname == "/dashboard/incidents" || location.pathname.startsWith("/dashboard/incidents/") ? { background: 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)', pointerEvents: "none" } : { background: "#ffffff", pointerEvents: "auto" }} onClick={() => handleDrawerOptionsClick("/dashboard/incidents")}>
                                <div className="drawer-option-logo-cnt">
                                    <img src={location?.pathname == "/dashboard/incidents" || location.pathname.startsWith("/dashboard/incidents/") ? IncidentsSelectIcon : IncidentsIcon} alt="Incidents Icon" />
                                </div>
                                <span style={{color: location?.pathname == "/dashboard/incidents" || location.pathname.startsWith("/dashboard/incidents/") ? '#0072BC' : '#303042'}}>Incidents</span>
                            </div>
                            <div className="open-drawer-logo-option-cnt">
                                <div className="drawer-option-logo-cnt">
                                    <img src={ReportsIcon} alt="Reports Icon" />
                                </div>
                                <span>Reports</span>
                            </div>
                            <div className="open-drawer-logo-option-cnt">
                                <div className="drawer-option-logo-cnt">
                                    <img src={DownloadIcon} alt="Download Icon" />
                                </div>
                                <span>Download</span>
                            </div>
                            <div className="open-drawer-logo-option-cnt">
                                <div className="drawer-option-logo-cnt">
                                    <img src={ProfileIcon} alt="Profile Icon" />
                                </div>
                                <span>Profile</span>
                            </div>
                        </div>
                        <div className="open-drawer-footer-cnt">
                            <div className="open-drawer-bottom-divider"></div>
                            <div className="open-drawer-logo-option-cnt">
                                <div className="drawer-option-logo-cnt">
                                    <img src={SettingsIcon} alt="Settings Icon" />
                                </div>
                                <span>Settings</span>
                            </div>
                            <div className="open-drawer-logo-option-cnt" onClick={() => navigate("/")}>
                                <div className="drawer-option-logo-cnt">
                                    <img src={LogoutIcon} alt="Logout Icon" />
                                </div>
                                <span>Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <div className='close-drawer-dashboard-cnt'>
                {!drawerState && <div className="close-drawer-outer-cnt" style={{display: displayState ? 'flex' : 'none'}}>
                    <img src={OpenIcon} className="drawer-open-icon" onClick={() => setDrawerState(!drawerState)} alt="Open Icon" />
                    <div className="close-drawer-top-cnt">
                        <div className="close-drawer-logo-cnt" style={{background: location?.pathname == "/dashboard" ? 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)' : "#ffffff"}} onClick={() => handleDrawerOptionsClick("/dashboard")}>
                            <img src={location?.pathname == "/dashboard" ? DashboardSelectIcon : DashboardIcon} alt="Dashboard Icon" />
                        </div>
                        <div className="close-drawer-logo-cnt" style={{background: location?.pathname == "/dashboard/zones" || location.pathname.startsWith("/dashboard/zone/") ? 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)' : "#ffffff"}} onClick={() => handleDrawerOptionsClick("/dashboard/zones")}>
                            <img src={location?.pathname == "/dashboard/zones" || location.pathname.startsWith("/dashboard/zone/") ? ZonesSelectIcon : ZonesIcon} alt="Zones Icon" />
                        </div>
                        <div className="close-drawer-logo-cnt" style={{background: location?.pathname == "/dashboard/workforce"  || location.pathname.startsWith("/dashboard/workforce/") ? 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)' : "#ffffff"}} onClick={() => handleDrawerOptionsClick("/dashboard/workforce")}>
                            <img src={location?.pathname == "/dashboard/workforce"  || location.pathname.startsWith("/dashboard/workforce/") ? WorkforceSelectIcon : WorkforceIcon} alt="Workforce Icon" />
                        </div>
                        <div className="close-drawer-logo-cnt" style={{background: location?.pathname == "/dashboard/incidents" || location.pathname.startsWith("/dashboard/incidents/") ? 'linear-gradient(90.07deg, #DBE1FF -42.03%, #FFFFFF 120.13%)' : "#ffffff"}} onClick={() => handleDrawerOptionsClick("/dashboard/incidents")}>
                            <img src={location?.pathname == "/dashboard/incidents" || location.pathname.startsWith("/dashboard/incidents/") ? IncidentsSelectIcon : IncidentsIcon} alt="Incidents Icon" />
                        </div>
                        <div className="close-drawer-logo-cnt">
                            <img src={ReportsIcon} alt="Reports Icon" />
                        </div>
                        <div className="close-drawer-logo-cnt">
                            <img src={DownloadIcon} alt="Download Icon" />
                        </div>
                        <div className="close-drawer-logo-cnt">
                            <img src={ProfileIcon} alt="Profile Icon" />
                        </div>
                    </div>
                    <div className="close-drawer-footer-cnt">
                        <div className="close-drawer-footer-divider"></div>
                        <div className="close-drawer-logo-cnt">
                            <img src={SettingsIcon} alt="Settings Icon" />
                        </div>
                        <div className="close-drawer-logo-cnt" onClick={() => navigate("/")}>
                            <img src={LogoutIcon} alt="Logout Icon" />
                        </div>
                    </div>
                </div>}
                <div className="dashboard-layout-outlet-cnt" style={{ margin: drawerState && displayState ? '0px 0px 0px 260px' : '0px auto', width: !drawerState && displayState ? '93%' : drawerState  && displayState ?  'calc(100% - 260px)':  '100%'}}>                    
                    <Outlet />  
                </div>
            </div>
        </>
    )

}

export default DashboardLayout