export class BugletGenome
{
    /**
     * Possible properties
     *  fear
     *      how much nearby larger buglets force it to escape
     *      0 = no fear, 1 = full influence
     *      also affects willingness to split
     * 
     *  randomness
     *      adds factor of unpredictability 
     * 
     *  appetite 
     *      factor influences how likely it is to chase food
     *      0 = does not chase
     * 
     *  splitDesire
     *      factor of how likely it is to split at any given time
     *      0 = never split, 1 = always split
     * 
     */
    constructor(){
        this.fear = .5;
        this.randomness = .5;
        this.appetite = .5;
        this.splitDesire = .5;
    }
}