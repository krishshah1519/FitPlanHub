import { useEffect, useState, useContext } from "react"; 
import axios from "axios";
import PlanCard from "../components/PlanCard";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [plans, setPlans] = useState([]);
  const [myFollowing, setMyFollowing] = useState([]); 
  const [showFollowingOnly, setShowFollowingOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/plans");
      setPlans(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load plans.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFollowing = async () => {
      if (user) {
        try {
          const token = JSON.parse(localStorage.getItem("userInfo")).token;
          const { data } = await axios.get("http://localhost:5000/api/users/profile", {
             headers: { Authorization: `Bearer ${token}` }
          });
          setMyFollowing(data.following.map(f => f._id)); 
        } catch (e) {
          console.error("Could not fetch following list");
        }
      }
    };

    fetchFollowing();
    fetchPlans();
  }, [user]);

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  const displayedPlans = showFollowingOnly && user 
    ? plans.filter(plan => 
        plan.trainer && myFollowing.includes(plan.trainer._id)
      ) 
    : plans;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Find Your Perfect <span className="text-blue-600">Fitness Plan</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse plans created by certified trainers.
          </p>
        </div>

        {user && (
            <button 
                onClick={() => setShowFollowingOnly(!showFollowingOnly)}
                className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm border ${
                    showFollowingOnly 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
            >
                {showFollowingOnly ? "Showing: Following" : "Filter: Following Only"}
            </button>
        )}
      </div>

      {displayedPlans.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-500">No plans found.</p>
              {showFollowingOnly && <p className="text-gray-400 mt-2">Try following some trainers first!</p>}
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPlans.map((plan) => (
              <PlanCard key={plan._id} plan={plan} refreshPlans={fetchPlans} />
            ))}
          </div>
      )}
    </div>
  );
};

export default Home;