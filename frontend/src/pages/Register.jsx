import{useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import{useNavigate, Link } from "react-router-dom";

const Register= () =>{
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError]= useState("");

  const {register}= useContext(AuthContext);
  const navigate= useNavigate();

  const handleChange= (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit= async(e) =>{
    e.preventDefault();
    setError("");
    const result= await register(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );

    if(result.success){
      navigate("/");
    }else{
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create an account</h2>

        {error&& (
          <div className="p-3 text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">I want to be a:</label>
            <select
              name="role"
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300 bg-white"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Regular User (Buy Plans)</option>
              <option value="trainer">Fitness Trainer (Sell Plans)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <div className="text-sm text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;