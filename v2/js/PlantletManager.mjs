import { Plantlet } from "./actors/Plantlet.mjs";
const PLANTLET_MIN_SIZE = 20;

export class PlantletManager
{

    constructor(worldSize, spawnOffset, plantletMaxSize){
        this.worldSize = worldSize;
        this.spawnOffset = spawnOffset;
        this.plantletMaxSize = plantletMaxSize;
        this.plantletIndex = new LocationIndex();
    }

    createRandomPlantlets(count)
    {
        for(let i = 0; i < count; i++)
        {
            this.createRandomPlantlet();
        }
    }

    createRandomPlantlet()
    {
        try{
            let location = new Location(
                Math.random() * this.worldSize + this.spawnOffset, 
                Math.random() * this.worldSize + this.spawnOffset);

            let size = Math.random() * this.plantletMaxSize;
            if(size < PLANTLET_MIN_SIZE)
                size = PLANTLET_MIN_SIZE;

            let buglet = new Plantlet(this.plantletIndex, location, size);

            this.plantletIndex.insert(buglet, location);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    getPlantlets()
    {
        return this.plantletIndex.getItems();
    }

    getPlantletIndex()
    {
        return this.plantletIndex;
    }
}