import { useState } from "react";
import { createPortal } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Suspense, lazy } from "react";

function Header() {
  const listItems =[ "Home", "Menu" , "About", "Contact", "Cart"];
  return (
    <header>
      <ul>
        {listItems.map((item) => (
          <li key={item}>{item}</li>
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
        { name: "pizza", price: "$10"},
        { name: "pasta", price: "$12"},
        { name: "salad", price: "$8"},
        { name: "icecream", price: "$6"},
        { name: "soda" , price: "$3"},
        { name: "coffee", price: "$4"}
      ]
    }
  }
  render() {
    return (
      <div>
        <h2>Menu</h2>
        <ul>
          {this.state.items.map (
            (item) => (
              <li key={item.name}>{item.name} - {item.price}</li>
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
      <div style={{
        position: "fixed",
        top: "0",
        left:"0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      >
        <div style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          minWidth: "300px",
        }}
        >
      {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
    , document.body
      );
}

function CartItem(){
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Checkout complete!");
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={handleOpen}>Open Cart</button>
      <Cart isOpen={isOpen} onClose={handleClose}>
        <h2>Your Cart</h2>
        <p>Your cart is currently empty.</p>
        <form onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
        </form>
      </Cart>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Header />
      <Main />
      <Menu />
      <About />
      <Contact />
      <CartItem />
      </div>
  );
}             