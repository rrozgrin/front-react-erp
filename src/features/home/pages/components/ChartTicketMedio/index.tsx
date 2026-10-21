// ChartTicketMedio.tsx
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { themes } from "../../../../../context/themes";

Chart.register(...registerables);

export interface DadosItem {
  data: string; // formato: '01/09'
  receita_bruta: number;
  pedidos: number;
}

interface Props {
  dados: DadosItem[];
}

export const ChartTicketMedio = ({ dados }: Props) => {
  const activeTheme = localStorage.getItem("theme") || "blue";
  const themeColors = themes[activeTheme];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || dados.length === 0) return;

    // LIMPA O GRÁFICO ANTERIOR
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const labels = dados.map(item => {
      const [mes] = item.data.split('/');
      return monthNames[parseInt(mes) - 1];
    });
    const pedidos = dados.map(item => item.pedidos);
    const ticketMedio = dados.map(item => (item.pedidos > 0 ? +(item.receita_bruta / item.pedidos).toFixed(2) : 0));

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Ticket Médio (R$)',
            data: ticketMedio,
            borderColor: themeColors.quaternary,
            backgroundColor: 'transparent',
            tension: 0.4,
            yAxisID: 'y1',
          },
          {
            type: 'bar',
            label: 'Pedidos',
            data: pedidos,
            backgroundColor: themeColors.secondary,
            borderWidth: 1,
            yAxisID: 'y2',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => {
                if (ctx.dataset.label === 'Ticket Médio (R$)') {
                  return `Ticket Médio: R$ ${ctx.raw}`;
                } else {
                  return `Pedidos: ${ctx.raw}`;
                }
              },
            },
          },
          legend: {
            position: 'top',
          },
          title: {
            display: false,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            grid: { display: false },
          },
          y1: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'Ticket Médio (R$)' },
            ticks: {
              callback: value => `R$ ${value}`,
            },
            grid: { drawOnChartArea: false },
          },
          y2: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            title: { display: true, text: 'Pedidos' },
            grid: { color: '#f0f0f0' },
          },
        },
      },
    });
  }, [dados]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '250px' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
