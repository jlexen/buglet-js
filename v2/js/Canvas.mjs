import { ActorType } from "./enums/ActorType.mjs"

const SCALE = 1;

export class Canvas{

    
    constructor(document){

        this.document = document;
    }

    clear()
    {
        var actors = this.document.getElementById("actors");
        if(actors)
        {
            actors.parentNode.removeChild(actors);
        }
    }

    drawActors(items){

        var actors = this.document.getElementById('actors');
        if(!actors)
        {
            actors = document.createElement('div');
            actors.id = "actors";
            var body = this.document.getElementsByTagName("BODY")[0];
            body.appendChild(actors);
        }
        
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
        
            // info 
            element.onclick = function() { alert(item.size) };

            // todo
            if(item.orientation != null)
            {
                element.style.transform = 'rotate(' + (item.orientation + 90)  + 'deg)';
            }
            
            actors.appendChild(element);
        }
    }
}