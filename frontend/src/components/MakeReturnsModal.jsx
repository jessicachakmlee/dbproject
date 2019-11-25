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

const MakeReturnsModal = props => {
    const currDate = () => {
        let d = new Date();
        return d.getFullYear() + "-"
            + (d.getMonth() + 1) + "-"
            + d.getDate();
    };
    const currTime = () => {
        let d = new Date();
        return d.getHours() + ":"
            + d.getMinutes() + ":"
            + d.getSeconds();
    };

    const value = 200;

    // form values
    const [rid, setRid] = useState(null);
    const [odometer, setOdometer] = useState(null);
    const [fulltank, setfulltank] = useState(null);

    const createReturns = () => {

        // Check the rid value
        const getRentVehicleInfo = () => {
            // search rent db for given rid
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            fetch(`/api/rent/${rid}`)
                .then(res => res.json())
                .then(res => {
                    if (res.error === 'Database error.') {
                        alert(res.error);
                    } else if (res.length === 0) {
                        alert('The following rent id does not exist. Please check your id and try again.');
                    } else if (res.length > 1) {
                        alert('Database has been corrupted. More than one rid was found');
                    } else {
                        return res[0];
                    }
                })
                .catch(err => alert('Error retrieving rent info from rid. Please try again.'))
        }

        const bodyVar = {
            rid: rid,
            date: currDate(),
            time: currTime(),
            odometer: odometer,
            fulltank: fulltank,
            value: value
        };
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('/api/return/new', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(bodyVar)
        }).then(res => res.json()).then(res => {
                if (res.error === 'Database error.') {
                    alert('Error creating return. Please try again.');
                } else {
                    alert(`Return Agreement created. Your rid is ${rid}. Here are the details:
                    rid: ${bodyVar.rid}
                    date: ${bodyVar.date}
                    time: ${bodyVar.time}
                    odometer: ${bodyVar.odometer}
                    fulltank: ${bodyVar.fulltank}
                    value: ${bodyVar.value}                
                    `);
                }
            }
        )
    };

    return (
            <OverlayWrapper>
                <OverlaySpan>
                    <ContentDiv>
                        <StyledXButtonLink to={'/'}>X</StyledXButtonLink>
                        <Row>
                        <FormatLeftCol>
                            <h1>Vehicle Return</h1>
                            <FormGroup>
                                <Label for="rid">Rid</Label>
                                <Input value={rid} onChange={e => setRid(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="odometer">Odometer</Label>
                                <Input value={odometer} onChange={e => setOdometer(e.target.value)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="fulltank">Full Tank</Label>
                                <Input value={fulltank} onChange={e => setfulltank(e.target.value)}/>
                            </FormGroup>
                        </FormatLeftCol>
                        </Row>
                        <Row><Button color={'success'} onClick={() => createReturns()}>Return Vehicle</Button></Row>
                    </ContentDiv>
                </OverlaySpan>
            </OverlayWrapper>
    )
};

export default MakeReturnsModal;