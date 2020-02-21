
class Buglet {

    constructor(world, location) {
        this.world = world;
        this.location = location;
        this.sightDistance = 5;
        this.size = 50;
    }

    requestAction = function() {
        var foodMoveTo = this.getMoveToFoodAction();

        if(foodMoveTo.actionType == ActionType.MOVE) return foodMoveTo;

        var wander = this.getWanderAction();

        return wander;       
    }

    getWanderAction = function()
    {
        var random = Math.random();
        var newLocation = new Location(this.location.x, this.location.y);

        if(random < .25 && newLocation.x > 0) {
            newLocation.x--;
        } 
        else if(random >= .25 && random < .5 && newLocation.x < this.world.gridSize - 2)
        {
            newLocation.x++;
        } 
        else if(random >= .5 && random < .75 && newLocation.y > 0)
        {
            newLocation.y--;
        } 
        else if(newLocation.y < this.world.gridSize - 2)
        {
            newLocation.y++;
        }
        else
        {
            return new Action(ActionType.STAY);
        }

        return new Action(ActionType.MOVE, newLocation);
    }

    getMoveToFoodAction = function()
    {
        var moveTowards = world.findClosestFood(this.location, this.sightDistance);
        if(!moveTowards) return new Action(ActionType.STAY);

        var moveTo;
        if(moveTowards.x < this.location.x) {
            moveTo = new Location(this.location.x - 1, this.location.y);
        }

        if(moveTowards.y < this.location.y) {
            moveTo = new Location(this.location.x, this.location.y - 1);
        }

        if(moveTowards.x > this.location.x) {
            moveTo = new Location(this.location.x + 1, this.location.y);
        }

        if(moveTowards.y > this.location.y) {
            moveTo = new Location(this.location.x, this.location.y + 1);
        }

        return new Action(ActionType.MOVE, moveTo);
    }

    getMoveDownAction = function() {
        var x2 = this.location.x + 1;
        var y2 = this.location.y;
        // this.location.x = x2;
        // this.location.y = y2;

        return new Action(ActionType.MOVE, new Location(x2, y2))  
    }
}
