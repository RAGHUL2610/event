import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Add from "./Add";
import View from "./View";
import "./Login.css";


export default function Login() {
  return (
   <div></div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Login />);