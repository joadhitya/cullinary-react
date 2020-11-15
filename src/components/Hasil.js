import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      cartDetail: false,
      jumlah: 0,
      keterangan: "",
      tootalHarga: 0,
    };
  }

  handleShow = (cart) => {
    this.setState({
      showModal: true,
      cartDetail: cart,
      jumlah: cart.jumlah,
      keterangan: cart.keterangan,
      totalHarga: cart.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.cartDetail.product.harga * (this.state.jumlah + 1),
    });
  };
  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.cartDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.cartDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.cartDetail.id, data)
      .then((res) => {
        swal({
          title: "Success Update data !",
          text: "Items Updated(" + data.product.nama + ")",
          icon: "success",
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Success Delete data !",
          text: "Items Deleted(" + this.state.cartDetail.nama + ")",
          icon: "success",
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { carts } = this.props;
    return (
      <Col md={3} mt="2">
        Hasil
        <hr />
        {carts.length !== 0 && (
          <Card className="overflow-auto result">
            <ListGroup variant="flush">
              {carts.map((cart) => (
                <ListGroup.Item
                  key={cart.product.id}
                  onClick={() => this.handleShow(cart)}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {cart.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{cart.product.nama}</h5>{" "}
                      <p>Rp. {numberWithCommas(cart.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(cart.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                handleDelete={this.handleDelete}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar carts={carts} {...this.props} />
      </Col>
    );
  }
}
