import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import Login from "./Login";
import WeatherComponent from "./WeatherComponent";

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<WeatherComponent />} />
      <Route
        path="/protected"
        element={
          isAuthenticated ? <WeatherComponent /> : <Navigate to="/login" />
        }
      />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
