import React, { useEffect, useState } from "react";
import * as firebase from "../../../firebase";
import { Navbar, Card, ListGroup, ListGroupItem, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import tool from '../../../tool.png';
import '../ListEquipments/ListEquipments.css';

function ListEquipments() {

    const [equipments, setEquipments] = useState([]);
    const [search, setSearch] = useState("");
 
    useEffect(() => {
        const equipmentsData = firebase.database.ref("Equipments");
        equipmentsData.on("value", res => {
            let data = res.val();
            setEquipments(data);
        });
    }, []);
    
    //Convert my object to map : L'objet Map représente un dictionnaire, autrement dit une carte de clés/valeurs.
    const convertToMap = new Map(Object.entries(equipments));
    //Convert map to array
    const convertToArray = Array.from(convertToMap);
 
  return (
    <div className="App">
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
                <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" onChange={e => setSearch(e.target.value)} />
                <Button variant="outline-info">Go</Button>
            </Form>
        </Navbar>
        {
            convertToArray.filter((e)=> {
                if (search === "") {
                    return e[1]
                } else if (e[1].name.toLowerCase().includes(search.toLocaleLowerCase())){
                    return e[1]
                }
            }).map((e, i) => (
                <div key={e[0]} className="div-card">
                    <Card className="card-equipment" style={{ width: '18rem' }}>
                        <Card.Img variant="top" width="460" height="345" src={e[1].photo} />
                        <Card.Body>                            
                            <Card.Title>{e[1].name}</Card.Title>
                        </Card.Body>
                         <ListGroup className="list-group-flush">
                            <ListGroupItem>Domaine: {e[1].domain}</ListGroupItem>
                            <ListGroupItem>Nombres de défauts: {e[1].nbFaults}</ListGroupItem>
                        </ListGroup>
                        <Card.Body>                            
                            <Card.Link href={`/${e[0]}`}>Détails</Card.Link>
                        </Card.Body>
                    </Card>     
                </div>  
            ))
        }
    </div>
  );
};

export default ListEquipments;