import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Header from "./components/Header";
import InitPage from "./pages/InitPage";
import EditPage from "./pages/EditPage";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const headerProps = {title:"Simple Note", sub:"test"};
  return (
    <>
      <div className="App">
        <GlobalStyle />
        <Header props={headerProps}/>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<InitPage />}></Route>
            <Route exact path="/edit" element={<EditPage />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </div>
    </>
  );
}

export default App;
