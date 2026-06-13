# Palestinian Joke API — The Chance World Cup (Round 1 Task)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deployment Status](https://img.shields.io/badge/Deployment-Live-brightgreen.svg)]()

A lightweight, deployed API built for **The Chance World Cup (Round 1 Task)**. This API connects to an LLM to dynamically generate jokes in the local Palestinian dialect based on a single user-provided keyword.

---

## 📖 Overview

The goal of this project is to build and deploy a stateless endpoint that generates context-aware, non-racist humor on demand using an AI integration rather than a pre-defined, hardcoded database.

### Core Features
* **Dynamic Generation:** Integrates an LLM (Gemini) to generate fresh jokes on the fly.
* **Local Dialect:** Delivers jokes strictly in the local Palestinian dialect.
* **Keyword Matching:** Tailors the humor based on a single search term query parameter.

---

## 🛠️ Tech Stack

* **Language/Framework:** Node.js with Express.js (or equivalent backend framework)
* **AI Integration:** Gemini API (Google Generative AI SDK)
* **Deployment Platform:** Deployed via a free cloud host (e.g., Vercel, Render)

---

## 🔌 API Integration & Usage

### Live Endpoint
* **Method:** `GET`
* **Path Pattern:** `/api/mohammed-skaik/joke` *(Note: Author's name is explicitly in the route path)*

---

### Request Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `word` | String | Yes | The single word the joke will be centered around. |

---

### Example Request
```bash
GET https://<deployed-url>/api/mohammed-skaik/joke?keyword=قهوة
```
---

### Example JSON Response
```bash
{
  "status": "success",
  "keyword": "قهوة",
  "joke": "مرة قهوة راحت تتقدم لشاي، قالها أبوها: لسه بدري عليكي تغلي! 😂"
}
```
---

## 📁 Project Structure

Below is an overview of the structural layout optimized for open-source scalability:

```text
Palestinian-joke-api/
├── .github/
│   └── workflows/          
├── src/                    
│   ├── config/               
│   │   └── env.js   
│   ├── controllers/
│   │   └── joke.controller.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   │   └── notFound.js
│   ├── routes/
│   │   └── joke.routes.js
│   ├── utils/
│   │   └── joke.service.js
│   │   └── prompt.builder.js
│   └── app.js              
├── index.js                
├── .gitignore              
├── package.json            
└── README.md
```
## Setup Instructions
### 1. Clone and install dependencies:   
```bash
git clone [https://github.com/skaik-mo/Palestinian-joke-api.git](https://github.com/skaik-mo/Palestinian-joke-api.git)
cd Palestinian-joke-api
npm install
```


### 2. Set up environment variables:
Create a ```.env ``` file in the root directory:
```bash
PORT=3000
OPENROUTER_API_KEY=your_actual_api_key_here
```
### 3. Run the server locally:
```bash
npm run dev
```
