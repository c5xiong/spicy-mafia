import React, { Component } from 'react';
import Flipcard from '@kennethormandy/react-flipcard'

import '@kennethormandy/react-flipcard/dist/Flipcard.css'

import Image from 'react-bootstrap/Image';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './DayVote.css';

import WebSocketInstance from '../../services/WebSocket';

export default class DayVote extends Component {
    constructor(props) {
        super(props);
    }

    // recieve vote and reflect that vote

    render() {
        return (
            <div className={"DayVote"}>
                <h1>{this.props.role}</h1>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>IS {this.props.accused} GUILTY?</Card.Title>
                        <div>
                            <Button onClick={() => WebSocketInstance.sendMessage({ 'command': 'on_trial_vote', playername: this.props.currentUser, vote: 'Guilty!' })}
                            variant="secondary" size="lg" block>
                                YES
                            </Button>
                            <Button onClick={() => WebSocketInstance.sendMessage({ 'command': 'on_trial_vote', playername: this.props.currentUser, vote: 'Innocent!' })}
                            variant="secondary" size="lg" block>
                                NO
                            </Button>
                        </div>
                        <Form>

                        <fieldset className="formPeopleVotes">
                        <Card.Title>THE PEOPLE SAY:</Card.Title> 
                        {
                            Object.keys(this.props.trialVotes)
                            .map( (name) => 
                                <Card.Text> {name}: {this.props.trialVotes[name]}</Card.Text>
                            )
                        }
                        </fieldset>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}

/*
return (
    //flip card one side shows yes/no button, other side shows who voted yes who voted no
    <Flipcard >
        <div >
            Side A
        </div>
        <div >
            Side B
        </div>

    </Flipcard>
)
*/