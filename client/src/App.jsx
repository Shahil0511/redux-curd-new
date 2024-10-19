import { useEffect } from "react";
import Create from "./Create";
import User from "./User";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { getUsers } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import Edit from "./Edit";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        dispatch(getUsers(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}
