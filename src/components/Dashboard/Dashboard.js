import { useEffect, useState } from "react"
import InfoCard from "../InfoCard/InfoCard"
import InfoDoughnutChartCard from "../InfoDoughnutChartCard/InfoDoughnutChartCard"
import DashboardInfoGraphCard from "../DashboardInfoGraphCard/DashboardInfoGraphCard"
import getDashboardCardGraphData from "../../Services/DataService.jsx"
import CircularProgress from '@mui/material/CircularProgress'
import "./Dashboard.css"

function Dashboard() {
    const [cardGraphData, setCardGraphData] = useState([])

    useEffect(() => {
         setCardGraphData(getDashboardCardGraphData().card_graph_data)
    }, [])
    
    useEffect(() => {
        const setEqualHeight = () => {
            const parentDiv = document.querySelector(".dashboard-main-cnt")
            const childDiv = document.querySelectorAll(".dashboard-main-cnt > div")
            let minChildWidth = 0
            childDiv.forEach(child => {
                if(minChildWidth === 0) {
                    minChildWidth = child.offsetWidth
                } else if(child.offsetWidth < minChildWidth) {
                    minChildWidth = child.offsetWidth
                }
            })
            let availableParentWidth = parentDiv.offsetWidth
            let rowwiseChildDiv = [[]]
            let rowIndex = 0
            
            childDiv.forEach((child, index) => {
                rowwiseChildDiv[rowIndex] = [...rowwiseChildDiv[rowIndex], child]
                availableParentWidth = availableParentWidth - child.offsetWidth
                if(availableParentWidth < minChildWidth && index < childDiv.length - 1) {
                    rowIndex++
                    rowwiseChildDiv.push([])
                    availableParentWidth = parentDiv.offsetWidth
                }
            })
            rowwiseChildDiv.forEach(rowChilds => {
                let maxHeight = 0
                rowChilds.forEach(child => {
                    if(child.offsetHeight > maxHeight) {
                        maxHeight = child.offsetHeight
                    }
                })
                rowChilds.forEach(child => {
                    child.style.height =  `${maxHeight}px`
                })
            })
        };

        setEqualHeight();
    }, [cardGraphData]);

    return(
        <div className="dashboard-main-cnt">
            {cardGraphData.length === 0 ? 
                <CircularProgress />            
            : cardGraphData?.map(data => {
                if(data?.graph?.type == "doughnut" || data?.graph?.type == "progress") {
                    return <div className="dashboard-info-doughnut-chart-card-cnt">
                        <InfoDoughnutChartCard InfoCardDetails={data}/>
                    </div>
                } else if(data?.graph?.type == "bar" || data?.graph?.type == "column") {
                    return <div className="dashboard-info-bar-chart-card-cnt">
                        <DashboardInfoGraphCard InfoCardDetails={data}/>
                    </div>
                } else {
                    return <div className="dashboard-info-card-cnt">
                        <InfoCard InfoCardDetails={data}/>
                    </div>
                }
            })}
        </div>
    )
}

export default Dashboard