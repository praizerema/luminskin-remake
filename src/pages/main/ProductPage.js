import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_PRODUCTS,GET_CURRENCY } from "../../graphql/queries";
import NavBar from "../../components/NavBar";
function ProductPage() {
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [fetchedCurrencies, setFetchedCurrencies] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const { loading, error, data, refetch} = useQuery(GET_PRODUCTS, {variables: {currency: selectedCurrency}});



const handleChangeCurrency=(e)=>{
    setSelectedCurrency(e)
    refetch({currency: e}).then(
        result=>{
            const { loading, error, data} = result
            let tempCarts =cartItems
            tempCarts.map(item=>{
           let similarItems = data.products.find(product => product.id === item.id)
           const itemToMinusIndex = tempCarts.findIndex(
            (element) => element.id === similarItems.id
          );
           tempCarts[itemToMinusIndex].price = similarItems.price;
           tempCarts[itemToMinusIndex].totalAmount = parseInt(
             tempCarts[itemToMinusIndex].quantity *
               tempCarts[itemToMinusIndex].price
           );
            })
    setCartItems([...tempCarts])

        }
    )
   
}

  useEffect(() => {
    async function init() {
      const data = await localStorage.getItem("products");
      const dataTotal = await localStorage.getItem("subTotalAmount");
      setCartItems(JSON.parse(data));
      setSubTotal(JSON.parse(dataTotal))
    }
    init();
  }, []);
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartItems));
    // localStorage.setItem("subTotalAmount", JSON.stringify(subTotal));

  }, [cartItems]);
  
  useEffect(() => {
    // localStorage.setItem("products", JSON.stringify(cartItems));
    localStorage.setItem("subTotalAmount", JSON.stringify(subTotal));

  }, [ subTotal]);

  const handleClick = ({ title, image_url, id, price, product_options }) => {
    setShowCart(true);

    let itemAdded;
    if (cartItems && cartItems.length > 0) {
      itemAdded = cartItems.find((item) => item.id === id);
      if (itemAdded) {
        itemAdded.quantity += 1;
        itemAdded.totalAmount = parseInt(itemAdded.price * itemAdded.quantity);
        console.log(cartItems);
        setSubTotal(parseInt(subTotal+itemAdded.totalAmount))
      } else {
        setCartItems([
          ...cartItems,
          {
            title,
            image_url,
            id,
            price,
            quantity: parseInt(itemQuantity),
            totalAmount: parseInt(price),
          },
        ]);
        setSubTotal(parseInt(subTotal+price))

      }
    } else {
      setCartItems([
        {
          title,
          image_url,
          id,
          price,
          quantity: parseInt(itemQuantity),
          totalAmount: parseInt(price),
          product_options,
          currency: selectedCurrency
        },
      ]);
      setSubTotal(parseInt(subTotal+price))


    }
  };
  const handleRemoveItem=(item)=>{
    let tempCartItems = cartItems;
    let itemToMinus = tempCartItems.find((cartItem) => cartItem.id === item.id);
    tempCartItems = tempCartItems.filter(
        (cartItem) => !(itemToMinus.id === cartItem.id)
      );
      setCartItems(tempCartItems);
      setSubTotal(parseInt(subTotal-itemToMinus.totalAmount))
  }

  const handleSubtract = (item) => {
    let tempCartItems = cartItems;
    let itemToMinus = tempCartItems.find((cartItem) => cartItem.id === item.id);
    if (itemToMinus.quantity === 1) {
      tempCartItems = tempCartItems.filter(
        (cartItem) => !(itemToMinus.id === cartItem.id)
      );
      setCartItems(tempCartItems);
      setSubTotal(parseInt(subTotal-itemToMinus.price))

    } else {
      const itemToMinusIndex = tempCartItems.findIndex(
        (element) => element.id === item.id
      );
      tempCartItems[itemToMinusIndex].quantity -= 1;
      tempCartItems[itemToMinusIndex].totalAmount = parseInt(
        tempCartItems[itemToMinusIndex].totalAmount -
          tempCartItems[itemToMinusIndex].price
      );

      setCartItems([...tempCartItems]);
      setSubTotal(parseInt(subTotal-itemToMinus.price))

    }
    localStorage.setItem("products", JSON.stringify(tempCartItems));
  };

  const handleAdd = (item) => {
    let tempCartItems = cartItems;
    const itemToAddIndex = tempCartItems.findIndex(
      (element) => element.id === item.id
    );
    tempCartItems[itemToAddIndex].quantity += 1;
    tempCartItems[itemToAddIndex].totalAmount = parseInt(
      tempCartItems[itemToAddIndex].totalAmount +
        tempCartItems[itemToAddIndex].price
    );

    setCartItems([...tempCartItems]);
    setSubTotal(parseInt(subTotal+tempCartItems[itemToAddIndex].price))

  };
  console.log(cartItems);

  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";
  console.log(data);
  return (
    <div className="relative text-center">
      <NavBar
        onClick={() => {
          setShowCart(true);
        }}
        itemNo={cartItems && cartItems.length}
      />
      <header className="pt-40">
        <div className="flex flex-col 2xl:flex-row lg:flex-row justify-between  px-12 mb-24">
          <div className="text-left flex-1 float-left">
            <h1 className="text-4xl font-normal font-serif text-gray-800 text-left ">
              All Products
            </h1>
            <p>A 360° look at Lumin</p>
          </div>
          <div className="flex-1 w-full">
            <select
              name=""
              id=""
              className="form-multiselect w-full sm:w-full float-right  border border-solid border-gray-400 py-3 px-3"
            >
              <option value="">Filter By</option>
            </select>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-4 bg-lumin-products px-4 ">
        {data.products.map(({ title, image_url, id, price, product_options }) => (
          <div key={id} className="mt-16 h-72 space-y-2 self-end">
            <div className="w-1/2 mx-auto mb-10">
              <img src={image_url} alt={title} className="h-20 mx-auto" />
            </div>
            <p className=" xs:text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-base h-10 xs:h-10 sm:h-14 md:h-4 lg:h-4 2xl:h-4">
              {title}
            </p>
            <p className="bg-primary">
              From <span>{selectedCurrency}</span>
              {`${price}.00`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <button
              className="bg-lumin text-sm text-white px-10 py-3 hover:bg-indigo-400 xs:text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-base"
              onClick={() => handleClick({ title, image_url, id, price, product_options })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div
        className={
          showCart
            ? "bg-lumin-transparent z-10 absolute h-full w-full  inset-0 backdrop-filter blur-sm"
            : "hidden"
        }
      >
        <div className="bg-cart h-full fixed scroll overflow-y-scroll right-0 2xl:w-5/12 lg:w-5/12 md:w-1/2 sm:w-full xs:w-full p-8">
          <h1 className="text-2xl font-normal text-gray-800 font-serif">
            My Shopping Cart
          </h1>
          <div className="flex justify-between content-center items-center mb-8">
            <div onClick={() => setShowCart(!showCart)} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >``
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </div>
            <div> 
          <Currencies onChange={(e)=>handleChangeCurrency(e)} value={selectedCurrency}/>
            </div>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div
                className="bg-white mb-3 p-3 w-full"
                key={item.id}
              >
                  <div className="w-2 h-2 float-right cursor-pointer" onClick={()=>handleRemoveItem(item)}><svg viewBox="0 0 320 512" focusable="false" class="chakra-icon css-72vrbd"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg></div>
               <div className="grid grid-cols-5 w-full">
                <div className="col-span-4 text-left space-y-3">
                  <p className=" xs:text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-base h-10 xs:h-10 sm:h-14 md:h-4 lg:h-4 2xl:h-4">
                    {item.title}
                  </p>
                  {/* <p className="bg-primary">
                    From <span>{selectedCurrency}</span>
                    {`${item.price}.00`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p> */}
                  <div className="grid grid-cols-6 w-5/6">
                    <div className="flex border border-solid border-gray-800 justify-between p-1 col-span-2">
                      <button onClick={() => handleSubtract(item)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => handleAdd(item)}>+</button>
                    </div>
                    <div className="col-span-4 text-right ">
                     <span>{selectedCurrency}</span> {`${item.totalAmount}.00`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div></div>
                  </div>
                

                <div className="w-full mx-auto  text-right col-span-1 flex justify-center content-center items-center">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-10 mx-auto inline-block align-middle "
                  />
                </div>
              </div>
              
              </div>
            ))}
            <div className="flex justify-between content-center items-center my-8">
            <div>
            <p className="text-lg font-bold text-gray-800">SUBTOTAL</p>
            </div>
            <div className="text-lg font-bold text-gray-800"> 
            <span>{selectedCurrency}</span> {`${subTotal}.00`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

const Currencies =({onChange, value})=>{
    const { loading, error, data } = useQuery(GET_CURRENCY);
    if (loading) return "Loading...";
    if (error) return "Failed to fetch";
    console.log(data.currency)
    return(
        <select
        name=""
        id=""
        className="form-multiselect w-20 border text-left border-solid border-gray-800 py-1 border-none bg-cart hover:border-none px-3 text-sm"
        value={value}
        onChange={(e) => {onChange(e.target.value)}}
      >{data.currency.map((currency)=>(
        <option value={currency}>{currency}</option>
   
    ))  } </select>
    )
} 
export default ProductPage;
