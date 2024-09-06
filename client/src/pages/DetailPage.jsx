import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../helpers/http-client";
import Navbar from "../components/Navbar";
// import detail from "./styles/detail.css";

// import axios from "axios";

function Detail() {
  const [monster, setMonster] = useState({});
  const { id } = useParams();
  // const [id, setId] = useState("");

  const fetchMonsterById = async (id) => {
    try {
      const response = await baseURL.get(`/monster/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data, "<<< fetchMonsterById");
      setMonster(response.data.data);
    } catch (err) {
      console.log(err, "<<< err fetchMonsterById");
    }
  };

  useEffect(() => {
    if (id) {
      fetchMonsterById(id);
    }
  }, [id]);

  // console.log(cuisine);

  if (!monster) {
    return null;
  }

  return (
    <div className="app">
      <Navbar />
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-4">
            <div
              style={{
                width: "300px",
                height: "200px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={monster.imgUrl}
                alt={monster.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex flex-column h-100">
              <h5 className="mb-2 text-start">Name: {monster.name}</h5>
              <h5 className="mb-2">Type: {monster.type}</h5>
              <h5 className="mb-2">Species: {monster.species}</h5>
              <p className="text-muted mb-2">{monster.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
