import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [customersArray , setCustomersArray] = useState([]);

  console.log(customersArray)
  return <Component {...pageProps}
  customersArray = {customersArray}
  setCustomersArray = {setCustomersArray}
  
  />;
}
