import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });    

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`) //--a requisição é realizada de forma assincrona, ela vai se chamada, a sua aplicação continua rodando, e quando voltar a resposta ai sim executa alguma coisa no caso a promice
            .then(response => { // após a resposta da api executa a promice atrás do then quando foi executado com sucesso
                const data = response.data as SaleSuccess[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => round(100* x.deals / x.visited,1));

                setChartData({
                    labels: {
                        categories: myLabels
                    },
                    series: [
                        {
                            name: "% Success",
                            data: mySeries
                        }
                    ]
                });
            });
    },[]);    

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
     
    // --- Estrutura do gráfico usando valores fixos para teste
    // const mockData = {
    //     labels: {
    //         categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //     },
    //     series: [
    //         {
    //             name: "% Sucesso",
    //             data: [43.6, 67.1, 67.7, 45.6, 71.1]
    //         }
    //     ]
    // };

    return (
        <Chart                    //eixo x, que é uma opção
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;