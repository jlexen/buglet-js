import { ActorType } from "./enums/ActorType.mjs"

const SCALE = 1;
const ACTOR_ZINDEX = 100;
const GLOW_ZINDEX = 50;
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
            this.drawActor(items[i], actors);
        }
    }

    drawActor(actor, parentNode)
    {
        var element = document.createElement('div');

        let backgroundImage;
        if(actor.actorType == ActorType.Plantlet)
        {
            backgroundImage = "Url('./img/plant.png')";
        }
        else if(actor.actorType == ActorType.Buglet)
        {
            backgroundImage = "Url('./img/bug.png')";
        }
        else
        {
            throw new Exception("invalid or missing actor type");
        }

        element.style.backgroundImage = backgroundImage;
        element.style.backgroundSize = "contain";
        element.style.height = actor.size + "px";
        element.style.width = actor.size + "px";
        element.style.position = "absolute";
        element.style.left = (actor.location.x - actor.size/2)* SCALE;
        element.style.top = (actor.location.y - actor.size/2  )* SCALE;
        element.style.zIndex = ACTOR_ZINDEX;

        // todo
        if(actor.orientation != null)
        {
            element.style.transform = 'rotate(' + (actor.orientation + 90)  + 'deg)';
        }
        
        parentNode.appendChild(element);

        // if has sight distance, draw glow
        // if(typeof actor.getSightDistance === 'function')
        // {
        //     let distance = actor.getSightDistance();
        //     var glow = document.createElement('div');
        //     glow.style.background = 'lightblue';
        //     glow.style.borderRadius = '50%';
        //     glow.style.width = distance*2 + "px";
        //     glow.style.height = distance*2 + "px";
        //     glow.style.zIndex = GLOW_ZINDEX;
        //     glow.style.position = "absolute";
        //     glow.style.left = (actor.location.x - distance) * SCALE
        //     glow.style.top = (actor.location.y - distance) * SCALE
        //     glow.style.opacity = '50%';

        //     parentNode.appendChild(glow)
        // }
    }
}