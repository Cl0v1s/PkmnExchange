import React, { Component } from 'react';

import Pokemon from './engine/Pokemon';



class PokemonItem extends Component 
{
    constructor(props)
    {
        super(props);

        this.dragStart = this.dragStart.bind(this);

    }


    dragStart(e)
    {
        e.dataTransfer.setData('application/json', JSON.stringify({"index" : this.props.index}));
    }

    render()
    {
        return (
            <span>
            {
                this.props.pkmn.pokedex != null &&
                <img src={ this.props.pkmn.pokedex.sprites != null ? this.props.pkmn.pokedex.sprites.front_default : "" } onClick={ () => { if(this.props.onClick != null) this.props.onClick(this.props.index) } } onDragStart={ this.dragStart } draggable={ true }/>
            }
            </span>
        );
        return (
            <div class="card" style={{"width": "18rem"}} >
                <div class="card-header">
                    <span>
                        <label>N°. </label>{ this.props.pkmn.getValue(Pokemon.specie) }
                    </span>
                    <span type="button" class="btn btn-primary float-right">
                        Level <span class="badge badge-light">{ this.props.pkmn.getValue(Pokemon.level) }</span>
                    </span>
                </div>
                <img class="card-img-top" src={ this.state.pokedex.sprites != null ? this.state.pokedex.sprites.front_default : "" }/>
                <div class="card-body">
                    <h5 class="card-title">
                    { this.props.pkmn.getNickname() }<br />
                            /<span className="text-uppercase">{ this.state.pokedex.name}</span>
                    </h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        { 
                            ( this.props.pkmn.getValue(Pokemon.hp_current) <<8 | this.props.pkmn.getValue(Pokemon.hp_current+0x1) )
                        }
                        /
                        {
                            ( this.props.pkmn.getValue(Pokemon.hp_max) << 8 | this.props.pkmn.getValue(Pokemon.hp_max+0x1) )
                        }
                    </li>
                    <li class="list-group-item">
                        <label>Status </label>
                        { 
                                this.props.pkmn.getValue(Pokemon.status) == 0 ? "OK" : ""
                        }
                    </li>
                    <li class="list-group-item">
                        <label>Type(s) </label>
                        <ul>
                        { 
                            this.state.pokedex.types == null ? "" : this.state.pokedex.types.map((e) => {
                                return (
                                    <li>{ e.type.name }</li>
                                )
                            })
                        }
                        </ul>
                    </li>
                    <li className="list-group-item">
                        <label>Exp points </label>
                        { this.props.pkmn.getValue(Pokemon.exp) << 16 | this.props.pkmn.getValue(Pokemon.exp+0x1) << 8 | this.props.pkmn.getValue(Pokemon.exp+0x2) }
                            
                    </li>

                </ul>
            </div>
        );
    }
}

export default PokemonItem;