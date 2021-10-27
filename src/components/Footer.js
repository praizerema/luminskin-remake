import React from "react";
import CardOptions from "../images/card-options.PNG";
function Footer() {
  return (
    <footer className="bg-lumin text-left text-gray-50 p-12 font-sans xs:text-xs sm:text-xs md:text-sm lg:text-sm 2xl:text-base text-sm">
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row  xs:flex-col content-between justify-between">
        <div className="w-full lg:w-2/5 2xl:2/5 sm:full md:w-1/3 space-y-5 mb-12 mr-10">
          <h1 className="text-3xl font-serif">Let’s stay in touch</h1>
          <input
            type="text"
            name="email"
            placeholder="EMAIL ADDRESS"
            className="bg-lumin border-b-2 w-full placeholder-white hover:border-none form-input  outline-none pb-2 text-gray-50 border-white"
          />

          <p>
            We’ll give you a heads up on new products, deals, and events, plus
            tips on how to keep your skin looking great. You can unsubscribe at
            any time. View our{" "}
            <a href="https://store.luminskin.com/pages/privacy-policy">
              {" "}
              Privacy Policy
            </a>{" "}
            &{" "}
            <a href="https://store.luminskin.com/pages/terms-of-service">
              Terms of Service
            </a>{" "}
            .
          </p>
          <p>Need help?</p>
          <p>
            Contact us through our{" "}
            <a href="https://store.luminskin.com/pages/customer-support-portal">
              Support Concierge
            </a>{" "}
          </p>
          <p>
            Or email us at{" "}
            <a href="mailto:support@luminskin.com">support@luminskin.com</a>{" "}
          </p>
          <div className="flex justify-between flex-wrap">
            <p>
              © 2021,<a href="/">Lumin</a>
            </p>
            <div>
              <img src={CardOptions} alt="" className="h-6" />
            </div>
          </div>
          <ul className="flex justify-between flex-wrap w-full lg:w-2/3 3xl:">
            <li>
              <a
                href="https://store.luminskin.com/pages/privacy-policy"
                className="underline"
              >
                {" "}
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://store.luminskin.com/pages/return-policy"
                className="underline"
              >
                Return Policy
              </a>
            </li>
            <li>
              <a
                href="https://store.luminskin.com/pages/terms-of-service"
                className="underline"
              >
                Terms of Service
              </a>
            </li>
          </ul>
          <p>3600 Wilshire Boulevard, Suite 1700, Los Angeles, CA 90010</p>
        </div>
        <div className=" grid grid-cols-2 w-full lg:w-1/5 2xl:1/5 sm:full md:w-1/3 mb-12 mr-10">
          <div>
            <h3 className="font-bold text-lg">Shop</h3>
            <ul className="space-y-2">
              <li>Skin</li>
              <li>Hair</li>
              <li>Body</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">About</h3>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>How to</li>
              <li>Ingridients</li>
              <li>Reviews</li>
              <li>Accessibilitty</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        <div className=" w-2/5 grid grid-cols-2 md:w-1/3 mb-12">
          <div>
            <h3 className="font-bold text-lg">More</h3>
            <ul className="space-y-2">
              <li>Jobs</li>
              <li>Wholesale</li>
              <li>Heroes Program</li>
              <li>Request Personal data</li>
            </ul>
          </div>
          <div className="flex justify-between w-full md: w-3/4 lg:w-2/3 2xl:w-2/3">
            <div className="insta">
              {" "}
              <a href="https://www.instagram.com/lumin.skin/">
                <i className="fab fa-instagram text-2xl"></i>
              </a>{" "}
            </div>
            <div className="fb">
              {" "}
              <a href="https://www.facebook.com/lumin.skincare/">
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>{" "}
            </div>
            <div className="twitter">
              {" "}
              <a href="https://twitter.com/lumin_skin">
                <i className="fab fa-twitter text-2xl"></i>
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
