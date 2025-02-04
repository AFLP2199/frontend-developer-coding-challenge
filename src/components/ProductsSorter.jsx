import { useRef, useState } from "react";
import styled from "styled-components";
import useClickOutside from "./../hooks/useClickOutside";

const SortDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 1464px;
    h3 {
        padding: 1rem;
        color: #7c899c;
        font-weight: 600;
        font-size: 1.125rem;
    }
    .sort-by {
        padding-left: 2.25rem;
        border-left: 2px solid #dae4f2;
    }

    input {
        display: none;
    }
    input:checked ~ .sort-button {
        background: #176feb;
        background: -webkit-linear-gradient(to right, #176feb 0%, #ff80ff 100%);
        background: -moz-linear-gradient(to right, #176feb 0%, #ff80ff 100%);
        background: linear-gradient(to right, #176feb 0%, #ff80ff 100%);
        span {
            -webkit-text-fill-color: #fff;
        }
    }
`;

const SortButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 165px;
    height: 43px;
    margin: 0.25rem;
    font-weight: 600;
    font-size: 1.125rem;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    background: #e5f0ff;
    span {
        background: #176feb;
        background: -webkit-linear-gradient(to right, #176feb 0%, #ff80ff 100%);
        background: -moz-linear-gradient(to right, #176feb 0%, #ff80ff 100%);
        background: linear-gradient(to right, #176feb 0%, #ff80ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const FilterContainer = styled.div`
    position: relative;
    margin-right: 2.5rem;
    font-weight: 600;
    font-size: 18px;
    color: #7c899c;
    div:first-child {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        width: 222px;
        height: 22px;
        background: #ffffff;
        border: 1px solid #dae4f2;
        border-radius: 1rem;
        user-select: none;
        cursor: pointer;
    }
`;

const Filter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0px;
    height: 253px;
    width: 254px;
    border: 1px solid #dae4f2;
    border-radius: 0.5rem;
    background: #fff;
    position: absolute;
    top: 4rem;
    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;
        li {
            display: flex;
            align-items: center;
            height: 51px;
            padding: 0 1rem;
            cursor: pointer;
        }
        li:hover {
            background: #f5f9ff;
        }
    }
`;

function ProductsSorter({ products, changeFilteredProducts, filter, changeFilter, filteredProducts }) {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef();
    useClickOutside(menuRef, setMenu);

    const handleSortLow = () => {
        var sortedProducts = [...filteredProducts];
        sortedProducts.sort((a, b) => {
            return a.cost - b.cost;
        });
        changeFilteredProducts(sortedProducts);
    };

    const handleSortHigh = () => {
        var sortedProducts = [...filteredProducts];
        sortedProducts.sort((a, b) => {
            return b.cost - a.cost;
        });
        changeFilteredProducts(sortedProducts);
    };

    const handleSortRecent = () => {
        let sortedProducts = [...filteredProducts];
        sortedProducts.sort((a, b) => {
            return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
        });
        changeFilteredProducts(sortedProducts);
    };

    const handleChangeFilter = (filterName) => {
        setMenu(false);
        changeFilter(filterName);
        document.getElementById("recent-sort").click();
        if (filterName === "All Products") {
            changeFilteredProducts(products);
        } else {
            let filtered = products.filter((item) => item.category === filterName);
            changeFilteredProducts(filtered);
        }
    };

    return (
        <SortDiv>
            <h3>Filter by:</h3>
            <FilterContainer ref={menuRef}>
                <div onClick={() => setMenu(!menu)}>
                    {filter}
                    <img src={process.env.PUBLIC_URL + "/assets/icons/menu-dropdown.svg"} alt="arrow-icon" />
                </div>

                {menu && (
                    <Filter>
                        <ul>
                            <li onClick={() => handleChangeFilter("All Products")}>All Products</li>
                            <li onClick={() => handleChangeFilter("Gaming")}>Gaming</li>
                            <li onClick={() => handleChangeFilter("Audio")}>Audio</li>
                            <li onClick={() => handleChangeFilter("Smart Home")}>Smart Home</li>
                            <li onClick={() => handleChangeFilter("Monitors & TV")}>Monitors & TV</li>
                        </ul>
                    </Filter>
                )}
            </FilterContainer>
            <h3 className="sort-by">Sort by:</h3>
            <label>
                <input
                    id="recent-sort"
                    type="radio"
                    name="order"
                    value="recent"
                    defaultChecked="true"
                    onClick={handleSortRecent}
                />
                <SortButton className="sort-button">
                    <span>Most recent</span>
                </SortButton>
            </label>
            <label>
                <input type="radio" name="order" value="lowest" onClick={handleSortLow} />
                <SortButton className="sort-button">
                    <span>Lowest Price</span>
                </SortButton>
            </label>
            <label>
                <input type="radio" name="order" value="highest" onClick={handleSortHigh} />
                <SortButton className="sort-button">
                    <span>Highest Price</span>
                </SortButton>
            </label>
        </SortDiv>
    );
}

export default ProductsSorter;
