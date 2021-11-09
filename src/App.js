import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movimentacoes from "./pages/Movimentacoes";
import SignIn from "./pages/Login/SignIn";
import AuthProvider from "./auth";
import CreateUser from "./pages/Login/CreateUser";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header/>
          <Routes>
            <Route exact path="/" element ={<Home/>} />
            <Route path="/movimentacoes/:id" element={<Movimentacoes/>} />
            <Route path="/login" element={<SignIn/>} />
            <Route path="/criarconta" element={<CreateUser/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
