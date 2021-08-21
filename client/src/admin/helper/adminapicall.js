const { API } = require("../../backend");

//Category calls--------------------------------------

//CREATE: category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(response => {
    console.log(response)
    return response.json()
  })
  .catch(error => console.log(error))
}

//GET ALL: catogories
export const getCategories = () => {
  return fetch(`${API}/categories`,{
    method: 'GET'
  })
  .then(response => response.json())
  .catch(error=> console.log(error));
}

//GET: category
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`,{
    method: 'GET'
  })
  .then(response => response.json())
  .catch(error=> console.log(error));
}

//DELETE: category
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'DELETE',
    headers:{
      Accept: 'application/json',
      Authorization:  `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}

//UPDATE: category
export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: 'PUT',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}


// Products calls------------------------------

//CREATE: product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers:{
      Accept: 'application/json',
      Authorization:  `Bearer ${token}`
    },
    body: product
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}

//GET ALL: products
export const getProducts = () => {
  return fetch(`${API}/products`,{
    method: 'GET'
  })
  .then(response => response.json())
  .catch(error=> console.log(error));
}

//GET: product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`,{
    method: 'GET'
  })
  .then(response => response.json())
  .catch(error=> console.log(error));
}

//DELETE: product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers:{
      Accept: 'application/json',
      Authorization:  `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}

//UPDATE: product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers:{
      Accept: 'application/json',
      Authorization:  `Bearer ${token}`
    },
    body: product
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}