class Pokemon 
{
    constructor(stream, nickname, trainername)
    {
        this.stream = new DataView(stream);
        this.nickname = nickname;
        this.trainername = trainername;

        this.specie = 0x00;
        this.item = 0x01;
        this.move_1 = 0x02;
        this.move_2 = 0x03;
        this.move_3 = 0x04;
        this.move_4 = 0x05;
        this.trainer = 0x06; // size 2
        this.exp = 0x08; // 3
        this.ev_hp = 0x0B; //2
        this.ev_atk = 0x0D; // 2
        this.ev_def = 0x0F; // 2
        this.ev_speed = 0x11; // 2
        this.ev_spe = 0x13; //2
        this.iv = 0x15; // 2
        this.pp_1 = 0x17;
        this.pp_2 = 0x18;
        this.pp_3 = 0x19;
        this.pp_4 = 0x1A;
        this.friendship = 0x1B; //On laisse ça à 0 étant donné qu'on fait des échanges
        this.pokerus = 0x1C;
        this.caught = 0x1D; // 2
        this.level = 0x1F;
        this.status = 0x20; //1
        //unused byte
        this.hp_current = 0x22; //2
        this.hp_max = 0x24; //2
        this.atk = 0x26; //2
        this.def = 0x28; //2
        this.speed = 0x2A; //2
        this.spe_atk = 0x2C; //2
        this.spe_def = 0x2E; //2


        let a = this.getValue(this.specie);
    }

    getValue(index)
    {
        return this.stream.getUint8(index);
    }
}

module.exports = Pokemon;