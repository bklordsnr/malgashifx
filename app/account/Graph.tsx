import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);



const Graph = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        
        data: [0],
        backgroundColor: "transparent",
        borderColor: "#FF4949",
        tension: 0.5,
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        min: 0,
        max: 3000,
        ticks: {
          callback: (value: any) => value + "$",
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col justify-center ">
     {<Line data={data} options={options}></Line>}
    </div>
  );
};

export default Graph;
