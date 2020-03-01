import { Location } from "./Location.mjs";

export class Util {

    static distanceFrom(toLocation, fromLocation)
    {
        return Math.abs(Math.sqrt(
            Math.pow(toLocation.x - fromLocation.x, 2) +
            Math.pow(toLocation.y - fromLocation.y, 2)));
    }    

    static degreesBetweenPoints(toLocation, fromLocation){
        return Math.atan2(toLocation.y - fromLocation.y, toLocation.x - fromLocation.x) * 180 / Math.PI;
    }

    static locationFromDistanceAndAngle(fromLocation, distance, degree){
        let radians = degree * Math.PI / 180;
        return new Location(
            fromLocation.x + (distance * Math.cos(radians)),
            fromLocation.y + (distance * Math.sin(radians))
        );
    }
}