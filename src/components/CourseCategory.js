import {Link} from 'react-router-dom';

function CourseCategory(){
    return(
          <div className="container mt-3">
               {/* latest courses*/}
        <h3 className="pb-1 mb-4">Web development courses</h3>
          <div className="row mb-4">
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img src="/py.jpg" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/py.jpg" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><a href="#">Course title</a></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/py.jpg" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><a href="#">Course title</a></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/py.jpg" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><a href="#">Course title</a></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img src="/py.jpg" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img src="/py.jpg" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img src="/py.jpg" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/detail/1"><img src="/py.jpg" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                    </div>
              </div>

          </div>
        {/*end latest courses*/}
        {/* pagination start */}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        {/* pagination ends */}
        </div>
    )
}

export default CourseCategory;