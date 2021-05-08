import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

const DonutChart = () => {

    type ChartData = {
        series: number[]; //-- Array de number
        labels: string[]; //-- Array de string
    }    

    // FORMA ERRADA
    let chartData : ChartData = { labels: [], series: []}; //let é para criação de variavel         

    // FORMA ERRADA
    axios.get(`${BASE_URL}/sales/amount-by-seller`) //--a requisição é realizada de forma assincrona, ela vai se chamada, a sua aplicação continua rodando, e quando voltar a resposta ai sim executa alguma coisa no caso a promice
        .then( response =>{ // após a resposta da api executa a promice atrás do then quando foi executado com sucesso
            const data = response.data as SaleSum[];
            const myLabels = data.map(x => x.sellerName); 
            const mySeries = data.map(x => x.sum);
            
            chartData = { labels: myLabels, series: mySeries};
            console.log(chartData);            
        }); 
    // const mockData = {
    //     series: [477138, 499928, 444867, 220426, 473088],
    //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    // }

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;