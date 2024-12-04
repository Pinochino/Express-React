import { useEffect, useState } from "react";
import React from "react";

import { Link } from 'react-router-dom';
import ProductInterface from "@/interface/ProductInterface";
import axios from "@/utils/axios.customize";

function HomePage() {
  const [data, setData] = useState<ProductInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/products/list")
      .then((res) => {
        const products = Array.isArray(res.data) ? res.data : res.data.products || [];
        setData(products);
        console.log(res.data);
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
        setData(prevData => prevData.filter(item => item.id !== id))
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
              <th scope="row" className="me-3 ms-3">{product.id}</th>
              <td className="ms-3 me-3">{product.name}</td>
              <td className="ms-3 me-3">{product.inventory}</td>
              <td className="ms-3 me-3">{product.description}</td>
              <td colSpan={3} className="d-flex justify-content-between align-content-center">
                <Link to={`/read/${product.id}`} className="btn btn-outline-primary ms-2 me-2">Read</Link>
                <Link to={`/update/${product.id}`} className="btn btn-outline-info ms-2 me-2">Update</Link>
                <button onClick={() => handleDelete(product.id)} className="btn btn-outline-warning">Delete</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
