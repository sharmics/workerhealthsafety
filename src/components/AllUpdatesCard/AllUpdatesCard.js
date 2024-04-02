import ProfileIcon from "../../assets/update-profile.png"
import CommentIcon from "../../assets/comment.svg"
import FilledDropdown from "../../assets/dropdown.svg"
import "./AllUpdatesCard.css"

function AllUpdatesCard({AllUpdatesData}) {
    return (
        <div className="all-updates-card-cnt">
            <div className="all-updates-card-title">
                <span>All Updates</span>
            </div>
            <div className="all-updates-details-cnt">
                {AllUpdatesData?.map(update => 
                    <div className="feed-update-cnt">
                        <div className="update-owner-date-time-cnt">
                            <div className="update-profile-owner-cnt">
                                <div className="update-cnt-owner-profile">
                                    <img src={ProfileIcon} alt="Profile Icon"/>
                                </div>
                                <span>{update.owner}</span>
                            </div>
                            <div className="update-date-time-cnt">
                                <span>{update.date_time}</span>
                                <img src={FilledDropdown} alt="Drop Down Icon" />
                            </div>
                        </div>
                        <div className="feed-update-metadata-cnt">
                            <div className="update-case-comment-cnt">
                                <span className="update-case-text">Case created</span>
                                <div className="update-case-comment-icon-cnt">
                                    <img src={CommentIcon} alt="Comment Icon"/>
                                    <span className="update-comment-text">Comment</span>
                                </div>
                            </div>
                            <div className="update-metadata-row">
                                <div className="update-metadata-label">
                                    <span>Subject</span>
                                </div>
                                <div className="update-metadata-label-val">
                                    <span>{update.subject}</span>
                                </div>
                            </div>
                            <div className="update-metadata-row">
                                <div className="update-metadata-label">
                                    <span>Priority</span>
                                </div>
                                <div className="update-metadata-label-val">
                                    <span>{update.priority}</span>
                                </div>
                            </div>
                            <div className="update-metadata-row">
                                <div className="update-metadata-label">
                                    <span>Status</span>
                                </div>
                                <div className="update-metadata-label-val">
                                    <span>{update.status}</span>
                                </div>
                            </div>
                            <div className="update-metadata-row">
                                <div className="update-metadata-label">
                                    <span>Case Number</span>
                                </div>
                                <div className="update-metadata-label-val">
                                    <span>{update.case_no}</span>
                                </div>
                            </div>
                        </div>
                    </div>  
                )}
            </div>
        </div>
    )
}

export default AllUpdatesCard