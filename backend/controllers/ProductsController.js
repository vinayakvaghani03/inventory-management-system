const UserModel = require("../models/user");

const addProduct = async (req, res) => {
    const { _id } = req.user;
    console.log(_id, req.body)
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id, // user id
            { $push: { products : req.body } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense added successfully",
                success: true,
                data: userData?.products
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const getAllProducts = async (req, res) => {
    const { _id } = req.user;
    console.log(_id, req.body)
    try {
        const userData = await UserModel.findById(_id).select('products');
        res.status(200)
            .json({
                message: "Fetched Expenses successfully",
                success: true,
                data: userData?.products
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

const deleteProduct = async (req, res) => {
    const { _id } = req.user;
    const productId = req.params.productId;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { products: { _id: productId } } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense Deleted successfully",
                success: true,
                data: userData?.products
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

module.exports = {addProduct, getAllProducts, deleteProduct}