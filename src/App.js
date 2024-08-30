import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/SignUp";
import { ProtectedRoute } from "./components/Redirects";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { CheckProfileExists } from "./components/CheckProfileExists";
import { EditProfile } from "./pages/EditProfile";
import { CreatePost } from "./pages/CreatePost";
import { NoAuthProtection } from "./components/Redirects";
import { AuthRedirect } from "./components/Redirects";

function App() {
  return (
    <Routes>
      <Route path="/" element={
       
          <Home />
        
      } />

      <Route path="/sign-up" element={
        <AuthRedirect>
          <SignUp />
        </AuthRedirect>
      } />

      <Route path="/login" element={
        <AuthRedirect>
          <Login />
        </AuthRedirect>
      } />

      <Route path="/edit-profile" element={
        <NoAuthProtection>
          <EditProfile />
        </NoAuthProtection>
      } />
      <Route path="/create" element={
        <NoAuthProtection>
          <CreatePost />
        </NoAuthProtection>
      } />

      <Route path="/not-found" element={<NotFound />} />

      <Route path="/:username" element={
        <CheckProfileExists>
          <Profile />
        </CheckProfileExists>
      } />

    </Routes>
  );
}

export default App;
