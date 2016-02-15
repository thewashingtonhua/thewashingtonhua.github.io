// Allow some console output for debuging.
var DEBUG_MODE = true;

// array to store up/down requests in certain order
var queue = [];
// directions. up:true, down:false
var goingup = true;
// if no request, then running==false
var running = false;
// elevator's current floor
var currentFloor = 1;

// top and bottom of the building
var MAX_FLOOR = 10;
var MIN_FLOOR = 0;

// global timer
var timer;

// buttons
$("#maintain").click(function(){
    alert("Calling Maintainance ...");
});
$("#emergency").click(function(){
    alert("Calling Emergency ...");
});

function openDoor() {
    $("#leftdoor").css("left", 0);
    $("#rightdoor").css("left", "500px");
}

function closeDoor() {
    $("#leftdoor").css("left", "150px");
    $("#rightdoor").css("left", "350px");
}

$("#open").click(openDoor);
$("#close").click(closeDoor);

// calling the elevator to go certain floor
function dial(floor) {
    if ( queue.indexOf(floor) < 0 ) {               // Don't add if already exist.
        queue.push(floor);
        if (goingup) {
            queue.sort(compareNumbersIncrease);
        } else {
            queue.sort(compareNumbersDecrease);
        }
    }
    if(!running) {
        checkStatus();
    }
}

// key binding
$(".goup").click(function(){
    var this_id = $(this).parent().parent()[0].id;
    dial(Number(this_id.substr(5)));
    $(this).addClass("on");
});

$(".godown").click(function(){
    var this_id = $(this).parent().parent()[0].id;
    dial(Number(this_id.substr(5)));
    $(this).addClass("on");
});

$("#dial .button").click(function(){
    var this_id = $(this)[0].id;
    dial(Number(this_id.substr(4)));
    $(this).addClass("pressed");
});


// kill the lights when arrived
function lightsOut(floor) {
    if ($("#floor" + floor + " td a")[0])
        $("#floor" + floor + " td a")[0].className = "goup";
    if ($("#floor" + floor + " td a")[1])
        $("#floor" + floor + " td a")[1].className = "godown";

    if ($("#dial" + floor))
        $("#dial" + floor).removeClass("pressed");
}

// move
function moveUp() {
    if ( currentFloor < MAX_FLOOR )
        currentFloor++;
}

function moveDown() {
    if ( currentFloor > MIN_FLOOR )
        currentFloor--;
}

// update infos about current floor
function updateFloorInfo() {
    $("#bell tr").each(function(){
        $(this).children()[0].innerHTML = "";
    });
    $("#floor"+currentFloor).children()[0].innerHTML = "Elevator";

    $("#indicator li.current").removeClass("current");
    $("#indicator li")[currentFloor].className = "current";

    if(currentFloor>0) {
        $("#floorTitle").text(""+currentFloor);
        $("#floorOnScreen").text(""+currentFloor);
    } else {
        $("#floorTitle").text("B"+(1-currentFloor));
        $("#floorOnScreen").text("B"+(1-currentFloor));
    }
}

// main algorithm
function run() {
    if (DEBUG_MODE) {
        console.log("running:"+running + "  goingup:"+goingup + "  queue:"+queue + " previousFloor:"+currentFloor);
    }
    
    if(running) {
        if (queue.indexOf(currentFloor) > -1) {             // if elevator is right where it's called
            if (timer)
                clearInterval(timer);
            lightsOut(currentFloor);
            removeFromQueue(queue, currentFloor);
            openDoor();
            setTimeout(function(){
                closeDoor();
                setTimeout(function(){
                    timer = setInterval(run, 1000);
                }, 3000);
            }, 4000);
        } else if (goingup) {
            moveUp();
            updateFloorInfo();
            if ( queue.indexOf(currentFloor) > -1 ) {
                if (timer)
                    clearInterval(timer);
                lightsOut(currentFloor);
                removeFromQueue(queue, currentFloor);
                openDoor();
                setTimeout(function(){
                    closeDoor();
                    setTimeout(function(){
                        timer = setInterval(run, 1000);
                    }, 3000);
                }, 4000);
            }
        } else {
            moveDown();
            updateFloorInfo();
            if ( queue.indexOf(currentFloor) > -1 ) {
                if (timer)
                    clearInterval(timer);
                lightsOut(currentFloor);
                removeFromQueue(queue, currentFloor);
                openDoor();
                setTimeout(function(){
                    closeDoor();
                    setTimeout(function(){
                        timer = setInterval(run, 1000);
                    }, 3000);
                }, 4000);
            }
        }
        checkStatus();
    }
}

// utilities
// check if it's still running
function checkStatus() {
    running = ( queue.length > 0) ? true : false;
    if(currentFloor == MIN_FLOOR) {
        goingup = true;
    } else if (currentFloor == MAX_FLOOR) {
        goingup = false;
    } else {
        if ( goingup && (!running || currentFloor < getMaxInQueue(queue)) ) {
            goingup = true;
        } else {
            goingup = false;
        }
        if ( !goingup && (!running || currentFloor > getMinInQueue(queue)) ) {
            goingup = false;
        } else {
            goingup = true;
        }
    }
    
    goingup ? queue.sort(compareNumbersIncrease) : queue.sort(compareNumbersDecrease);
}

// get max from an array
function getMaxInQueue(queue) {
    if (queue.length <= 0) {
        throw new Error("can't get max from an empty array.");
        return false;
    }
    if (queue.length == 1) {
        return queue[0];
    } else {
        var max = queue[0];
        for(var i in queue) {
            if (queue[i] > max) {
                max = queue[i];
            }
        }
        return max;
    }
}

// get max from an array
function getMinInQueue(queue) {
    if (queue.length <= 0) {
        throw new Error("can't get min from an empty array.");
        return false;
    }
    if (queue.length == 1) {
        return queue[0];
    } else {
        var min = queue[0];
        for(var i in queue) {
            if (queue[i] < min) {
                max = queue[i];
            }
        }
        return min;
    }
}

// remove certain floor from queue
function removeFromQueue(queue, floor) {
    if (queue.indexOf(floor) < 0) {
        throw new Error("Can't remove non-existent floor from queue.");
        return false;
    }
    if (queue.length <= 0) {
        throw new Error("Can't remove floor from empty queue.");
        return false;
    }
    for (var i=0, len=queue.length; i<len; i++) {
        if (queue[i] == floor) {
            for(var j=i; j<len-1; j++) {
                queue[j] = queue[j+1]
            }
            queue.pop();
        }
    }
}

function compareNumbersIncrease(a, b) {
  return a - b;
}

function compareNumbersDecrease(a, b) {
  return b - a;
}

var timer = setInterval(run, 1000);