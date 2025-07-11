# 🧠 Análise Interativa de Algoritmos de Clustering: K-Means vs. DBSCAN

[![Status](https://img.shields.io/badge/status-finalizado-success?style=flat-square)](https://github.com/brunosousa09/Aprendizado-De-Maquina)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

Uma Single-Page Application (SPA) educacional e interativa para a visualização e comparação dos algoritmos de agrupamento não supervisionado **K-Means** e **DBSCAN**.

➡️ **[Acesse a Demonstração Ao Vivo]([https://brunosousa09.github.io/Aprendizado-De-Maquina])**  
<p align="center">Interface principal da aplicação, demonstrando a comparação lado a lado.</p>

---

## 📖 Introdução

No campo de Aprendizado de Máquina, a clusterização é uma tarefa fundamental da análise de dados não supervisionada. Este projeto apresenta uma ferramenta interativa projetada para elucidar as diferenças operacionais e os resultados de dois dos mais proeminentes algoritmos de agrupamento:

- **K-Means**: um método baseado em centróides.
- **DBSCAN**: um método baseado em densidade.

A aplicação permite que estudantes, pesquisadores e entusiastas explorem visualmente como cada algoritmo particiona diferentes distribuições de dados, oferecendo insights práticos sobre suas respectivas forças e fraquezas.

---

## ✨ Funcionalidades Principais

- 🔍 **Visualização Comparativa**: análise simultânea dos resultados do K-Means e do DBSCAN aplicados ao mesmo conjunto de dados.
- 📊 **Seleção de Datasets Dinâmicos**: escolha entre clusters esféricos, luas, círculos concêntricos, entre outros.
- 💬 **Explicações Contextuais**: textos explicativos dinâmicos com análise do desempenho de cada algoritmo em tempo real.
- 📱 **Design Responsivo**: otimizado para desktop, tablets e mobile.
- 📘 **Conteúdo Teórico**: seção com fundamentos, vantagens e desvantagens dos algoritmos.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**, **CSS3**, **JavaScript**
- **Plotly.js** ou **D3.js** para visualizações
- **Tailwind CSS** para responsividade

---

## 🔬 Fundamento Teórico

### 📌 K-Means
Algoritmo partitivo que divide *n* observações em *k* clusters com base na proximidade do centróide.

✅ **Vantagens**:
- Simples, rápido e eficiente.
- Ideal para grandes volumes de dados.

⚠️ **Limitações**:
- Supõe clusters esféricos e semelhantes.
- Sensível a outliers e valor de *k*.

---

### 📌 DBSCAN
Algoritmo baseado em densidade, que forma clusters por regiões densamente conectadas.

✅ **Vantagens**:
- Detecta outliers naturalmente.
- Identifica clusters de forma arbitrária.

⚠️ **Limitações**:
- Requer parametrização cuidadosa (`eps`, `minPts`).
- Pode falhar com clusters de densidade variada.

---

## 🚀 Como Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Navegue até a pasta do projeto
cd SEU-REPOSITORIO

# Abra o arquivo no navegador
# Recomendado: Extensão "Live Server" no VS Code
