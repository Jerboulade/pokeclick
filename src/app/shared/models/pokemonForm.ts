export class pokemonForm{
  order : number;
  private xp : number;
  private hp_base : number;
  private atk_base : number;
  private def_base : number;
  private  spd_base : number;
  private specAtk_base : number;
  private specDef_base : number;
  private hp_IV : number;
  private atk_IV : number;
  private def_IV : number;
  private spd_IV : number;
  private spec_IV : number;
  private hp_EV : number;
  private atk_EV : number;
  private def_EV : number;
  private spd_EV : number;
  private spec_EV : number;
  private xpTable : number[] = [0,10,33,80,156,270,428,640,911,1250,1663,2160,2746,3430,4218,5120,6141,7290,8573,10000,11576,13310,15208,17280,19531,21970,24603,27440,30486,33750,37238,40960,44921,49130,53593,58320,63316,68590,74148,80000,86151,92610,99383,106480,113906,121670,129778,138240,147061,156250,165813,175760,186096,196830,207968,219520,231491,243890,256723,270000,283726,297910,312558,327680,343281,359370,375953,393040,410636,428750,447388,466560,486271,506530,527343,548720,570666,593190,616298,640000,664301,689210,714733,740880,767656,795070,823128,851840,881211,911250,941963,973360,1005446,1038230,1071718,1105920,1140841,1176490,1212873,1250000]

  constructor(order : number, hp : number, atk : number, def : number, spd : number, spec_atk : number, spec_def : number){
    this.order = order;
    this.hp_base = hp;
    this.atk_base = atk;
    this.def_base = def;
    this.spd_base = spd;
    this.specAtk_base = spec_atk;
    this.specDef_base = spec_def;
    this.xp = 0;

    this.hp_EV = 0;
    this.atk_EV = 0;
    this.def_EV = 0;
    this.spd_EV = 0
    this.spec_EV = 0;

    this.hp_IV = Math.floor(Math.random() * 16);
    this.atk_IV = Math.floor(Math.random() * 16);
    this.def_IV = Math.floor(Math.random() * 16);
    this.spd_IV = Math.floor(Math.random() * 16);
    this.spec_IV = Math.floor(Math.random() * 16);
  }


  set setXp(value : number){
    this.xp += value;

  }

  get level(){
    let level =  this.xpTable.findIndex((elem) => elem > this.xp)
    if (this.xp == this.xpTable[level])
      level++;
    return level;
  }

  set setEV_hp(value : number){
    this.hp_EV += value;
    if (this.hp_EV > 65535)
      this.hp_EV = 65535;
  }
  set setEV_atk(value : number){
    this.atk_EV += value;
    if (this.atk_EV > 65535)
    this.atk_EV = 65535;
  }
  set setEV_def(value : number){
    this.def_EV += value;
    if (this.def_EV > 65535)
    this.def_EV = 65535;
  }
  set setEV_spd(value : number){
    this.spd_EV += value;
    if (this.spd_EV > 65535)
    this.spd_EV = 65535;
  }
  set setEV_spec(value : number){
    this.spec_EV += value;
    if (this.spec_EV > 65535)
    this.spec_EV = 65535;
  }

  get hp(){
    return this.statCalculation('hp', this.hp_base, this.hp_IV, this.hp_EV);
  }

  get atk(){
    return this.statCalculation('atk', this.atk_base, this.atk_IV, this.atk_EV);
  }

  get def(){
    return this.statCalculation('def', this.def_base, this.def_IV, this.def_EV);
  }

  get spd(){
    return this.statCalculation('spd', this.spd_base, this.spd_IV, this.spd_EV);
  }

  get spec_atk(){
    return this.statCalculation('spec_atk', this.specAtk_base, this.spec_IV, this.spec_EV)
  }

  get spec_def(){
    return this.statCalculation('spec_def', this.specDef_base, this.spec_IV, this.spec_EV)
  }

  private statCalculation(name : string, base : number, iv : number, ev : number) : number {
    return Math.floor((((base + iv) * 2 + Math.floor((Math.ceil(Math.sqrt(ev))) / 4)) * this.level) / 100) + (name == 'hp' ? this.level + 10 : 5);
  }

}
