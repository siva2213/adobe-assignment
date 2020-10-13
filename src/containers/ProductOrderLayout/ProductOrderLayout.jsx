import React, { Component } from "react";
import ProductListData from "../../shared/dummydata.json";
import ProductList from "../ProductList/ProductList";
import CardContainer from "../CartContainer/CartContainer";
import "./ProductOrderLayout.css";
import { cloneDeep } from "lodash";

class ProductOrderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      selectedProducts: [],
      selectedProduct: {},
      totalAmount: "",
      discountedAmount: "",
      totalOrderValue: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log(ProductListData);
    if (!state.productList.length) {
      state.productList = ProductListData.items;
    }
    return state;
  }

  orderCalculations = (modifiedState) => {
    let displaySum = modifiedState.reduce((acc, cur) => {
      return +acc + +cur.price.display;
    }, 0);
    let actualSum = modifiedState.reduce((acc, cur) => {
      return +acc + +cur.price.actual;
    }, 0);
    let discountedAmount = displaySum - actualSum;
    this.setState({
      totalAmount: displaySum,
      discountedAmount: discountedAmount,
      totalOrderValue: actualSum,
    });
  };
  orderCalculationsOnIncreaseAndDecrease = (modifiedState, quantity) => {
    let displaySum = modifiedState.reduce((acc, cur) => {
      return +acc + +cur.price.display;
    }, 0);
    let actualSum = modifiedState.reduce((acc, cur) => {
      return +acc + +cur.price.actual;
    }, 0);
    let discountedAmount = displaySum - actualSum;
    this.setState({
      totalAmount: +displaySum * +quantity,
      discountedAmount: +discountedAmount * +quantity,
      totalOrderValue: +actualSum * +quantity,
    });
  };

  onSelectedProducts = (selectedProd) => {
    if (
      this.state.selectedProducts &&
      this.state.selectedProducts.length &&
      this.state.selectedProducts.every(
        (item) => item.name !== selectedProd.name
      )
    ) {
      selectedProd["quantity"] = 1;
      this.setState((prevState) => {
        let modifiedState = cloneDeep(prevState.selectedProducts);
        modifiedState.push(selectedProd);
        this.orderCalculations(modifiedState);
        return {
          selectedProducts: modifiedState,
          selectedProduct: selectedProd,
        };
      });
    } else if (
      this.state.selectedProducts &&
      !this.state.selectedProducts.length
    ) {
      selectedProd["quantity"] = 1;
      this.setState({
        selectedProducts: [selectedProd],
        selectedProduct: selectedProd,
        totalAmount: selectedProd.price.display,
        discountedAmount:
          selectedProd.price.display - selectedProd.price.actual,
        totalOrderValue: selectedProd.price.actual,
      });
    }
  };

  onDeleteProduct = (selectedProd) => {
    this.setState((prevState) => {
      let modifiedState = prevState.selectedProducts.filter(
        (prod) => prod.name !== selectedProd.name
      );
      this.orderCalculations(modifiedState);
      return {
        selectedProducts: modifiedState,
      };
    });
  };

  onIncrease = (selectedProd) => {
    this.setState((prevState) => {
      let modifiedState = cloneDeep(prevState.selectedProducts).map((prod) => {
        if (prod.name === selectedProd.name) {
          prod.quantity = prod.quantity + 1;
          return prod;
        }
        return prod;
      });
      this.orderCalculationsOnIncreaseAndDecrease(
        modifiedState,
        selectedProd.quantity + 1
      );
      return {
        selectedProducts: modifiedState,
      };
    });
  };
  onDecrease = (selectedProd) => {
    if (!(selectedProd.quantity - 1)) {
      this.onDeleteProduct(selectedProd);
    } else {
      this.setState((prevState) => {
        let modifiedState = cloneDeep(prevState.selectedProducts).map(
          (prod) => {
            if (prod.name === selectedProd.name) {
              prod.quantity = prod.quantity - 1;
              return prod;
            }
            return prod;
          }
        );
        this.orderCalculationsOnIncreaseAndDecrease(
          modifiedState,
          selectedProd.quantity - 1
        );
        return {
          selectedProducts: modifiedState,
        };
      });
    }
  };

  render() {
    return (
      <>
        <div className="page-header">
          <div className="page-header-content">All Items</div>
          {this.state.selectedProduct &&
          Object.keys(this.state.selectedProduct).length ? (
            <div className="page-header-content">
              {this.state.selectedProduct.name} is added to cart
            </div>
          ) : (
            <div></div>
          )}
          <div className="page-header-content"></div>
        </div>
        <div id="content">
          <div className="inner-content">
            <ProductList
              productList={this.state.productList}
              onSelectedProducts={this.onSelectedProducts}
            />
          </div>
          <div className="inner-content">
            <CardContainer
              selectedItems={
                this.state.selectedProducts.length === 0
                  ? ""
                  : this.state.selectedProducts.length
              }
              onDecrease={this.onDecrease}
              onIncrease={this.onIncrease}
              selectedProducts={this.state.selectedProducts}
              onDeleteProduct={this.onDeleteProduct}
              totalOrderValue={this.state.totalOrderValue}
              discountedAmount={this.state.discountedAmount}
              totalAmount={this.state.totalAmount}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ProductOrderLayout;
