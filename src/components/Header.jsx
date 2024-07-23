import { useContext } from 'react';
import Button from '../UI/Button'
import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext';
export default function Header(){
   const cartCtx = useContext(CartContext);

   const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
   }, 0);



    return(
        <header id ="main-header"> 
            <div id="title">
                <img src={logoImg} alt="Resturant image"/>
                <h1>
                    Order your Food
                </h1>
            </div>
            <nav>
                <Button textOnly={true}> Cart({totalCartItems})</Button>
            </nav>
        </header>
       
    );
}