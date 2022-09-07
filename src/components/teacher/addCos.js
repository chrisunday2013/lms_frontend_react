import TeacherSideBar from "./teacherSideBar";



function AddCourse(){
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                   <TeacherSideBar/>
                </aside>
                <section className="col-md-9">
                   <div className="card">    
                      <h5 className="card-header">Add Course</h5>
                      <div className="card-body">
                           
                              
                                
                            <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Title</label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                            <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10">
                                    <input type="email" class="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                            <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Course Video</label>
                                    <div class="col-sm-10">
                                    <input type="file" class="form-control" id="inputPassword"/>
                                    </div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Description</label>
                                <textarea className="form-control"></textarea>
                            </div>
                          
                           <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Technologies</label>
                                <textarea className="form-control"></textarea>
                            </div>
                                    <hr/>
                                    <button className="btn btn-primary">Submit</button>

                      </div>      
                   </div>      
                </section>
            </div>
        </div>
    )
}

export default AddCourse;