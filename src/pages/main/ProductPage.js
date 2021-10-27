import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_CURRENCY } from "../../graphql/queries";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"
function ProductPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [subTotal, setSubTotal] = useState(" ");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { currency: selectedCurrency === null ? "NGN" : selectedCurrency },
  });

  const handleChangeCurrency = (e) => {
    setSelectedCurrency(e);
    localStorage.setItem("currencySelected", JSON.stringify(e));

    let sumTotal = 0
    refetch({ currency: e }).then((result) => {
      const { data } = result;
      let tempCarts = cartItems;
      tempCarts.map(item => {
        let similarItems = data.products.find(
          (product) => product.id === item.id
        );
        const itemToMinusIndex = tempCarts.findIndex(
          (element) => element.id === similarItems.id
        );
        tempCarts[itemToMinusIndex].price = similarItems.price;
        tempCarts[itemToMinusIndex].totalAmount = parseInt(
          tempCarts[itemToMinusIndex].quantity *
            tempCarts[itemToMinusIndex].price
        )
        tempCarts[itemToMinusIndex].currency = e === null? "NGN" : e
     sumTotal += parseInt(tempCarts[itemToMinusIndex].totalAmount)
    });
      setSubTotal(sumTotal)
return
    });
  };

  useEffect(() => {
    async function init() {
      const data = await localStorage.getItem("products");
      setCartItems(JSON.parse(data));
    }
    init();
  }, []);
  useEffect(() => {
    async function init() {
      const data = await localStorage.getItem("currencySelected");
      setSelectedCurrency(JSON.parse(data));
    }
    init();
  }, []);

  useEffect(() => {
    async function init() {
      const dataTotal = await localStorage.getItem("subTotalAmount");
      setSubTotal(JSON.parse(dataTotal));
    }
    init();
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartItems));
    localStorage.setItem("subTotalAmount", subTotal);
  }, [cartItems, subTotal]);

  const handleClick = ({ title, image_url, id, price, product_options }) => {
    setShowCart(true);
    let itemAdded;
    if (cartItems && cartItems.length > 0) {
      itemAdded = cartItems.find((item) => item.id === id);
      if (itemAdded) {
        itemAdded.quantity += 1;
        itemAdded.totalAmount = parseInt(itemAdded.price * itemAdded.quantity);
        setSubTotal(parseInt(subTotal + itemAdded.totalAmount));
      } else {
        setCartItems([
          ...cartItems,
          {
            title,
            image_url,
            id,
            price,
            quantity: parseInt(1),
            totalAmount: parseInt(price),
            currency: selectedCurrency === null? "NGN" : selectedCurrency,
          },
        ]);
        setSubTotal(parseInt(subTotal + price));
      }
    } else {
      setCartItems([
        {
          title,
          image_url,
          id,
          price,
          quantity: parseInt(1),
          totalAmount: parseInt(price),
          product_options,
          currency: selectedCurrency === null? "NGN" : selectedCurrency,
        },
      ]);
      setSubTotal(parseInt(subTotal + price));
    }
  };

  const handleRemoveItem = (item) => {
    let tempCartItems = cartItems;
    let itemToMinus = tempCartItems.find((cartItem) => cartItem.id === item.id);
    tempCartItems = tempCartItems.filter(
      (cartItem) => !(itemToMinus.id === cartItem.id)
    );
    setCartItems(tempCartItems);
    setSubTotal(parseInt(subTotal - itemToMinus.totalAmount));
  };

  const handleSubtract = (item) => {
    let tempCartItems = cartItems;
    let itemToMinus = tempCartItems.find((cartItem) => cartItem.id === item.id);
    if (itemToMinus.quantity === 1) {
      tempCartItems = tempCartItems.filter(
        (cartItem) => !(itemToMinus.id === cartItem.id)
      );
      setCartItems(tempCartItems);
      setSubTotal(parseInt(subTotal - itemToMinus.price));
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
      setSubTotal(parseInt(subTotal - itemToMinus.price));
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
    setSubTotal(parseInt(subTotal + tempCartItems[itemToAddIndex].price));
  };

  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";
  return (
    <div className="relative text-center text-gray-800">
      <NavBar
        onClick={() => {
          setShowCart(true);
        }}
        itemNo={cartItems && cartItems.length}
      />
      <header>
        <div className="flex flex-col 2xl:flex-row lg:flex-row justify-between  px-12 mb-24 space-y-6">
          <div className="text-left flex-1 float-left">
            <h1 className=" text-2xl sm:text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl font-normal font-serif text-gray-800 text-left ">
              All Products
            </h1>
            <p>A 360° look at Lumin</p>
          </div>
          <div className="flex-1 w-full">
            <select
              name=""
              id=""
              className="form-multiselect w-full sm:w-full float-right  border border-solid border-gray-400 py-3 px-3 outline-none"
            >
              <option value="">Filter By</option>
            </select>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-4 bg-lumin-products px-4 ">
        {data.products.map(
          ({ title, image_url, id, price, product_options }) => (
            <div key={id} className="mt-16 h-72 space-y-2 self-end">
              <div className="w-1/2 mx-auto mb-10">
                <img src={image_url} alt={title} className="h-20 mx-auto" />
              </div>
              <p className=" xs:text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-base h-10 xs:h-10 sm:h-14 md:h-4 lg:h-4 2xl:h-4">
                {title}
              </p>
              <p className="bg-primary">
                From <span>{selectedCurrency === null? "NGN" : selectedCurrency}</span>
                {` ${price}.00`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <button
                className="bg-lumin text-sm text-gray-50 px-10 py-3 hover:bg-lumin-dark xs:text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-base"
                onClick={() =>
                  handleClick({ title, image_url, id, price, product_options })
                }
              >
                Add to Cart
              </button>
            </div>
          )
        )}
      </div>
      <div
        className={
          showCart
            ? "bg-lumin-transparent z-10 absolute h-full w-full  inset-0 backdrop-filter blur-sm"
            : "hidden"
        }
      >
        <div className="bg-cart h-full fixed scroll overflow-y-scroll right-0 2xl:w-5/12 lg:w-5/12 md:w-1/2 sm:w-full xs:w-full p-8">
          <h1 className="text-xl font-normal text-gray-800 font-serif">
            My Shopping Cart
          </h1>
          <div className="flex justify-between content-center items-center mb-8">
            <div
              onClick={() => setShowCart(!showCart)}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                ``
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </div>
            <div>
              <Currencies
                onChange={(e) => handleChangeCurrency(e)}
                value={selectedCurrency === null? "NGN" : selectedCurrency}
              />
            </div>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div className="bg-white mb-3 p-3 w-full" key={item.id}>
                <div
                  className="w-2 h-2 float-right cursor-pointer"
                  onClick={() => handleRemoveItem(item)}
                >
                  &times;
                </div>
                <div className="grid grid-cols-5 w-full">
                  <div className="col-span-4 text-left space-y-3">
                    <p className=" xs:text-xs sm:text-xs md:text-sm lg:text-sm 2xl:text-sm font-serif h-10 xs:h-10 sm:h-14 md:h-4 lg:h-4 2xl:h-4">
                      {item.title}
                    </p>
                    <p className="xs:text-xs sm:text-xs md:text-sm lg:text-sm 2xl:text-sm">
                    From <span>{selectedCurrency === null? "NGN" : selectedCurrency}</span>
                    {`${item.price}.00`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                    <div className="grid grid-cols-7 w-5/6">
                      <div className="flex border border-solid border-gray-300 justify-between px-1 col-span-2">
                        <button onClick={() => handleSubtract(item)}>-</button>
                        <p>{item.quantity}</p>
                        <button onClick={() => handleAdd(item)}>+</button>
                      </div>
                      <div className="col-span-5 text-right ">
                        <span>{selectedCurrency}</span>{" "}
                        {`${item.totalAmount}.00`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                      </div>
                    </div>
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
              <span>{selectedCurrency}</span>{" "}
              {`${subTotal}.00`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
          <button className="bg-lumin text-sm text-gray-50 px-10 py-3 w-full font-bold hover:bg-lumin-dark xs:text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-base">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      {/* )} */}
      <Footer/>
    </div>
  );
}

const Currencies = ({ onChange, value }) => {
  const { loading, error, data } = useQuery(GET_CURRENCY);
  if (loading) return "Loading...";
  if (error) return "Failed to fetch";
  return (
    <select
      name=""
      id=""
      className="form-multiselect w-20 border text-left border-solid border-gray-800 py-1 border-none bg-cart hover:border-none px-3 text-sm outline-none"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {data.currency.map((currency) => (
        <option value={currency}>{currency}</option>
      ))}{" "}
    </select>
  );
};
export default ProductPage;
