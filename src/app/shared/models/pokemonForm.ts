export class pokemonForm{
  order : number;
  private level : number;
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


  constructor(order : number, hp : number, atk : number, def : number, spd : number, spec_atk : number, spec_def : number){
    this.order = order;
    this.hp_base = hp;
    this.atk_base = atk;
    this.def_base = def;
    this.spd_base = spd;
    this.specAtk_base = spec_atk;
    this.specDef_base = spec_def;
    this.level = 1;
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

  private statCalculation(name : string, base : number, iv : number, ev : number) {
    Math.floor((((base + iv) * 2 + Math.floor((Math.ceil(Math.sqrt(ev))) / 4)) * this.level) / 100) + (name == 'hp' ? this.level + 10 : 5);
  }

}
