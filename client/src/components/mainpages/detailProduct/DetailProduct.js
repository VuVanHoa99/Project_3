import React, {useContext, useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {GlobalState} from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const addCart = state.userApi.addCart;
    const [products] = state.productsApi.products;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product);
            })
        }
    },[params.id, products]);
    
    if(detailProduct.length === 0) return <div>Loading...</div>;
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>Mã: {detailProduct.product_id}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Đã bán: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailProduct)} >
                        Mua ngay
                    </Link>
                </div>
            </div>

            <div>
                <h2>Sản phẩm liên quan</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct;