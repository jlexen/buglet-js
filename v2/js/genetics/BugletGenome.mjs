
/**
 * All genome values are a factor from 0 to 1
 * No factor can be negative. No factor can be greater than 1.
 * 
 */
export class BugletGenome
{
    constructor(){
        this.sightFactor = .5; // how far it can see
        this.eatDistanceFactor = .5; // how far away it can eat
        this.metabolismEfficiencyFactor = .5; // how inefficient metanolism is
        this.fearFactor = .5; // how serious it takes threats
        this.wanderDirectionFactor = .5; 
        this.wanderMagnitudeFactor = .5;
        this.foodDesireFactor = .5;
        this.feedEfficiencyFactor = .5;
        this.internalPullFactor = .5;
        this.duplicateDistanceNeededFactor = .5;
        this.duplicateGeneralInclinationFactor = .5;
    }

    splitFrom(from)
    {
        let keys = Object.keys(this);
        for(let i = 0; i < keys.length; i++)
        {
            let key = keys[i];

            let deviation = Math.random() * .2;
            let newValue = from[key] - .1 + deviation;

            if(newValue > 1) newValue = 1;
            else if(newValue < 0) newValue = 0;
            
            this[key] = newValue;
        }
    }

    toString()
    {
        let output = "";
        let keys = Object.keys(this);
        for(let i = 0; i < keys.length; i++)
        {
            output += keys[i] + ": " + this[keys[i]] + "\n";
        }

        return output;
    }
}