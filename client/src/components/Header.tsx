import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="p-3 mb-3 border-bottom">
            <div className="container" >
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="#" className="nav-link px-2 link-secondary">Overview</Link></li>
                        <li><Link to="#" className="nav-link px-2 link-dark">Inventory</Link></li>
                        <li><Link to="#" className="nav-link px-2 link-dark">Customers</Link></li>
                        <li><Link to="#" className="nav-link px-2 link-dark">Products</Link></li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                    </form>

                    <div className="dropdown text-end">
                        <Link to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        </Link>
                        <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                            <li><Link className="dropdown-item" to="#">New project...</Link></li>
                            <li><Link className="dropdown-item" to="#">Settings</Link></li>
                            <li><Link className="dropdown-item" to="#">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" to="#">Sign out</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;