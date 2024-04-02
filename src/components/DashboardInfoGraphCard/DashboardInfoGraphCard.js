import { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MoreIcon from "../../assets/more.svg"
import "./DashboardInfoGraphCard.css"

function DashboardInfoGraphCard({ InfoCardDetails }) {
    const [filterOption, setFilterOption] = useState(InfoCardDetails?.filterOptions?.length ? InfoCardDetails.filterOptions[0] : "")

    const options = {
        chart: {
            type: InfoCardDetails?.graph?.type,
            backgroundColor: "#F8F8F8"
        },
        title: {
            text: InfoCardDetails?.graph?.title,
            align: "left",
            style: {
                color: "#00000080",
                fontFamily: "Poppins",
                fontSize: "10px",
                fontWeight: 400,
                lineHeight: 15,
            }
        },
        xAxis: {
            categories: InfoCardDetails?.graph?.categories,
            gridLineWidth: 1,
            gridLineDashStyle: "dash",
            lineWidth: 1,
            lineColor: "e6e6e6",
            labels: {
                color: "#333333",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: 15,
            }
        },
        yAxis: {
            title: {
                text: null
            },
            gridLineWidth: 1,
            gridLineDashStyle: 'dash',
            max: 100,
            labels: {
                color: "#333333",
                fontFamily: "Poppins",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: 15,
            }
        },
        plotOptions: {
            series: {
                pointWidth: 30,
            }
        },
        series: InfoCardDetails?.graph?.data,
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false
        }
    }
    
    return (
        <div className='info-bar-chart-main-cnt'>
            <div className="bar-chart-info-cnt">
                <div className="bar-chart-info-title-subtitle-cnt">
                    <div className="bar-chart-title-subtitle-cnt">
                        {InfoCardDetails?.title?.length && <span className='bar-chart-info-title'>{InfoCardDetails.title}</span>}
                        {InfoCardDetails?.subtitle?.length && <span className='bar-chart-info-subtitle'>{InfoCardDetails.subtitle}</span>}
                    </div>
                    <img src={MoreIcon} alt="More Icon" className="info-card-more" />
                </div>
                <div className="bar-chart-info-select-count-cnt">
                    {InfoCardDetails?.filterOptions?.length > 0 && 
                        <div className="bar-chart-info-select-cnt">
                            <FormControl
                                fullWidth
                                classes={{root: "info-bar-chart-card-mui-form-control-root"}}
                            >
                                <Select
                                    value={filterOption}
                                    onChange={(e) => setFilterOption(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    classes={{select: "info-bar-chart-card-mui-select"}}
                                >
                                    {InfoCardDetails.filterOptions.map(option => {
                                        return <MenuItem classes={{root: "info-bar-chart-card-mui-menu-item-root"}} value={option}>{option}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    }
                    <div className="bar-chart-info-count">
                        {InfoCardDetails?.count?.length > 0 && <span>{InfoCardDetails.count}</span>}
                    </div>
                </div>
            </div>
            <div className="bar-chart-main-cnt">
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}

export default DashboardInfoGraphCard