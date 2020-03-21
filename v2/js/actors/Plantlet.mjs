import { ActorType } from "../enums/ActorType.mjs"

export class Plantlet
{   

    constructor(plantletIndex, location, size)
    {
        this.plantletIndex = plantletIndex;
        this.actorType = ActorType.Plantlet;
        this.location = location;
        this.size = size;
    }    
}