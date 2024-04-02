import React, { useEffect, useState } from 'react';
import "../ZoneMonitor/ZoneMonitor.css";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip
);

function ZoneMonitor({ selectedZone }) {
    const [data, setData] = useState([])
    useEffect(() => {
        // Function to generate random data
        const generateRandomData = () => {
            const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
            setData(newData);
        };

        // Generate random data initially
        generateRandomData();
    }, [selectedZone]);
    let arr = [{ title: "Catalog", position: "UP" }, { title: "Fronted", position: "UP" }, { title: "Recommendations", position: "UP" }, { title: "WS", position: "Down" }, { title: "Copy", position: "UP" }, { title: "Download", position: "UP" }];
    const lineData = {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [
            {
                label: 'Data',
                data: data,
                fill: false,
                borderColor: 'rgb(0, 0, 255)',
                tension: 0,
                borderWidth: 1.5,
                pointRadius: 1
            },
        ],
    };

    const lineOptions = {
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                max: 100,
                border: {
                    dash: [1, 1]
                },
                grid: {
                    drawTicks: false
                },
                ticks: {
                    font: {
                        size: 5 // Adjust font size of x-axis labels
                    }
                }
            },
            y: {
                position: 'right',
                max: 100,
                border: {
                    dash: [6, 6]
                },
                grid: {
                    drawTicks: false
                },
                ticks: {
                    font: {
                        size: 5 // Adjust font size of y-axis labels
                    }
                }
            }
        }
    };

    return (
        <div className='ZoneMonitor-outer'>
            <div className='feed-ZoneMonitor'>
                <div style={{ marginLeft: "15px" }}>Zone Monitor</div>
            </div>
            <div className='ZoneMonitor-live'>
                <div className='ZoneMonitor-graph'>
                    <div className='ZoneMonitor-graph-text'>
                        <div className='ZoneMonitor-graph-data1'>Traffic</div>
                        <div className='ZoneMonitor-graph-data'> <span>0.117</span><span>req/s</span></div>
                    </div>
                    <Line data={lineData} className='graph-data' options={lineOptions} style={{ width: '100%', height: '70%', }}></Line>
                </div>
                <div className='zoneMonitor-textBoxes'>
                    {arr.map((i, index) => (
                        <div className=' zoneMonitor-textBox' key={index}>
                            <div className='zoneMonitor-textBox-title'>{i.title}</div>
                            <div className='zoneMonitor-textBox-position'>{i.position}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ZoneMonitor;
