// import React from "react";

// const DashboardHome = () => {
//   return (
//     <div>
//       <h1>dashboard home</h1>
//     </div>
//   )
// }

// export default DashboardHome;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardHome.css";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const navigate = useNavigate();

  const [countUsers, setCountUsers] = useState(0);
  const [countBooks, setCountBooks] = useState(0);
  const [countDonations, setCountDonations] = useState(0);
  const [countUniversities, setCountUniversities] = useState(0);

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const users = countUsers;
  const books = countBooks;
  const donations = countDonations;
  const universities = countUniversities;

  const data = {
    labels: ["Users", "Books", "Donations", "Universities"],
    datasets: [
      {
        // label: "# of Votes",
        data: [users, books, donations, universities],
        backgroundColor: ["#810f05", "#810f0586", "#669bbc", "#4b100c"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const VerticalBarData = {
    labels,
    datasets: [
      {
        label: "Users",
        data: labels.map(() => users),
        backgroundColor: "#810f05",
      },
      {
        label: "Books",
        data: labels.map(() => books),
        backgroundColor: "#810f0586",
      },
      {
        label: "Donations",
        data: labels.map(() => donations),
        backgroundColor: "#669bbc",
      },
      {
        label: "Universities",
        data: labels.map(() => universities),
        backgroundColor: "#4b100c",
      },
    ],
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`
      );
      setCountUsers(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  const getBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/book`
      );
      setCountBooks(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  const getDonations = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/donation`
      );
      setCountDonations(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  const getUniversities = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/university`
      );
      setCountUniversities(response.data.totalItems);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
    getBooks();
    getDonations();
    getUniversities();
  }, []);

  return (
    <div className="dashboard-home onLoad">
      <div className="dashboard-home-stats">
        <DashboardCard
          title="Users"
          dataCount={countUsers}
          style={{ flexGrow: 1 }}
        />
        <DashboardCard
          title="Books"
          dataCount={countBooks}
          onClick={() => navigate("/dashboard-books")}
          style={{ flexGrow: 1 }}
        />
        <DashboardCard
          title="Donations"
          dataCount={countDonations}
          onClick={() => navigate("/dashboard-donations")}
          style={{ flexGrow: 1 }}
        />
        <DashboardCard
          title="Universities"
          dataCount={countUniversities}
          onClick={() => navigate("/dashboard-universities")}
          style={{ flexGrow: 1 }}
        />
      </div>
      <div className="dashboard-home-charts">
        <div className="dashboard-home-chart">
          <Doughnut data={data} />
        </div>
        <div className="dashboard-home-chart">
          <Bar options={options} data={VerticalBarData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
