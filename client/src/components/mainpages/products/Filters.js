import React, {useContext} from 'react';
import {GlobalState} from '../../../GlobalState'
import Search from '../icons/search.svg';

function Filters() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesApi.categories;

    const [category, setCategory] = state.productsApi.category;
    const [sort, setSort] = state.productsApi.sort;
    const [search, setSearch] = state.productsApi.search; 
    const [keyword, setKeyword] = state.productsApi.keyword;

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            e.push(`/search/${keyword}`)
        }else{
            e.push('/')
        }
    }
    
    const handleCategory = (e) => {
        setCategory(e.target.value);
        setSearch('');
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Bộ lọc: </span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value=''>Danh mục sản phẩm</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" placeholder="Enter your search!" onChange={e => setSearch(e.target.value)}/>

            <button type='submit' className='btn-search' onClick={e => setSearch(e.target.value)}>
                <img className="icon_search" src={Search} alt="search"/>
            </button>

            <div className="row">
                <span>Lọc theo: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value="">Mới nhất</option>
                    <option value="sort=oldest">Cũ nhất</option>
                    <option value="sort=-sold">Bán chạy nhất</option>
                    <option value="sort=-price">Gía: Cao nhất</option>
                    <option value="sort=price">Gía: Thấp nhất</option>
                </select>
            </div>
        </div>
    )
}

export default Filters;