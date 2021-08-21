import React, {useState, useEffect} from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const Home = () => {
  
  const [products, setProducts] = useState([]);
  // const [error, setError] = useState("");

  const loadAllProducts = () => {
    getProducts().then(data=>{
      // if(data.error){
      //   setError(data.error);
      // }
      // else
        setProducts(data);
    })
  }

  useEffect(() => {
    loadAllProducts();
  }, [])

  return (
    <Base title="Tshirt Store" description="Welcome to online Store">
      <div className="row text-center">
        {products && products.map((product, index)=>{
          return(
            <div key={index} className="col-sm-3 mb-2">
              <Card product={product}/>
            </div>
          )
        })}
      </div>
    </Base>
  );
}

export default Home;
