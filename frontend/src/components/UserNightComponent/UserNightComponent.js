import React, { Component } from 'react';
import Vote from '../Vote';
import NarratorNight from '../NarratorNightComponent';
import {Button} from 'react-bootstrap'
import PlayerList from "../Game/PlayerList";
import Instructions from '../Game/Instructions'

class UserNightComponent extends Component {
    constructor(props) {
        super(props);
        console.log('role for user: ', this.props.role);
        this.state = {
            voted: false,
            backgroundSrc: '',
            description: '',
            NurseDescription: 'You Are A Nurse',
            SheriffDescription: 'You Are A Sheriff',
            CivilianDescription: 'You Are A Civilian',
            MafiaDescription: 'You Are A Mafioso',
            HostDescription: 'You are the host. You observe all, but say nothing.'
        };
    }
    componentDidMount() {
        this.setBackground();
    }

    //render function for nurse
    setBackground() {
        console.log('setting role: ', this.props.role)
        const role = this.props.role;
        if (role === 'civilian') {
            this.setState({ backgroundSrc: "/images/CivilianCard.png", description: this.state.CivilianDescription });
        }
        else if (role === 'sheriff') {
            this.setState({ backgroundSrc: "/images/SheriffCard.png", description: this.state.SheriffDescription });
        }
        else if (role === 'nurse') {
            this.setState({ backgroundSrc: "/images/NurseCard.png", description: this.state.NurseDescription });

        }
        else if (role === 'mafia') {
            this.setState({ backgroundSrc: "/images/MafiaCard.png", description: this.state.MafiaDescription });

        }
        else {
            this.setState({ backgroundSrc: "/images/NarratorCard.png", description: this.state.HostDescription });
        }
        console.log('set descriptions ', this.state.description)

    }

    changeVoteHandler = (e) => {
        this.setState({
            voted: e.target.value
        });
    }

    render() {
        return (
            <div>
                {this.props.role === 'host' ?
                    <div>
                        <NarratorNight
                            resolve_votes={this.props.resolve_votes}
                            backgroundSrc={this.state.backgroundSrc}
                            mafiaVotes={this.props.mafiaVotes}
                            sheriffVotes={this.props.sheriffVotes}
                            civilianVotes={this.props.civilianVotes}
                            nurseVotes={this.props.nurseVotes}
                            role={this.props.role}
                            handleVote={this.props.handleVote}
                            handleQuizVote={this.props.handleQuizVote}
                            aliveUsers={this.props.aliveUsers}
                            currentUser={this.props.currentUser}
                            prevVote={this.props.prevVote}
                        />
                    </div>
                    :<div>
                    <Vote
                        backgroundSrc={this.state.backgroundSrc}
                        mafiaVotes={this.props.mafiaVotes}
                        sheriffVotes={this.props.sheriffVotes}
                        civilianVotes={this.props.civilianVotes}
                        quizQuestion={this.props.quizQuestion}
                        nurseVotes={this.props.nurseVotes}
                        role={this.props.role}
                        handleVote={this.props.handleVote}
                        handleQuizVote={this.props.handleQuizVote}
                        aliveUsers={this.props.aliveUsers}
                        currentUser={this.props.currentUser}
                        prevVote={this.props.prevVote}
                    />
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
                }
            </div>
        );
    }
}
export default UserNightComponent;
