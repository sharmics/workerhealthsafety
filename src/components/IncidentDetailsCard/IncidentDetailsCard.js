import { useState } from 'react'
import { useNavigate } from "react-router"
import Modal from '@mui/material/Modal'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import CloseIcon from "../../assets/close.svg"
import "./IncidentDetailsCard.css"

function IncidentDetailsCard({ IncidentDetailsData }) {
    const [openChangeOwner, setOpenChangeOwner] = useState(false)
    const [openChangeRecord, setOpenChangeRecord] = useState(false)
    const [ownerOption, changeOwner] = useState("Poonam Patil")
    const [recordTypeOption, changeRecordTypeOption] = useState("In Progress")
    const navigate = useNavigate()

    return (
        <div className="incident-details-info-cnt">
            <div className="incident-details-info-title-action-cnt">
                <span>{IncidentDetailsData.subject}</span>
                <div className="incident-details-info-action-btn-cnt">
                    <button>Follow</button>
                    <button onClick={() => navigate(`/dashboard/incidents/${IncidentDetailsData.incident_id}/edit`)}>Edit</button>
                    <button onClick={() => setOpenChangeOwner(!openChangeOwner)}>Change Owner</button>
                    <button onClick={() => setOpenChangeRecord(!openChangeRecord)}>Change Record Type</button>
                </div>               
            </div>
            <div className="incident-priority-status-case-cnt">
                <div className="incident-label-value-cnt">
                    <span className="incident-info-label">Priority</span>
                    <div className="incident-info-priority-label">
                        <span>{IncidentDetailsData.priority}</span>
                    </div>
                </div>
                <div className="incident-label-value-cnt">
                    <span className="incident-info-label">Status</span>
                    <div className="incident-info-status-label">
                        <span>{IncidentDetailsData.status}</span>
                    </div>
                </div>
                <div className="incident-label-value-cnt">
                    <span className="incident-info-label">Case Number</span>
                    <span className="incident-info-case-no">{IncidentDetailsData.case_no}</span>
                </div>
            </div>
            <div className="incident-meta-info-main-cnt">
                <div className="incident-sub-desc-cnt">
                    <div>
                        <span className="incident-sub-label">Subject</span>
                        <span className="incident-sub-label-val">{IncidentDetailsData.subject}</span>
                    </div>
                    <span className="incident-desc-label">Description</span>
                    <div className="incident-desc-info-cnt"> 
                        <span>{IncidentDetailsData.description}</span>
                    </div>
                </div>
                <div className="incident-product-cnt">
                    <div className="incident-product-label-cnt">
                        <span>Product Family</span>
                        <span>Product</span>
                        <span>Case Owner</span>
                        <span>Contact Phone</span>
                        <span>Contact Email</span>
                    </div>
                    <div className="incident-product-label-val-cnt">
                        <span>{IncidentDetailsData.product_family}</span>
                        <span>{IncidentDetailsData.product}</span>
                        <span>{IncidentDetailsData.case_owner}</span>
                        <span>{IncidentDetailsData.contact_phone}</span>
                        <span>{IncidentDetailsData.contact_email}</span>
                    </div>
                </div>
            </div>
            <Modal
                open={openChangeOwner}
                onClose={() => setOpenChangeOwner(!openChangeOwner)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="change-owner-record-modal-cnt">
                    <div className="change-owner-record-modal-title-action-cnt">
                        <span>Change Owner</span>
                        <img src={CloseIcon} alt="Close Icon" onClick={() => setOpenChangeOwner(!openChangeOwner)}/>
                    </div>
                    <div className="change-owner-record-modal-select-box-cnt">
                        <FormControl
                            fullWidth
                            classes={{root: "modal-mui-form-control-root"}}
                        >
                            <Select
                                value={ownerOption}
                                onChange={(e) => changeOwner(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                classes={{select: "modal-mui-select"}}
                            >
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"Poonam Patil"}>Poonam Patil</MenuItem>
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"Abc Xyz"}>Abc Xyz</MenuItem>
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"Pqr Stu"}>Pqr Stu</MenuItem>
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"Ghi Jkl"}>Ghi Jkl</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Modal>
            <Modal
                open={openChangeRecord}
                onClose={() => setOpenChangeRecord(!openChangeRecord)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="change-owner-record-modal-cnt">
                    <div className="change-owner-record-modal-title-action-cnt">
                        <span>Change Record Type</span>
                        <img src={CloseIcon} alt="Close Icon" onClick={() => setOpenChangeRecord(!openChangeRecord)}/>
                    </div>
                    <div className="change-owner-record-modal-select-box-cnt">
                        <FormControl
                            fullWidth
                            classes={{root: "modal-mui-form-control-root"}}
                        >
                            <Select
                                value={recordTypeOption}
                                onChange={(e) => changeRecordTypeOption(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                classes={{select: "modal-mui-select"}}
                            >
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"Not Started"}>Not Started</MenuItem>
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"Pending"}>Pending</MenuItem>
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"In Progress"}>In Progress</MenuItem>
                                <MenuItem classes={{root: "modal-mui-menu-item-root"}} value={"Completed"}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default IncidentDetailsCard