import { ActorType } from "../enums/ActorType.mjs"
import { BugletGenome } from "../genetics/BugletGenome.mjs";
import { Util } from '../Util.mjs';

export class Buglet {

    constructor(bugletIndex, location, orientation, size)
    {
        this.bugletIndex = bugletIndex;
        this.actorType = ActorType.Buglet;
        this.location = location;
        this.orientation = orientation ? orientation : 0;
        this.size = size;
        this.genome = new BugletGenome();

        this.moveSpeed = 5;
        this.sightDistance = 25;
    }    

    getMoveLocation(){

    }

    calcMoveVector(){
        let target = this.findFoodTarget();
        if(target != null)
        {
            let degree = Util.degreesBetweenPoints(this.location, target.location);
            return degree;
        }

        let threat = this.findBiggestThreat();
        if(threat != null){
            let degree = Util.degreesBetweenPoints(this.location, threat.location);
            return degree;
        }

        return null;
    }

    findBiggestThreat(){
        let itemsInRadius = this.bugletIndex.getItemsInRadius(this.location, this.sightDistance);
        let threat = null;
        for(var i = 0; i < itemsInRadius.length; i++)
        {
            let item = itemsInRadius[i];

            if(item.size <= this.size)
            {
                continue;
            }

            if(threat == null){
                threat = item;
            }
            else if(threat.size < item.size)
            {
                threat = item;
            }
        }

        return threat;
    }

    findFoodTarget(){
        let itemsInRadius = this.bugletIndex.getItemsInRadius(this.location, this.sightDistance);
        let target = null;
        for(var i = 0; i < itemsInRadius.length; i++)
        {
            let item = itemsInRadius[i];

            if(item.size > this.size)
            {
                continue;
            }

            if(target == null){
                target = item;
            }
            else if(target.size > item.size)
            {
                target = item;
            }
        }

        return target;
    }

    eatActor(actor)
    {

    }

    toString()
    {
        return `Buglet - location: {this.location.toString()}, orientation: {this.orientation}, size:  {this.size}`;
    }
}
