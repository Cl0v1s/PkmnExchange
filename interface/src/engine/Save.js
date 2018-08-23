
let Pokemon = require("./Pokemon");

class Save 
{
    static TeamIndex = 0x286D; // 0x2865 + count(0x1) + species(0x6+0x1)

    static SaveStart = 0x2009;
    //static SaveEnd = 0x2B82; Crystal original
    static SaveEnd = 0x2B75; //Prism
    static Checksum = 0x2D0D;

    constructor(stream)
    {
        this.stream = new DataView(stream);
    }

    getTeam()
    {
        return new Promise((resolve, reject) => {

            let team = [];
            let count = this.stream.getUint8(0x2865);

            let start = Save.TeamIndex; 
            let trainer_start = start + 6*48;
            let name_start = trainer_start + 6*11;

            let requests = [];
            for(let i = 0; i < count; i++)
            {
                let pkmn = new Pokemon(
                    this.stream.buffer.slice(start + i*48, start + i*48 + 48),
                    this.stream.buffer.slice(name_start + i*11, name_start+i*11+11),
                    this.stream.buffer.slice(trainer_start + i*11, trainer_start+i*11+11),
                );
                requests.push(pkmn.load());
                team.push(pkmn);
            }
            Promise.all(requests).then(() => {
                resolve(team);
            })
        })

    }

    replacePokemon(index, pkmn)
    {
        if(index > 5)
            throw new Error("Index must be <= 5");

        let start = Save.TeamIndex; 
        let trainer_start = start + 6*48;
        let name_start = trainer_start + 6*11;
        //if(index==0)console.log("PKMN "+index);
        for(let i = 0; i < pkmn.stream.buffer.byteLength; i++)
        {
            //if(index==0)console.log("Writing "+pkmn.stream.getUint8(i).toString(16)+" at "+(start+index*48+i).toString(16));
            this.stream.setUint8(start+index*48+i, pkmn.stream.getUint8(i));
        }
        for(let i = 0; i < pkmn.nickname.buffer.byteLength; i++)
        {
            this.stream.setUint8(name_start+index*11+i, pkmn.nickname.getUint8(i));
        }
        for(let i = 0; i < pkmn.trainername.buffer.byteLength; i++)
        {
            this.stream.setUint8(trainer_start+index*11+i, pkmn.trainername.getUint8(i));
        }
    }

    calculateChecksum()
    {
        let sum = 0;
        let index = Save.SaveStart;
        /*let old = 0;
        old = this.stream.getUint8(Save.Checksum);
        old += this.stream.getUint8(Save.Checksum + 1) * 256;*/
        do
        {
            let byte = this.stream.getUint8(index);
            this.stream.setUint8(0x1209+(index-Save.SaveStart), byte);
            sum += byte;
            sum &= 65535;
            index = index + 1;
        }
        while(index <= Save.SaveEnd)
        let l = sum & 0xff;
        let r =  ((sum & 0xff00) >>> 8) & 0xff;
        this.stream.setUint8(Save.Checksum, l);
        this.stream.setUint8(Save.Checksum + 1,r);
        this.stream.setUint8(0x1f0d, l);
        this.stream.setUint8(0x1f0d + 1,r);
    }

    generate(name)
    {
        this.calculateChecksum();
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var data = new Uint8Array(this.stream.byteLength);
        for(let i = 0; i < this.stream.byteLength; i++)
        {
            data[i] = this.stream.getUint8(i);
        }
        var blob = new Blob([data], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.target = "_blank";
        a.click();
        window.URL.revokeObjectURL(url);
    }

}

module.exports = Save;