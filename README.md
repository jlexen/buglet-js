# buglet-js
The concept of a "Buglet" derives from the combination "Bug" and an "Applet". My whole life I have been fascinated by insects, their abilities to understand their environments, judge situations and, overall, simply evolve and survive. As my understanding of computer science has grown, I have thought of many ideas how to create my own virtual bugs to simulate and better understand what I was seeing in nature.

I started the project trying to model in a purely mechanistic manner the process of life cycle of a single "Buglet" species. Although I am no entomologist, I do have a basic understanding of biology and genetics. I knew genetics was key in order to allow for the species to evovle. So, I made sure that genetics was baked in the fiber of the behavior of the buglets.

# What is a Buglet
In this world I created, a buglet is a simple organism that searches for food and reproduces. As time goes by, it uses up it's energy by simply living or by moving. If the buglet runs out of energy, it will die and disappear. If the buglet finds itself in a suitable environment it will reproduce asexually, duplicating itself and giving half of it's energy and a copy of its genetic material to the newly created double. I chose asexual reproduction because I thought it would be interesting, but it is also a simple way to make sure genetics were passed down along generations.

I also introduced another twist, where if a buglet encounters a smaller buglet, it will eat them and gain their energy. The purpose of this was to put additional pressure on the survival of the species without complicating the simulation with a predator or other threat. I also simply thought this might create some more interesting situations we might not normally see in nature.

# V1 Version
The V1 version is almost not worth mentioning except that it was my first attempt at creating a visual model and basic behavior of the buglet. I knew having the visual model was very important in order to make the simulation visually simulating. Looking at printed out reports of generations was just not going to be enough. 

In V1, a random amount of Buglets (red squares) will spawn will search for and consume plants (green squares). 

I found myself limited by the grid system and decided to revamp the physical world in V2 before introducing genetics. I kept the code for V1 because I enjoy looking back on progress and seeing projects evolve over time.

# V2 Version
In V2 I created a slightly more pleasing visual world, not limited to a grid.

In this world, a single buglet spawns and begins looking for plants. As the buglet finds plants and grows it will eventually find itself in a suitable situation to duplicate, creating a copy of itself with slightly randomly modified genetics. 

The genetics in this version are quite simple and not at all mirroring mechanical structures of real DNA. Check out the BugletGenome class to get some more details on this, but pretty much every behavior performed by a buglet is influenced by it's genome, from how far it can see to how much space it desires in order to duplicate. It also involves a naive approach of metabolism, fear and how likely it is to wander.

By clicking the space bar during the simulation, you can pause the activity and view the averages of the each of the genomic properties across all of the buglets. The beginning value of each property is .5 and can range between 0 and 1.

I was pleased with the results of what I have so far. Overall I saw a tendency for buglets to evolve more efficient metabolisms and better eyesight.

However, I have seen incredibly wildly different worlds created, where one world ends up with a single buglet that refuses to reproduce or that constantly eats it's duplicate, or where the world becomes saturated with hundreds of very large and slow moving buglets. 


# Current Limitations and Next Steps

Going forward, I see a lot of potential and would like to create simulations on a larger scale, record histories and better understand what happens to popoluations over time.

However, I find myself a bit limited by the vanilla Javascript and have been wasting a lot of time fixing typo-related bugs as the project grows larger. I chose Javascript for its simplicity and ability to run with just a browser, but it's time for a more robust framework or language. I also find myself wanting to create long running simulations without a front end, and I would like to re-write the codebase much less coupled to the front end. In addition, I want to be able to perform historical reporting and introduce some graphs to better visualize the data.

I am also interesting in creating a more interesting and visually pleasing environment, such as a game engine. My css and dom manipulation can only go so far. 

My next steps will be to choose a better framework/language and/or game engine that will save me time on working on the UI and focus more on creating more interesting genetic scenarios. That leads me to my other goal, to introduce a more organic system of genetics mirroring better actual genetic code. 

This is just the beginning! I am very interested in seeing how this project evolves and the turns it will take.

#Running the app
Please check out the app with this link: [Latest: V2 Buglet App](https://jlexen.github.io/buglet-js/v2/bugletworld.html)
