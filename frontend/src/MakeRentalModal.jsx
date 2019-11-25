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
    max-width: 1000px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 60px 20px;
    transform: scale(1);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 50px);
    background: white;
    margin: 0px auto;
    padding: 40px;
    overflow: auto;
`;

const StyledXButtonLink = styled(Link)`
color: black;
font-weight: 800;
position: absolute;
z-index: 2002;
top: 0;
left: 10px;
`;

const FormatLeftCol = styled(Col)`
margin-right: 50px;
`;

const MakeRentalModal = props => {
    const [rid, setRid] = useState(null);
    const [odometer, setOdometer] = useState(7849);
    const [vlicense, setvlicense] = useState(null);
    const [dlicense, setdlicense] = useState(props.location.state.reservationObj.dlicense);
    const [cardName, setCardName] = useState(null);
    const [cardNo, setCardNo] = useState(null);
    const [expDate, setExpDate] = useState(null);

    const createRid = () => {
        return Math.ceil(Math.random() * 90000) + 10000;
    };

    useEffect(() => {
        let rid = createRid();
        setRid(rid);
    }, []);

    const createRentalAgreement = () => {
        const bodyVar = {
            rid: rid,
            vlicense: vlicense,
            dlicense: dlicense,
            fromDate: props.location.state.reservationObj.fromdate,
            fromTime: props.location.state.reservationObj.fromtime,
            toDate: props.location.state.reservationObj.todate,
            toTime: props.location.state.reservationObj.totime,
            odometer: odometer,
            cardName: cardName,
            cardNo: cardNo,
            expDate: expDate,
            confNo: props.location.state.reservationObj.confNo
        };
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('/api/rent/new', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(bodyVar)
        }).then(res => res.json()).then(res => {
                if (res.error === 'Database error.') {
                    alert('Error creating rental. Please try again.');
                } else {
                    alert(`Rental Agreement created. Your rid is ${rid}. Here are the details:
                    rid: ${bodyVar.rid}
                    vlicense: ${bodyVar.vlicense}
                    dlicense: ${bodyVar.dlicense}
                    fromDate: ${bodyVar.fromDate}
                    fromTime: ${bodyVar.fromTime}
                    toDate: ${bodyVar.toDate}
                    toTime: ${bodyVar.toTime}
                    odometer: ${bodyVar.odometer}
                    cardName: ${bodyVar.cardName}
                    cardNo: ${bodyVar.cardNo}
                    expDate:${bodyVar.expDate}
                    confNo: ${bodyVar.confNo}
                    `);
                }
            }
        )
    };

    const headers = Object.keys(props.location.state.reservationObj);
    const values = Object.values(props.location.state.reservationObj);

    return (
            <OverlayWrapper>
                <OverlaySpan>
                    <ContentDiv>
                        <StyledXButtonLink to={'/'}>X</StyledXButtonLink>
                        <Row>
                        <FormatLeftCol>
                            <h1>Car Rental Form</h1>
                            <FormGroup>
                                <Label for="dlicense">Driver's License</Label>
                                <Input value={dlicense} onChange={e => setdlicense(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="vlicense">Vehicle's License</Label>
                                <Input value={vlicense} onChange={e => setvlicense(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="cardname">Card Name</Label>
                                <Input value={cardName} onChange={e => setCardName(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="cardNumber">Card Number</Label>
                                <Input value={cardNo} onChange={e => setCardNo(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="cardExpDate">Card Expiry Date</Label>
                                <Input value={expDate} onChange={e => setExpDate(e.target.value)}/>
                            </FormGroup>
                        </FormatLeftCol>
                        <Col>
                            <Row><h3>Reservation Details</h3></Row>
                            {headers.map( (h, index) => {
                                return <Row><p>{h + ': ' + values[index]}</p></Row>
                            })}
                        </Col>
                        </Row>
                        <Row><Button color={'success'} onClick={() => createRentalAgreement()}>Create Rental Agreement</Button></Row>
                    </ContentDiv>
                </OverlaySpan>
            </OverlayWrapper>
    )
};

export default MakeRentalModal;