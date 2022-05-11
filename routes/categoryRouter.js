const router = require('express').Router();
const { route } = require('express/lib/application');
const categoryCtrl = require('../controllers/categoryCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// chuyển đến trang danh sách category lấy, thêm category
router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin, categoryCtrl.createCategory)

// chuyển đến trang category để xóa, sửa category đã chọn qua id
router.route('/category/:id')
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(auth, authAdmin, categoryCtrl.updateCategory)

module.exports = router;