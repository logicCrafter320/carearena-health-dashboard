import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/log-vitals" element={<Navigate to="/" replace />} />
      <Route path="/history" element={<Navigate to="/" replace />} />
      <Route path="/alerts" element={<Navigate to="/" replace />} />
      <Route path="/medications" element={<Navigate to="/" replace />} />
      <Route path="/notes" element={<Navigate to="/" replace />} />
      <Route path="/profile" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
