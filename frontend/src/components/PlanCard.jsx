import{useContext} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const PlanCard= ({plan, refreshPlans }) => {
  const {user}= useContext(AuthContext);
  const isOwner = user && plan.trainer?._id === user._id;
  
  const isSubscribed = user && plan.subscribers?.some(
    (subId) => subId.toString() === user._id
  );

  const onSubscribe = async () => {
    if (!user) return alert("Please login first.");
    
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      
      await axios.post(
        `http://localhost:5000/api/plans/${plan._id}/subscribe`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(`Joined ${plan.title}!`);
      if (refreshPlans) refreshPlans(); 
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      alert(msg);
    }
  };

  const renderButton = () => {
    if (isSubscribed) {
        return (
            <button disabled className="w-full py-2 px-4 bg-green-900 text-white font-semibold rounded-lg cursor-default opacity-80">
                Subscribed
            </button>
        );
    }
    if (isOwner) {
        return (
            <button disabled className="w-full py-2 px-4 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-default">
                Owner View
            </button>
        );
    }
    return (
        <button 
            onClick={onSubscribe}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
            Subscribe Now
        </button>
    );
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
             <p className="text-sm text-gray-500 mt-1">by {plan.trainer?.name || 'Unknown'}</p>
          </div>
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
            ${plan.price}
          </span>
        </div>
        <p className="mt-4 text-gray-600 text-sm line-clamp-3">{plan.description}</p>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Duration:</span> {plan.duration}
        </div>
        <div className="mt-1 text-xs text-gray-400">
           {plan.subscribers?.length || 0} active users
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t">
        {renderButton()}
      </div>
    </div>
  );
};

export default PlanCard;