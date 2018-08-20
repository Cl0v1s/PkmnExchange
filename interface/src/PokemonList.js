import React, { Component } from "react";

import Save from './engine/Save';

import PokemonItem from "./PokemonItem";

class PokemonList extends Component
{

    constructor(props)
    {
        super(props);

        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(evt)
    {
        let reader = new FileReader();
        reader.readAsArrayBuffer(evt.target.files[0]);

        reader.addEventListener("load", (ev) =>
        {
            let save = new Save(ev.target.result);
            this.props.onLoad(save);
        });
    }

    render()
    {
        let index = -1;
        let pkmns = this.props.team == null ? [] : this.props.team.map((e) => {
            index++;
            return (
                <PokemonItem key={ index } pkmn = {e} index={index} />
            )
        });
        return (
            <div>
                {
                    this.props.team == null && 
                    <form>
                        <input type="file" onChange={ this.handleFile } />
                    </form>
                }
                <div className="">
                    { pkmns }
                </div>
            </div>
        );
    }
}

export default PokemonList;