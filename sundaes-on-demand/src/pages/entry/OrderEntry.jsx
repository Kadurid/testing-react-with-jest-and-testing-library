import React from 'react'
import Options from './Options'
import { useOrderDetails } from './../../contexts/OrderDetails';

export default function OrderEntry() {
  const [orderDetails, updateItemCount] = useOrderDetails();
  
  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals["grandTotal"]}</h2>
    </>
  )
}
