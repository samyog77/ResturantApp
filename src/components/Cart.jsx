import Modal from '../UI/Modal';
import CartContext from '../store/CartContext';
import Button from '../UI/Button';
import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from '../UI/CartItem';

export default function Cart(){
const cartCtx = useContext(CartContext);
const userProgressCtx = useContext(UserProgressContext);
const cartTotal =cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
     0
);

function handleCloseCart(){
    userProgressCtx.hideCart();
}

function handleGoToCheckout(){
    userProgressCtx.showCheckout();
}

    return (
        <Modal className="Cart" 
            open = {userProgressCtx.progress === 'cart'} 
            onClose ={userProgressCtx.progress==='cart' ? handleCloseCart : null}
        >
        <h2>Your cart</h2>
        <ul>
            {cartCtx.items.map((item) => (
                <CartItem 
                key={item.id} 
                name={item.name}
                quantity ={item.quantity}
                price={item.price}
                OnIncrease={()=> cartCtx.addItem(item)}
                OnDecrease={() => cartCtx.removeItem(item.id)}
                />
            ))}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseCart}> Close</Button>
          {cartCtx.items.length > 0 &&(
            <Button onClick={handleGoToCheckout}> Go to Checkout</Button>
            )}  
        </p>
        </Modal>
    );
}