import React from "react";
import "./ProductList.css";

export default function ProductList(props) {
  return (
    <div className="card-container">
      {props.productList.map((product) => {
        return (
          <div className="card-body" key={product.name}>
            <div className="product-img">
              <div className="offer-tag">{product.discount}% off</div>
              <img alt={product.name} src={product.image} height="175" />
            </div>
            <div>
              <div className="product-desc">{product.name}</div>
              <div className="product-desc">
                <div className="product-desc">
                  <span
                    style={{ color: "red", "text-decoration": "line-through" }}
                  >
                    ${product.price.display}
                  </span>
                  &nbsp;${product.price.actual}
                </div>
                <div className="product-desc">
                  <button onClick={() => props.onSelectedProducts(product)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
