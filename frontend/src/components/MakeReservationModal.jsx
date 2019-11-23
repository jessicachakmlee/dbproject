import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {
    Container,
    Row,
    Col,
    CardTitle,
    Form,
    Button,
    FormGroup, Label, Input, FormText
} from 'reactstrap';

const OverlayWrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2001;
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 60px 20px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
`;

const OverlaySpan = styled.span`
    margin: 0px auto;
`;

const ContentDiv = styled.div`
    max-width: calc(90%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 60px 20px;
    transform: scale(1);
    display: flex;
    max-height: calc(100vh - 50px);
    background: white;
    margin: 0px auto;
    padding: 40px;
    overflow: auto;
`;

const StyledXButtonLink = styled(Link)``;

const MakeReservationModal = props => {
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [dLicense, setDLicense] = useState(null);
    const [address, setAddress] = useState(null);
    const [confNo, setConfNo] = useState(null);


    const retrieveCustomerInformation = (err, res) => {
        fetch(`/api/customer/${phoneNumber}/retrieveCustomer`)
            .then(res => res.json())
            .then(res => {
                if (res.length === 0) {
                    alert('Customer does not exist in database. Please create new customer file.');
                } else {
                    setName(res[0].name);
                    setDLicense(res[0].dlicense);
                    setAddress(res[0].address);
                }
            })
            .catch(err => alert('Error retrieving customer. Please try again.'))
    }

    const creatingACustomerFile = (err, res) => {
        let data = {
            cellphone: phoneNumber,
            name: name,
            address: address,
            dlicense: dLicense,
        }
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('/api/customer/new', {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            if (res.error === 'Database error.') {
                alert('Error creating Customer. Customer may already exist. Please retrieve Customer.' +
                    ' If retrieving customer does not work, then try creating customer again.');
            } else {
                alert('Customer is created');
            }
        }).catch(err => alert('Error creating Customer. Please try again'))
    }

    const creatingAReservation = (err, res) => {
        let data = {
            confNo: confNo,
            vtname: props.location.state.vehicleType,
            cellphone: phoneNumber,
            dlicense: dLicense,
            fromDate: props.location.state.fromDate,
            fromTime: props.location.state.fromTime,
            toDate: props.location.state.toDate,
            toTime: props.location.state.toTime
        };
        let alertReservationNotCreated = () => alert(`Error in creating reservation. Please try again.`);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch(`/api/reservation/create`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        }).then(res => res.json()).then(res => {
            if (res.error === 'Database error.') {
                alertReservationNotCreated();
            } else {
                alert(`Reservation created. Your confirmation number is ${confNo}. Here are the details: 
            City: ${props.location.state.city}.
            Location: ${props.location.state.location}.
            Vehicle Type: ${props.location.state.vehicleType}.
            FromDate: ${props.location.state.fromDate}.
            FromTime: ${props.location.state.fromTime}.
            ToDate: ${props.location.state.toDate}.
            ToTime: ${props.location.state.toTime}`);
            }
        }).catch(err => alertReservationNotCreated());
    }

    const createConfirmationNumber = () => {
        return Math.ceil(Math.random() * 90000) + 10000;
    };

    useEffect(() => {
        let confNo = createConfirmationNumber();
        setConfNo(confNo);
    }, []);

    return (
        <OverlayWrapper>
            <OverlaySpan>
                <StyledXButtonLink to={'/'}>X</StyledXButtonLink>
                <ContentDiv>
                    <Container>
                        <Row>
                            <h3>Customer Information</h3>
                            <Form>
                                <FormGroup>
                                    <Label for="phoneNumber">Phone Number</Label>
                                    <Input type="phoneNumber" name="phoneNumber" id="examplePhoneNumber"
                                           onChange={e => setPhoneNumber(e.target.value)}/>
                                    <Button color={'primary'} onClick={() => retrieveCustomerInformation()}>Retrieve
                                        Customer</Button>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">First Name Last Name</Label>
                                    <Input type="name" name="name" id="exampleName" placeholder="ie: Jon Snow"
                                           value={name} onChange={e => setName(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleDLicense">Driver's License</Label>
                                    <Input type="dLicense" name="dLicense" id="exampleDLicense" value={dLicense}
                                           onChange={e => setDLicense(e.target.value)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleAddress">Address</Label>
                                    <Input type="address" name="address" id="exampleAddress" value={address}
                                           onChange={e => setAddress(e.target.value)}/>
                                </FormGroup>
                                <Button color={'primary'} onClick={() => creatingACustomerFile()}>Create Customer</Button>
                            </Form>
                        </Row>
                        <Row><h3>Reservation Details</h3></Row>
                        <Row><p>City: {props.location.state.city}</p></Row>
                        <Row><p>location: {props.location.state.location}</p></Row>
                        <Row><p>Vehicle Type: {props.location.state.vehicleType}</p></Row>
                        <Row><p>FromDate: {props.location.state.fromDate}</p></Row>
                        <Row><p>FromTime: {props.location.state.fromTime}</p></Row>
                        <Row><p>ToDate: {props.location.state.toDate}</p></Row>
                        <Row><p>ToTime: {props.location.state.toTime}</p></Row>
                        <Row>
                            <Button color={'danger'} onClick={() => creatingAReservation()}>Create Reservation</Button>
                        </Row>
                    </Container>
                </ContentDiv>
            </OverlaySpan>
        </OverlayWrapper>
    )
};

export default MakeReservationModal;