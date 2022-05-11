const Products = require('../models/productModel');

// Filter, sort, pagination

// GET ALL PRODUCTS
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    // filter by price, category, etc.
    filtering() {
        const queryObj = { ...this.queryString }; // queryString = req.query

        const excludedFields = ['page', 'sort', 'limit' ];
        excludedFields.forEach(el => delete(queryObj[el]));

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => '$' + match);
        // gte: greater than or equal
        // gt: greater than
        // lte: less than or equal
        // lt: less than
        // regex: regular expression

        this.query.find(JSON.parse(queryStr))

        return this;
    }
    // sort by price, category, etc.
    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }
    // pagination
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}


const productCtrl = {
    // lấy danh sách sản phẩm
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating();

            const products = await features.query;

            res.json({
                status: 'success',
                results: products.length,
                products: products  
            })
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    // thêm sản phẩm
    createProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) 
                return res.status(400).json({msg: 'No image upload'});
            const product = await Products.findOne({product_id});
            if(product)
                return res.status(400).json({msg: 'Product already exists'});

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save();
            res.json({msg: 'Product created'});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    // xóa, sửa sản phẩm
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({msg: 'Product deleted'});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {title, price, description, content, images, category} = req.body;
            if(!images) 
                return res.status(400).json({msg: 'No image upload'});
            
            await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({msg: 'Product updated'});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
}

module.exports = productCtrl;