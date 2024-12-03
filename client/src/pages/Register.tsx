import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username?: string;
  email?: string;
  password?: string;
}

function Register() {
  const [inputs, setInputs] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const displaySelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      document.getElementById("selectedAvatar").setAttribute('src', imageUrl);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post("http://localhost:8000/users/register", inputs)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || err.response?.data?.message || 'An unknown error occurred')
      });
  };


  if (error) {
    return <div>{error && (<h1>This website have {error}</h1>)}</div>;;
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
