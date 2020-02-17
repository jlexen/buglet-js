
class Buglet {

    constructor(world, location) {
        this.world = world;
        this.Location = location;
        this.SightDistance = 5;
        this.size = 50;
    }

    requestAction = function() {
        var foodMoveTo = this.getMoveToFoodAction();

        if(foodMoveTo.ActionType == ActionType.MOVE) return foodMoveTo;

        var wander = this.getWanderAction();

        return wander;       
    }

    getWanderAction = function()
    {
        var random = Math.random();
        var newLocation = new Location(this.Location.X, this.Location.Y);

        if(random < .25 && newLocation.X > 0) {
            newLocation.X--;
        } 
        else if(random >= .25 && random < .5 && newLocation.X < this.world.gridSize - 2)
        {
            newLocation.X++;
        } 
        else if(random >= .5 && random < .75 && newLocation.Y > 0)
        {
            newLocation.Y--;
        } 
        else if(newLocation.Y < this.world.gridSize - 2)
        {
            newLocation.Y++;
        }
        else
        {
            return new Action(ActionType.STAY);
        }

        return new Action(ActionType.MOVE, newLocation);
    }

    getMoveToFoodAction = function()
    {
        var moveTowards = world.findClosestFood(this.Location, this.SightDistance);
        if(!moveTowards) return new Action(ActionType.STAY);

        var moveTo;
        if(moveTowards.X < this.Location.X) {
            moveTo = new Location(this.Location.X - 1, this.Location.Y);
        }

        if(moveTowards.Y < this.Location.Y) {
            moveTo = new Location(this.Location.X, this.Location.Y - 1);
        }

        if(moveTowards.X > this.Location.X) {
            moveTo = new Location(this.Location.X + 1, this.Location.Y);
        }

        if(moveTowards.Y > this.Location.Y) {
            moveTo = new Location(this.Location.X, this.Location.Y + 1);
        }

        return new Action(ActionType.MOVE, moveTo);
    }

    getMoveDownAction = function() {
        var x2 = this.Location.X + 1;
        var y2 = this.Location.Y;
        // this.Location.X = x2;
        // this.Location.Y = y2;

        return new Action(ActionType.MOVE, new Location(x2, y2))  
    }
}
