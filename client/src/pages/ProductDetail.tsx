import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetail() {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const API = `http://localhost:8000/product/read/${id}`;
    axios.get(API)
      .then(res => {
        console.log(res)
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || err.response?.data?.message || 'An unknown error occurred')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (<h1>This website have been loading</h1>)
  }

  if (error) {
    return <div>{error && (<h1>This website have {error}</h1>)}</div>;
  }

  return (
    <div>
      {product ? (<section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div
                  className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={product.PRODUCT_IMAGE}
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                    className="img-fluid"
                    alt="Laptop"
                  />
                  <Link to="#!">
                    <div className="mask"></div>
                  </Link>
                </div>
                <div className="card-body pb-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p>
                        <Link to="#!" className="text-dark">
                          {product.PRODUCT_NAME}
                        </Link>
                      </p>
                      <p className="small text-muted">{product.PRODUCT_DESCRIPTION}</p>
                    </div>
                    <div>
                      <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <p className="small text-muted">Rated 4.0/5</p>
                    </div>
                  </div>
                </div>
                <hr className="my-0" />
                <div className="card-body pb-0">
                  <div className="d-flex justify-content-between">
                    <p>
                      <Link to="#!" className="text-dark">
                        {product.PRICE} $
                      </Link>
                    </p>
                    <p className="text-dark">#### 8787</p>
                  </div>
                  <p className="small text-muted">VISA Platinum</p>
                </div>
                <hr className="my-0" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                    <Link to="#!" className="text-dark fw-bold">
                      Cancel
                    </Link>
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>) : (<h3>Not found product</h3>)}
    </div>
  );
}

export default ProductDetail;
