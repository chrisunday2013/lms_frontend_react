import {Link} from 'react-router-dom';
import TeacherSideBar from './teacherSideBar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
const Swal = require('sweetalert2')


const baseUrl='http://127.0.0.1:8000/api';


function QuizQuestions(){
    const [QuestionData, setQuestionData]=useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const {quiz_id}=useParams();

    // fetch courses when page loads
    useEffect(()=>{

        try{
            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
            .then((res)=>{
                setQuestionData(res.data);
                setTotalCount(res.data.length);
            })
        }catch(error){
            console.log(error);
        }
    },[]);

  
    const handleDelete =(question_id) =>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure you want to delete?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
          }).then((result)=>{
             if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/question/'+question_id)
                    .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
                            .then((res)=>{
                                setQuestionData(res.data);
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
                        <h5 className='card-header'>All Questions ({totalCount})<Link className='btn btn-success btn-sm float-end' to={'/add-quiz-question/'+quiz_id}>Add Question</Link></h5>
                        <div className="card-body">
                        <table className="table table-bordered">
                                  <thead>
                                       <tr>
                                           <th>Question</th>
                                           <th>Action</th>
                                       </tr>
                                  </thead>
                                  <tbody>
                                       {QuestionData.map((row, index)=>
                                       <tr>
                                            <td><Link to={`/edit-question/`+row.id}>{row.questions}</Link></td>
                                           
                                            <td>

                                                 <Link to={`/edit-question/`+row.id} className="btn btn-sm text-white btn-info "><i class="bi bi-pencil-square"></i></Link>
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
export default QuizQuestions;