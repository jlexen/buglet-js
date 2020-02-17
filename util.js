class Util {

    static distanceFrom(toLocation, fromLocation)
    {
        return Math.abs(Math.sqrt(
            Math.pow(toLocation.X - fromLocation.X, 2) +
            Math.pow(toLocation.Y - fromLocation.Y, 2)));
    }    

    static rgbString(r, g, b)
    {
        return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
    }
}