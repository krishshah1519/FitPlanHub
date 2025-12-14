import{useEffect, useState, useContext } from "react";
import{useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import PlanCard from "../components/PlanCard";

const TrainerProfile = () =>{
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [trainerPlans, setTrainerPlans] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchTrainerData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/plans");
      const filtered = data.filter(p => p.trainer._id === id || p.trainer === id);
      setTrainerPlans(filtered);

      if (user) {
        const token = JSON.parse(localStorage.getItem("userInfo")).token;
        const profileRes = await axios.get("http://localhost:5000/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const myFollowing = profileRes.data.following || [];
        setIsFollowing(myFollowing.some(f => f._id === id || f === id));
      }
    };
    fetchTrainerData();
  }, [id, user]);

  const toggleFollow = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const endpoint = isFollowing ? "unfollow" : "follow";
      
      await axios.put(`http://localhost:5000/api/users/${id}/${endpoint}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsFollowing(!isFollowing);
      alert(isFollowing ? "Unfollowed!" : "Followed!");
    } catch (error) {
      alert("Action failed. Are you logged in?");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">Trainer Profile</h1>
            <p className="text-gray-600">ID: {id}</p>
        </div>
        {user && user._id !== id && (
            <button 
                onClick={toggleFollow}
                className={`px-6 py-2 rounded-lg font-bold text-white ${isFollowing ? 'bg-red-500' : 'bg-blue-600'}`}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </button>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">Trainer's Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainerPlans.map(plan => <PlanCard key={plan._id} plan={plan} />)}
      </div>
    </div>
  );
};

export default TrainerProfile;