import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {GlobalState} from "../../../../GlobalState";
import Cart from "./icons/cart.svg";

function BtnRender({product, deleteProduct}) {

    const state = useContext(GlobalState);
    const [isAdmin] = state.userApi.isAdmin;
    const addCart = state.userApi.addCart;

    return (
        <div className="row_btn">
            {
                isAdmin ?
                <>
                    <Link id="btn_del" to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>
                        Xóa
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`} >
                        Sửa
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!" onClick={() => addCart(product)} >
                        <img className="btn_img" src={Cart}  alt="" width="30" />
                        
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`} >
                        Thông tin sản phẩm
                    </Link>
                </>
            }
            
        </div>
    )
}

export default BtnRender;