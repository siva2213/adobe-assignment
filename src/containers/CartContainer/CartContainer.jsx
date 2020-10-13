import React, { Component, Fragment } from "react";
import "./CartContainer.css";

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="cart-container">
        <div className="items-list">
          <div className="item-header item">
            <div className="item-content">Items{this.props.selectedItems}</div>
            <div className="item-content">Qty</div>
            <div className="item-content">Price</div>
          </div>
          {/* //array */}
          {this.props.selectedProducts.map((product) => {
            return (
              <div className="item-inner-content" key={product.name}>
                <div className="item-content">
                  <div className="item-content-desc-actions">
                    {/* <div className="item-content-desc-action">*</div> */}
                    <div className="item-content-desc-action">
                      {product.name}
                    </div>
                    <div
                      className="item-content-desc-action pointer"
                      onClick={() => this.props.onDeleteProduct(product)}
                    >
                      x
                    </div>
                  </div>
                </div>
                <div className="item-content">
                  <div className="inc-dec-actions">
                    <div
                      className="inc-dec-action"
                      onClick={() => this.props.onDecrease(product)}
                    >
                      -
                    </div>
                    <div className="inc-dec-action">${product.quantity}</div>
                    <div
                      className="inc-dec-action"
                      onClick={() => this.props.onIncrease(product)}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="item-content">${product.price.display}</div>
              </div>
            );
          })}

          {/* //array */}
        </div>
        <div className="divider"></div>
        <div className="total-content">
          <strong>Total</strong>
          {/* //array */}
          <div className="total-content-list">
            <div className="total-content-desc">
              Items{this.props.selectedItems}
            </div>
            <div className="total-content-desc">:</div>
            <div className="total-content-desc">${this.props.totalAmount}</div>
          </div>
          <div className="total-content-list">
            <div className="total-content-desc">Discount</div>
            <div className="total-content-desc">:</div>
            <div className="total-content-desc">
              -${this.props.discountedAmount}
            </div>
          </div>
          <div className="total-content-list">
            <div className="total-content-desc">Type Discount</div>
            <div className="total-content-desc">:</div>
            <div className="total-content-desc">-$0</div>
          </div>
          <div className="total-content-list">
            <div className="total-content-desc">Order Total</div>
            <div className="total-content-desc">:</div>
            <div className="total-content-desc">
              ${this.props.totalOrderValue}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartContainer;
