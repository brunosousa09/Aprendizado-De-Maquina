import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans, DBSCAN
from sklearn.datasets import make_blobs, make_moons
from sklearn.preprocessing import StandardScaler


plt.style.use('ggplot')

# --- 1. Exemplo com K-Means ---
# O K-Means funciona melhor com clusters bem definidos e esféricos.
# Geramos dados com make_blobs que são ideais para este cenário.
n_samples = 1500
random_state = 170
X_blobs, y_blobs = make_blobs(n_samples=n_samples, centers=3, random_state=random_state)

# Criando e treinando o modelo K-Means
# Definimos que queremos encontrar 3 clusters (n_clusters=3)
kmeans = KMeans(n_clusters=3, random_state=random_state, n_init=10)
y_pred_kmeans = kmeans.fit_predict(X_blobs)

plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.scatter(X_blobs[:, 0], X_blobs[:, 1], c=y_pred_kmeans, cmap='viridis', s=10)
centers = kmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c='red', s=100, alpha=0.9, marker='X')
plt.title("Agrupamento K-Means")
plt.xlabel("Característica 1")
plt.ylabel("Característica 2")

# --- 2. Exemplo com DBSCAN ---
# O DBSCAN é ótimo para clusters com formatos complexos, onde o K-Means falha.
# Usamos make_moons para gerar dados em formato de "luas".
X_moons, y_moons = make_moons(n_samples=200, noise=0.05, random_state=0)

# É uma boa prática escalar os dados antes de usar DBSCAN
X_moons = StandardScaler().fit_transform(X_moons)

# Criando e treinando o modelo DBSCAN
# Os parâmetros eps e min_samples foram escolhidos para este conjunto de dados específico
dbscan = DBSCAN(eps=0.3, min_samples=5)
y_pred_dbscan = dbscan.fit_predict(X_moons)

# Visualizando o resultado do DBSCAN
# Pontos com rótulo -1 são considerados ruído pelo DBSCAN
plt.subplot(1, 2, 2)
plt.scatter(X_moons[:, 0], X_moons[:, 1], c=y_pred_dbscan, cmap='plasma', s=20)
plt.title("Agrupamento DBSCAN")
plt.xlabel("Característica 1 (escalada)")
plt.ylabel("Característica 2 (escalada)")

plt.suptitle("Comparação entre K-Means e DBSCAN", fontsize=16)
plt.tight_layout(rect=[0, 0.03, 1, 0.95])
plt.show()

# --- Análise dos Resultados ---
# No primeiro gráfico, o K-Means identifica perfeitamente os 3 clusters esféricos e seus centros (marcados com 'X' vermelho).
# No segundo gráfico, o DBSCAN consegue separar corretamente as duas "luas", um desafio para o K-Means,
# que tentaria criar clusters esféricos e dividiria as luas de forma incorreta.
# O DBSCAN não tem centróides; ele agrupa com base na densidade local.
