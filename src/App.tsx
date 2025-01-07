import React, {ReactNode} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLemon, faAppleAlt, faPepperHot, faCarrot, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {useShoppingCartStore} from './store/store';
import Navbar from "./components/Navbar.tsx";

interface ShoppingCartItem {
    name: string;
    price: number;
    quantity: number;
    icon: ReactNode;
}

const ShoppingCart: React.FC = () => {
    const {items, addItem, removeItem, totalPrice} = useShoppingCartStore();

    const itemList: ShoppingCartItem[] = [
        {name: 'Lemon', price: 1.5, quantity: 0, icon: <FontAwesomeIcon icon={faLemon}/>},
        {name: 'Apple', price: 2, quantity: 0, icon: <FontAwesomeIcon icon={faAppleAlt}/>},
        {name: 'Hot Pepper', price: 1.2, quantity: 0, icon: <FontAwesomeIcon icon={faPepperHot}/>},
        {name: 'Carrot', price: 1, quantity: 0, icon: <FontAwesomeIcon icon={faCarrot}/>},
    ];

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="box">
                    <div className="left">
                        {itemList.map((item, index) => {
                            const itemInCart = items.find((cartItem) => cartItem.name === item.name);

                            return (
                                <div key={index} className="item">
                                    <div className="item-info">
                                        <div className="icon">{item.icon}</div>
                                        <div className="details">
                                            <p>{item.name}</p>
                                            <p>{item.price.toFixed(2)}€</p>
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <FontAwesomeIcon
                                            icon={faMinus}
                                            onClick={() => itemInCart && removeItem(item)}
                                            style={{cursor: 'pointer'}}
                                        />
                                        <span>{itemInCart ? itemInCart.quantity : 0}</span>
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            onClick={() => addItem(item)}
                                            style={{cursor: 'pointer'}}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="right">
                        <h2>Shopping List</h2>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index} className="shopping-list-item">
                                    <div className="shopping-list-icon">{item.icon}</div>
                                    <div className="shopping-list-details">
                                        <p>{item.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>{(item.price * item.quantity).toFixed(2)}€</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty!</p>
                        )}
                        <div className="total-price">
                            <h3>Total: {(totalPrice).toFixed(2)} €</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;
