import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
const [values, setValues] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
});
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:8000/product/create", values)
    .then((res) => {
      console.log(res);
      setValues(res.data)
      navigate("/");
    })
    .catch((err) => console.log(err));
};

const displaySelectedImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    document.getElementById('selectedAvatar').src = imageUrl;
  }
}

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form method="post" onSubmit={handleSubmit}>
          <h2 className="text-center">Create Product</h2>
          <div className="mb-4 d-flex justify-content-center">
            <img id="selectedAvatar" src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
              className="rounded-circle" style={{width: '200px', height: '200px',  objectFit: 'cover'}} alt="example placeholder" />
          </div>
          <div className="d-flex justify-content-center">
            <div data-mdb-ripple-init class="btn btn-primary btn-rounded">
              <label className="form-label text-white m-1" htmlFor="customFile2">Choose file</label>
              <input type="file" className="form-control d-none" id="customFile2" 
              onChange={(e) => {
                 setValues({ ...values, image: e.target.value });
                 displaySelectedImage(e);
              }}
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
        ></input>
      </div>
      <div className="mb-2">
        <label htmlFor="description">Description of product</label>
        <textarea
          placeholder="Enter description..."
          className="form-control"
          rows='3'
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="price">Price of product</label>
        <input
          type="number"
          placeholder="Enter price..."
          className="form-control"
          onChange={(e) =>
            setValues({ ...values, price: e.target.value })
          }
        ></input>
      </div>
      <button className="btn btn-success">Submit</button>
    </form>
      </div >
    </div >
  );

}

export default CreateProduct;