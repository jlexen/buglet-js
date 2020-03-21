import { ActorType } from "../enums/ActorType.mjs"
import { BugletGenome } from "../genetics/BugletGenome.mjs";
import { Util } from '../Util.mjs';


const SIGHT_FACTOR = 5;
const EAT_DISTANCE_FACTOR = 1;
const MAX_SIZE = 100; 
const MIN_SIZE = 5;
const SIZE_REDUCE_FACTOR = .01;
const SPEED_FACTOR = .2;
const MIN_SPEED = 3;
const WANDER_MAX_DEVIATION = 15;
const PAUSE_CHANCE_FACTOR = 0.01;

export class Buglet {

    constructor(bugletIndex, plantletIndex, location, orientation, size)
    {
        this.bugletIndex = bugletIndex;
        this.plantletIndex = plantletIndex;
        this.actorType = ActorType.Buglet;
        this.location = location;
        this.orientation = orientation ? orientation : 0;
        this.size = size;
        this.genome = new BugletGenome();
        this.moveSpeed = 5;
        this.lastWanderDirection = null;
    }    
    
    getSightDistance()
    {
        return this.size * SIGHT_FACTOR;
    }

    calcMoveVector(){
        // let threat = this.findBiggestThreat();
        // if(threat != null){
        //     let degree = Util.degreesBetweenPoints(this.location, threat.location);
        //     return degree - 180;
        // }
        let threatAvoidDegree = this.getThreatVectorTotal();
        if(threatAvoidDegree != null)
        {
            return threatAvoidDegree;
        } 

        let plantletTarget = this.findPlantTarget();
        if(plantletTarget != null)
        {
            let degree = Util.degreesBetweenPoints(this.location, plantletTarget.location);
            return degree;
        }

        let bugletTarget = this.findBugTarget();
        if(bugletTarget != null)
        {
            let degree = Util.degreesBetweenPoints(this.location, bugletTarget.location);
            return degree;
        }

        // check to see if pausing
        if(this.isPausing()) return null;

        let wanderDirection = this.getWanderDirection();
        if(wanderDirection != null)
        {
            return wanderDirection;
        }

        return null;
    }

    decrementSize(percentage)
    {
        this.size-= this.size*SIZE_REDUCE_FACTOR*percentage;
        if(this.size < MIN_SIZE) this.size = MIN_SIZE;
    }

    getMoveSpeed()
    {
        let speed = this.size * SPEED_FACTOR;
        if(speed < MIN_SPEED) speed = MIN_SPEED;

        return speed;
    }

    
    eatNearbyPlants()
    {
        // do not eat nearby bugs if too big
        if(this.size >= MAX_SIZE) return;

        // radius is half of the size... we can change this later if needed
        let items = this.plantletIndex.getItemsInRadius(this.location, this.size * EAT_DISTANCE_FACTOR);

        for(var i = 0; i < items.length; i++)
        {
            let item = items[i];
            if(item.size < this.size) {
                this.eatPlantlet(item);
            }
        }
    }

    eatPlantlet(plantlet)
    {
        this.size += plantlet.size;
        this.plantletIndex.remove(plantlet.location);
    }

    eatNearbyBugs()
    {
        // do not eat nearby bugs if too big
        if(this.size >= MAX_SIZE) return;

        // radius is half of the size... we can change this later if needed
        let items = this.bugletIndex.getItemsInRadius(this.location, this.size * EAT_DISTANCE_FACTOR);

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

    /**
     * Add up all vectors of threats and find average
     * 
     */
    getThreatVectorTotal()
    {
        let threats = this.getAllThreats();

        if(!threats || threats.length == 0) return null;

        let directionTotal = 0;

        for(var i = 0; i < threats.length; i++)
        {
            let direction = this.getThreatVectorForItem(threats[i]);
            directionTotal+=direction;
        }

        let directionAverage = directionTotal/threats.length;
        return directionAverage;
    }

    getThreatVectorForItem(threat)
    {
        let degree = Util.degreesBetweenPoints(this.location, threat.location);
        return degree - 180; // you want to go in the opposite direction
    }

    getAllThreats()
    {
        let threats = [];
        let itemsInRadius = this.bugletIndex.getItemsInRadius(this.location, this.getSightDistance());
        for(var i = 0; i < itemsInRadius.length; i++)
        {
            let item = itemsInRadius[i];

            if(item.size > this.size)
            {
                threats.push(item);
            }
        }

        return threats;
    }

    findPlantTarget()
    {
        let itemsInRadius = this.plantletIndex.getItemsInRadius(this.location, this.getSightDistance()); 
        let target = null;
        for(var i = 0; i < itemsInRadius.length; i++)
        {
            let item = itemsInRadius[i];

            if(target == null){
                target = item;
            }
            else if(item.size > target.size)
            {
                target = item;
            }
        }

        return target;
    }

    findBugTarget(){
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

    
    getWanderDirection()
    {
        let direction;
        if(this.lastWanderDirection == null)
        {
            direction = Math.random() * 360;
        }
        else
        {
            // deviation is either negative or positive
            let deviation = Math.random() * WANDER_MAX_DEVIATION * 2;
            direction = this.lastWanderDirection - WANDER_MAX_DEVIATION + deviation;
        }

        this.lastWanderDirection = direction;
        return direction;
    }

    isPausing()
    {
        let rand = Math.random();
        let chance = rand + this.size*PAUSE_CHANCE_FACTOR;

        return chance > 1;
    }

    toString()
    {
        return `Buglet - location: {this.location.toString()}, orientation: {this.orientation}, size:  {this.size}`;
    }
}
