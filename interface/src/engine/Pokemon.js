let Helper = require("./Helper");

class Pokemon 
{
    static specie = 0x00;
    static item = 0x01;
    static move_1 = 0x02;
    static move_2 = 0x03;
    static move_3 = 0x04;
    static move_4 = 0x05;
    static trainer = 0x06; // size 2
    static exp = 0x08; // 3
    static ev_hp = 0x0B; //2
    static ev_atk = 0x0D; // 2
    static ev_def = 0x0F; // 2
    static ev_speed = 0x11; // 2
    static ev_spe = 0x13; //2
    static iv = 0x15; // 2
    static pp_1 = 0x17;
    static pp_2 = 0x18;
    static pp_3 = 0x19;
    static pp_4 = 0x1A;
    static friendship = 0x1B; //On laisse ça à 0 étant donné qu'on fait des échanges
    static pokerus = 0x1C;
    static caught = 0x1D; // 2
    static level = 0x1F;
    static status = 0x20; //1
    //unused byte
    static hp_current = 0x22; //2
    static hp_max = 0x24; //2
    static atk = 0x26; //2
    static def = 0x28; //2
    static speed = 0x2A; //2
    static spe_atk = 0x2C; //2
    static spe_def = 0x2E; //2

    constructor(stream, nickname, trainername)
    {
        this.stream = new DataView(stream);
        this.nickname = new DataView(nickname);
        /*for(let i = 0; i< this.nickname.buffer.byteLength; i++)
        {
            console.debug(this.nickname.getUint8(i).toString(16));
        }
        console.debug("===");*/
        this.trainername = new DataView(trainername);
        /*for(let i = 0; i< this.trainername.buffer.byteLength; i++)
        {
            console.debug(this.trainername.getUint8(i).toString(16));
        }*/
    }

    getNickname()
    {
        return Helper.ConvertTextString(this.nickname);
    }

    getTrainerName()
    {
        return Helper.ConvertTextString(this.trainername);
    }

    getValue(index)
    {
        return this.stream.getUint8(index);
    }

    setValue(index, value)
    {
        this.stream.setUint8(index, value);
    }
}

module.exports = Pokemon;