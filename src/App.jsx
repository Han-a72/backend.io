import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import BookTable from "./pages/BookTable";
import CreateBook from './pages/CreateBook';
import BookDetails from "./pages/BookDetails";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import ConfirmEmail from "./pages/Confirmation";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        {/* <Route path='/signup' element={<SignUp />} /> */}
        <Route path='/books/create' element={<CreateBook />} />
        <Route path="/books/booktable" element={<BookTable />} /> 
        <Route path="/books/details/:id" element={<BookDetails/>} />
        <Route path="/books/edit/:id" element={<EditBook/>} />
        <Route path="/books/delete/:id" element={<DeleteBook/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/confirmemail' element={<ConfirmEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
