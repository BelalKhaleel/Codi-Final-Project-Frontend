import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLogin/AdminLogin.js";
import BookDonationPage from "./pages/Books/BookDonation/BookDonationPage";
import BookRequestPage from "./pages/Books/BookRequest/BookRequestPage";
import BookSearchPage from "./pages/Books/BookSearch/BookSearchPage";
import ContactUsPage from "./pages/ContactUs/ContactUs.js";
// import DashboardPage from "./pages/Dashboard/Dashboard.js";
import DashboardHome from "./pages/DashboardHome/DashboardHome.js";
import DashboardUsers from "./pages/DashboardUsers/DashboardUsers";
import DashboardDonations from "./pages/DashboardDonations/DashboardDonations";
import DashboardBooks from "./pages/DashboardBooks/DashboardBooks";
import DashboardUniversities from "./pages/DashboardUniversities/DashboardUniversities";
// import Footer from "./components/footer/footer";
// import Header from "./components/header/header";
import HomePage from "./pages/Home/Home.js";
import PageNotFound from "./pages/NotFound/NotFound.js";
// import PrivateRoutes from "./utils/privateRoutes";
import Spinner from "./components/spinner/spinner";
import TermsOfServicePage from "./pages/TermsOfService/TermsOfService";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import UserLoginPage from "./pages/UserLogin/UserLogin.js";
// import UserSignupPage from "./pages/UserSignup/UserSignup.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith("/dashboard");
  const isNotFoundPath = location.pathname === "*";
  const isUnauthorizedPath = location.pathname === "/unauthorized";
  const isAdminLoginPath = location.pathname === "/admin-login";
  const isUserLoginPath = location.pathname === "/user-login";

  // Don't render the header in Dashboard, Unauthorized, and NotFound pages
  const shouldRenderHeader =
    !isDashboardPath &&
    !isNotFoundPath &&
    !isUnauthorizedPath &&
    !isAdminLoginPath &&
    !isUserLoginPath;

  useEffect(() => {
    // Simulate a delay in loading the page
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {/* {shouldRenderHeader && <Header />} */}
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
          style={shouldRenderHeader ? { marginTop: "85px" } : { marginTop: 0 }}
        >
          <Routes>
            <Route>
              <Route>
                <Route exact path="/" element={<HomePage />} />
                <Route path="admin-login" element={<AdminLoginPage />} />
                <Route path="user-login" element={<UserLoginPage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="book-donate" element={<BookDonationPage />} />
                <Route path="book-request" element={<BookRequestPage />} />
                <Route path="book-search" element={<BookSearchPage />} />
                <Route path="contact" element={<ContactUsPage />} />
                <Route path="terms" element={<TermsOfServicePage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="unauthorized" element={<Unauthorized />} />
              </Route>
              {/* <Route path="/" element={<PrivateRoutes />}> */}
                {/* <Route path="/" element={<DashboardPage />}> */}
                  <Route path="/dashboard" element={<DashboardHome />} />
                  <Route path="/dashboard-users" element={<DashboardUsers />} />
                  <Route
                    path="/dashboard-donations"
                    element={<DashboardDonations />}
                  />
                  <Route path="/dashboard-books" element={<DashboardBooks />} />
                  <Route
                    path="/dashboard-universities"
                    element={<DashboardUniversities />}
                  />
                {/* </Route> */}
              {/* </Route> */}
              {/* <Route exact path="/show-book" element={<HomePage />} /> */}
              <Route exact path="/" element={<HomePage />} />
              <Route path="admin-login" element={<AdminLoginPage />} />
              <Route path="user-login" element={<UserLoginPage />} />
              {/* <Route path="user-signup" element={<UserSignupPage />} /> */}
              <Route path="home-page" element={<HomePage />} />
              <Route path="book-donate" element={<BookDonationPage />} />
              <Route path="book-request" element={<BookRequestPage />} />
              <Route path="book-search" element={<BookSearchPage />} />{" "}
              {/* <Route path="books/show-books" element={<ShowBook />} /> */}
              <Route path="contact" element={<ContactUsPage />} />
              <Route path="terms" element={<TermsOfServicePage />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
          </Routes>
        </div>
      )}
      {/* {shouldRenderHeader && <Footer />} */}
    </div>
  );
}

export default App;
