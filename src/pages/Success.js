import axios from "axios";
import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {API_URL} from '../utils/constants';

export default class Success extends Component {
  componentDidMount() {
    axios.get(API_URL + "keranjangs")
      .then((res) => {
        const carts = res.data;
        carts.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/menunggu.png" width="200" />
        <h2>Sukses</h2>
        <p>Terimakasih sudah memesan!</p>

        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
