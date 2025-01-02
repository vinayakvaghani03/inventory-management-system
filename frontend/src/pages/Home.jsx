import React, { useEffect, useState } from 'react'
import { APIUrl, handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';



const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const [fianlamount, setFianlamount] = useState(0)


    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])


    // Effect to calculate the total amount whenever products change
    useEffect(() => {
        const total = products.reduce((total, product) => total + Number(product.amount), 0);
        setFianlamount(total);
    }, [products]); // Depend on 'products' to recalculate whenever they change

    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = `${APIUrl}/products`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            // if token exiper or unothorise
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }

            const result = await response.json();
            console.log('--result', result.data);
            setProducts(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/products`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setProducts(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const url = `${APIUrl}/products/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setProducts(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])





    return (
        <div>
            <div className='user-section'>
                <h1>Welcome! {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <ExpenseForm addTransaction={addTransaction} total ={fianlamount}/>
            <ExpenseTable products={products} deleteProduct={deleteProduct} />
            <ToastContainer />
        </div>
    )
}

export default Home
