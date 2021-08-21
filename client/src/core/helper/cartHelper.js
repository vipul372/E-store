export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
}

export const removeItemFromCart = (itemId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((item, i)=>{
      if(itemId === item._id ){
        cart.splice(i,1)
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

//empty cart after user checkout order
export const cartEmpty = (next) =>{
  if (typeof window !== undefined){
    localStorage.removeItem("cart");
    let cart = []
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
}