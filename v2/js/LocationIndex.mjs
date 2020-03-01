import { Location } from './Location.mjs';
import { Util } from './Util.mjs';
import { LocationItem } from './LocationItem.mjs';

export class LocationIndex
{
    constructor(){
        this.index = [];
        this.size = 0;
    }

    getSize()
    {
        return this.size;
    }

    getIndex(){
        return this.index;
    }

    insert(object, location)
    {
        if(!object) throw new Exception("Invalid object!");
        if(!location) throw new Exception("Invalid location!");
        if(!location.x < 0) throw new Exception("Cannot add negative x value!");
        if(!location.y < 0) throw new Exception("Cannot add negative y value!");
        if(this.index[location.x] && this.index[location.x][location.y]) throw new Exception("an object already exists in this space!");

        // check if index exists. If it does, create new array at index location
        if(!this.index[location.x])
        {
            this.index[location.x] = [];
            this.index[location.x][location.y] = object;            
        }
        else if (this.index[location.x] && !this.index[location.x][location.y])
        {
            this.index[location.x][location.y] = object;
        }
        // else
        // {
        //     this.index[location.x][location.y].push(object);
        // }
        this.size++;
    }

    remove(location)
    {
        if(!location) throw new Exception("Invalid location!");
        if(!location.x < 0) throw new Exception("Cannot add negative x value!");
        if(!location.y < 0) throw new Exception("Cannot add negative y value!");
        if(!this.index[location.x][location.y]) throw new Exception("Cannot remove item that doesn't exist");
        
        return delete this.index[location.x][location.y];
        // if(!this.index[location.x][location.y])
        // {
        //     // nothing there
        //     throw new Exception("Failed to remove object because nothing exists at x:" + location.x + ", y:" + location.y);
        // }
        
        // for(var i = 0; i < this.index[location.x][location.y].length; i++)
        // {
        //     if(this.index[location.x][location.y][i] == object){
        //         this.index.splice(i, 1);
        //         this.size--;
                
        //         break;
        //     }
        // }
    }

    /**
     * Get Just Items in index
     */
    getItems(){
        var items = [];
        for(const x in this.index){
            for(const y in this.index[x]){
                items.push(this.index[x][y]);
            }
        }

        return items;
    }

    /**
     * Get LocationItems... object containing item + location
     * 
     */
    getLocationItems(){
        var locationItems = [];
        for(const x in this.index){
            for(const y in this.index[x]){
                const location = new Location(x, y);
                const item = this.index[x][y];
                locationItems.push(new LocationItem(location, item));
            }
        }

        return locationItems;
    }

    getItemAt(location)
    {
        if(!location) throw new Exception("Invalid location!");
        if(!location.x < 0) throw new Exception("Cannot add negative x value!");
        if(!location.y < 0) throw new Exception("Cannot add negative y value!");
        if(!this.index[x][y]) throw new Exception("Cannot remove item that doesn't exist");

        return this.index[x][y];
    }

    findNearest(fromLocation)
    {
        if(!fromLocation.x < 0) throw new Exception("Cannot add negative x value!");
        if(!fromLocation.y < 0) throw new Exception("Cannot add negative y value!");

        var closestDistance = null;
        var closestLocation = null;

        for(const x in this.index){

            for(const y in this.index[x]){
                var toLocation = new Location(x, y);
                var distanceFrom = Util.distanceFrom(toLocation, fromLocation);

                if(closestLocation == null || distanceFrom < closestDistance)
                {
                    closestDistance = distanceFrom;
                    closestLocation = toLocation;
                }

            }
        }
        
        return closestLocation;
    }

    getItemsInRadius(fromLocation, distance)
    {
        let items = [];

        for(const x in this.index){

            // short circuit, don't continue on this x value if not in distance
            if(x > fromLocation.x + distance || x < fromLocation.x - distance) continue;

            for(const y in this.index[x]){
                if(y > fromLocation.y + distance || y < fromLocation.y - distance) continue;

                // skip if same coords
                if(x == fromLocation.x && y == fromLocation.y) continue;
                
                var toLocation = new Location(x, y);
                var distanceFrom = Util.distanceFrom(toLocation, fromLocation);
                
                if(distanceFrom <= distance) items.push(this.index[x][y]);
            }
        }

        return items;
    }
}