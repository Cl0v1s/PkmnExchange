
let Pokemon = require("./Pokemon");

class Save 
{
    constructor(stream)
    {
        this.stream = new DataView(stream);
    }

    getTeam()
    {
        let team = [];
        let count = this.stream.getUint8(0x2865);

        let start = 0x286D; // 0x2865 + count(0x1) + species(0x6+0x1)
        let name_start = start + 6*48;
        let trainer_start = name_start + 6*11;
        for(let i = 0; i < count; i++)
        {
            team.push(
                new Pokemon(
                    this.stream.buffer.slice(start + i*48, start + i*48 + 48),
                    this.stream.buffer.slice(name_start + i*11, name_start+i*11+11),
                    this.stream.buffer.slice(trainer_start + i*11, trainer_start+i*11+11),
                )
            );
        }

        return team;
    }

}

module.exports = Save;