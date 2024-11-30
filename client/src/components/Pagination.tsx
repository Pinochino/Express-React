import {Link} from 'react-router-dom';

function Pagination() {
    return (
  <nav aria-label="Page navigation example" className='d-flex justify-content-center mt-3 mb-3'>
  <ul className="pagination">
    <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
  </ul>
</nav>
     );
}

export default Pagination;