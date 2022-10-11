
import {Link} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api/course/';

function AllCourses(){
    const [courseData, setCourseData]=useState([]);
    const [previousUrl, setPreviousUrl]=useState([]);
    const [nextUrl, setNextUrl]=useState([]);
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl)
            .then((res)=>{
                    setNextUrl(res.data.next)
                    setPreviousUrl(res.data.previous)
                    setCourseData(res.data.results);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    const paginationHandler=(url)=>{
        try{
            axios.get(url)
            .then((res)=>{
                setNextUrl(res.data.next)
                setPreviousUrl(res.data.previous)
                setCourseData(res.data.results);
            })
        }catch(error){
            console.log(error);
        }
    }

    return(
          <div className="container mt-3">
               {/* latest courses*/}
        <h3 className="pb-1 mb-4">New Courses </h3>
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
                    {previousUrl && 
                    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(previousUrl)}><i class="bi bi-arrow-left"></i>Previous</button></li>
                    }
                    {nextUrl && 
                    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(nextUrl)}><i class="bi bi-arrow-right"></i>Next</button></li>
                    }
                </ul>
            </nav>
        {/* pagination ends */}
        </div>
    )
}

export default AllCourses