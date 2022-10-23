import { ThemeProvider } from "styled-components";
import { GlobalStyle } from ".";
import { darkTheme, lightTheme } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignInAndUp from "./pages/SignInAndUp";
import BoardList from "./pages/BoardList";
import BoardWrite from "./pages/BoardWrite";
import Profile from "./components/Profile";

function App() {
  const isDark = useSelector((state) => state.isDark.value);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInAndUp />} />
          <Route path="/join" element={<SignInAndUp />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/write" element={<BoardWrite />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
