import React, { useContext, useState } from 'react'
import { MyContext } from '../contexts/MyContext'
import axios from 'axios'

// Importing the Login & Register Componet
import Login from './Login'
import Register from './Register'
import { Link, useHistory } from 'react-router-dom'
import { Form, Card, Row, Col, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Axios = axios.create({
    baseURL: 'https://lakerol-app.online/api/',
});

function Home() {

    const { rootState, logoutUser } = useContext(MyContext);
    const { isAuth, theUser, showLogin } = rootState;
    let history = useHistory();

    const initialState = {
        userInfo: {
            productCode: '',

        },
        errorMsg: '',
        check: false,
        product: ''

    }

    const [state, setState] = useState(initialState);
    const [validated, setValidated] = useState(false);

    // On change input value (productGTIN)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo: {
                ...state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    }

    // Redirect to given products details-page
    const searchProduct = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }


        setValidated(true);
        history.push(`/product/${state.userInfo.productCode}`)


    }

    // Get all products from db
    const getAllProducts = async (event) => {

        event.preventDefault();

        const getProduct = await Axios.get(`get-all-products.php`, {
        });
        if (getProduct.data.message === 'No products found') {
            setState({
                ...state,
                check: false,
                errorMsg: getProduct.data.message
            })
        } else {
            setState({
                ...state,
                check: true,
                product: getProduct.data
            })


        }


    }



    // If user Logged in
    if (isAuth) {
        return (
            <Container >

                <div className="UserInfo">
                <h1>{theUser.name}</h1>

                    <button className="button" onClick={logoutUser}>Logout</button>
                </div>
                <div className="searchBar">
                    <h1>Search Product</h1>
                    <Form onSubmit={searchProduct} noValidate={validated}>
                        <label>Product GTIN-code</label>
                        <input name="productCode" required placeholder="Enter GTIN-code" value={state.userInfo.productCode} onChange={onChangeValue} />
                        <button className="button" type="submit" >Search</button>

                    </Form>
                </div>
                <div className="container">
                    <Form onSubmit={getAllProducts} noValidate>

                        <button className="button" type="submit" >Show all</button>

                    </Form>
                </div>




                {state.check === false && state.errorMsg}

                <div className="container">
                    {state.check === true && <Row xs={1} md={2} className="g-4">

                        {state.product.map((item =>
                            <Col>
                                <Card className="card">
                                    <Card.Title>{item.productName}</Card.Title>

                                    <Card.Img className="card-img" variant="top" src={`https://lakerol-app.000webhostapp.com/api/images/${item.productGtin}.png`} />

                                    <Card.Body>


                                    </Card.Body>

                                    <Link to={`/product/${item.productGtin}`}>
                                        <button variant="primary">Show Details</button>

                                    </Link>
                                </Card>
                            </Col>
                        ))}

                    </Row>

                    }


                </div>

            </Container>


        )
    }
    // Showing Login Or Register Page According to the condition
    else if (showLogin) {
        return <Login />;
    }
    else {
        return <Register />;
    }

}

export default Home;