import{useContext} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const PlanCard =({plan, refreshPlans}) =>{
  const { user } = useContext(AuthContext);

  const isSubscribed = user && plan.subscribers && plan.subscribers.includes(user._id);
  const isOwner = user && plan.trainer?._id === user._id;

  const handleSubscribe = async () => {
    if (!user) return alert("Please login to subscribe!");
    
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      await axios.post(
        `http://localhost:5000/api/plans/${plan._id}/subscribe`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(`Success! You subscribed to ${plan.title}`);
      if (refreshPlans) refreshPlans(); 
    } catch (error) {
      alert(error.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
             <p className="text-sm text-gray-500 mt-1">by {plan.trainer?.name || 'Unknown'}</p>
          </div>
          <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            ${plan.price}
          </span>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm line-clamp-3">
          {plan.description}
        </p>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Duration:</span> {plan.duration}
        </div>
        <div className="mt-1 text-xs text-gray-400">
           {plan.subscribers?.length || 0} active subscribers
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t">
        {isSubscribed ? (
          <button disabled className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg cursor-default">
            ✅ Subscribed
          </button>
        ) : isOwner ? (
          <button disabled className="w-full py-2 px-4 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-default">
            You Own This Plan
          </button>
        ) : (
          <button 
            onClick={handleSubscribe}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Subscribe Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanCard;