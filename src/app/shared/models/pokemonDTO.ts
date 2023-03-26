export interface pokemonDTO {
  order : number,
  name : string,
  height : number,
  weight : number,
  base_experience : number,
  types : Types[],
  stats : Stats[],
  sprites : Sprite,
  [key : string] : any;
}

export interface Types{
  slot : number,
  type : Type;
}

export interface Type{
  name : string,
  url : string;
}

export interface Stats{
  base_stat : number,
  effort : number,
  stat : Stat;
}
export interface Stat{
  name: string,
  url : string;
}

export interface Sprite {
  front_default : string,
  back_default : string,
  official : string,
  other : Other;
}

export interface Other {
}
