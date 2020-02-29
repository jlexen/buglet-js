import { ActorType } from "./enums/ActorType.mjs"

const SCALE = 1;

export class Canvas{

    
    constructor(document){

        this.document = document;
    }

    drawActors(items){
        var body = this.document.getElementsByTagName("BODY")[0]
        for(var i = 0; i < items.length; i++)
        {
            var item = items[i];
            // <div style="background-image: Url('./img/plant.png'); transform: rotate(20deg); background-size: contain; height: 20px; width: 20px; position: absolute; top: 125px; left: 45px;"></div>

            var element = document.createElement('div');

            let backgroundImage;
            if(item.actorType == ActorType.Plantlet)
            {
                backgroundImage = "Url('./img/plant.png')";
            }
            else if(item.actorType == ActorType.Buglet)
            {
                backgroundImage = "Url('./img/bug.png')";
            }
            else
            {
                throw new Exception("invalid or missing actor type");
            }

            element.style.backgroundImage = backgroundImage;
            element.style.backgroundSize = "contain";
            element.style.height = item.size + "px";
            element.style.width = item.size + "px";
            element.style.position = "absolute";
            element.style.left = item.location.x * SCALE;
            element.style.top = item.location.y * SCALE;
        
            // todo
            if(item.orientation)
            {
                element.style.transform = 'rotate(' + item.orientation  + 'deg)';
            }
            

            body.appendChild(element);
        }
    }
}