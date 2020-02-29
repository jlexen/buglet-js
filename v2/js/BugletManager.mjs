import { LocationIndex } from "./LocationIndex.mjs";
import { Location } from "./Location.mjs";
import { Buglet } from "./actors/Buglet.mjs";

export class BugletManager
{
    constructor(worldSize, bugletMaxSize){
        this.bugletIndex = new LocationIndex();
        this.worldSize = worldSize;
        this.bugletMaxSize = bugletMaxSize;
    }

    moveBuglets(){

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
            let buglet = new Buglet(location, orientation, size);

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