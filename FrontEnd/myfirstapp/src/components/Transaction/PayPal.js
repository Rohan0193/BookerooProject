import React from "react";
import { PayPalButton} from "react-paypal-button-v2";

//pay pal implementation by - https://developer.paypal.com/docs/business/checkout/configure-payments/single-page-app/
class PayPal extends React.Component {

  //creates order and posts info to transactions database
  createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: this.props.priceOfBook,
          },
        },
      ],
    });
  }
  
  //fired up when paypal transaction is approved
  onApprove = async(data, action) => {
    const response = await action.order.capture();
    this.props.paymentCallBack(response);
  }

  render() {
    return (
        <div>
            {/* header */}
            <div className="container">
                <div className="row">
                    <div className="col-7 offset-3">
                        <h1>Pay through PayPal!</h1>
                            {/* Paypal button */}
                        <div className="paypalbutton">
                            <PayPalButton
                              createOrder={(data, actions) => this.createOrder(data, actions)}
                              onApprove={(data, actions) => this.onApprove(data, actions)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    ); 
  }
}
export default PayPal;