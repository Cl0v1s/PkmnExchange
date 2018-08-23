import React, { Component } from "react";

import PokemonList from "./PokemonList";
import PokemonDrop from "./PokemonDrop";

class Exchanger extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            "save1" : null,
            "team1" : null,
            "pkmn1" : null,
            "save2" : null,
            "team2" : null,
            "pkmn2" : null,
        }

        this.submit = this.submit.bind(this);
        this.generate = this.generate.bind(this);
    }

    onLoad(savename, teamname, save)
    {
        let state = this.state;
        state[savename] = save;
        save.getTeam().then((team) => {
            state[teamname] = team;
            this.setState(state);
        })

    }

    onChange(teamname, pkmnname, index)
    {
        let state = this.state;

        let pkmn = state[teamname][index];
        state[teamname].splice(index,1);

        if(state[pkmnname] != null)
            state[teamname].push(state[pkmnname]);

        state[pkmnname] = pkmn;

        this.setState(state);
    }

    submit()
    {
        if(this.state.pkmn1 == null || this.state.pkmn2 == null)
        {
            alert("Vous devez choisir des pokémons à échanger.");
            return;
        }
        this.state.team1.push(this.state.pkmn2);
        this.state.team2.push(this.state.pkmn1);

        this.state.pkmn1 = null;
        this.state.pkmn2 = null;

        alert("Echange effectué.");
        this.setState(this.state);
    }

    generate()
    {
        if(this.state.save1 == null || this.state.save2 == null)
        {
            alert("Veuillez charger deux sauvegardes.");
            return;
        }

        if(this.state.pkmn1 != null || this.state.pkmn2 != null)
        {
            alert("Vous êtes en cours d'échange.");
            return;
        }

        for(let i = 0; i < this.state.team1.length; i++)
        {
            this.state.save1.replacePokemon(i, this.state.team1[i]);
        }

        for(let i = 0; i < this.state.team2.length; i++)
        {
            this.state.save2.replacePokemon(i, this.state.team2[i]);
        }

        this.state.save1.generate("save1.sav");
        this.state.save2.generate("save2.sav");
    }

    render()
    {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <PokemonList onLoad={ (save) => { this.onLoad("save1", "team1", save) }} onClick={ (index) => { this.onChange("team1", "pkmn1", index )} } team={ this.state.team1 == null ? null : this.state.team1 } />
                            </div>
                            <div className="col">
                                <PokemonDrop pkmn={ this.state.pkmn1 } onChange={ (index) => { this.onChange("team1", "pkmn1", index) } } />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <PokemonDrop pkmn={ this.state.pkmn2 } onChange={ (index) => { this.onChange("team2", "pkmn2", index) } } />
                            </div>
                            <div className="col">
                                <PokemonList onLoad={ (save) => { this.onLoad("save2", "team2", save) }} onClick={ (index) => { this.onChange("team2", "pkmn2", index )} } team={ this.state.team2 == null ? null : this.state.team2 } />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary m-1" onClick={ this.submit }>Echanger</button>
                        <button className="btn btn-primary m-1" onClick={ this.generate }>Récupérer</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Exchanger;