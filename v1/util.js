class Util {

    static distanceFrom(toLocation, fromLocation)
    {
        return Math.abs(Math.sqrt(
            Math.pow(toLocation.x - fromLocation.x, 2) +
            Math.pow(toLocation.y - fromLocation.y, 2)));
    }    

    static rgbString(r, g, b)
    {
        return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
    }
}