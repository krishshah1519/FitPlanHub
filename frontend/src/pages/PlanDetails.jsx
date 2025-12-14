import {useEffect, useState, useContext } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const PlanDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
        const { data } = await axios.get("http://localhost:5000/api/plans");
        const found = data.find(p => p._id === id);
        setPlan(found);
    };
    fetchPlan();
  }, [id]);

  if (!plan) return <div>Loading...</div>;

  const isSubscribed = user && plan.subscribers.includes(user._id);
  const isOwner = user && plan.trainer._id === user._id;
  const canView = isSubscribed || isOwner;

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
            <p className="text-gray-500 mb-6">By {plan.trainer.name}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-blue-800">Plan Overview</h3>
                <p>Duration: {plan.duration}</p>
                <p>Price: ${plan.price}</p>
            </div>


            <div className="border-t pt-6">
                <h2 className="text-2xl font-bold mb-4">Workout Details</h2>
                {canView ? (
                    <div className="prose lg:prose-xl">
                        <p className="text-gray-800 whitespace-pre-line">{plan.description}</p>
                        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                            ✨ Full Access Unlocked: view all videos and daily steps here.
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-100 rounded-lg">
                        <p className="text-xl text-gray-500 mb-4">🔒 Content Locked</p>
                        <p className="mb-4">Subscribe to this plan to view the full workout schedule.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;