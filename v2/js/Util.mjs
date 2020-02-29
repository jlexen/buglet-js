export class Util {

    static distanceFrom(toLocation, fromLocation)
    {
        return Math.abs(Math.sqrt(
            Math.pow(toLocation.x - fromLocation.x, 2) +
            Math.pow(toLocation.y - fromLocation.y, 2)));
    }    

    static degreesBetweenPoints(toLocation, fromLocation){
        return Math.atan2(toLocation.y - toLocation.y, fromLocation.x - fromLocation.x) * 180 / Math.PI;
    }
}