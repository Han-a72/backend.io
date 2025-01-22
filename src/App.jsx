import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from './pages/CreateBook';
import BookDetails from "./pages/BookDetails";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/create' element={<CreateBook />} />
        <Route path="/books/details/:id" element={<BookDetails/>} />
        <Route path="/books/edit/:id" element={<EditBook/>} />
        <Route path="/books/delete/:id" element={<DeleteBook/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
