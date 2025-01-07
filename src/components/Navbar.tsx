import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {useShoppingCartStore} from "../store/store.tsx";

const Navbar: React.FC = () => {
    const itemCount = useShoppingCartStore(state => state.itemCount);

    return (
        <div className="navbar">
            <div className="nav-content">
                <h1>My Store</h1>
                <div className="cart">
                    <FontAwesomeIcon icon={faShoppingCart} size="4x" />
                    <span className="cart-count">{itemCount}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
