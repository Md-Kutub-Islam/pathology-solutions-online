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
          <Route path="/" element={<UserLayOut />}>
            <Route index element={<LoginPage />} /> {/* Default to Dashboard */}
            <Route path="user/register" element={<RegistrationPage />} />{" "}
            <Route path="user/login" element={<LoginPage />} />{" "}
            <Route
              path="user/home"
              element={
                <Suspense fallback={<Loading />}>
                  <HomePage />
                </Suspense>
              }
            />{" "}
            <Route
              path="user/lab-home/:adminId"
              element={
                <Suspense fallback={<Loading />}>
                  <LabHomePage />
                </Suspense>
              }
            />{" "}
            <Route
              path="user/test/:adminId/:categoryId"
              element={
                <Suspense fallback={<Loading />}>
                  <TestPage />
                </Suspense>
              }
            />{" "}
            <Route path="user/search" element={<SearchPage />} />{" "}
            <Route path="user/search/test" element={<SearchTestPage />} />{" "}
            <Route
              path="user/cart"
              element={
                <Suspense fallback={<Loading />}>
                  <CartPage />
                </Suspense>
              }
            />{" "}
            <Route
              path="user/profile"
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
