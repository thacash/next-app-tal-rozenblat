import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export const LineChart = ( { chartData }) => {
    return (
        <div>
            <Line
                data = {chartData}
                options = {{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Portfolio of Savings and Return-on-Investment"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    },
                }}
            />
        </div>
    );
};
