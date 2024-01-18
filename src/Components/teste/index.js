import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function LineChartDemo() {
  const [monthsData, setMonthsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cnpj = '96932147653';
        const savedUserData = localStorage.getItem('@detailUser');
        if (!savedUserData) {
          console.log('Nenhuma informação encontrada no localStorage.');
          return;
        }
        const userData = JSON.parse(savedUserData);
        const token = userData.uid;
        const cod = userData.email;

        const requests = Array.from({ length: 12 }, (_, index) =>
          axios.get(`http://192.168.2.181:5555/pc/dashboard/${cnpj}/${index + 1}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data.codbrinde || 0);
        setMonthsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const multiAxisData = {
    labels: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novenbro',
      'Dezembro',
    ],
    datasets: [
      {
        label: 'Vendas',
        fill: false,
        borderColor: '#42A5F5',
        yAxisID: 'y',
        tension: 0.4,
        data: monthsData,
      },],
  };

  const getLightTheme = () => {
    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    let multiAxisOptions = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y1: {
                type: 'linear',
                display: false,
                position: 'right',
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    return {basicOptions,
        multiAxisOptions
    }
}

  const { basicOptions, multiAxisOptions } = getLightTheme();

  return (
    <div>
      <div className="card">
        <h5>Othon de Carvalho</h5>
        <Chart type="line" data={multiAxisData} options={multiAxisOptions} />
      </div>
    </div>
  );
}
