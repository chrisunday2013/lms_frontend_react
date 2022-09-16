import {Link} from 'react-router-dom';
import TeacherSideBar from './teacherSideBar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';


function AllChapters(){
    const [courseChapterData, setCourseChapterData]=useState([]);
    const {course_id}=useParams();
    const [totalCount, setTotalCount] = useState(0);

    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/course-chapters/'+course_id)
            .then((res)=>{
                setCourseChapterData(res.data);
                setTotalCount(res.data.length);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

    const Swal = require('sweetalert2')
    const handleDelete =(chapter_id) =>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure you want to delete?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
          }).then((result)=>{
             if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                    .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/course-chapters/'+course_id)
                            .then((res)=>{
                                setCourseChapterData(res.data);
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
                        <h5 className='card-header'>All Chapters ({totalCount})<Link className='btn btn-success btn-sm float-end' to={'/add-chapter/'+course_id}>Add Chapter</Link></h5>
                        <div className="card-body">
                        <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Title</th>
                                           <th>Video</th>
                                           <th>Remarks</th>
                                           <th>Action</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                       {courseChapterData.map((chapter, index)=>
                                       <tr>
                                            <td><Link to={'/edit-chapter/'+chapter.id}>{chapter.title}</Link></td>
                                            <td>
                                                <video controls width="250">
                                                    <source src={chapter.video} type="video/webm"/>

                                                        <source src={chapter.video} type="video/mp4"/>

                                                </video>

                                            </td>
                                            <td>{chapter.remarks}</td>
                                            <td>

                                                 <Link to={'/edit-chapter/'+chapter.id} className="btn btn-sm text-white btn-info "><i class="bi bi-pencil-square"></i></Link>
                                                 <button onClick={()=>handleDelete(chapter.id)} className="btn btn-sm btn-danger btn-sm-l"><i class="bi bi-trash"></i></button>

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
export default AllChapters;