
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';

function Search(){

    const [courseData, setCourseData]=useState([]);
       
    const {search_id} = useParams()
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/search-courses/'+search_id)
            .then((res)=>{
                setCourseData(res.data);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    return(
          <div className="container mt-3">
               {/* latest courses*/}
        <h3 className="pb-1 mb-4">Searched for <span className='text-primary'>{search_id}</span> </h3>
          <div className="row mb-4">
            {courseData && courseData.map((course, index)=>
              <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to={`/detail/${course.id}`}><img src={course.featured_img} className="card-img-top" alt={course.title}/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
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

export default Search;