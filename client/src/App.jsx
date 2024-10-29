import React, { lazy, Suspense } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import UserLayOut from "./layout/UserLayOut";
import {
  RegistrationPage,
  LoginPage,
  SearchPage,
  SearchTestPage,
} from "./pages/user-pages";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerifyEmail from "./components/user-components/auth/VerifyEmail";
import Loading from "./components/Loading";
const HomePage = lazy(() => import("./pages/user-pages/HomePage"));
const LabHomePage = lazy(() => import("./pages/user-pages/LabHomePage"));
const TestPage = lazy(() => import("./pages/user-pages/TestPage"));
const CartPage = lazy(() => import("./pages/user-pages/CartPage"));
const ProfilePage = lazy(() => import("./pages/user-pages/ProfilePage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes with Nested Children */}
          <Route path="/user" element={<UserLayOut />}>
            <Route index element={<RegistrationPage />} />{" "}
            {/* Default to Dashboard */}
            <Route path="register" element={<RegistrationPage />} />{" "}
            <Route path="login" element={<LoginPage />} />{" "}
            <Route
              path="home"
              element={
                <Suspense fallback={<Loading />}>
                  <HomePage />
                </Suspense>
              }
            />{" "}
            <Route
              path="lab-home/:adminId"
              element={
                <Suspense fallback={<Loading />}>
                  <LabHomePage />
                </Suspense>
              }
            />{" "}
            <Route
              path="test/:adminId/:categoryId"
              element={
                <Suspense fallback={<Loading />}>
                  <TestPage />
                </Suspense>
              }
            />{" "}
            <Route path="search" element={<SearchPage />} />{" "}
            <Route path="search/test" element={<SearchTestPage />} />{" "}
            <Route
              path="cart"
              element={
                <Suspense fallback={<Loading />}>
                  <CartPage />
                </Suspense>
              }
            />{" "}
            <Route
              path="profile"
              element={
                <Suspense fallback={<Loading />}>
                  <ProfilePage />
                </Suspense>
              }
            />{" "}
            {/* Nested Route */}
          </Route>

          {/* Route for Email Verification (direct access) */}
          <Route path="/emailVerify" element={<VerifyEmail />} />

          {/* Admin Routes with Nested Children */}
          {/* <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
    </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
