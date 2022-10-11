import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';

function Home(){
    const [courseData, setCourseData]=useState([]);
    const [popularCourseData, setPopularCourseData]=useState([]);
    const [popularTeacherData, setPopularTeacherData]=useState([]);
    const [studentTestimoniaData, setStudentTestimoniaData]=useState([]);
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/course/?result=4')
            .then((res)=>{
                setCourseData(res.data.results);
            })
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/popular-courses/?popular=1')
            .then((res)=>{
                setPopularCourseData(res.data.results);
            })
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/popular-teachers/?popular=1')
            .then((res)=>{
                setPopularTeacherData(res.data);
            })
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/student-testimonial/')
            .then((res)=>{
                setStudentTestimoniaData(res.data);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    return (
      <div className="container mt-4">
        {/* latest courses*/}
        <h3 className="pb-1 mb-4">New Courses <Link to="/all-courses" className="float-end">See All</Link></h3>
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
        {/* Popular courses*/}
        <h3 className="pb-1 mb-4 mt-5">Popular Courses <Link to="/all-popularCos" className="float-end">See All</Link></h3>
          <div className="row mb-4">
            {popularCourseData && popularCourseData.map((row,index)=>
               <div className="col-md-3">
                    <div className="card">
                        <Link to={`/detail/${row.course.id}`}><img src={row.course.featured_img} className="card-img-top" alt={row.course.title}/></Link>
                        <div className="card-body">
                        <h5 className="card-title"><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></h5>
                         </div>
                         <div className="card-footer">
                            <div className="title">
                                <span>Rating; {row.rating}/5</span>
                                <span className="float-end">Views: {row.course.course_views}</span>
                            </div>

                         </div>

                    </div>
               </div>
             )}
          </div>
        {/*end popular courses*/}
        {/* Featured teachers*/}
        <h3 className="pb-1 mb-4 mt-5">Popular Teachers <Link to="/all-popularTeachers" className="float-end">See All</Link></h3>
          <div className="row mb-4">
            {popularTeacherData && popularTeacherData.map((row, indes)=> 
              <div className="col-md-3">
                    <div className="card">
                        <Link to={`/teacher-detail/${row.id}`}><img src={row.profile_img} className="card-img-top" alt="..."/></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/teacher-detail/${row.id}`}>{row.full_name}</Link></h5>
                            </div>
                            <div>
                                <div>
                                    <span>Total Courses: {row.total_teacher_courses}</span>
                                </div>
                            </div>
                    </div>
              </div>
            )}

          </div>
        {/*end Feature teachers*/}
           {/* Student Testimonial*/}
        <h3 className="pb-1 mb-4 mt-5">Student Testimonial </h3>
        <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
            <div class="carousel-indicators">
                {/* {studentTestimoniaData && studentTestimoniaData.map((row, index)=>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="{index}" className={index === 0 ? "active" : ""}></button>
            
                )} */}
                </div>
            <div className="carousel-inner">
             
            {/* {studentTestimoniaData && studentTestimoniaData.map((row, i)=>
                <div className={i === 0 ? "carousel-item text-center active": "carousel-item text-center"}>
                    <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>{row.reviews}</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                            {row.course.title} <cite title="Source Title">{row.student.full_name}</cite>
                            </figcaption>
                    </figure>
                </div>
             )}  */}
             </div>   
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        {/*end Student testimonial*/}
      </div>
    )
}

export default Home;