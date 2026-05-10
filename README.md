<div align="center">
  <h1>📊 Algo_Complexity.ai (Frontend Dashboard)</h1>
  <p>The interactive digital dashboard that provides real-time risk analysis and visual metrics for evaluated code snippets, powered by our ML backend.</p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

<br/>

<div align="center">
  <img src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" alt="Dashboard Visualization Preview" width="600" style="border-radius: 10px;"/>
  <p><i>A visual representation of the code risk analysis dashboard.</i></p>
</div>

---

## 📖 Overview

This repository contains the client-side application for **Algo_Complexity.ai**. It serves as a digital risk analysis dashboard where users can input code snippets and instantly receive visual feedback on potential risks, structural vulnerabilities, and code quality metrics. 

It is designed to seamlessly consume the API provided by our Machine Learning backend engine.

🔗 **Backend Repository:** [Algo_complexity.ai (Core Engine)](https://github.com/vishvas2005/Algo_complexity.ai)

---

## ✨ Dashboard Features

* 💻 **Interactive Code Editor:** A clean, syntax-highlighted input area for users to paste or write their source code.
* 📈 **Visual Risk Metrics:** Dynamic charts and progress bars displaying the calculated risk levels of the provided code.
* ⚡ **Real-Time Processing:** Asynchronous communication with the ML backend to fetch predictions and risk assessments without page reloads.
* 🎨 **Modern UI/UX:** Fully responsive and sleek design built with Tailwind CSS, ensuring a premium feel across all devices.

---

## ⚙️ How It Connects

The frontend acts as the presentation layer. Here is the basic data flow:
1. User submits code via the dashboard UI.
2. The React app packages this into a JSON payload and makes a `POST` request to the backend API (`/api/v1/analyze-risk`).
3. The ML backend processes the code and returns risk scores.
4. The frontend updates the React state and instantly re-renders the dashboard widgets to visualize the new data.

---
