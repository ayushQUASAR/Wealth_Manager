# WealthManager.online - Portfolio Analytics Dashboard

This is a full-stack web application designed to provide investors with a comprehensive and interactive dashboard to analyze their stock portfolio. The application features a robust backend API built with Node.js, Express, and MongoDB, and a dynamic, responsive frontend built with React.


 Live Demo

 Backend API: (https://wealth-manager-api.onrender.com/)
 Frontend Dashboard: `[Link to your deployed frontend (e.g., on Vercel or Netlify)]`


 Features

# 1. Portfolio Overview Cards
 Total Portfolio Value: A prominent, at-a-glance view of the total current market value of the portfolio.
 Total Gain/Loss: A color-coded metric showing the absolute gain or loss (Green for gains, Red for losses).
 Portfolio Performance %: The total portfolio return as a percentage, also color-coded.
 Number of Holdings: A simple count of the total unique stocks in the portfolio.

# 2. Asset Allocation Visualizations
 Sector Distribution: An interactive donut chart visualizing the portfolio's allocation across different market sectors.
 Market Cap Distribution: A bar chart that provides a clear visual split of investments between Large Cap, Mid Cap, and Small Cap stocks.
 Interactive Elements: Hovering over chart segments reveals tooltips with precise values and percentages.

# 3. Holdings Table/Grid
 Comprehensive Data: Displays key metrics for each holding, including symbol, company name, sector, value, and performance.
 Sortable Columns: All columns can be sorted in ascending or descending order by clicking the headers. Visual indicators show the current sort state.
 Search/Filter: A dynamic search bar allows users to quickly filter the table to find specific stocks by name or symbol.
 Color-Coded Performance: Gain/Loss columns are colored green for positive returns and red for negative returns.

# 4. Performance Comparison
 Timeline Visualization: An interactive line chart that plots the portfolio's historical value against key benchmarks like the Nifty 50 and Gold.
 Interactive Chart: Users can hover over any point on the timeline to see the exact values of all metrics on that specific date.
 Performance Metrics Table: A summary table comparing 1-month, 3-month, and 1-year returns for the portfolio, Nifty 50, and Gold.

# 5. Key Insights
 Top & Worst Performers: Highlights the best and worst-performing stocks in the portfolio.
 Diversification Score: A radial progress bar provides a visual score of the portfolio's diversification.
 Risk Level: A clear indicator of the portfolio's overall risk level.

---

 Tech Stack

| Category      | Technology                               |
|---------------|------------------------------------------|
| Frontend | React, Tailwind CSS, Chart.js, Axios     |
| Backend | Node.js, Express.js                      |
| Database | MongoDB (with Mongoose)                  |
| Deployment| Render (Backend), Vercel/Netlify (Frontend) |

---

 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites

 Node.js (v18 or later)
 npm
 Git
 A free MongoDB Atlas account for the database.

# Backend Setup

1.  Clone the repository:
    ```bash
    git clone repo_link
    cd your-repository-name/backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
     Create a file named `.env` in the `backend` directory.
     Add your MongoDB connection string and a port number:
        ```
        MONGO_URI=your_mongodb_atlas_connection_string
        PORT=8080
        ```

4.  Seed the database:
     This command will populate your MongoDB database with the sample portfolio data.
    ```bash
    npm run seed
    ```

5.  Run the server:
    ```bash
    npm run dev
    ```
    The backend API will be running at `http://localhost:8080`.

# Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the React app:
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`. The frontend is configured to proxy API requests to the backend server.

---

 API Endpoints

The backend provides 4 core endpoints to supply the frontend with portfolio data.

| Method | Endpoint                    | Description                                         |
|--------|-----------------------------|-----------------------------------------------------|
| `GET`  | `/api/portfolio/holdings`   | Returns a complete list of the user's stock investments. |
| `GET`  | `/api/portfolio/allocation` | Returns asset distribution grouped by sector and market cap. |
| `GET`  | `/api/portfolio/performance`| Returns historical performance data vs. benchmarks.    |
| `GET`  | `/api/portfolio/summary`    | Returns key portfolio metrics and top/worst performers. |


