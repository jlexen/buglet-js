import { Location } from "./Location.mjs";
import { Vector } from "./Vector.mjs";

export class Util {

    static distanceFrom(toLocation, fromLocation)
    {
        return Math.abs(Math.sqrt(
            Math.pow(toLocation.x - fromLocation.x, 2) +
            Math.pow(toLocation.y - fromLocation.y, 2)));
    }    

    static degreesBetweenPoints(fromLocation, toLocation){
        return Math.atan2(toLocation.y - fromLocation.y, toLocation.x - fromLocation.x) * 180 / Math.PI;
    }

    static locationFromDistanceAndAngle(fromLocation, distance, degree){
        let radians = degree * Math.PI / 180;
        return new Location(
            fromLocation.x + (distance * Math.cos(radians)),
            fromLocation.y + (distance * Math.sin(radians))
        );
    }

    static vectorBetweenPoints(fromLocation, toLocation)
    {
        let degrees = this.degreesBetweenPoints(fromLocation, toLocation);
        let xTotal = fromLocation.x - toLocation.x;
        let yTotal = fromLocation.y - toLocation.y;
        let magnitude = Math.sqrt((xTotal * xTotal) + (yTotal * yTotal));
        return new Vector(degrees, magnitude);
    }

    static oppositeAngle(angle) { return angle - 180; }

    static vectorToLocation(vector){
        let radians = vector.angle * Math.PI / 180;
        return new Location(
            vector.magnitude * Math.cos(radians),
            vector.magnitude * Math.sin(radians)
        );
    }

    static sameLocation(a, b)
    {
        return a.x === b.x && a.y === b.y;
    }

    static getAverageOfVectors(vectors)
    {
        /*
         
         
        let angleTotal = 0;
        let magnitudeTotal = 0;

        for(let i = 0; i < vectors.length; i++)
        {
            let vector = vectors[i];
            angleTotal += vector.angle;
            magnitudeTotal += vector.magnitude;
        }

        let angle = angleTotal / vectors.length;
        let magnitude = magnitudeTotal / vectors.length;

        return new Vector(angle, magnitude);
        */

        let xTotal = 0;
        let yTotal = 0;
        for(let i = 0; i < vectors.length; i++)
        {
            let vector = vectors[i];
            let location = this.vectorToLocation(vector);
            xTotal += location.x;
            yTotal += location.y;
        }

        let radians = Math.atan2(yTotal, xTotal);
        let angle = radians * (180 / Math.PI);
        let magnitude = Math.sqrt((xTotal * xTotal) + (yTotal * yTotal));

        return new Vector(angle, magnitude);
    }
}