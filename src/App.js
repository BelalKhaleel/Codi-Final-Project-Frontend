import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BookDonationPage from "./pages/Books/BookDonation/BookDonationPage";
import BookRequestPage from "./pages/Books/BookRequest/BookRequestPage";
import BookSearchPage from "./pages/Books/BookSearch/BookSearchPage";
import ContactUsPage from "./pages/ContactUs/ContactUs.js";
import DashboardPage from "./pages/Dashboard/Dashboard.js";
import DashboardHome from "./pages/DashboardHome/DashboardHome.js";
import DashboardUsers from "./pages/DashboardUsers/DashboardUsers";
import DashboardDonations from "./pages/DashboardDonations/DashboardDonations";
import DashboardBooks from "./pages/DashboardBooks/DashboardBooks";
import DashboardUniversities from "./pages/DashboardUniversities/DashboardUniversities";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import HomePage from "./pages/Home/Home.js";
import PageNotFound from "./pages/NotFound/NotFound.js";
import PrivateRoutes from "./utils/privateRoutes";
import Spinner from "./components/spinner/spinner";
import TermsOfServicePage from "./pages/TermsOfService/TermsOfService";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import UserLoginPage from "./pages/UserLogin/UserLogin.js";
import axios from "axios";
import cookie from "react-cookies";

export const isLoggedIn = React.createContext();
export const headerStatus = React.createContext();
export const isAdmin = React.createContext();

function App() {
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith("/dashboard");
  const isNotFoundPath = location.pathname === "*";
  const isUnauthorizedPath = location.pathname === "/unauthorized";

  // Don't render the header in Dashboard, Unauthorized, and NotFound pages
  const shouldRenderHeader =
    !isDashboardPath && !isNotFoundPath && !isUnauthorizedPath;

  const userIsLoggedIn = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/is-logged-in`, {
        headers: { "user-token": cookie.load("user-token") },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          if (cookie.load("user-token").isAdmin) {
            setAdmin(true);
            setIsLoading(false);
          } else {
            setAdmin(false);
            setIsLoading(false);
          }
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setLoggedIn(false);
          setIsLoading(false);
        } else {
          setLoggedIn(false);
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    userIsLoggedIn();
  }, [loggedIn, admin]);

  return (
    <headerStatus.Provider value={[headerExpanded, setHeaderExpanded]}>
      <isLoggedIn.Provider value={[loggedIn, setLoggedIn]}>
        <isAdmin.Provider value={[admin, setAdmin]}>
          <div className="App">
            {shouldRenderHeader && <Header /> }
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "100vh",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner />
              </div>
            ) : (
              <div
                className="pages"
                style={
                  shouldRenderHeader ? { marginTop: "0px" } : { marginTop: 0 }
                }
              >
                <Routes>
                  <Route>
                    <Route>
                      <Route exact path="/" element={<HomePage />} />
                      <Route path="login" element={<UserLoginPage />} />
                      <Route path="home" element={<HomePage />} />
                      <Route path="donate" element={<BookDonationPage />} />
                      <Route path="request" element={<BookRequestPage />} />
                      <Route path="search" element={<BookSearchPage />} />
                      <Route path="contact" element={<ContactUsPage />} />
                      <Route path="terms" element={<TermsOfServicePage />} />
                      <Route path="*" element={<PageNotFound />} />
                      <Route path="unauthorized" element={<Unauthorized />} />
                    </Route>
                    <Route path="/" element={<PrivateRoutes />}>
                      <Route path="/" element={<DashboardPage />}>
                        <Route path="/dashboard" element={<DashboardHome />} />
                        <Route
                          path="/dashboard-users"
                          element={<DashboardUsers />}
                        />
                        <Route
                          path="/dashboard-donations"
                          element={<DashboardDonations />}
                        />
                        <Route
                          path="/dashboard-books"
                          element={<DashboardBooks />}
                        />
                        <Route
                          path="/dashboard-universities"
                          element={<DashboardUniversities />}
                        />
                      </Route>
                    </Route>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="user-login" element={<UserLoginPage />} />
                    <Route path="home-page" element={<HomePage />} />
                    <Route path="book-donate" element={<BookDonationPage />} />
                    <Route path="book-request" element={<BookRequestPage />} />
                    <Route
                      path="book-search"
                      element={<BookSearchPage />}
                    />{" "}
                    <Route path="contact" element={<ContactUsPage />} />
                    <Route path="terms" element={<TermsOfServicePage />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                  </Route>
                </Routes>
              </div>
            )}
            {shouldRenderHeader && <Footer />}
          </div>
        </isAdmin.Provider>
      </isLoggedIn.Provider>
    </headerStatus.Provider>
  );
}

export default App;
