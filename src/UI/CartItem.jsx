import { currencyFormatter } from "../util/formatting";


export default function CartItem({
    name, 
    quantity, 
    price,
    OnIncrease,
    OnDecrease,
}){
    return(
        <li className="cart-item">
            <p>
                {name} - {quantity} X {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={OnDecrease}>-</button>
                <span>QTY</span>
                <button onClick={OnIncrease}>+</button>
            </p>
        </li>
    );
}