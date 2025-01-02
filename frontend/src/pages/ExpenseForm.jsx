import React, { useEffect, useState } from 'react'
import { handleError } from '../utils';


const ExpenseForm = ({ addTransaction ,total }) => {
    const [productInfo, setProductInfo] = useState({ productname: '', price: '', qty: '', amount: '' })
    const [sum, setSum] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyProductInfo = { ...productInfo};
        copyProductInfo[name] = value;
        setProductInfo(copyProductInfo);
    }

    const addExpenses = (e) => {
        e.preventDefault();
        const { productname, price, qty, amount } = productInfo;
        if (!productname || !price || !qty) {
            handleError('Please add Expense Details');
            return;
        }
        addTransaction(productInfo);
        setProductInfo({ productname: '', price: '', qty: '', amount: '' })
    }
    useEffect(() => {
        const calculateTotal = () => {
            const price = parseFloat(productInfo.price);
            const qty = parseFloat(productInfo.qty);
            
            // Only calculate if price and qty are valid numbers
            if (!isNaN(price) && !isNaN(qty)) {
                const newTotal = price * qty;
                setSum(newTotal);
                setProductInfo((prevInfo) => ({
                    ...prevInfo,
                    amount: newTotal.toString(), // update amount field in productInfo state
                }));
            }
        };

        calculateTotal();
        
    }, [productInfo.price, productInfo.qty]);

    
    return (
        <div className='container'>
            <h2>Product Inventory</h2>
            <form onSubmit={addExpenses}>
                <div>
                    <h4>Total Amount :- {total}</h4>
                </div>
                <div>
                    <label htmlFor='productname'>Product Name</label>
                    <input onChange={handleChange} type='text' name='productname' value={productInfo.productname} placeholder='Enter your Product name' />
                </div>
                <div>
                    <label htmlFor='price'>Price</label>
                    <input onChange={handleChange} type='number' name='price' value={productInfo.price} placeholder='Enter your Price' />
                </div>
                <div>
                    <label htmlFor='qty'>Quantity</label>
                    <input onChange={handleChange} type='number' name='qty' value={productInfo.qty} placeholder='Enter your Quantity' />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input type='number' name='amount' value={sum} disabled />
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default ExpenseForm
