# WorldView: AI-Powered Global News Bias Detector

<p align="center">
  <b>Understand the whole story. Compare global news narratives and uncover hidden bias instantly.</b>
  <br />
  <a href="https://world-view-phi.vercel.app/">View Demo</a> ·
  <a href="https://github.com/neev-ahuja/world-view/issues/new">Report Bug</a> ·
  <a href="https://github.com/neev-ahuja/world-view/issues/new">Request Feature</a>
</p>

<!-- Optional Badges -->
<p align="center">
    <img src="https://img.shields.io/badge/status-in%20development-orange.svg" alt="Status">
</p>

---

## 🎯 The Problem

In today's polarized media landscape, global events are reported with significant variations influenced by regional, political, and ideological biases. This creates disparate narratives, hides underlying agendas, and often leads to a one-sided, incomplete understanding of critical issues, fueling the spread of misinformation.

## ✨ Our Solution: WorldView

WorldView is a web application that leverages Artificial Intelligence to provide users with a transparent, multi-faceted view of world news. It automatically gathers articles on a single topic from diverse global sources, summarizes them, and analyzes their content for bias, allowing users to compare different narratives side-by-side on a unified, intuitive platform.

### Core Features

*   🌐 **Global Article Aggregation:** Fetches news articles on any given topic from a wide range of international sources using news APIs.
*   🧠 **AI-Powered Summarization:** Uses state-of-the-art Large Language Models (LLMs) like Google's Gemini to condense complex articles into concise, digestible summaries.
*   📊 **Bias Detection & Analysis:** The core of WorldView. The AI analyzes and scores articles based on:
    *   **Political Leaning:** Identifies where an article sits on the left-to-right political spectrum.
    *   **Sentiment Score:** Determines if the tone is positive, negative, or neutral.
    *   **Factual Discrepancies:** Highlights key differences in claims and data points between sources.
*   ↔️ **Intuitive Comparison UI:** Presents the analysis in a clean, visual format, making it easy to compare sources, understand their angles, and grasp the bigger picture.

---

## 🚀 Live Demo

[**Demo**](https://world-view-phi.vercel.app/)

## 📸 Screenshots

A quick look at the simple 3-step user flow:

**1. Select a Topic**
<br/>
![WhatsApp Image 2025-06-24 at 21 24 44_f28fda72](https://github.com/user-attachments/assets/2497b5d3-5a3a-48bd-8bc3-55b18a318989)
<br/>
<br/>

**2. Get AI Analysis & Summary**
<br/>
![WhatsApp Image 2025-06-24 at 21 24 44_f56a544e](https://github.com/user-attachments/assets/1ab244f8-9037-4c94-bc3a-71d3516da489)
<br/>
---

## 🛠️ Technology Stack

This project is built with a modern, scalable tech stack.

| Area      | Technology                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend**  | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![Vercel](https://img.shields.io/badge/-Vercel-black?logo=vercel&logoColor=white)                        |
| **Backend**   | ![Django](https://img.shields.io/badge/-Django-092E20?logo=django&logoColor=white) ![render](https://img.shields.io/badge/-render-black?logo=render&logoColor=white) |
| **AI/NLP**    | ![Google Gemini](https://img.shields.io/badge/-Google%20Gemini-4285F4?logo=google-gemini&logoColor=white) ![Hugging Face](https://img.shields.io/badge/-hugginface-FF9D00?logo=huggingface&logoColor=white)        |
| **Data Sources**| `gnews` API, `newspaper3k`                                                                                   |

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Python 3.8+
*   Node.js and npm
*   Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/neev-ahuja/world-view
    cd worldview
    ```

2.  **Set up the Backend (Django):**
    ```sh
    cd backend
    pip install -r requirements.txt
    ```
    Create a `.env` file in the `backend` directory and add your API keys:
    ```.env
    # .env file for backend
    GEMINI_KEY='YOUR_GOOGLE_GEMINI_API_KEY'
    GNEWS_KEY='YOUR_GNEWS_API_KEY'
    SECRET_KEY='YOUR_DJANGO_SECRET_KEY'
    DEBUG=True
    ```
    Run the backend server:
    ```sh
    python manage.py runserver
    ```

3.  **Set up the Frontend (React):**
    ```sh
    cd ../
    npm install
     ```
    Run the frontend development server:
   
    ```sh
    npm start
    ```
    Open [http://localhost:5137](http://localhost:5137) to view it in your browser.

---

## 🗺️ Future Roadmap

We have exciting plans to enhance WorldView's capabilities!

-   [ ] **Multi-Language Support:** Expand beyond English to analyze news in other global languages.
-   [ ] **Advanced AI Models:** Integrate more sophisticated models (e.g., from Hugging Face) for deeper, more nuanced rhetorical analysis.
-   [ ] **Fact-Checking Plugins:** Add third-party fact-checking integrations to verify specific claims.
-   [ ] **User Accounts & History:** Allow users to save their analyses and track topics over time.
