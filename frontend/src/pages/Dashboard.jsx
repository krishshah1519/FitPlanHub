import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import PlanCard from "../components/PlanCard"; 
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [myPlans, setMyPlans] = useState([]); 
  const [mySubscriptions, setMySubscriptions] = useState([]); 

  const [formData, setFormData] = useState({ title: "", description: "", price: "", duration: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/plans");
      
      if (user.role === 'trainer') {
        const created = data.filter((plan) => plan.trainer._id === user._id || plan.trainer === user._id);
        setMyPlans(created);
      } else {
        const subscribed = data.filter((plan) => plan.subscribers.includes(user._id));
        setMySubscriptions(subscribed);
      }
    } catch (error) {
      console.error("Error fetching plans");
    }
  };


  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      await axios.post("http://localhost:5000/api/plans", formData, {
          headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Plan created successfully!");
      setFormData({ title: "", description: "", price: "", duration: "" });
      fetchData();
    } catch (error) {
      setMessage("Error creating plan.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      await axios.delete(`http://localhost:5000/api/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      alert("Failed to delete");
    }
  };


  if (user && user.role === 'user') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Subscriptions</h1>
        {mySubscriptions.length === 0 ? (
          <p className="text-gray-500">You haven't subscribed to any plans yet. Go to the Home page to find one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mySubscriptions.map(plan => (
              <PlanCard key={plan._id} plan={plan} refreshPlans={fetchData} />
            ))}
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trainer Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Create New Plan</h2>
          {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
          <form onSubmit={handleCreate} className="space-y-4">
             <input name="title" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border p-2 rounded" placeholder="Title" />
             <input name="price" type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border p-2 rounded" placeholder="Price" />
             <input name="duration" required value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full border p-2 rounded" placeholder="Duration" />
             <textarea name="description" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded" placeholder="Description" />
             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Publish</button>
          </form>
        </div>

        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">My Active Plans</h2>
          {myPlans.map((plan) => (
            <div key={plan._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow border">
              <div>
                <h3 className="font-bold">{plan.title}</h3>
                <p className="text-sm text-gray-500">${plan.price} • {plan.duration}</p>
              </div>
              <button onClick={() => handleDelete(plan._id)} className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;