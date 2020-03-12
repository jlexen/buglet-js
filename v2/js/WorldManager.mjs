import { Location } from "./Location.mjs";
import { LocationIndex } from "./LocationIndex.mjs";
import { Canvas } from "./Canvas.mjs";
import { BugletManager } from "./BugletManager.mjs";

const WORLD_SIZE = 500;
const BUGLET_COUNT = 20;
const BUGLET_SIZE_MAX = 30;

export class WorldManager
{
    constructor(clockSpeed){
        this.clockSpeed = clockSpeed;
    }

    initialize(){


        window.Location = Location;
        window.LocationIndex = LocationIndex;
        
        this.bugletManager = new BugletManager(WORLD_SIZE, BUGLET_SIZE_MAX);
        this.canvas = new Canvas(window.document);


        this.bugletManager.createRandomBuglets(BUGLET_COUNT);        
        


    }

    startClock(){
        this.pause = false;
        setInterval(() => this.runClock(), this.clockSpeed);
    }

    pauseClockToggle()
    {
        this.pause = !this.pause;
    }

    runClock() {
        // check if paused
        if(this.pause) return;

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