import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const Cause = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
  });

  const [createdCause, setCreatedCause] = useState(null); // store created cause
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/causes", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCreatedCause(res.data); // store cause from backend
      setFormData({ title: "", description: "", targetAmount: "" }); // clear form
    } catch (error) {
      alert("Failed to create cause. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create New Cause
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount"
            value={formData.targetAmount}
            onChange={(e) =>
              setFormData({ ...formData, targetAmount: e.target.value })
            }
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              background: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Create Cause
          </button>
        </form>

        {createdCause && (
          <div
            style={{
              marginTop: "20px",
              background: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{createdCause.title}</h2>
            <p>{createdCause.description}</p>
            <strong>Target Amount: ${createdCause.targetAmount}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cause;
