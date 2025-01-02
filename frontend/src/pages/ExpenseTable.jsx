import React from 'react'
import Table from 'react-bootstrap/Table';

const ExpenseTable = ({ products, deleteProduct }) => {
    return (
        <div className="expense-list">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                {products.map((products, index) => (
                <tbody>
                    <tr>
                        <td><button className="delete-button" onClick={() => deleteProduct(products._id)}>X</button></td>
                        <td><div className="expense-description">{products.productname}</div></td>
                        <td><div className="expense-amount"> rs.{products.price}</div></td>
                        <td><div className="expense-amount"> {products.qty}</div></td>
                        <td><div className="expense-amount"> rs.{products.amount}</div></td>
                    </tr>
                </tbody>
                ))}
            </Table>
        </div>
    )
}

export default ExpenseTable
