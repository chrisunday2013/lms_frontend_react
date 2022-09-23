import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';


const siteUrl='http://127.0.0.1:8000/';
const baseUrl='http://127.0.0.1:8000/api';


function CourseDetail(){
    const [courseData, setCourseData]=useState([]);
    const [chapterData, setChapterData]=useState([]);
    const [teacherData, setTeacherData]=useState([]);
    const [relatedCosData, setRelatedCosData]=useState([]);
    const [techListData, setTechListData]=useState([]);
    const [userLoginStatus, setUserLoginStatus]=useState();
    const [enrolledStatus, setEnrolledStatus]=useState();
    const [ratingStatus, setRatingStatus]=useState();
    const [avgRating, setAvgRating]=useState(0);


    const studentId=localStorage.getItem('studentId');
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
                setTechListData(res.data.tech_list);
                if(res.data.course_rating!= '' && res.data.course_rating!=null)
                setAvgRating(res.data.course_rating)
            })
        }catch(error){
            console.log(error);
        }


        // Fetch enroll status
        try{
            axios.get(baseUrl+'/fetchEnroll-status/'+studentId+'/'+course_id)
            .then((res)=>{
               console.log(res);
               if(res.data.bool===true){
                   setEnrolledStatus('success')
                }
            })
        }catch(error){
            console.log(error);
        }
        
        // Fetch rating status
        try{
            axios.get(baseUrl+'/fetch-rating-status/'+studentId+'/'+course_id)
            .then((res)=>{
               if(res.data.bool===true){
                setRatingStatus('success')
                }
            })
        }catch(error){
            console.log(error);
        }

        const studentLoginStatus=localStorage.getItem('studentLoginStatus')
        if(studentLoginStatus==='true'){
              setUserLoginStatus('success')
        }
    },[]);

    console.log(relatedCosData);

    // Enroll for this course
    const enrollCourse=()=>{
        
        const _FormData=new FormData();
    
        _FormData.append("course", course_id);
        _FormData.append("student",studentId);
       
        try{
            axios.post(baseUrl+'/studentCourse-enrolled/', _FormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                console.log(response.data);
                if(response.status===200||response.status===201){
                    Swal.fire({
                        title: 'Yoy have successfully enrolled in this course',
                        icon: 'success',
                        toast:true,
                        timer:1000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton: false
                    });
                    setEnrolledStatus('success')
                }
            });
        }catch(error){
            console.log(error);
        }

    }

    //Add Rating

    const [ratingData, setRatingData]=useState({
        rating:'',
        reviews:''
    });

  // change value of element
  const handleChange=(event)=>{
    setRatingData({
        ...ratingData,
        [event.target.name]:event.target.value
    });
}

// Submit Form
const submitForm=()=>{
    const _FormData=new FormData();
   
    _FormData.append("course",course_id);
    _FormData.append("student", studentId);
    _FormData.append("rating", ratingData.rating);
    _FormData.append("reviews", ratingData.reviews);

    try{
        axios.post(baseUrl+'/course-rating/'+course_id, _FormData,)
        .then((response)=>{
            // console.log(response.data);
            if(response.status==200||response.status==201){
                  Swal.fire({
                    title:'Rating has been saved',
                    icon: 'success',
                    toast:true,
                    timer:5000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: false
                  })
               window.location.reload();   
            }
        })
    }catch(error){
        console.log(error);
    }

};

 return (
        <div className="container mt-3">
             <div className="row">
                    <div className="col-4">
                        <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title}/>
                    </div>
                    <div className="col-8">
                         <h3>{courseData.title}</h3>
                         <p>{courseData.description}</p>
                             <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                             <p className="fw-bold">Technology:&nbsp;
                                {techListData.map((tech, index)=>
                                <>
                                    <Link to={`/category/${tech.trim()}`} className='badge badge-pill text-dark bg-warning'>{tech}</Link>&nbsp;
                                </>
                                )}
                             </p>
                             <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                             <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Student(s)</p>
                             <p className="fw-bold">
                                Rating:{avgRating}/5
                             {enrolledStatus  === 'success' &&  userLoginStatus === 'success' && 
                              <>  
                              {ratingStatus!='success' &&    
                                  <button className="btn btn-success btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                              }      

                              {ratingStatus =='success' &&    
                                 <small className="badge badge-pill text-dark bg-info ms-2">You already rated this course</small>
                              }                      
                                    <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Rate {courseData.title} course</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                    <form>
                                                        <div className="mb-3">
                                                            <label for="exampleInputEmail1" className="form-label">Rating</label>
                                                             <select onChange={handleChange} className="form-control" name="rating">
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                             </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="exampleInputPassword1" className="form-label">Reviews</label>
                                                            <textarea onChange={handleChange} className="form-control" name="reviews" rows="10"></textarea>
                                                        </div>
                                                        
                                                        <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>
                                                    </form>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </> 
                             }
                                </p>
                             {enrolledStatus  === 'success' &&  userLoginStatus === 'success' &&
                              <p><span>You are already enrolled in this course</span></p>
                             }
                              { userLoginStatus === 'success' && enrolledStatus !=='success' &&
                              <p><button onClick={enrollCourse} type="button" className="btn btn-success">Enroll for this course</button></p>
                               
                             }
                             { userLoginStatus !== 'success' &&
                                <p><Link to="/user-login">Login to enrol for this course</Link></p>
                             }
                     </div>
               </div>
                
               {enrolledStatus  === 'success' &&  userLoginStatus === 'success' &&
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

                }

              <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
              <div className="row">
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