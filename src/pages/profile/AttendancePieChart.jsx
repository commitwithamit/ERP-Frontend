import { Pie } from "react-chartjs-2";
// Register required components
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default function AttendancePieChart() {
  const options = {
    responsive: true,
    plugins: {
      ArcElement:{
        padding:10,
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            family: "Poppins", // Correctly set font for legend labels
          },
        },
      },
      title: {
        display: true,
        text: "Attendance of August",
        position: "bottom",
        font: {
          family: "Poppins", // Correctly set font for title
          size: 18,          // Optional: you can adjust the font size here
          weight: 'normal',    // Optional: set font weight (e.g., 'bold')
        },
      },
    },
  };

  const attendanceData = {
    // labels: ["Present", "Leaves", "Late"],
    labels: ["Present", "Leaves", "Late"],
    datasets: [
      {
        label: "Days",
        data: [25, 4, 2],
        backgroundColor: [
          "rgba(0, 128, 0, .4)",  // Green for Present
          "rgba(255, 0, 0, .4)",  // Red for Leaves
          "rgba(255, 255, 0, .4)",// Yellow for Late
        ],
        borderColor: [
          "rgba(43, 44, 43, 1)",
          // "rgba(221, 214, 212, 1)",
        ],
        borderJoinStyle:'miter',
        borderAlign:"inner",
        borderWidth: 2,
        hoverOffset: 5,
        hoverBorderColor:"rgba(43, 44, 43, 1)",
      },
    ],
  };

  return (
    <div style={{width:"350px", height:"350px", padding:"1rem"}}>
      <Pie options={options} data={attendanceData}/>
    </div>
  );
}
