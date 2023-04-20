import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Header from "./components/Header.js";
import InitPage from "./pages/InitPage";
import CreateNote from "./components/CreateNote";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <div className="App">
        <GlobalStyle />
        <Header title="Simple Note" sub="Title Sub." />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<InitPage />}></Route>
            <Route exact path="/create" element={<CreateNote />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </div>
    </>
  );
}

export default App;
