import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading2 from '../../components/Loading2/Loading2';
import { BASE_URL } from '../../constants/BASE_URL';
import translate from '../../services/translate';
import classes from "./Wishlist.module.css"

function Wishlist() {


    const [products, setProducts] = useState(0);

    useEffect(() => {
        const getProducts = async (e) => {
            fetch(`${BASE_URL}product/5product/`)
                .then((response) => response.json())
                .then((res) => { 
                    setProducts(res.results.length);
                });
        };
        getProducts();
    }, []);



    const wishlist = []

    for (var i = 0; i < products + 1000; i++) {
        wishlist.push(JSON.parse(window.localStorage.getItem(i)));
    }
    var filtered = wishlist.filter(Boolean)

    return (
        <div className={classes.Wishlist}>
            <div className="container">
                {filtered ?
                    filtered.length > 0 ?
                        filtered.map((item, index) => (
                            item ? <div className={classes.WishlistCart} key={index}>
                                <Link to={`/shop/product/${item.id}`} className={classes.Wishlist_link} onClick={() => {
                                    window.scrollTo(0, 0)
                                }}>
                                    <div className={classes.image}>
                                        <img src={item.product_images[0].get_image_url} alt="" />
                                    </div>
                                    <div className={classes.name}>{item.name}</div>
                                    <div className={classes.name}>{item.category[0].name}</div>
                                    <div className={classes.price}>{item.capacity}</div>
                                    <div className={classes.price}>{item.value}</div>
                                </Link>
                            </div> : <h1>{translate("Корзинка", "Savatcha", "Cart")} </h1>
                        )) : <h1>{translate("Избранное пусто", "Hech narsa tanlanmagan", "Wishlist empty")}</h1> : <Loading2 />}
            </div>
        </div>
    )
}

export default Wishlist