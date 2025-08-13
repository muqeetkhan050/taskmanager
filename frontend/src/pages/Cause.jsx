import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Cause=()=>{
    const [formData,setFormData]=useState({
        title:'',
        description:'',
        targetAmount:''
    })
    
    const { user } = useAuth(); // Access user token from context
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/causes', formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            alert('Cause created successfully!');
            navigate('/causes'); // Redirect to causes list after creation
        } catch (error) {
            alert('Failed to create cause. Please try again.');
        }
    };

    return(
        <><h1>Create New Causue</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
            <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e)=>setFormData({ ...formData, title: e.target.value }) }
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount"
          value={formData.targetAmount}
          onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
          required
        />

        <button type="submit">Create Cause</button>

        </form>
        </>
    )
}

export default Cause;