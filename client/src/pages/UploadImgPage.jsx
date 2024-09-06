import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { baseURL } from "../helpers/http-client";
// import axios from "axios";

function UpdateImageUrl() {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateImageUrl = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await baseURL.patch(`/monster/${id}/imgUrl`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error(err, "<<< handleUpdateImageUrl");
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container mt-4">
        <form onSubmit={handleUpdateImageUrl}>
          <div className="form-group">
            <label htmlFor="input-image">Select Image</label>
            <input
              type="file"
              id="input-image"
              name="image"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Image
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateImageUrl;
