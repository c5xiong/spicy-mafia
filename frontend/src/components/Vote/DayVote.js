import React, { Component } from 'react';

import Image from 'react-bootstrap/Image';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './DayVote.css';

import WebSocketInstance from '../../services/WebSocket';
import Instructions from "../Game/Instructions";
import Game from "../Game/Game";
import UserDayComponent from '../UserDayComponent/UserDayComponent';

import PlayerList from "../Game/PlayerList";


export default class DayVote extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    // recieve vote and reflect that vote

    render() {
        const isAccused = this.props.accused === this.props.currentUser;
        return (
            <div className={"DayVote"}>
                <h1 className={"header"}>{this.props.currentUser}</h1>
                <Card style = {{width: '30rem', height:'auto',verticalAlign:'middle'}}>
                    <Card.Body bsPrefix={"body"}>
                        <Card.Title>IS {this.props.accused} GUILTY?</Card.Title>
                        <div>
                            <Button onClick={() => WebSocketInstance.sendMessage({
                                'command': 'on_trial_vote',
                                playername: this.props.currentUser,
                                vote: 'Guilty!'
                            })}
                                    variant="secondary" size="lg" block disabled={isAccused}>
                                YES
                            </Button>
                            <Button onClick={() => WebSocketInstance.sendMessage({
                                'command': 'on_trial_vote',
                                playername: this.props.currentUser,
                                vote: 'Innocent!'
                            })}
                                    variant="secondary" size="lg" block disabled={isAccused}>
                                NO
                            </Button>
                        </div>
                        <Form>

                            <fieldset className="formPeopleVotes">
                                <Card.Title>CONSENSUS:</Card.Title>
                                {
                                    Object.keys(this.props.trialVotes)
                                        .map((name) =>
                                            <Card.Text> {name}: {this.props.trialVotes[name]}</Card.Text>
                                        )
                                }
                            </fieldset>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="ingameButtonContainer">
                  <Button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="instructionsButton">INSTRUCTIONS</Button>
                    <Instructions
                        show={this.state.instructionShow}
                        onHide={() => this.setState({ instructionShow: false })}
                    />
                  <Button className="playerListButton" onClick={() => this.setState({ playersShow: true })}>PLAYER LIST</Button>
                    <PlayerList
                        users={this.props.users}
                        currentUser={this.props.currentUser}
                        show={this.state.playersShow}
                        onHide={() => this.setState({ playersShow: false })}
                    />
                </div>
            </div>
        )
    }
}
