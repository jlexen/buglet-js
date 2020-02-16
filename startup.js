var world;

function buildWorld(){
    world = new World();

    world.initializeGrid(gridSize);
    world.drawGrid();

    world.initializeVegetation();

    world.initializeBug();
}