import { ActorType } from "../enums/ActorType.mjs"
import { BugletGenome } from "../genetics/BugletGenome.mjs";
import { Util } from '../Util.mjs';
import { Vector } from "../Vector.mjs";

const SIGHT_FACTOR = 5;
const EAT_DISTANCE_FACTOR = 1;
const MAX_SIZE = 100; 
const MIN_SIZE = 5;
const SIZE_REDUCE_FACTOR = .01;
const SPEED_FACTOR = .2;
const MIN_SPEED = 3;
const WANDER_MAX_DEVIATION = 5;
const PAUSE_CHANCE_FACTOR = 0.01;
const THREAT_MULTIPLIER = 10;
const FOOD_PLANTLET_MULTIPLIER = 5;
const RANDOM_ANGLE_FACTOR = 5;
const RANDON_MAGNITUDE_FACTOR = .3;
const FEED_EFFICIENCY_FACTOR = .5;
const INTERNAL_PULL_FACTOR = 0.01;

export class Buglet {

    constructor(bugletIndex, plantletIndex, location, orientation, size, worldSize)
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
        this.worldSize = worldSize;
    }    

    getSightDistance()
    {
        return this.size * SIGHT_FACTOR;
    }

    getMoveVector()
    {
        // add all vectors together and get average
        let vectors = [];
        
        // get threats
        let threats = this.getAllThreats();
        for(let i = 0; i < threats.length; i++)
        {
            let threat = threats[i];
            let distance = Util.distanceFrom(threat.location, this.location);
            let angle = Util.degreesBetweenPoints(this.location, threat.location);
            let magninute = (this.getSightDistance() - distance) * THREAT_MULTIPLIER;
            vectors.push(new Vector(angle - 180, magninute));
        }

        // find food
        if(this.size < MAX_SIZE)
        {
            let foodItems = this.getAllFood();
            for(let i = 0; i < foodItems.length; i++)
            {
                let foodItem = foodItems[i];
                let distance = Util.distanceFrom(foodItem.location, this.location);
                let angle = Util.degreesBetweenPoints(this.location, foodItem.location);
                let magninute = (this.getSightDistance() - distance) * FOOD_PLANTLET_MULTIPLIER;
                vectors.push(new Vector(angle, magninute));
            }
        }

        // add inner pull - pull to center of board
        let internalPullVector = Util.vectorBetweenPoints(this.location, 
            new Location(this.worldSize/2, this.worldSize/2));
        internalPullVector.magnitude*=INTERNAL_PULL_FACTOR;
        vectors.push(internalPullVector);
        
        // add randomness
        let deviation = Math.random() * RANDOM_ANGLE_FACTOR * 2;
        let randomDeviation = this.orientation - RANDOM_ANGLE_FACTOR + deviation;
        let randomMagnitude = this.getSightDistance() * RANDON_MAGNITUDE_FACTOR;
        vectors.push(new Vector(randomDeviation, randomMagnitude));

        if(vectors.length > 0)
        {
            let vectorAverage = Util.getAverageOfVectors(vectors);
            return vectorAverage;
        }

        return new Vector(0, 0);
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
            this.eatPlantlet(item);
        }
    }

    eatPlantlet(plantlet)
    {
        let gainedSize = plantlet.size * FEED_EFFICIENCY_FACTOR;
        this.size += gainedSize;
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
        this.size += buglet.size * FEED_EFFICIENCY_FACTOR;
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

    getAllFood()
    {
        let itemsInRadius = this.plantletIndex.getItemsInRadius(this.location, this.getSightDistance()); 
        return itemsInRadius;
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
