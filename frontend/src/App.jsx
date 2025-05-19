import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/context";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import PasswordResetRequest from "./pages/PasswordResetRequest/PasswordResetRequest";
import ResetPasswordConfirm from "./pages/PasswordResetConfirm/PasswordResetConfirm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PredictDamage from "./pages/PredictDamage/PredictDamage";
import PredictionDetail from "./pages/PredictionDetail/PredictionDetail";
import AddBuildingData from "./pages/AddBuildingData/AddBuildingData";
import toast, { Toaster } from "react-hot-toast";
import WhatToDo from "./pages/WhatToDo/WhatToDo";
import Header from "./components/Header/Header";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {
  return (
    <div className="font-sans">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router>
          <AuthProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Routes>
              {/* Header olmayan rotalar */}
              <Route element={<AuthLayout />}>
                <Route
                  path="/login"
                  element={<Login />}
                />
                <Route
                  path="/register"
                  element={<Register />}
                />
                <Route
                  path="/password-reset"
                  element={<PasswordResetRequest />}
                />
                <Route
                  path="/reset-password/confirm/:uid/:token"
                  element={<ResetPasswordConfirm />}
                />
              </Route>

              {/* Header olan rotalar */}
              <Route element={<MainLayout />}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/what-to-do"
                  element={<WhatToDo />}
                />
                <Route
                  path="/prediciton-detail/:id"
                  element={
                    <ProtectedRoute>
                      <PredictionDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-building-data"
                  element={
                    <ProtectedRoute>
                      <AddBuildingData />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/predict-damage"
                  element={<PredictDamage />}
                />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
