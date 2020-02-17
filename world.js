const gridSize = 50;
const MAX_VEG_STARTUP = 300;
const MIN_VEG_STARTUP = 200;
const MAX_BUGLET_STARTUP = 20;
const MIN_BUGLET_STARTUP = 10;
const MAX_SIZE_BUGLET = 100;
const MAX_ENERGY_PLANTLET = 100;
const MIN_ENERGY_PLANTLET = 50;
const ENERGY_USE_RATIO = .2;

class World {
    constructor() {
        this.buglets = [];
    }
    
    initializeGrid = function (size) {
        this.grid = new Array(size);
        for (var i = 0; i < size; i++) {
            this.grid[i] = new Array(size);
            for (var j = 0; j < size; j++) {
                this.grid[i][j] = new Object();
            }
        }
        this.gridSize = size;
    };

    drawGrid = function () {
        var table = document.createElement(table);
        var tableBody = document.createElement('tbody');
        for (var i = 0; i < this.grid.length; i++) {
            var row = document.createElement('tr');
            var rowData = this.grid[i];
            for (var j = 0; j < this.grid[i].length; j++) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(""));
                row.appendChild(td);
                this.grid[i][j].td = td;
                this.setCellEmpty(i, j, this);
            }
            
            tableBody.appendChild(row);
        }
        
        table.appendChild(tableBody);
        document.body.appendChild(table);
    };
    
    initializeVegetation = function () {
        var vegToCreate = Math.floor(MAX_VEG_STARTUP * Math.random());
        if (vegToCreate < MIN_VEG_STARTUP)
            vegToCreate = MIN_VEG_STARTUP;
        for (var i = 0; i < vegToCreate; i++) {
            var x = Math.floor(gridSize * Math.random());
            var y = Math.floor(gridSize * Math.random());
            var location = new Location(x, y);
            var plantlet = new Plantlet(Math.random() * (MAX_ENERGY_PLANTLET - MIN_ENERGY_PLANTLET) + MIN_ENERGY_PLANTLET);
            this.setCellPlantlet(location, plantlet, this);
        }
    };
    
    initializeBug = function () {
        var bugletsToCreate = Math.floor(MAX_BUGLET_STARTUP * Math.random());

        if (bugletsToCreate < MIN_BUGLET_STARTUP)
            bugletsToCreate = MIN_BUGLET_STARTUP;

        for (var i = 0; i < bugletsToCreate; i++) {
            var x = Math.floor(gridSize * Math.random());
            var y = Math.floor(gridSize * Math.random());
            var location = new Location(x, y);
            var buglet = new Buglet(this, location);
            this.buglets.push(buglet);
            this.setCellBug(location, buglet, this);
        }
        var scope = this;

        setInterval(() => this.moveBugs(this), 500);
    };
    
    moveBugs(scope) {
        for (var i = 0; i < this.buglets.length; i++) {
            try{
                var buglet = scope.buglets[i];
                var action = buglet.requestAction();
                if (action && action.actionType == ActionType.MOVE) {

                    var energyUsed = this.getEnergyUsed(buglet.size);
                    buglet.size-= energyUsed;

                    // todo: this function is getting freaking bloated
                    if(this.getCellType(action.moveLocation, scope) == CELL_TYPE.PLANTLET)
                    {
                        buglet.size+= this.getCellSize(action.moveLocation, scope);
                    }

                    this.setCellEmpty(buglet.location.x, buglet.location.y, scope);
                    this.grid[action.moveLocation.x, action.moveLocation.y].actor = buglet;
                    this.setCellBug(action.moveLocation, buglet, scope);
                    buglet.location = action.moveLocation;
                }
            } catch(e)
            {
                console.log(e);
            }      
        }
    }

    findClosestFood(from, maxDistance)
    {
        
        var startX = from.x - maxDistance;
        if(startX < 0) startX = 0;

        var startY = from.y - maxDistance;
        if(startY < 0) startY = 0;

        var endX = from.x + maxDistance;
        if(endX > this.gridSize - 1) endX = this.gridSize - 1;

        var endY = from.y + maxDistance;
        if(endY > this.gridSize - 1) endY = this.gridSize - 1;

        var closestLocation;
        var closestDistance;
        for(var i = startX; i <= endX; i++)
        {
            for(var j = startY; j <= endY; j++)
            {
                if(this.grid[i][j].type != CELL_TYPE.PLANTLET) continue;

                var location = new Location(i,j)
                var distance = Util.distanceFrom(from, location);
                if(!closestLocation || distance < closestDistance)
                {
                    closestLocation = location;
                    closestDistance = distance; 
                }
            }
        }

        return closestLocation;
    }
    
    setCellEmpty = function (x, y, that) {
        var cell = that.grid[x][y];
        cell.td.style.backgroundColor = "white";
        cell.type = CELL_TYPE.EMPTY;
        if (cell.actor) {
            cell.actor = null;
        }
    };
    
    setCellPlantlet = function (location, plantlet, that) {
        var cell = that.grid[location.x][location.y];

        var sizeValue =  (256 / MAX_ENERGY_PLANTLET) * plantlet.size;
        cell.td.style.backgroundColor = Util.rgbString(0, sizeValue, 0); // brighter green = more energy
        cell.actor = plantlet
        cell.type = CELL_TYPE.PLANTLET;
    };
    
    setCellBug = function (location, buglet, that) {
        var cell = that.grid[location.x][location.y];

        var sizeValue = (256 / MAX_SIZE_BUGLET) * buglet.size; 
        cell.td.style.backgroundColor = Util.rgbString(256, 256 - sizeValue, 0); // yellow = low energy, red = high energy
        cell.actor = buglet;
        cell.type = CELL_TYPE.BUG;
    };

    getCellType = function(location, that)
    {
        var cell = that.grid[location.x][location.y];
        if(cell) return cell.type;

        return null;
    }

    getCellActor = function(location, that)
    {
        var cell = that.grid[location.x][location.y];
        if(cell) return cell.actor;

        return null;
    }

    getCellSize = function(location, that)
    {
        var cell = that.grid[location.x][location.y];
        if(cell && cell.actor) return cell.actor.size;

        return 0;
    }

    getEnergyUsed = function(size)
    {
        return size * ENERGY_USE_RATIO;
    }
}





