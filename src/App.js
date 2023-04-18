import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Header from "./components/Header.js";
import SearchBar from "./components/SearchBar";
import NoteList from "./components/NoteList";
import InitPage from "./pages/InitPage";

function App() {
  return (
    <div>
      <div className="App">
      <GlobalStyle />
      <Header title="Simple Note" sub="Title Sub."/>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<InitPage />}></Route>
      </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
