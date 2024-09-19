import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { CheckProfileExists } from './components/CheckProfileExists';
import { EditProfile } from './pages/EditProfile';
import { CreatePost } from './pages/CreatePost';
import { NoAuthProtection } from './components/Redirects';
import { AuthRedirect } from './components/Redirects';
import { CheckUserProfileComplete } from './components/CheckUserProfileComplete';
import { CompleteProfile } from './pages/CompleteProfile';
import { SplashScreen } from './components/SplashScreen';

function App() {
  return (
    <Routes>
      <Route path='test' element={<SplashScreen></SplashScreen>}></Route>
      <Route
        path="/"
        element={
          <CheckUserProfileComplete>
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          </CheckUserProfileComplete>
        }
      />

      <Route path="/complete-profile" element={
        <NoAuthProtection>
          <CompleteProfile />
        </NoAuthProtection>
      } />

      <Route path="/edit-profile" element={
        <NoAuthProtection>
          <CheckUserProfileComplete>
            <EditProfile />
          </CheckUserProfileComplete>
        </NoAuthProtection>
      } />

      <Route path="/create" element={
        <NoAuthProtection>
          <CheckUserProfileComplete>
            <CreatePost />
          </CheckUserProfileComplete>
        </NoAuthProtection>
      } />

      <Route path="/not-found" element={<NotFound />} />

      <Route
        path="/:username"
        element={
          <CheckProfileExists>
            <Profile />
          </CheckProfileExists>
        }
      />
    </Routes>
  );
}

export default App;
