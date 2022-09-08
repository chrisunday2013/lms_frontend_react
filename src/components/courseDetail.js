import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';



function CourseDetail(){
    let {course_id}=useParams();
    return (
        <div className="container mt-3">
             <div className="row">
                    <div className="col-4">
                        <img src="/logo192.png" className="img-thumbnail" alt="Course Image"/>
                    </div>
                    <div className="col-8">
                         <h3>Course Title</h3>
                         <p>Cards include a few options for working with images. Choose from appending 
                            “image caps” at either end of a card,
                             overlaying images with card content, or simply embedding the image in a card.</p>
                             <p className="fw-bold">Course By: <Link to="/teacher-detail/1">Teacher 1</Link></p>
                             <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                             <p className="fw-bold">Total Enrolled: 20 Students</p>
                             <p className="fw-bold">Rating: 4.5/5</p>
                    </div>
             </div>
            
                <div className="card mt-4">
                    <h5 className="card-header">
                        Course Videos
                    </h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Introduction 
                            <span className="float-end">
                                <span className="me-5">1 Hour 30 Minutes</span>
                                 <button className="btn btn-sm btn-danger float-end"><i className="bi-youtube"></i></button>
                            </span>
                        </li>
                        <li className="list-group-item">Introduction 
                            <span className="float-end">
                                 <span className="me-5">1 Hour 30 Minutes</span>
                                 <button className="btn btn-sm btn-danger float-end"><i className="bi-youtube"></i></button>
                            </span>
                        </li>
                        <li className="list-group-item">Introduction 
                            <span className="float-end">
                                 <span className="me-5">1 Hour 30 Minutes</span>
                                 <button className="btn btn-sm btn-danger float-end"><i className="bi-youtube"></i></button>
                            </span>
                        </li>
                        <li className="list-group-item">Introduction 
                            <span className="float-end">
                                 <span className="me-5">1 Hour 30 Minutes</span>
                                 <button className="btn btn-sm btn-danger float-end"><i className="bi-youtube"></i></button>
                            </span>
                        </li>
                        <li className="list-group-item">Introduction 
                            <span className="float-end">
                                 <span className="me-5">1 Hour 30 Minutes</span>
                                 <button className="btn btn-sm btn-danger float-end"><i className="bi-youtube"></i></button>
                            </span>
                        </li>
                        <li className="list-group-item">Introduction 
                            <span className="float-end">
                                 <span className="me-5">1 Hour 30 Minutes</span>
                                 <button className="btn btn-sm btn-danger float-end" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi-youtube"></i></button>
                            </span>
                            {/* video modal start*/}

                                <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="ratio ratio-16x9">
                                            <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                                            </div>
                                        </div>
                                   
                                    </div>
                                </div>
                                </div>
                                         
                            {/* end video modal*/}
                             
                        </li>
                        
                    </ul>
              </div>

              <h3 className="pb-1 mb-4 mt-5">Related Courses <a href="#" className="float-end">See All</a></h3>
              <div className="row mb-4">
                    <div className="col-md-3">
                    <div className="card">
                        <Link to="/detail/1"><img src="/logo192.png" className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                            </div>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="card">
                        <a href="#"><img src="/logo192.png" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><a href="#">Course title</a></h5>
                            </div>
                    </div>
              </div>
           </div>
        </div>
    )
}

export default CourseDetail;