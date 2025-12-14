import{useEffect, useState} from "react";
import axios from "axios";
import PlanCard from "../components/PlanCard";

const Home =() =>{
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlans = async ()=>{
    try {
      const{data}= await axios.get("http://localhost:5000/api/plans");
      setPlans(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load plans.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Find Your Perfect <span className="text-blue-600">Fitness Plan</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Browse plans created by certified trainers and start your journey today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          
          <PlanCard key={plan._id} plan={plan} refreshPlans={fetchPlans} />
        ))}
      </div>
    </div>
  );
};

export default Home;