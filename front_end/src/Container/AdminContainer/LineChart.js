import React from 'react'
import { Line } from 'react-chartjs-2';

function LineChart(props) {
    const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "Số bài đăng theo tháng",
            data: [props.data.m01, props.data.m02, props.data.m03, props.data.m04, props.data.m05, props.data.m06, props.data.m07,props.data.m08, props.data.m09, props.data.m10, props.data.m11, props.data.m12],
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      };
    
    const options = {
    scales: {
        y: {
        beginAtZero: true,
        },
    },
    };
    return (
    <>
        <Line data={data} options={options} />
    </>
    );
}

export default LineChart
