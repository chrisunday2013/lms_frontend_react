
function Register(){

    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">User Register</h5>
                    <div className="card-body">
                       {/* <form> */}
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input name="email" type="email" className="form-control" />
                                
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Full name</label>
                                <input name="full_name" type="text" className="form-control" />
                                
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input name="password" type="password" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Interests</label>
                                <textarea name="interest" className="form-control"></textarea>
                                <div id="emailHelp" class="form-text">Php, Python, JavaScripts, etc</div>
                            </div>
                        
                            <button type="submit" className="btn btn-primary">Register</button>
                        {/* </form> */}
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default Register