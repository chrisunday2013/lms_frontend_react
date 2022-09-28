import {Link} from 'react-router-dom';
import TeacherSideBar from './teacherSideBar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';


function ShowAssignment(){
    const [assignmentData, setAssignmentData]=useState([]);
    const [totalCount, setTotalCount] = useState(0);


    const {student_id}=useParams();
    const {teacher_id}=useParams();

    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id)
            .then((res)=>{
                setAssignmentData(res.data);
                setTotalCount(res.data.length);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

  
    return(
         <div className="container mt-4">
             <div className="row">
                  <aside className="col-md-3">
                      <TeacherSideBar/>
                  </aside>
                  <section className='col-md-9'>
                     <div className='card'>                                                  
                        <h5 className='card-header'>All Assignments ({totalCount})<Link className='btn btn-success btn-sm float-end' to={`/add-assignment/${student_id}/${teacher_id}`}>Add Assignment</Link></h5>
                        <div className="card-body">
                        <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Title</th>
                                           
                                       </tr>
                                  </thead>
                                  <tbody>
                                       {assignmentData.map((chapter, index)=>
                                       <tr>
                                            <td>{chapter.title}</td>
                        
                                       </tr>   
                                       )}
                                  </tbody>
                              </table>
                        </div>
                     </div>  
                  </section>
             </div>
         </div>
    )
}
export default ShowAssignment;