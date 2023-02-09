import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import './styles/global.scss';

//載入各頁面
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Header from './pages/Header';
import Sign from './pages/Sign';
import Files from './pages/Sign/Files';
import Signature from './pages/Sign/Signature';
import Popup from './components/Popup';
import Chat from './pages/Chat';

//共用
import { AuthContextProvider } from './Context/authContext';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="popup" element={<Popup />} />
          <Route path="" element={<Header />}>
            <Route path="login" element={<Login />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="sign" element={<Sign />} />
            <Route path="chat" element={<Chat />} />
            <Route path="files" element={<Files />} />
            <Route path="signature" element={<Signature />} />
          </Route>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
