import React, { Component } from 'react';

import Pokemon from './engine/Pokemon';

class PokemonItem extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            "pokedex" : {}
        }

        this.load()
    }

    load()
    {
        fetch("https://pokeapi.co/api/v2/pokemon/"+this.props.pkmn.getValue(Pokemon.specie), { "mode" : "cors"} )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            this.setState({
                "pokedex" : json
            })
        });
    }

    render()
    {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <div>
                            <img src={ this.state.pokedex.sprites != null ? this.state.pokedex.sprites.front_default : "" } />
                        </div>
                        <div>
                            <label>N°. </label>
                            { this.props.pkmn.getValue(Pokemon.specie) }
                        </div>
                        <div>
                            <label>Level </label>
                            { this.props.pkmn.getValue(Pokemon.level) }
                        </div>
                        <div>
                            { this.props.pkmn.getNickname() }<br />
                            /{ this.state.pokedex.name}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div>
                            { 
                                ( this.props.pkmn.getValue(Pokemon.hp_current) <<8 | this.props.pkmn.getValue(Pokemon.hp_current+0x1) )
                            }
                            /
                            {
                                ( this.props.pkmn.getValue(Pokemon.hp_max) << 8 | this.props.pkmn.getValue(Pokemon.hp_max+0x1) )
                            }
                        </div>
                        <div>
                            <label>Status </label>
                            { 
                                this.props.pkmn.getValue(Pokemon.status) == 0 ? "OK" : ""
                            }
                        </div>
                        <div>
                            <label>Type</label>
                            <ul>
                            { 
                                this.state.pokedex.types == null ? "" : this.state.pokedex.types.map((e) => {
                                    return (
                                        <li>{ e.type.name }</li>
                                    )
                                })
                            }
                            </ul>
                        </div>     
                    </div>       
                    <div className="col">
                            <div>
                                <label>Exp points</label>
                                { this.props.pkmn.getValue(Pokemon.exp) << 16 | this.props.pkmn.getValue(Pokemon.exp+0x1) << 8 | this.props.pkmn.getValue(Pokemon.exp+0x2) }
                            </div>
                    </div>      
                </div>
            </div>
        )
    }
}

export default PokemonItem;