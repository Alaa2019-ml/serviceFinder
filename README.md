## Highly Rated Service Providers Platform
<img width="1624" height="737" alt="2" src="https://github.com/user-attachments/assets/add6bc79-e173-41c7-a7d6-396c434869e1" />



📌 Project Overview

This web application allows users to discover highly rated service providers based on a selected city and service category.
Providers are ranked using a quality-based algorithm that considers ratings and review counts to ensure reliable and meaningful results.

The application is built with React and Vite. 

 ⚡ Bootstrapped With React + Vite

This project was bootstrapped using Vite with React


## 🛠 Tech Stack

### Frontend
- React
- Vite
- JavaScript (ES6+)
- Material UI (MUI)

### APIs & Data
- Google Maps via SerpAPI
- Custom provider ranking logic

## 🔍 Features

- Search providers by **service category**
- Search by **city** (Netherlands-focused)
- Fetch real business data from Google Maps
- Rank providers based on:
  - Average rating
  - Number of reviews (logarithmic scaling)
- Display:
  - Provider name
  - Rating
  - Reviews count
  - Location
  - Website (if available)

## 🧮 Ranking Logic

Providers are ranked using a custom scoring algorithm:

- Higher ratings increase the score
- More reviews improve trustworthiness
- Logarithmic scaling (`log10`) prevents extremely large review counts from dominating unfairly

This ensures **balanced and trustworthy rankings**.

## 🏁 Getting Started

To get started, clone the repository and install the dependencies in the **root folder**.

### Installation & Run (with NPM)

| Step    | Command         |
|--------:|-----------------|
| Install | `npm install`   |
| Run     | `npm run dev`   |

Runs the app in development mode.  
Open the local URL shown in the terminal (usually): http://localhost:5173


## 📂 Directory Layout and Tree
<img width="653" height="640" alt="directoryTree" src="https://github.com/user-attachments/assets/49ce0ecf-9df7-49d5-a879-fe050d6d9732" />



