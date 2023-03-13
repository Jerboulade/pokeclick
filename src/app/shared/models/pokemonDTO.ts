export interface pokemonDTO{
  order : number,
  name : string,
  height : number,
  weight : number,
  base_experience : number,
  [key : string] : any;
}
