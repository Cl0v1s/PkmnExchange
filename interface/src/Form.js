import React, { Component } from "react";

import Save from './engine/Save';

import PokemonItem from "./PokemonItem";

class Form extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            "team" : [],
        }

        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(evt)
    {
        let reader = new FileReader();
        reader.readAsArrayBuffer(evt.target.files[0]);

        reader.addEventListener("load", (ev) =>
        {
            let save = new Save(ev.target.result);
            this.setState({
                "team" : save.getTeam()
            });
        });
    }

    render()
    {
        let pkmns = this.state.team.map((e) => {
            return (
                <PokemonItem pkmn = {e} />
            )
        });
        return (
            <div>
                {
                    this.state.team.length  <= 0 && 
                    <form>
                        <input type="file" onChange={ this.handleFile } />
                    </form>
                }
                { pkmns }

            </div>
        );
    }
}

export default Form;