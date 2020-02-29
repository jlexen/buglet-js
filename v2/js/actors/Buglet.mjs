import { ActorType } from "../enums/ActorType.mjs"

export class Buglet {

    constructor(location, orientation, size)
    {
        this.actorType = ActorType.Buglet;
        this.location = location;
        this.orientation = orientation ? orientation : 0;
        this.size = size;
    }    
}
