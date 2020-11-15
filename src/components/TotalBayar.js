import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import {API_URL} from '../utils/constants'

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar : totalBayar,
            menus: this.props.carts
        }

        Axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push('success')
        })
    }

  render() {
    // const totalBayar = [1, 2, 3, 4];
    const totalBayar = this.props.carts.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4 py-2">
            <h6>
              Total Harga: Rp. <strong>{numberWithCommas(totalBayar)}</strong>{" "}
            </h6>
            <Button variant="success" block className="mx-2 my-2" onClick={() => this.submitTotalBayar(totalBayar)}>
              <FontAwesomeIcon icon={faShoppingCart} />{" "}
              <strong>Pembayaran</strong>
            </Button>
          </Col>
        </Row>
      </div>
      <div className="d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4 py-2">
            <h6>
              Total Harga: Rp. <strong>{numberWithCommas(totalBayar)}</strong>{" "}
            </h6>
            <Button variant="success" block className="mx-2 my-2" onClick={() => this.submitTotalBayar(totalBayar)}>
              <FontAwesomeIcon icon={faShoppingCart} />{" "}
              <strong>Pembayaran</strong>
            </Button>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
