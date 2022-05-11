import React, {useContext, useState, useEffect} from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "Thực phẩm nông nghiệp VietGAP",
    content: "Các loại nông sản của chúng tôi được nuôi trồng theo công nghệ Vi Sinh Hữu Hiệu (EM) của Nhật và được công nhận bởi Hiệp hội Công nghệ Vi sinh Hữu hiệu của Nhật Bản (EMRO). Đây là công nghệ nuôi trồng nông nghiệp không sử dụng hóa chất với quy trình sản xuất và phân phối khép kín, đảm bảo chất lượng của sản phẩm từ khi xuất xưởng đến tận tay người tiêu dùng. Sản phẩm rất đa dạng, từ các loại thịt, cá, trứng đến rau củ quả, gạo, cây gia vị...",
    category: "",
    _id: "",
}


function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesApi.categories;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [isAdmin] = state.userApi.isAdmin;
    const [token] = state.token;
    
    const history = useHistory();
    const param = useParams();

    const [products] = state.productsApi.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productsApi.callback;

    useEffect(() => {
        if(param.id){
            setOnEdit(true);
            products.forEach(product => {
                if(product._id === param.id){ 
                    setProduct(product);
                    setImages(product.images);
                }
            })
        }else{
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    }, [param.id, products]);

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if(!isAdmin) return alert("You are not admin");
            const file = e.target.files[0];

            if(!file) return alert("File not found");

            if(file.size > 1024 * 1024) // 1mb
                return alert("File size is too large");
            
            if(file.type !== "image/jpeg" && file.type !== "image/png")
                return alert("File type is not supported");

            let formData = new FormData();
            formData.append("file", file);

            setLoading(true);
            const res = await axios.post("/api/upload", formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false);
            setImages(res.data);

        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You are not admin");
            setLoading(true);
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(!isAdmin) return alert("You are not admin");
            if(!images) return alert("Please upload image");    

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else {
                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
            }

            setCallback(!callback);
            history.push("/");
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const styleUpload = {
        display: images ? "block" : "none",
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>
                    : <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : "" } alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }

            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id} >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

        </div>
    );
}

export default CreateProduct;