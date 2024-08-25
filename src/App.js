import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/SignUp";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { FIREBASE_AUTH } from "./firebase/firebase";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/sign-up" element={
        <ProtectedRoute to={`profile`}>
          <SignUp />
        </ProtectedRoute>
      } />

      <Route path="/login" element={
        <ProtectedRoute to={`profile`}>
          <Login/>
        </ProtectedRoute>
      } />

      <Route path="/not-found" element={<NotFound></NotFound>} />
      <Route path="/:id" element={<Profile />} />

    </Routes>
  );
}

export default App;
