import { useState } from "react";
import { createPortal } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Suspense, lazy } from "react";
import "./App.css"

function Header({ onCartClick }) {
  const listItems = ["Home", "Menu", "About", "Contact", "Cart"];
  return (
    <header>
      <ul>
        {listItems.map((item) => (
          <li 
            key={item} 
            onClick={() => item === "Cart" && onCartClick()}
            style={{ cursor: item === "Cart" ? "pointer" : "default" }}
          >
            {item}
          </li>
        ))}
      </ul>
    </header>
  )
}

function Main() {
  return (
    <main>
      <h1>Welcome to Our Restaurant</h1>
      <p>Enjoy our delicious meals and excellent service.</p>
    </main>
  )
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, name: "pizza", price: "$10", photo: "/photo/pizza.svg" },
        { id: 2, name: "pasta", price: "$12", photo: "/photo/pasta.svg" },
        { id: 3, name: "salad", price: "$8", photo: "/photo/salad.svg" },
        { id: 4, name: "icecream", price: "$6", photo: "/photo/icecream.svg" },
        { id: 5, name: "soda", price: "$3", photo: "/photo/soda.svg" },
        { id: 6, name: "coffee", price: "$4", photo: "/photo/coffee.svg" }
      ]
    }
  }

  handleAddToCart = (item) => {
    this.props.onAddToCart(item);
    alert(`${item.name} added to cart!`);
  }

  render() {
    return (
      <div className="menu">
        <h2>Menu</h2>
        <ul>
          {this.state.items.map(
            (item) => (
              <li key={item.id}>
                <img src={item.photo} alt={item.name} />
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price}</span>
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => this.handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

function About() {
  return (
    <div className="about">
      <h2>About us</h2>
      <p>We are a family-owned restaurant dedicated to serving delicious meals made from fresh ingredients.</p>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState("");

  const handleChange = (event) => {
    setFormData(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for contacting us, " + formData + "!");
}
  return (
    <div className="Contact">
      <h2>Contact us</h2>
      <form onSubmit={handleSubmit}>
        <label> About you:
          <input type="text" value={formData} onChange={handleChange} />
        </label>
        <p>Repeat sentence: {formData}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function Cart({ isOpen, onClose, children }){
  if (!isOpen) return null;
  return createPortal(
    <div className="cart-overlay">
      <div className="cart-modal">
        {children}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

function CartItem({ isOpen, onClose, cartItems }){
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Checkout complete!");
    onClose();
  }

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace('$', ''));
    return total + price;
  }, 0);

  return (
    <Cart isOpen={isOpen} onClose={onClose}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${totalPrice}</strong>
          </div>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
      </form>
    </Cart>
  )
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  }

  const handleCartClose = () => {
    setIsCartOpen(false);
  }

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  }

  return (
    <div>
      <Header onCartClick={handleCartOpen} />
      <Main />
      <Menu onAddToCart={handleAddToCart} />
      <About />
      <Contact />
      <CartItem isOpen={isCartOpen} onClose={handleCartClose} cartItems={cartItems} />
    </div>
  );
}             