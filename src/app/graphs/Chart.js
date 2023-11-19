
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';



const ChartComponent = ({ barColors, data, type, labels, label, lowerLimit, upperLimit, yAxisLabel }) => {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);


  useEffect(() => {
    if (chartRef.current && data && data.length > 0) {
        if(chartInstanceRef.current){
            chartInstanceRef.current.destroy();
        }
      const ctx = chartRef.current.getContext('2d');
      
    chartInstanceRef.current = new Chart(ctx, {
        type: type || 'line',
        data: {
          labels:  labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: barColors || 'rgba(255, 0, 0, 0.5)',
              tension: 0.5
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: yAxisLabel, // Set the custom y-axis label here
              },
              // You can also add other y-axis configurations here if needed
              // For example, to set a lower limit for the y-axis:
              min: lowerLimit,
              max: upperLimit,
            },
          },
        },
      });
    }
  }, [data]);


  return <canvas ref={chartRef} className='chart-canvas' />;
};

export default ChartComponent;
