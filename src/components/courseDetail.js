import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from 'react';

const siteUrl='http://127.0.0.1:8000/';
const baseUrl='http://127.0.0.1:8000/api';


function CourseDetail(){
    const [courseData, setCourseData]=useState([]);
    const [chapterData, setChapterData]=useState([]);
    const [teacherData, setTeacherData]=useState([]);
    const [relatedCosData, setRelatedCosData]=useState([]);

    const {course_id}=useParams();

      // fetch courses when page loads
      useEffect(()=>{

        try{
            axios.get(baseUrl+'/course/'+course_id)
            .then((res)=>{
                setCourseData(res.data);
                setTeacherData(res.data.teacher);
                setChapterData(res.data.course_chapters);
                setRelatedCosData(JSON.parse(res.data.related_videos));
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    console.log(relatedCosData);

    return (
        <div className="container mt-3">
             <div className="row">
                    <div className="col-4">
                        <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title}/>
                    </div>
                    <div className="col-8">
                         <h3>{courseData.title}</h3>
                         <p>{courseData.description}</p>
                             <p className="fw-bold">Course By: <Link to="/teacher-detail/1">{teacherData.full_name}</Link></p>
                             <p className="fw-bold">Technology: {courseData.technology}</p>
                             <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                             <p className="fw-bold">Total Enrolled: 20 Students</p>
                             <p className="fw-bold">Rating: 4.5/5</p>
                    </div>
             </div>
            
                <div className="card mt-4">
                    <h5 className="card-header">
                        Course Content
                    </h5>
                    <ul className="list-group list-group-flush">
                       {chapterData.map((chapter,index)=>
                        <li className="list-group-item">{chapter.title}
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
                                        <div className="ratio ratio-16x9">
                                            <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                                            </div>
                                        </div>
                                   
                                    </div>
                                </div>
                                </div>
                                         
                            {/* end video modal*/}
                             
                        </li>
                        )}
                    </ul>
              </div>

              <h3 className="pb-1 mb-4 mt-5">Related Courses <a href="#" className="float-end">See All</a></h3>
              <div className="row mb-4">
                    {relatedCosData.map((related,index)=>
                        <div className="col-md-3">
                            <div className="card">
                                <Link target="__blank" to={`/detail/${related.pk}`}><img src={`${siteUrl}media/${related.fields.featured_img}`} className="card-img-top" alt={related.fields.title}/></Link>
                                    <div className="card-body">
                                        <h5 className="card-title"><Link to={`/detail/${related.pk}`}>{related.fields.title}</Link></h5>
                                    </div>
                            </div>
                        </div>
                    )}
           </div>
        </div>
    )
}

export default CourseDetail;