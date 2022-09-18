
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';


function TeacherDetail(){
    const [teacherData, setTeacherData] = useState([])
        const [courseData, setCourseData] = useState([])

    
        const {id}=useParams();
        // fetch courses when page loads
        useEffect(()=>{
  
          try{
              axios.get(baseUrl+'/teacher/'+id)
              .then((res)=>{
                console.log(res);
                setTeacherData(res.data);
                setCourseData(res.data.teacher_courses);
              })
          }catch(error){
              console.log(error);
          }
      },[]);

        return (
            <div className="container mt-3">
                 <div className="row">
                        <div className="col-4">
                            <img src="/logo192.png" className="img-thumbnail" alt="Teacher Image"/>
                        </div>
                        <div className="col-8">
                             <h3>{teacherData.full_name}</h3>
                             <p>{teacherData.detail}</p>
                                 <p className="fw-bold">Skills: <Link to="/category/django">Django</Link>, <Link to="/category/django">React</Link>, <Link to="/category/php">Php</Link></p>
                                 <p className="fw-bold">Recent Course: <Link to="/category/django">Vue.js Course</Link></p>
                                 <p className="fw-bold">Rating: 4.5/5</p>
                        </div>
                 </div>
                
                    <div className="card mt-4">
                        <h5 className="card-header">
                            Course List
                        </h5>
                         <div className="list-group list-group-flush">
                            {courseData.map((course, index)=> 
                                <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action">{course.title}</Link>
                               
                            )}
                         </div>
                  </div>
    
            </div>
    )
}

export default TeacherDetail;