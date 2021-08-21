import React from 'react'
import { API } from '../../backend';


const ImageHelper = ({product}) => {
  let imgurl = product ? `${API}/product/photo/${product._id}` : `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80`
  return (
    <div className="rounded p-2">
      <img
        src={imgurl}
        alt="product"
        style={{maxHeight:"100%", maxWidth:"100%"}}
        className="rounded mb-3"
      />
    </div>
  )
}

export default ImageHelper;