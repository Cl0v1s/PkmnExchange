import React, { Component } from 'react';

import PokemonItem from "./PokemonItem";

class PokemonDrop extends Component 
{

    constructor(props)
    {
        super(props);
        this.dragOver = this.dragOver.bind(this);
        this.drop = this.drop.bind(this);
    }

    dragOver(e)
    {
        e.preventDefault();
    }

    drop(e)
    {
        e.preventDefault();
        this.props.onChange(JSON.parse(e.dataTransfer.getData('application/json')).index)
    }

    render()
    {
        return (
            <div>
                <div onDragOver={ this.dragOver } onDrop={ this.drop }>
                { 
                    this.props.pkmn != null && 
                    <PokemonItem pkmn={ this.props.pkmn } />
                }
                Je suis ici
                </div>
            </div>
        );
    }
}

export default PokemonDrop;