import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function HomePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || error.response?.data?.message || 'An unknown error occurred');
      });
  }, []);



  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:8000/product/delete/` + id)
      .then(res => {
        setData(prevData => prevData.filter(item => item.PRODUCT_ID !== id))
      })
      .catch(error => {
        setLoading(false)
        setError(error.message || error.response?.data?.message || 'An unknown error occurred')
      })
  }

  if (loading) {
    return <h1>This website have been loading</h1>;
  }

  if (error) {
    return <div>{error && (<h1>This website have {error}</h1>)}</div>;
  }

  return (
    <div>
      <h2 className="text-center">Product Table</h2>
      <div className="d-flex justify-content-end">
        <Link to="/create" className="btn btn-success">Create </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="me-3">ID</th>
            <th scope="col" className="me-3">Name</th>
            <th scope="col" className="me-3">Description</th>
            <th scope="col" className="me-3">Price</th>
            <th scope="col" className="me-3" colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
              <th scope="row" className="me-3 ms-3">{product.PRODUCT_ID}</th>
              <td className="ms-3 me-3">{product.PRODUCT_NAME}</td>
              <td className="ms-3 me-3">{product.PRODUCT_DESCRIPTION}</td>
              <td className="ms-3 me-3">{product.PRICE}</td>
              <td colSpan={3} className="d-flex justify-content-between align-content-center">
                <Link to={`/read/${product.PRODUCT_ID}`} className="btn btn-outline-primary ms-2 me-2">Read</Link>
                <Link to={`/update/${product.PRODUCT_ID}`} className="btn btn-outline-info ms-2 me-2">Update</Link>
                <button onClick={() => handleDelete(product.PRODUCT_ID)} className="btn btn-outline-warning">Delete</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
