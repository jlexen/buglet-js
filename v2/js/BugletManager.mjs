import { LocationIndex } from "./LocationIndex.mjs";
import { Location } from "./Location.mjs";
import { Buglet } from "./actors/Buglet.mjs";
import { Util } from "./Util.mjs";

const BUGLET_MIN_SIZE = 20;
const BUGLET_DEATH_SIZE = 10;

export class BugletManager
{
    constructor(worldSize, spawnOffset, bugletMaxSize, plantletManager){
        this.spawnOffset = spawnOffset;
        this.bugletIndex = new LocationIndex();
        this.worldSize = worldSize;
        this.bugletMaxSize = bugletMaxSize;
        this.plantletManager = plantletManager;
    }

    moveBuglets(){
        var buglets = this.getBuglets();
        for(const i in buglets)
        {
            try
            {
                this.moveBuglet(buglets[i]);
            }
            catch(error)
            {
                console.log(error);
            }
        }
    }

    moveBuglet(buglet)
    {
        let vector = buglet.getMoveVector();

        if(vector.magnitude == 0)
        {
            buglet.decrementSize(.5);

            // remove if died
            if(buglet.size <= BUGLET_DEATH_SIZE) this.bugletIndex.remove(buglet.location);
            return;
        }
        
        let oldLocation = buglet.location;

        let moveSpeed = buglet.getMoveSpeed();
        let distance = vector.magnitude < moveSpeed ? vector.magnitude : moveSpeed;

        let newLocation = Util.locationFromDistanceAndAngle(
            buglet.location, 
            distance,
            vector.angle);

        buglet.orientation = vector.angle;

        // remove from old location
        this.bugletIndex.remove(buglet.location);

        buglet.location = newLocation;
        this.bugletIndex.insert(buglet, buglet.location);

        // eat any plants nearby
        buglet.eatNearbyPlants();

        // check if there are any bugs in radius
        //buglet.eatNearbyBugs();

        if(buglet.isWillingToDuplicate())
        {
            buglet.performDuplication();
        }

        // decrement energy, less if didn't move at all
        if(Util.sameLocation(oldLocation, newLocation))
        {
            buglet.decrementSize(.5);
        }
        else
        {
            buglet.decrementSize(1);
        }        

        // remove if died
        if(buglet.size <= BUGLET_DEATH_SIZE) this.bugletIndex.remove(buglet.location);
    }

    createRandomBuglets(count)
    {
        for(var i = 0; i < count; i++)
        {
            this.createRandomBuglet();
        }
    }

    createRandomBuglet(){
        try{
            let location = new Location(
                Math.random() * this.worldSize + this.spawnOffset, 
                Math.random() * this.worldSize + this.spawnOffset);

            let orientation = Math.random() * 360;
            let size = Math.random() * this.bugletMaxSize;

            if(size < BUGLET_MIN_SIZE) size = BUGLET_MIN_SIZE;

            let plantletIndex = this.plantletManager.getPlantletIndex();
            let buglet = new Buglet(this.bugletIndex, plantletIndex, location, orientation, size, this.worldSize);

            this.bugletIndex.insert(buglet, location);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    getBuglets(){
        return this.bugletIndex.getItems();
    }
}