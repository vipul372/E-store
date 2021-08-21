import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getCategories } from './helper/adminapicall';

const ManageCategories = () => {

  const goBack = () => (
    <div className="mb-3">
      <Link className="btn rounded btn-sm btn-dark" to="/admin/dashboard">
        Admin Dashboard
      </Link>
    </div>
  );

  const [categories, setCategories] = useState([]);
  const {user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, [])

  const deleteThisCategory = categoryId => {
    console.log(categoryId);
    deleteCategory(categoryId, user._id, token)
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } 
      else preload();
    });
  }

  return ( 
    <Base
      title="Manage Categories"
      description="Welcome to manage categories section!"
      className="container rounded bg-info p-4"
    >
      {goBack()}
      <div className="row rounded bg-dark text-white m-0 p-4">
          {categories && categories.map((category, index)=>(
            <div key= {index} className="row text-center mb-2 ">
            <div className="col-4">
              <h4 className="text-white text-left">{category.name}</h4>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/category/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          ))}
        
      </div>
    </Base>
   );
}
 
export default ManageCategories;