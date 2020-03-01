import { LocationIndex } from "./LocationIndex.mjs";
import { Location } from "./Location.mjs";
import { Buglet } from "./actors/Buglet.mjs";
import { Util } from "./Util.mjs";

export class BugletManager
{
    constructor(worldSize, bugletMaxSize){
        this.bugletIndex = new LocationIndex();
        this.worldSize = worldSize;
        this.bugletMaxSize = bugletMaxSize;
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
        let vector = buglet.calcMoveVector();
        if(vector == null) return;
        let newLocation = Util.locationFromDistanceAndAngle(
            buglet.location, 
            buglet.moveSpeed,
            vector);

        buglet.orientation = vector;

        // remove from old location
        this.bugletIndex.remove(buglet.location);

        buglet.location = newLocation;
        this.bugletIndex.insert(buglet, buglet.location);

        // check if there are any bugs in radius
        buglet.eatNearbyBugs();
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
            let location = new Location(Math.random() * this.worldSize, Math.random() * this.worldSize)
            let orientation = Math.random() * 360;
            let size = Math.random() * this.bugletMaxSize;
            let buglet = new Buglet(this.bugletIndex, location, orientation, size);

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