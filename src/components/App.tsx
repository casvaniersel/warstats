import * as React from 'react';
import ApiService from "../services/ApiService";

export class State {
    kd: string = "0.0";
}

export class App extends React.PureComponent<State, {}> {

    public state = new State();

    constructor(props) {
        super(props);
    }

    private async updatePlayer() {
        let data = await ApiService.getPlayerDataFor("c4zler");
        let result = await data.json();
        this.setState({ kd: result.br.kdRatio});
    }

    componentDidMount() {
        this.updatePlayer();
    }

    render() {
        return (
            <div>
                <div id="kd">{this.state.kd}</div>
            </div>
        );
    }
}
