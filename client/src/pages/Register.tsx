import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const displaySelectedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      document.getElementById("selectedAvatar").src = imageUrl;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post("http://localhost:8000/customer/create", inputs)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message)
      });
  };


  if (error) {
    return <h1>This website have {error.message}</h1>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form method="post" onSubmit={handleSubmit}>
          <h2 className="text-center">Register</h2>
          <div className="mb-4 d-flex justify-content-center">
            <img
              id="selectedAvatar"
              src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
              className="rounded-circle"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              alt="example placeholder"
            />
          </div>
          <div className="d-flex justify-content-center">
            <div data-mdb-ripple-init className="btn btn-primary btn-rounded">
              <label
                className="form-label text-white m-1"
                htmlFor="customFile2"
              >
                Choose file
              </label>
              <input
                 name="avatar"
                type="file"
                className="form-control d-none"
                id="customFile2"
                onChange={(e) => {
                  displaySelectedImage(e);
                  handleChange(e);
                }}
                autoComplete="photo"
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              name="username"
              type="text"
              placeholder="Enter name..."
              className="form-control"
              value={inputs.username || ""}
              onChange={handleChange}
              autoComplete="additional-name"
            ></input>
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email..."
              className="form-control"
              value={inputs.email || ""}
              onChange={handleChange}
              autoComplete="email"
            ></input>
          </div>
          <div className="mb-2">
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password..."
              className="form-control"
              value={inputs.password || ""}
              onChange={handleChange}
              autoComplete="new-password"
            ></input>
          </div>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
