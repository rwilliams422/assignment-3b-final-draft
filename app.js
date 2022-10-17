/* ASSIGNMENT 3B WILLIAMS REBEKAH */
/* This script runs a program that will create a hourglass
timer that changes when the users goes forward(next) and backward(prev) 
or when a  nexus event occurs
the Hourglass consists of the inner and outer materials
entered in the input boxes.
*/

// ******** Initial variable declarations ***********

/*
Space for the html (placeholder) Since we cannot use 
regular spaces from javascript to html we use this and concatonate 
it when needed
*/

let empty ='\xa0'; 

// n shows the number of rows to each half of the hourglass. 

let n = 14; 

let charLine = ""; // the string that we will add to

/* 
number of inital spaces (time) This variable acts as a 
counter to hold what time it and is used by the for loops to 
determine if they should be spaces or the inner material
 */

let time = 0; 

// number of spaces for the base

let base = 12 - time; 

/* This function getInner() gets the inner material
from the users and returns it */

function getInner() {
    let innerM = " " ;
    innerM += document.getElementById("innerM").value;
    return innerM;
}

/* This function getOuter() gets the outer material
from the users and returns it */

function getOuter() {
    let  outerM = " ";
    outerM += document.getElementById("outerM").value;
    return outerM
}
/* 
This function clears the div of the old 
content so we can add in the content
 */
function clearDiv() {
    let divStuff = document.getElementById("time");
    divStuff.innerHTML="";
}

/* 
The function display is called by the onclick on the display button
it gets the information from getInner and getOuterNext, and calls clearDiv 
to reset it. It then calls hourglass to draw the glass, passing it the 
innerM, outM and time 
*/

function display() {
    let innerM = getInner();
    let outerM = getOuter();
    clearDiv();
    hourGlass(innerM, outerM, time);
}

/*
The next function decides what the time and base are set at
resets them and then calls the hourgladd function again
*/

function next() {
    clearDiv();
    // let newTime = document.getElementById("next").value;
        if (time === 12) {
           time = 0;
           base = 12;
        } else {
            time = time + 1;
            base = 12 - time;
        }
        let innerM = getInner();
        let outerM = getOuter();
    hourGlass(innerM, outerM, time);
}

/*
The prev function decides what the time and base are set at
resets them and then calls the hourglass function again to draw the hourglass
*/

function prev() {
    clearDiv();
    if (base == n - 2) {
        base = 0;
        time = 12;
    } else {
        time = time - 1;
        base = 12 - time;
    } 
    let innerM = getInner();
    let outerM = getOuter();
    hourGlass(innerM, outerM, time);
}

/*
The nexus function "resets" the hour glass back to t=0, it clearsthe DIv and
calls hourglass again
*/

function nexus() {
    let innerM = getInner();
    let outerM = getOuter();
    clearDiv();
    time = 0;
    base = 12;
    hourGlass(innerM, outerM, time)
}

/* 
The hourglass function takes an inner material, outer material and a time.
It then goes through the long complex process of making the hour glass
The structure is set up in four sections, first the spaces on the left are made 
and then the top left is created, top right, bottom left and bottom rate. 
These are created using for loops to track indexes of spaces and outer materials
This tells the next loops what to put where based on what time and base are 
currently set to. 
*/

function hourGlass(inner, outer, time) {
    // The counters keep track of what loop we are on (used for the innner for loops)
    let counter = 0;
    let counter2 = 0;
    // clear charLine at the beggining and add the space
    charLine = ""
    charLine += empty;

    // creates the top edge
    //charline += ""
    charLine += outer.repeat(n);

    // Creat the paragraph element and the text node. 
    // Append the CHild and add it to the div. 
    let t1 = document.createElement("p");
    let t2 = document.createTextNode(charLine);
    t1.appendChild(t2);
    const divTime = document.getElementById("time");
    divTime.appendChild(t1);

    //reset the charLine after we append it
    charLine = ""


    for(let i = 1; i < n; i++) { 
        // spaces on the right
        let empty='\xa0';
        // adds the extra spaces
        charLine += empty.repeat(i);
        // this prints the top left side
        counter += 1;
        for (let j = i; j < n; j++) {
            if (j === i) {
                //border on the top left
                charLine += outer; 
            } else {
                // everything below the time gets colored in, otherwise its a space
                if (counter < time + 1 ) {
                    charLine += empty;    
                }
                else {
                    if ( j - 1 % 2 == 0) {
                        charLine += inner;
                        }
                }
            }
        }
        // the top right side of the triangle
        // this counter keeps track of the rows we are on 
        for (let k = i; k < n; k++) {      
            if (k === n -1 ) {
                // outer material mark
                charLine += outer;
            } else {
                // everything below the time gets colored in, otherwise its a space
                if (counter < time + 1) {
                    charLine += empty;
                }
                else {
                    charLine += inner;
                }
            }
        }

        // Creat the paragraph element and the text node. 
        // Append the CHild and add it to the div. 
        let t3= document.createElement("p");
        let t4 = document.createTextNode(charLine);
        t3.appendChild(t4);
        divTime.appendChild(t3);
        charLine = "";
    }
    // ************* BOTTOM OF TRIANGLE ********************  
    for (let i = n - 1; i > 0; i--) {
        // adds the extra spaces  
        charLine += empty.repeat(i);
        // bottom left side of the triangle
        for (let j = i - 1 ; j < n -1 ; j++) {
            // bottom right outline. 
            // if j (input we are on) is equal to the row -1 then we outline
            if (j === i -1 ) {
                charLine += outer;
            } else {
                // everything below the time gets colored in, otherwise its a space
                if (counter2 <= base) { 
                    let empty='\xa0'; 
                    charLine += empty;
                }   
            }
        }
        for (let k = i - 1 ; k < n -1 ; k++) {
            // the end (n) minus two to get the right side
            if (k === n - 2) {
                charLine += outer; 
                // bottom right inside material
            } else {
                // whats greater than becomes the content otherwise a space
                if (counter2 > base) { 
                    charLine += inner;
                } else {
                    let empty='\xa0'; 
                    charLine += empty;
                }           
            }
        }
        counter2 += 1;
        charLine += "\n";
        // Creat the paragraph element and the text node. 
        // Append the CHild and add it to the div. 
        let pb= document.createElement("p");
        let pbn = document.createTextNode(charLine);
        pb.appendChild(pbn);
        divTime.appendChild(pb);

        // reset charLine since we added it to the html
        charLine = "";
    }
    // Create the bottom of the hourgass. Same process as the beginning
    charLine += empty;
    charLine += outer.repeat(n);
    let bl= document.createElement("p");
    let bln = document.createTextNode(charLine);
    bl.appendChild(bln);
    divTime.appendChild(bl);
}
