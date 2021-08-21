import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {

  const goBack = () => (
    <div className="mb-3">
      <Link className="btn rounded btn-sm btn-dark" to="/admin/dashboard">
        Admin Dashboard
      </Link>
    </div>
  );

  const [products, setProducts] = useState([]);
  const {user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, [])

  const deleteThisProduct = productId => {
    console.log(productId);
    deleteProduct(productId, user._id, token)
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } 
      else preload();
    });
  }

  return ( 
    <Base
      title="Manage Products"
      description="Welcome to manage products section!"
      className="container rounded bg-info p-4"
    >
      {goBack()}
      <div className="row rounded bg-dark text-white m-0 p-4">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products.length} products</h2>
          {products && products.map((product, index)=>(
            <div key= {index} className="row text-center mb-2 ">
            <div className="col-4">
              <h4 className="text-white text-left">{product.name}</h4>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </Base>
    // <Base title="Welcome admin" description="Manage products here">
    //   {goBack()}
    //   <div className="row">
        
    //   </div>
    // </Base>

   );
}
 
export default ManageProducts;