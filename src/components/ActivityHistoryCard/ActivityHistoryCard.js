import CheckboxIcon from "../../assets/checkbox.svg"
import DropdownIcon from "../../assets/drop-down.svg"
import "./ActivityHistoryCard.css"

function ActivityHistoryCard({ActivityHistoryData}) {
    return (
        <div className="activity-history-card-cnt">
            <div className="activity-history-card-title">
                <span>Activity History</span>
            </div>
            <div className="activity-history-table-header-cnt">
                <div className="activity-history-table-sub-col"><span>Subject</span></div>
                <div className="activity-history-table-name-col"><span>Name</span></div>
                <div className="activity-history-table-task-col"><span>Task</span></div>
                <div className="activity-history-table-date-col"><span>Due Date</span></div>
            </div>
            {ActivityHistoryData?.map(activity => 
                <div className="activity-history-table-row-cnt">
                    <div className="activity-history-table-sub-val">
                        <span>{activity.subject}</span>
                    </div>
                    <div className="activity-history-table-name-val">
                        <span>{activity.name}</span>
                    </div>
                    <div className="activity-history-table-task-val">
                        <img src={CheckboxIcon} alt="Task Icon"/>
                    </div>
                    <div className="activity-history-table-date-val">
                        <span>{activity.due_date}</span>
                        <img src={DropdownIcon} alt="Drop Down Icon"/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ActivityHistoryCard