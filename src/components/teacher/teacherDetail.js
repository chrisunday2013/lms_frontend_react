
import {Link} from 'react-router-dom';

function TeacherDetail(){

        return (
            <div className="container mt-3">
                 <div className="row">
                        <div className="col-4">
                            <img src="/logo192.png" className="img-thumbnail" alt="Teacher Image"/>
                        </div>
                        <div className="col-8">
                             <h3>Uche Sunday</h3>
                             <p>Cards include a few options for working with images. Choose from appending 
                                “image caps” at either end of a card,
                                 overlaying images with card content, or simply embedding the image in a card.</p>
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
                            <Link to="/detail/1" className="list-group-item list-group-item-action">Django course 1</Link>
                            <Link to="/detail/1" className="list-group-item list-group-item-action">Django course 2</Link>
                            <Link to="/detail/1" className="list-group-item list-group-item-action">Java course 1</Link>
                            <Link to="/detail/1" className="list-group-item list-group-item-action">Java course 2</Link>
                            <Link to="/detail/1" className="list-group-item list-group-item-action">Php course 1</Link>
                            <Link to="/detail/1" className="list-group-item list-group-item-action">Php course 2</Link>
                            
                         </div>
                  </div>
    
            </div>
    )
}

export default TeacherDetail;