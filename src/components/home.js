import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";


const baseUrl='http://127.0.0.1:8000/api';

function Home(){
    const [courseData, setCourseData]=useState([]);
    const [popularCourseData, setPopularCourseData]=useState([]);
        
    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/course/?result=4')
            .then((res)=>{
                setCourseData(res.data);
            })
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/popular-courses/?popular=1')
            .then((res)=>{
                setPopularCourseData(res.data);
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
              <div className="col-md-3">
                    <div className="card">
                        <a href="#"><img src="logo192.png" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3">
                    <div className="card">
                        <a href="#"><img src="logo192.png" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3">
                    <div className="card">
                        <a href="#"><img src="logo192.png" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                            </div>
                    </div>
              </div>
              <div className="col-md-3">
                    <div className="card">
                        <a href="#"><img src="logo192.png" className="card-img-top" alt="..."/></a>
                            <div className="card-body">
                                <h5 className="card-title"><Link to="/teacher-detail/1">Teacher Name</Link></h5>
                            </div>
                    </div>
              </div>

          </div>
        {/*end Feature teachers*/}
           {/* Student Testimonial*/}
        <h3 className="pb-1 mb-4 mt-5">Student Testimonial <a href="#" className="float-end">See All</a></h3>
        <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                    </figure>
                </div>
                <div className="carousel-item">
                        <figure className="text-center">
                                    <blockquote className="blockquote">
                                        <p>A well-known quote, contained in a blockquote element.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                    </figcaption>
                        </figure>
                </div>
                <div className="carousel-item">
                    <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                    </figure>
                </div>
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