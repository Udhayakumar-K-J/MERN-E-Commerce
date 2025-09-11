import React, { useState } from "react";

function VisualSearch() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("http://localhost:5001/visual-search", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.message || "Prediction: " + data.prediction);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Visual Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "200px", marginTop: "20px" }}
            />
          </div>
        )}
        <button type="submit" style={{ marginTop: "20px" }}>
          Search Product
        </button>
      </form>
      <h2 style={{ marginTop: "20px" }}>{result}</h2>
    </div>
  );
}

export default VisualSearch;
