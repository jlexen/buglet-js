import { ActorType } from "../enums/ActorType.mjs"
import { BugletGenome } from "../genetics/BugletGenome.mjs";
import { Util } from '../Util.mjs';


const SIGHT_FACTOR = 5;

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
        this.sightDistance = 100;
    }    

    getMoveLocation(){
        
    }

    getSightDistance()
    {
        return this.size * SIGHT_FACTOR;
    }

    calcMoveVector(){


        let threat = this.findBiggestThreat();
        if(threat != null){
            let degree = Util.degreesBetweenPoints(this.location, threat.location);
            return degree - 180;
        }

        let target = this.findFoodTarget();
        if(target != null)
        {
            let degree = Util.degreesBetweenPoints(this.location, target.location);
            return degree;
        }

        return null;
    }

    eatNearbyBugs()
    {
        // radius is half of the size... we can change this later if needed
        let items = this.bugletIndex.getItemsInRadius(this.location, this.size/2);

        for(var i = 0; i < items.length; i++)
        {
            let item = items[i];
            if(item.size < this.size) {
                this.eatBuglet(item);
            }
        }
    }

    eatBuglet(buglet)
    {
        this.size += buglet.size;
        this.bugletIndex.remove(buglet.location);
    }

    findBiggestThreat(){
        let itemsInRadius = this.bugletIndex.getItemsInRadius(this.location, this.getSightDistance());
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
        let itemsInRadius = this.bugletIndex.getItemsInRadius(this.location, this.getSightDistance());
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
