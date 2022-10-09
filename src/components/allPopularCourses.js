import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';
function AllPopularCourses(){
    const [courseData, setCourseData] = useState([])

    useEffect(()=>{

        try{
            axios.get(baseUrl+'/popular-courses/?all=1')
            // axios.get(baseUrl+'/popular-courses/?popular=1')
            .then((res)=>{
                console.log(res.data)
                setCourseData(res.data);
            })
        }catch(error){
            console.log(error);
        }
    },[]);
    return(
          <div className="container mt-3">
               {/* latest courses*/}
        <h3 className="pb-1 mb-4">Popular Courses </h3>
          <div className="row mb-4">
            {courseData && courseData.map((row, index)=>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to={`/detail/${row.course.id}`}><img src={row.course.featured_img} className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></h5>
                            </div>
                            <div className="card-footer">
                                 <div className="title">
                                       <span>Rating: {row.rating}/5</span>
                                       <span className="float-end">Views: 78945</span>
                                 </div>
                            </div>
                    </div>
              </div>
           
             )}
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

export default AllPopularCourses