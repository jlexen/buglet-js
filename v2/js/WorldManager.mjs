import { Location } from "./Location.mjs";
import { LocationIndex } from "./LocationIndex.mjs";
import { Canvas } from "./Canvas.mjs";
import { BugletManager } from "./BugletManager.mjs";
import { PlantletManager } from "./PlantletManager.mjs";
import { ReportingManager } from "./ReportingManager.mjs";

const WORLD_SIZE = 500;
const SPAWN_OFFSET = 250;
const BUGLET_COUNT = 1;
const BUGLET_SIZE_MAX = 30;
const PLANTLET_SIZE_MAX = 25;
const PLANTLET_COUNT = 20;

export class WorldManager
{
    constructor(clockSpeed){
        this.clockSpeed = clockSpeed;
    }

    initialize(){
        window.Location = Location;
        window.LocationIndex = LocationIndex;
        this.canvas = new Canvas(window.document);

        this.plantletManager = new PlantletManager(WORLD_SIZE + SPAWN_OFFSET, 0, PLANTLET_SIZE_MAX);
        this.plantletManager.createRandomPlantlets(PLANTLET_COUNT);

        this.bugletManager = new BugletManager(WORLD_SIZE, SPAWN_OFFSET, BUGLET_SIZE_MAX, this.plantletManager);
        this.bugletManager.createRandomBuglets(BUGLET_COUNT);     
        
        this.reportingManager = new ReportingManager(this.bugletManager);
    }

    startClock(){
        this.pause = false;
        setInterval(() => this.runClock(), this.clockSpeed);
    }

    pauseClockToggle()
    {
        this.pause = !this.pause;
        return this.pause;
    }

    runClock() {
        // check if paused
        if(this.pause) return;

        // move buglets
        this.bugletManager.moveBuglets();
            
        // spawn random plantlets
        if(Math.random() > .9)
        {
            this.plantletManager.createRandomPlantlets(2);
        }        

        this.canvas.clear();

        // draw buglets                
        var buglets = this.bugletManager.getBuglets();
        this.canvas.drawActors(buglets);
       
        // draw planlets
        var plantlets = this.plantletManager.getPlantlets();
        this.canvas.drawActors(plantlets);

        // log population
        console.log("Population: " + buglets.length);
    }  

    buildPopulationReport()
    {
        return this.reportingManager.buildPopulationReport();
    }
}