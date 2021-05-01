import React, { useEffect, useState } from "react";
import * as firebase from "../../../firebase";
import { Navbar, Form, FormControl, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import tool from '../../../tool.png';
import '../DetailsPage/DetailsPage.css';

function DetailsPage() {

    const [equipments, setEquipments] = useState([]);
    const [checkpoints, setCheckpoints] = useState([]);

    useEffect(() => {
        //Get equipments
        const equipmentsData = firebase.database.ref("Equipments");
        equipmentsData.on("value", res => {
            let data = res.val();
            setEquipments(data);
        });
        //Get Checkpoints
        const checkpointsData = firebase.database.ref("Checkpoints");
        checkpointsData.on("value", res => {
            let dataCheckpoints = res.val();
            setCheckpoints(dataCheckpoints);
        })
    }, []);

    //Convert my object to map : L'objet Map représente un dictionnaire, autrement dit une carte de clés/valeurs.
    const convertToMap = new Map(Object.entries(equipments));
    const convertToMapCheckpoints = new Map(Object.entries(checkpoints));
    //Convert map to array
    const convertToArray = Array.from(convertToMap);
    const convertToArrayCheckpoints = Array.from(convertToMapCheckpoints);
    //Récupérer la clé de l'équipement via l'url en supprimant la barre oblique.
    const getKey = window.location.pathname.substring(1);   

    return (
        <div className="DetailsPage">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={tool}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Liste des équipements
                </Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
                    <Button variant="outline-info">Go</Button>
                </Form>
            </Navbar>
            {
            convertToArray.filter((e)=> {
                if (getKey === e[0]) {
                    return e[1]
                } 
            }).map((e) => (
                <div key={e[0]} className="div-card-details">
                    <Card className="card-equipment" style={{ width: '35rem' }}>
                        <Card.Img variant="top" width="460" height="345" src={e[1].photo} />
                        <Card.Body>                            
                            <Card.Title>{e[1].name}</Card.Title>
                        </Card.Body>
                         <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <b>Informations:</b><br></br>
                                Domaine: {e[1].domain}<br></br>
                                Nombres de défauts: {e[1].nbFaults}
                            </ListGroupItem>
                            <ListGroupItem>
                                <b>Caractéristiques:</b><br></br>
                                Modèle: {e[1].model}<br></br>
                                Marque: {e[1].brand}<br></br>
                                Numérie de série: {e[1].serialNumber}
                            </ListGroupItem>
                        </ListGroup>
                    </Card>     
                </div>  
            ))
            }

            {
                convertToArrayCheckpoints.filter((e) => {
                    if (getKey === e[1].equipmentKey) {
                        return e[1]
                    }
                }).map((e) => (
                    <div key={e[0]} className="div-card-details-checkpoints">
                        <Card className="card-equipment" style={{ width: '35rem' }}>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <b>Point de contrôle:</b><br></br>
                                    Nom du point de contrôle: {e[1].name}<br></br>
                                    {e[1].fault !== "" && `Nom du défaut: ${e[1].fault}`}<br></br>
                                    {e[1].recommandation !== "" && `Préconisation: ${e[1].recommandation}`}  
                                    {e[1].photo !== undefined && <Card.Img width="460" height="345" src={e[1].photo} /> }
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </div> 
                ))
            }                           
        </div>
    )
}

export default DetailsPage;

