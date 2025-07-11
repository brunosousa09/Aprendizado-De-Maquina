document.addEventListener('DOMContentLoaded', function () {
    const content = {
        kmeans: {
            title: "K-Means",
            how: `
                <h4 class='font-bold text-lg text-stone-800'>Como Funciona?</h4>
                <ol class='list-decimal list-inside space-y-2 text-stone-600'>
                    <li><strong>Escolha do número de clusters (k):</strong> Primeiramente, você define o número de clusters (k) que deseja encontrar.</li>
                    <li><strong>Inicialização dos centróides:</strong> O algoritmo inicia selecionando aleatoriamente k pontos de dados como os "centróides" iniciais (o centro de cada cluster).</li>
                    <li><strong>Atribuição de clusters:</strong> Cada ponto de dado é atribuído ao cluster do centróide mais próximo (geralmente usando a distância euclidiana).</li>
                    <li><strong>Atualização dos centróides:</strong> Após todos os pontos serem atribuídos, o centróide de cada cluster é recalculado como a média de todos os pontos pertencentes àquele cluster.</li>
                    <li><strong>Repetição:</strong> Os passos 3 e 4 são repetidos até que os centróides não mudem mais de posição, significando que o algoritmo convergiu e os clusters estão estáveis.</li>
                </ol>
            `,
            pros: `
                <h4 class='font-bold text-lg text-stone-800'>Vantagens</h4>
                <ul class='list-disc list-inside space-y-1 text-stone-600'>
                    <li><strong>Rápido e Simples:</strong> É computacionalmente eficiente e fácil de implementar.</li>
                    <li><strong>Escalável:</strong> Funciona bem em grandes conjuntos de dados.</li>
                </ul>
            `,
            cons: `
                <h4 class='font-bold text-lg text-stone-800'>Desvantagens</h4>
                <ul class='list-disc list-inside space-y-1 text-stone-600'>
                    <li><strong>Necessidade de definir 'k':</strong> É preciso saber o número de clusters de antemão.</li>
                    <li><strong>Sensível à inicialização:</strong> A escolha aleatória inicial dos centróides pode levar a resultados diferentes.</li>
                    <li><strong>Assume clusters esféricos:</strong> Tem dificuldade com clusters de formatos irregulares, tamanhos diferentes ou com densidades variadas.</li>
                </ul>
            `
        },
        dbscan: {
            title: "DBSCAN (Density-Based Spatial Clustering of Applications with Noise)",
            how: `
                <h4 class='font-bold text-lg text-stone-800'>Como Funciona?</h4>
                <p class='text-stone-600'>O DBSCAN opera com base em dois parâmetros principais:</p>
                <ul class='list-disc list-inside space-y-1 text-stone-600'>
                    <li><strong>eps (epsilon):</strong> A distância máxima entre dois pontos para que sejam considerados vizinhos.</li>
                    <li><strong>min_samples:</strong> O número mínimo de pontos em uma vizinhança (dentro do raio eps) para que um ponto seja considerado um "ponto central" (core point).</li>
                </ul>
                <p class='text-stone-600 mt-2'>O algoritmo então classifica e agrupa os pontos:</p>
                 <ol class='list-decimal list-inside space-y-2 text-stone-600'>
                    <li><strong>Classificação dos pontos:</strong> Percorre os pontos, classificando-os como Ponto Central, Ponto de Borda ou Ruído.</li>
                    <li><strong>Formação dos clusters:</strong> Um cluster é expandido a partir de um ponto central para todos os vizinhos alcançáveis por densidade (outros pontos centrais e de borda). O processo continua até que todos os pontos tenham sido visitados.</li>
                </ol>
            `,
            pros: `
                <h4 class='font-bold text-lg text-stone-800'>Vantagens</h4>
                <ul class='list-disc list-inside space-y-1 text-stone-600'>
                    <li><strong>Não precisa definir o número de clusters:</strong> O algoritmo encontra o número de clusters automaticamente.</li>
                    <li><strong>Encontra formatos arbitrários:</strong> É excelente para identificar clusters com formatos não esféricos.</li>
                    <li><strong>Identifica ruído:</strong> Consegue separar e identificar pontos que não pertencem a nenhum cluster.</li>
                </ul>
            `,
            cons: `
                <h4 class='font-bold text-lg text-stone-800'>Desvantagens</h4>
                <ul class='list-disc list-inside space-y-1 text-stone-600'>
                    <li><strong>Sensível aos parâmetros 'eps' e 'min_samples':</strong> A escolha desses valores pode ser desafiadora e impacta muito o resultado.</li>
                    <li><strong>Dificuldade com densidades variáveis:</strong> Não funciona bem quando os clusters têm densidades muito diferentes.</li>
                </ul>
            `
        }
    };
    
    document.getElementById('kmeans-theory').innerHTML = `${content.kmeans.how}<br>${content.kmeans.pros}<br>${content.kmeans.cons}`;
    document.getElementById('dbscan-theory').innerHTML = `${content.dbscan.how}<br>${content.dbscan.pros}<br>${content.dbscan.cons}`;

    const explanations = {
        blobs: {
            kmeans: "✅ <strong>Sucesso:</strong> O K-Means funciona perfeitamente aqui, pois os clusters são esféricos e bem separados, que é o seu cenário ideal.",
            dbscan: "✅ <strong>Sucesso:</strong> O DBSCAN também agrupa os dados corretamente, identificando as três áreas de alta densidade sem dificuldade."
        },
        moons: {
            kmeans: "❌ <strong>Falha:</strong> O K-Means não consegue identificar as 'luas' porque tenta criar clusters esféricos, dividindo as formas não-convexas de maneira incorreta.",
            dbscan: "✅ <strong>Sucesso:</strong> A abordagem baseada em densidade do DBSCAN permite que ele siga a forma arbitrária das 'luas', agrupando os pontos corretamente."
        },
        circles: {
            kmeans: "❌ <strong>Falha:</strong> O K-Means falha em separar os círculos, pois os pontos do círculo externo estão, em média, mais próximos do centroide central do que uns dos outros.",
            dbscan: "✅ <strong>Sucesso:</strong> O DBSCAN identifica corretamente os dois anéis de alta densidade e os separa em clusters distintos, destacando sua força."
        }
    };

    const kmeansExplanationEl = document.getElementById('kmeans-explanation');
    const dbscanExplanationEl = document.getElementById('dbscan-explanation');
    
    const colorPalette = ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#f97316'];
    const noiseColor = '#9ca3af';

    let kmeansChart, dbscanChart;

    function createChart(ctx, data, labels, centroids = []) {
        const uniqueLabels = [...new Set(labels)];
        const datasets = uniqueLabels.map(label => {
            const points = data.filter((_, i) => labels[i] === label);
            return {
                data: points,
                backgroundColor: label === -1 ? noiseColor : colorPalette[label % colorPalette.length],
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 0
            };
        });

        if (centroids.length > 0) {
            datasets.push({
                data: centroids,
                backgroundColor: 'black',
                pointRadius: 10,
                pointHoverRadius: 12,
                pointStyle: 'crossRot',
                rotation: 45
            });
        }

        return new Chart(ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }

    function generateData(type) {
        const data = [];
        let kmeansLabels = [], dbscanLabels = [], kmeansCentroids = [];
        const n_points_per_cluster = 75;

        if (type === 'blobs') {
            const centers = [[-3, 3], [3, 4], [0, -3]];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < n_points_per_cluster; j++) {
                    data.push([centers[i][0] + (Math.random() - 0.5) * 4, centers[i][1] + (Math.random() - 0.5) * 4]);
                    kmeansLabels.push(i);
                    dbscanLabels.push(i);
                }
            }
            kmeansCentroids = centers;
        } else if (type === 'moons') {
            for (let i = 0; i < n_points_per_cluster; i++) {
                const angle1 = (i / n_points_per_cluster) * Math.PI;
                data.push([Math.cos(angle1) * 3 + (Math.random() - 0.5) * 1, Math.sin(angle1) * 3 + (Math.random() - 0.5) * 1]);
                dbscanLabels.push(0);
                const angle2 = (i / n_points_per_cluster) * Math.PI + Math.PI;
                data.push([Math.cos(angle2) * 3 + 2 + (Math.random() - 0.5) * 1, Math.sin(angle2) * 3 + (Math.random() - 0.5) * 1]);
                dbscanLabels.push(1);
            }
            kmeansLabels = data.map(p => (p[0] > 1 ? 1 : 0));
            kmeansCentroids = [[-0.5, 2], [2.5, -2]];
        } else if (type === 'circles') {
            for(let i=0; i<n_points_per_cluster; i++) {
                const angle = Math.random() * 2 * Math.PI;
                data.push([Math.cos(angle) * 5, Math.sin(angle) * 5]);
                dbscanLabels.push(0);
                data.push([Math.cos(angle) * 2, Math.sin(angle) * 2]);
                dbscanLabels.push(1);
            }
            kmeansLabels = data.map(p => (p[0] > 0 ? 1 : 0));
            kmeansCentroids = [[-3, 0], [3, 0]];
        }
        
        return { data, kmeansLabels, dbscanLabels, kmeansCentroids };
    }

    function updateVisualization(datasetType) {
        const { data, kmeansLabels, dbscanLabels, kmeansCentroids } = generateData(datasetType);
        
        
        [kmeansExplanationEl, dbscanExplanationEl].forEach(el => el.classList.add('fade-out'));

        setTimeout(() => {
            if (kmeansChart) kmeansChart.destroy();
            kmeansChart = createChart(document.getElementById('kmeans-chart').getContext('2d'), data, kmeansLabels, kmeansCentroids);
            kmeansExplanationEl.innerHTML = explanations[datasetType].kmeans;

            if (dbscanChart) dbscanChart.destroy();
            dbscanChart = createChart(document.getElementById('dbscan-chart').getContext('2d'), data, dbscanLabels);
            dbscanExplanationEl.innerHTML = explanations[datasetType].dbscan;
            
            
            [kmeansExplanationEl, dbscanExplanationEl].forEach(el => el.classList.remove('fade-out'));

        }, 400); 

        document.querySelectorAll('.dataset-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.dataset === datasetType);
        });
    }

    document.getElementById('dataset-controls').addEventListener('click', function(e) {
        if (e.target.classList.contains('dataset-btn')) {
            const datasetType = e.target.dataset.dataset;
            if (!e.target.classList.contains('active')) {
                updateVisualization(datasetType);
            }
        }
    });

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.add('hidden');
            });
            document.getElementById(tabId).classList.remove('hidden');

            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    updateVisualization('blobs');
    document.querySelector('.tab-button[data-tab="kmeans-theory"]').click();
});