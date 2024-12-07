import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function HomePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/list")
      .then((res) => {
        const products = Array.isArray(res.data) ? res.data : res.data?.users || [];
        // const products = res.data?.products
        console.log(res.data);
        setData(products);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || error.response?.data?.message || 'An unknown error occurred');
      });
  }, []);



  const handleDelete = (id: string) => {
    axios.delete(`/user/delete/` + id)
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
      <h2 className="text-center">user Table</h2>
      <div className="d-flex justify-content-end">
        <Link to="/create" className="btn btn-success">Create </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="me-3">ID</th>
            <th scope="col" className="me-3">Username</th>
            <th scope="col" className="me-3">Email</th>
            <th scope="col" className="me-3">Avatar Url</th>
            <th scope="col" className="me-3">Role</th>
            <th scope="col" className="me-3" colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <th scope="row" className="me-3 ms-3">{user.id}</th>
              <td className="ms-3 me-3">{user.username}</td>
              <td className="ms-3 me-3">{user.email}</td>
              <td className="ms-3 me-3">{user.password}</td>
              <td className="ms-3 me-3">{user.avatarUrl}</td>
              <td className="ms-3 me-3">{user.role}</td>
              <td colSpan={3} className="d-flex justify-content-between align-content-center">
                <Link to={`/read/${user.id}`} className="btn btn-outline-primary ms-2 me-2">Read</Link>
                <Link to={`/update/${user.id}`} className="btn btn-outline-info ms-2 me-2">Update</Link>
                <button onClick={() => handleDelete(user.id)} className="btn btn-outline-warning">Delete</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
