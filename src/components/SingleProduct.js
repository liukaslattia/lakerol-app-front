import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../contexts/MyContext'
import { Link, useParams } from "react-router-dom";

import axios from 'axios'
import Login from './Login'
import Register from './Register'

import { Container, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function SingleProduct() {

    const Axios = axios.create({
        baseURL: 'https://lakerol-app.online/api/',
    });

    const { rootState, logoutUser } = useContext(MyContext);
    const { isAuth, showLogin } = rootState;
    const params = useParams();



    const initialState = {
        userInfo: {
            productCode: '',

        },
        errorMsg: '',
        successMsg: '',
        check: false,
        product: ''

    }

    const [state, setState] = useState(initialState);

    // Get desired product data
    useEffect(() => {
        Axios.get(`get-product.php?productGtin=${params.productGtin}`).then(resp => {

            if (resp.data.message === 'No product found') {
                setState({
                    ...state,
                    check: false,
                    errorMsg: resp.data.message
                })
            } else {
                setState({
                    ...state,
                    check: true,
                    product: resp.data
                })
            }
        })

    }, [])



    // If user Logged in
    if (isAuth) {
        return (
            <Container>
                <div className="searchBar">
                    <Link to="/">
                        <button>Back to search</button>
                    </Link>
                </div>
                {state.errorMsg}

                {state.check === true && <Container xs={1} md={2} className="g-4">

                    {state.product.map((item =>
                        <div className="details">
                            <div className="details-img">
                                <img alt="product" src={`https://lakerol-app.online/api/images/${item.productGtin}.png`} />
                            </div>
                            <div className="details-table">
                                <Table striped bordered hover>
                                    <thead>

                                        <tr>
                                            <th>Product Name</th>
                                            <th>Product Weight</th>
                                            <th>Product Kcal (per 100g)</th>
                                            <th>Product Carbs (per 100g)</th>
                                            <th>Product GTIN-code</th>

                                        </tr>
                                        <tr key={item.productId}>

                                            <td>{item.productName} </td>
                                            <td>{item.productWeight} g</td>
                                            <td>{item.productKcal} Kcal</td>
                                            <td>{item.productCarbs} g</td>
                                            <td>{item.productGtin} </td>
                                        </tr>
                                    </thead>

                                </Table>
                            </div>
                        </div>
                    ))}

                </Container>

                }




            </Container>

        )

    }

    else if (showLogin) {
        return <Login />;
    }
    else {
        return <Register />;
    }
}

export default SingleProduct