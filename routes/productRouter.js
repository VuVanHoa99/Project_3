const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');


// lấy danh sách sản phẩm
// thêm sản phẩm
router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProduct);

// xóa, sửa sản phẩm
router.route('/products/:id')
    .delete(productCtrl.deleteProduct)
    .put(productCtrl.updateProduct);



module.exports = router;