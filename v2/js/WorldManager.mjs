import { Location } from "./Location.mjs";
import { LocationIndex } from "./LocationIndex.mjs";
import { Canvas } from "./Canvas.mjs";
import { BugletManager } from "./BugletManager.mjs";

const WORLD_SIZE = 800;

export class WorldManager
{
    constructor(clockSpeed){
        this.clockSpeed = clockSpeed;
    }

    initialize(){


        window.Location = Location;
        window.LocationIndex = LocationIndex;
        
        this.bugletManager = new BugletManager(WORLD_SIZE, 30);
        this.canvas = new Canvas(window.document);


        this.bugletManager.createRandomBuglets(50);        
        


    }

    startClock(){

        setInterval(() => this.runClock(), this.clockSpeed);
    }

    runClock() {

        // move buglets
        this.bugletManager.moveBuglets();
            

        // draw buglets
        var actors = this.bugletManager.getBuglets();
        this.canvas.clear();
        this.canvas.drawActors(actors);
        // if(this.paused) return;

        // // have bugs do their thing
        // for (var i = 0; i < this.buglets.length; i++) 
        // {
        //     var buglet = this.buglets[i];
        //     this.performBugletAction(buglet);
        // }      

        // // spawn plantlets
        // var plantletsToResponse = MAX_PLANTLETS_TO_RESPAWN * Math.random();
        // for (var i = 0; i < plantletsToResponse; i++)
        // {
        //     this.spawnRandomPlantlet()
        // }
    }  
}