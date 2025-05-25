import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/context";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import PasswordResetRequest from "./pages/PasswordResetRequest/PasswordResetRequest";
import ResetPasswordConfirm from "./pages/PasswordResetConfirm/PasswordResetConfirm";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PredictDamage from "./pages/PredictDamage/PredictDamage";
import PredictionDetail from "./pages/PredictionDetail/PredictionDetail";
import AddBuildingData from "./pages/AddBuildingData/AddBuildingData";
import { Toaster } from "react-hot-toast";
import WhatToDo from "./pages/WhatToDo/WhatToDo";
import Header from "./components/Header/Header";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import MainLayout from "./components/MainLayout/MainLayout";
import FullBuildingPredictionDetail from "./pages/FullBuildingPredictionDetail/FullBuildingPredictionDetail";

function App() {
  return (
    <div className="font-sans">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router>
          <AuthProvider>
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
                  element={<Home />}
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
                  path="/full-building-prediciton-detail/:id"
                  element={
                    <ProtectedRoute>
                      <FullBuildingPredictionDetail />
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
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
