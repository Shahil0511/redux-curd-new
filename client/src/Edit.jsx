import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./redux/userSlice";

export default function Edit() {
  const { id } = useParams();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again.");
      });
  }, [id]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.password || !values.phone) {
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    axios
      .put(`http://localhost:3000/api/users/update/${id}`, values)
      .then((response) => {
        dispatch(updateUser(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to update user. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form
          onSubmit={handleEdit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
            Update User
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleInput}
              value={values.name}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleInput}
              autoComplete="email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleInput}
              value={values.password}
              autoComplete="new-password"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-500 transition-colors"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              onChange={handleInput}
              value={values.phone}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
