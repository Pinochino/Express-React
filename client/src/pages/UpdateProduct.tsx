import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const [values, setValues] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const displaySelectedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      document.getElementById("selectedAvatar").src = imageUrl;
    }
  };

  
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(values);
    axios
      .put(`http://localhost:8000/product/update/${id}`, values)
      .then((res) => {
        console.log(res);
        setValues(res);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  if (loading) {
    return <h3>This website have been loading</h3>;
  }

  if (error) {
    return <h3>This website have {error}</h3>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2 className="text-center">Update Product</h2>
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
            <div data-mdb-ripple-init class="btn btn-primary btn-rounded">
              <label
                className="form-label text-white m-1"
                htmlFor="customFile2"
              >
                Choose file
              </label>
              <input
                type="file"
                className="form-control d-none"
                id="customFile2"
                onChange={(e) => {
                  setValues({ ...values, image: e.target.value });
                  displaySelectedImage(e);
                }}
                value={values.image}
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="name">Name of product</label>
            <input
              type="text"
              placeholder="Enter name..."
              className="form-control"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              value={values.name}
            ></input>
          </div>
          <div className="mb-2">
            <label htmlFor="description">Description of product</label>
            <textarea
              placeholder="Enter description..."
              className="form-control"
              rows="3"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              value={values.description}
            ></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="price">Price of product</label>
            <input
              type="number"
              placeholder="Enter price..."
              className="form-control"
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              value={values.price}
            ></input>
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
