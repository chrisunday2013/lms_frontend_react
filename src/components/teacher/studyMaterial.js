import {Link} from 'react-router-dom';
import TeacherSideBar from './teacherSideBar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';


function StudyMaterial(){
    const [studyData, setStudyData]=useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const {course_id}=useParams()

    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/study-materials/'+course_id)
            .then((res)=>{
                setStudyData(res.data);
                setTotalCount(res.data.length);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    const Swal = require('sweetalert2')
    const handleDelete =(study_id) =>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure you want to delete?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
          }).then((result)=>{
             if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/study-materials/'+study_id)
                    .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/study-materials/'+course_id)
                            .then((res)=>{
                                setStudyData(res.data);
                                setTotalCount(res.data.length);
                            })
                        }catch(error){
                            console.log(error);
                        }
                     
                    })
                  
                }catch(error){
                    Swal.fire('error', 'Data has not been deleted!!');
                }
             }else{
                Swal.fire('error', 'Data has not been deleted!!');
             }
          });
    }

    return(
         <div className="container mt-4">
             <div className="row">
                  <aside className="col-md-3">
                      <TeacherSideBar/>
                  </aside>
                  <section className='col-md-9'>
                     <div className='card'>
                        <h5 className='card-header'>All Study Materials ({totalCount})<Link className='btn btn-success btn-sm float-end' to={`/add-study/`+course_id}>Add Study Material</Link></h5>
                        <div className="card-body">
                        <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Title</th>
                                           <th>Upload</th>
                                           <th>Remarks</th>
                                           <th>Action</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                       {studyData.map((row, index)=>
                                       <tr>
                                            <td>{row.title}</td>
                                            <td>
                                                 <Link to={`/{row.upload}`}>file</Link>
                                            </td>
                                            <td>{row.remarks}</td>
                                            <td>
                                                 <button onClick={()=>handleDelete(row.id)} className="btn btn-sm btn-danger btn-sm-l"><i class="bi bi-trash"></i></button>

                                             </td>
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
export default StudyMaterial;