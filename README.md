# Honeycomb Compass - Web UI
## _by Martin Lorenzo_

This is a project related to the Web UI of a code challenge called Honeycomb Compass, which stands:

> Honeycomb Compass
 >
> A bee researcher discovered how to improve honey production by guiding bees in a honeycomb to certain cells, in such a way that arranging a group of bees in a very specific layout, their production as a team is greatly improved.
>
> The honeycomb is an N by N rectangular shape. The location of a bee in the honeycomb is identified by x and y coordinates of the cell, and the orientation (that is, the cardinal point where the bee is pointing at: North, South, East and West). Bees move from one cell to the other one in single step movements and can rotate left/right within a cell.
> 
> The initial position for such a design is 0,0,N, which identifies a bee located in the bottom left corner and facing North. The cell directly to the North from x, y is x,y+1.
 
> In order to guide a bee to its final location, the researcher designed a bio-interface to trigger the following actions:
 
> Spin 90 degrees left or right, without moving from its current spot: in this case, the bio-interface accepts commands L and R, for left and right rotation respectively
Move forward one cell in the honeycomb, maintain the same heading: in this case, the bio-interface accepts command M
 
> Model and algorithmic
Design and implement a system to support the researcher's bio-interface. The system expects:
One line for the honeycomb's upper-right coordinates (lower-left coordinates are assumed to be 0,0), which is used to initialize the honeycomb.
> Two lines per bee:
1st line indicates the initial position and heading where the bee is initially placed
2nd line indicates a stream of instructions to guide the bee
The output for each stream processed is the final position and heading where the bee ended up.

> Example
Input
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
Expected Output
1 3 N
5 1 E
 
> ---------
> Rest API
Since the bio-interface device is meant to be used by different researchers to conduct experiments, you are asked to design and implement a robust REST API using Flask that allows to operate remotely, re-using the system defined above.

> Web UI
Create a Web UI using React (latest versions) to visualize:
Honeycomb grid: the user enters the shape of the honeycomb so it can be initialized and rendered
Bee tour: the user specifies where the bee starts, where is heading to, and visualizes it in the honeycomb
Final position: the user enters instructions for a specific bee, and visualizes the final position

## Features

- A Web UI to manage the honeycomb and the bees inside it
- Set the size of the honeycomb and dinamically see the size of it
- Add the bees one by one, visualizing the initial position in the honeycomb and set the sequence of moves this one will do on the simulation
- Visualize the bees with different colors and one on top of the other in case two of them are in the same cell
- Visualize the bees moving on the honeycomb. Either one step at a time, or just the final position.
- Reset the honeycomb to the initial state and start over

## Tech

Libraries and tools used for this development:

- [React JS] - Javascript library for Web development!
- [Visual studio code] - mostly use IDE for web applications
- [Axios] - Promise-based HTTP Client for node.js and the browser.
- [Material UI] - MUI offers a comprehensive suite of UI tools to help you ship new features faster

## Installation

Honeycomb Compass - Web UI requires [npm] in order to install and 
Install the dependencies and devDependencies and start the 
```sh
npm install
```
To run the app in the browser
```sh
npm start
```
 The app should start on localhost and port 3000.
 In case it doesn't work, try with yarn:
 ```sh
yarn install
```
And then again try starting the app
```sh
npm start
```
[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - )

   [npm]: <https://www.npmjs.com/>
   [Visual studio code]: <https://code.visualstudio.com/>
   [React JS]: <https://es.reactjs.org/>
   [Material UI]: <https://mui.com/>
   [Axios]: <https://axios-http.com/docs/intro>
