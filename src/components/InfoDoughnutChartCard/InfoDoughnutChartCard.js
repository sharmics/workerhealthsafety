import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MoreIcon from "../../assets/more.svg"
import data_set from '../../Services/DataService'
import "./InfoDoughnutChartCard.css"
import { Height } from '@mui/icons-material'

function InfoDoughnutChartCard({ InfoCardDetails }) {
    const [filterOption, setFilterOption] = useState(InfoCardDetails?.filterOptions.length ? InfoCardDetails.filterOptions[0] : "")
    const [count, setCount] = useState(InfoCardDetails?.count)
    const [graphData, setGraphData] = useState(InfoCardDetails?.graph?.type === "doughnut" ? [{...InfoCardDetails?.graph?.data, "data" : InfoCardDetails?.graph?.data[0]?.data[0].data}] : InfoCardDetails?.graph?.data[0].data)
    const AllData = data_set()

    useEffect(() => {
        if(InfoCardDetails?.graph?.type === "progress") {
            setCount(AllData.incidents.length > 0 && AllData.incidents.length < 10 ? 0+AllData.incidents.length.toString() : AllData.incidents.length)
        }
    },[])

    useEffect(() => {
        if(InfoCardDetails?.graph?.type === "progress") {
            if(filterOption === "All Category") {
                setCount(AllData.incidents.length > 0 && AllData.incidents.length < 10 ? 0+AllData.incidents.length.toString() : AllData.incidents.length)
                return
            }
            const incidentCount = AllData.incidents.filter(incident => incident.status === filterOption).length
            setCount(incidentCount > 0 && incidentCount < 10 ? "0"+incidentCount : incidentCount)
            setGraphData(InfoCardDetails.graph.data.filter(data => data.category === filterOption)[0].data)
        } else {
            const filteredGraphData = InfoCardDetails.graph.data[0].data.filter(data => data.category === filterOption)[0].data
            setGraphData([{...InfoCardDetails?.graph?.data, data : filteredGraphData}])
            const Count = +count+1
            setCount(Count > 0 && Count < 10 ? "0"+Count.toString() : Count)
        }
    }, [filterOption])

    const options = {
        chart: {
            type: 'pie',
            backgroundColor: "#F8F8F8"
        },
        title: {
            text: InfoCardDetails?.graph?.title,
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {
                color: "#00000080",
                fontFamily: "Poppins",
                fontSize: "10px",
                fontWeight: 400,
                lineHeight: 15,
            }
        },
        legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            // itemWidth: 50,
            itemDistance: 10,
            // padding: 0,
            // margin: 0,
            // width: 250,
            itemStyle: {
                color: "#00000080",
                fontFamily: "Poppins",
                fontSize: "10px",
                fontWeight: 400,
                lineHeight: 15,
            }
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                innerSize: '70%',
                // depth: 45,
                dataLabels: {
                    enabled: false
                }
            },
            series: {
                showInLegend: true
            }
        },
        series: graphData
    }

    const progressbarOptions = {
        chart: {
            type: 'column',
            backgroundColor: "#F8F8F8"
        },
        title: {
            text: null
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: InfoCardDetails.graph.type === "progress" ? graphData.map(item => item.name) : [],
            lineWidth: 0
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: null,
                style: {
                    color: 'transparent'
                }
            },
            labels: {
                enabled: false
            },
            gridLineColor: 'transparent',
            tickLength: 0
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderWidth: 0,
                pointPadding: 0,
                groupPadding: 0.1,
                pointWidth: 8,
                borderRadius: 15,
                borderRadiusTopLeft: 15,
                borderRadiusTopRight: 15,
                borderRadiusBottomLeft: 15,
                borderRadiusBottomRight: 15 
            }
        },
        series: InfoCardDetails.graph.type === "progress" ? [
            {
                name: 'Remaining',
                data: graphData.map(item => ({
                    y: 100 - item.progress,
                    color: '#D7DDFF'
                }))
            },
            {
                name: 'Progress',
                data: graphData.map(item => ({
                    y: item.progress,
                    color: '#4B47FF'
                }))
            }
        ] : []
    };

    return (
        <div className="info-graph-card-main-cnt">
            <div className="info-card-section-outer-cnt">
                <div className="info-card-section-inner-cnt">
                    {InfoCardDetails?.title?.length && <span className="graph-title">{InfoCardDetails.title}</span>}
                    {InfoCardDetails?.subtitle?.length && <span className="info-card-subtitle">{InfoCardDetails.subtitle}</span>}
                    {InfoCardDetails?.filterOptions?.length > 0 &&
                        <div className="graph-select-box-cnt">
                            <FormControl
                                fullWidth
                                classes={{root: "info-doughnut-chart-card-mui-form-control-root"}}
                            >
                                <Select
                                    value={filterOption}
                                    onChange={(e) => setFilterOption(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    classes={{select: "info-doughnut-chart-card-mui-select"}}
                                >
                                    {InfoCardDetails.filterOptions.map(option => {
                                        return <MenuItem classes={{root: "info-doughnut-chart-card-mui-menu-item-root"}} value={option}>{option}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    }
                     
                        <div className="graph-count-cnt">
                            <span>{count}</span>
                        </div>
                    
                </div>
            </div>
            <div className="graph-card-section-outer-cnt">
                <div className="graph-card-section-inner-cnt">
                    <img src={MoreIcon} alt="More Icon" className="info-card-more" />
                    <div className="doughnut-pie-graph-cnt" style={{height: "250px"}}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={InfoCardDetails.graph.type === "doughnut" ? options : progressbarOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoDoughnutChartCard