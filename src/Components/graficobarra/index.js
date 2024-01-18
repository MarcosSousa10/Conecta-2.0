/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { ProgressSpinner } from 'primereact/progressspinner'; // Importe o ProgressSpinner
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

export default function Barra() {
    const [monthsDatas, setMonthsDatas] = useState([]);
    const [data, setDados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedUserData = localStorage.getItem('@detailUser');
                if (!savedUserData) {
                    console.log('Nenhuma informação encontrada no localStorage.');
                    return;
                }
                const userData = JSON.parse(savedUserData);
                const token = userData.uid;
                const cod = userData.email;

                const response = await axios.get(`http://192.168.2.181:5555/pc/dashboardcoluna`, {
                    headers: { Authorization: `Bearer ${token}` },
                });


                setDados(response.data);
                setIsLoading(false);

                setMonthsDatas(data);
                if (data && data.length > 0) {
                    // Ordenando os dados em ordem decrescente com base nos valores de brinde (codbrinde)
                    data.sort((a, b) => b.codbrinde - a.codbrinde);

                    // Criando arrays para os valores dos brindes e os nomes
                    const brindeValues = data.slice(0, 10).map(item => item.codbrinde); // Pegando os 10 maiores valores

                    const monthNames = data.slice(0, 10).map(item => item.descricao);

                    // Atualizando o estado com as arrays ordenadas
                    setMonthsDatas(brindeValues);

                    // Atualizando o objeto basicData com as arrays ordenadas
                    setBasicData({
                        labels: monthNames,
                        datasets: [
                            {
                                label: 'My First dataset',
                                backgroundColor: 'red',
                                data: brindeValues,
                            },
                        ],
                    });
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [basicData, setBasicData] = useState({
        labels: [],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'red',
                data: [],
            },
        ],
    });


    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#222',

                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#222'
                    },
                    grid: {
                        color: '#ffffff'
                    }
                },
                y: {
                    ticks: {
                        color: '#222'
                    },
                    grid: {
                        color: '#ffffff'
                    }
                }
            }
        };
        return {
            basicOptions
        }
    }
    const { basicOptions } = getLightTheme();

    return (
        <div className='container' style={{ textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#ffffff', borderColor: '#222', color: '#222' }} className="card">
                <h5>Vertical</h5>
                {isLoading ? (
                    <div>
                        <div className="card" style={{ textAlign: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}
                        >
                            <Circles
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    </div>) : (
                    <Chart type="bar" data={basicData} options={basicOptions} />

                )}
            </div>
        </div>
    );
}
