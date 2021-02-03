import {useEffect , useState} from "react";
import {Line, defaults} from "react-chartjs-2";

export default function SummaryChart(props){

    const { color } = props;

    // Disable animating charts by default.
    //defaults.global.animation = true;
    const [chartData, setChartData] = useState({});
    const [chartOptions] = useState({
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: "rgb(108, 114, 147)"
                },

                gridLines:{
                    color: "rgb(108, 114, 147)"
                }
            }],

            xAxes:[{
                ticks: {
                    beginAtZero: true,
                    fontColor: "rgb(108, 114, 147)"
                },

                gridLines:{
                    color: "rgb(108, 114, 147)"
                }
            }],

        },
        tooltips: {
            mode: 'index',
            intersect: false,
           // backgroundColor: "white"
        },
        legend:{
            display: false
        },

        //maintainAspectRatio: false,
        responsive: true,
        responsiveAnimationDuration: 1000
    });

    const chart = ()=>{
        setChartData({
            labels: ['August', 'September', 'October', 'November', 'December', 'January'],
            datasets: [{
                label: 'Sales',
                data: [35000, 35800, 38000, 45000, 65000, 50000],
                borderColor: "rgb(240, 79, 79)",
                fill: true,
                backgroundColor: (color ? color : "rgb(240, 79, 79, 0.5)"),
                borderWidth: 3,
                pointRadius: 0,
            }]
        })
    }

   useEffect(()=>{ chart();}, []);

   return(
       <div style={{width:"100%"}}>
           <Line data={chartData} options={chartOptions} />
       </div>
   )
}