import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig ={
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data, 
        isLoading: isSending,
        error,
        sendRequest,
        clearData

    } = useHttp(
        'http://localhost:3000/orders',
        requestConfig
    );

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 0
    );
    
    function handleClose(){
        userProgressCtx.hideCheckout;

    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
       

    }


    function handleSubmit(event){
        event.preventDefault();

        const fd = new  FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        
        const orderData = JSON.stringify({
            order:{
                items: cartCtx.items,
                customer: customerData
            },
        });
        console.log('Order Data Being Sent:', orderData); // Log data before sending

        sendRequest(orderData);
    }

    let actions = (
        <>
            <Button textOnly onClick={handleClose}> Close</Button>
            <Button type ="submit"> Submit Order</Button>
                
        </>
    )

    if (isSending){
        actions = <span> Sending order data...</span>;
    }

    if (data && !error){
        return(
            <Modal 
                open = {userProgressCtx.progress ==='checkout'}
                onClose ={handleFinish}
            >   
                <h2>Sucess!</h2>
                <p>Your order was submitted sucessfully.</p>
                <p>
                    We will get back to you with more details via email within
                    the next few minutes.
                </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}> Okay</Button>
                </p>

            </Modal>
        );
    }

    return(
        <Modal open = {userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                
                <Input label = "Full Name" type ="text" id="name"/>
                <Input label = "Email Address" type ="email" id="email"/>
                <Input label = "Street" type ="text" id="street"/>
                <div className=" control-row">
                    <Input label ="Postal Code" type="text" id="postal-code" />
                    <Input label="city" type= "text" id ="city"/>
                </div>
                
                {error && <Error title= "Failed to submit order" message = {error}/>}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}