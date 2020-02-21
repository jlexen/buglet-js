var world;

function buildWorld(){
    world = new World();

    world.initializeGrid(gridSize);
    world.drawGrid();

    world.initializeVegetation();

    world.initializeBug();
}

function startStop(){
    this.world.paused = !this.world.paused;
}

function setSpeed(speed)
{
    this.world.clockSpeed = speed;
}