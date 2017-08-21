//Maintains direction of cannon movement.
var cannonMovement = 0;
//Maintains various actions on the boat can be performed.
var canShoot = 0;
var canRaise = 0;
var canCatch = 0;
//Maintains various actions on the boat are being performed.
var appleRaised = 0;
var armsRaised = 0;
var repairing = 0;
//Maintains the speed of the boat.
var boatSpeed = 1;
//Maintains the damage dealt to the enemy.
var damageDealt = 0;
//Maintains how many axes the moorlord has thrown.
var moorlordAxeThrows = 4;
//Maintains the current movement pattern of moorlord.
var moorlordMovement = 0;
//Maintains the condition of the boat.
var boatHealth = 100;
//Maintains the direction that iris faces.
var irisTurn = 0;
//Maintains the flapping of the skull.
var skullFlap = 0;
//Maintains the number of various items that the player possesses.
var ammunition = 100;
var skulls = 0;
var repairKits = 1;
//Maintains the arrival status of various characters.
var wretchedArrive = 0;
var huronArrive = 0;
var skullArrive = 0;
var moorlordArrive = 0;
//Maintains various dialogue trackers.
var stalwartText = 0;
var irisText = 0;
var lawrenceText = 0;
var javertText = 0;
var moorlordText = 0;
//Maintains various aspects of gameplay control.
var win = 0;
var winning = 0;
var introText = 0;
var gameStart = 1;
var mute = 0;
var mouseToggle = 0;

//Maintains songs in the game
var introSong = new sound("the_burden_of_the_birthright.wav");
var midSong = new sound("urgency_remake.wav");


//Listens to they keyboard for control either key "down" or "up".
window.addEventListener("keydown", boatMove, false);
window.addEventListener("keyup", boatStop, false);

//Controls animations.
setTimeout(irisTurnReload, 4000);
setTimeout(skullFlapReload, 300);

//setTimeout(beginGame, 20000);
setTimeout(introTextAdvance, 5000);


function boatMove(e) {
    switch (e.keyCode) {
        //"W" key moves cannon up
        case 87:
            cannonMovement = 1;
            break;
        //"D" key moves cannon down
        case 83:
            cannonMovement = -1;
            break;
        //"A" key commences fire.
        case 65:
            if (canShoot == 1 && ammunition > 0) {
                ammunition -= 1;
                cannonBall.x = cannon.x;
                cannonBall.y = cannon.y;
                cannonShotXAngle = Math.sin(cannon.angle);
                cannonShotYAngle = Math.cos(cannon.angle);
                canShoot = 0;
                //If repairs on the boat are occuring, the cannon shoots half as fast.
                if (repairing == 0) {
                    setTimeout(cannonReload, 300);
                } else {
                    setTimeout(cannonReload, 600);
                }
            }
            break;
        //"F" key raises apple.
        case 70:
            if (canRaise == 1) {
                //Raising apple.
                lawrence.image.src = "farmer_raiseArm.gif";
                canRaise = 0;
                appleRaised = 1;
                //Now waiting for Huron to take apple.
                setTimeout(appleWait, 1500);
            }
            break;
        //"E" key to commence catching a skull.
        case 69:
            if (canCatch == 1) {
                //Closing arms.
                iris.image.src = "lady2grab.gif";
                canCatch = 0;
                armsRaised = 1;
                //Now waiting for skull to come in contact.
                setTimeout(catchWait, 800);
            }
            break;
        //"D" key to commence repairs on the boat.
        case 68:
            if (repairKits > 0 && repairing == 0) {
                repairing = 1;
                repairKits -= 1;
                //Beginning javert's 1 line
                javertText = 1;
                setTimeout(resetJavertText, 5000);
                //Now commencing repairs.
                setTimeout(repairReload, 20000);
            }
            break;
    }
}

function moorlordArrival() {
    damageDealt = 0;
    //Does a phantasm whirl recursively until it reaches a certain point
    if (moorlordPhantasm.x < 150) {
        moorlordPhantasm.x += 50;
        if (moorlordPhantasm.y == 245) {
            moorlordPhantasm.y -= 50;
        } else {
            moorlordPhantasm.y += 50;
        }
        setTimeout(moorlordArrival, 300);
        //Then creates the moorlord at the appropriate location and begins tossing axes
    } else {
        moorlordPhantasm.x = -30;
        moorlordPhantasm.y = 245;
        moorlord.x = 175;
        moorlord.y = 245;
        moorlordArrive = 1;
        textChooser = Math.random() * 2;
        if (textChooser > 1) {
            lawrenceText = 4;
            setTimeout(resetLawrenceText, 5000);
        } else {
            stalwartText = 3;
            setTimeout(resetStalwartText, 5000);
        }
        moorlordAxeThrows = 4;
        setTimeout(moorlordAxeToss, 800);
    }
}

function moorlordAxeToss() {
    //Toss number of axes. Once done, prepare to move to middle.
    moorlord.image.src = "moorlordAttack.gif";
    moorlordAxe.x = moorlord.x;
    moorlordAxe.y = moorlord.y;
    if (moorlordAxeThrows > 0) {
        setTimeout(moorlordAxeToss, 800);
        moorlordAxeThrows -= 1;
        boatHealth -= 14;
    } else {
        moorlord.image.src = "moorlord.gif";
        moorlordPhantasm.x = 80;
        moorlordPhantasm.y = 200;
        setTimeout(moorlordToMiddle, 800);
    }
}

function moorlordToMiddle() {
    //Jump to middle, and prepare to sweep right.
    moorlord.x = 80;
    moorlord.y = 200;
    moorlord.image.src = "moorlord.gif";
    setTimeout(moorlordMoveRight, 800);
}

function moorlordMoveRight() {
    //Sweep right, and prepare to halt right.
    moorlordPhantasm.x = -30;
    moorlordPhantasm.y = 245;
    moorlord.image.src = "moorlordAttack.gif";
    moorlordMovement = 1;
    moorlord.x = 80;
    moorlord.y = 200;
    setTimeout(moorlordHaltRight, 1500);
}

function moorlordHaltRight() {
    //Halt right, and prepare to flutter phantasms.
    moorlord.image.src = "moorlord.gif";
    moorlordMovement = 0;
    moorlordPhantasm.x = 40;
    moorlordPhantasm.y = 100;
    setTimeout(phantasmFlutter, 1500);
}

function phantasmFlutter() {
    //Flutter phantasms recursively until the appropriate x has been reached. Prepare to move to top.
    if (moorlordPhantasm.x != 100) {
        if (moorlordPhantasm.x < 100) {
            moorlordPhantasm.x += 55;
        } else {
            moorlordPhantasm.x -= 35;
        }
        setTimeout(phantasmFlutter, 200);
    } else {
        moorlord.image.src = "moorlordAttack.gif";
        setTimeout(moorlordToTop, 1000);
    }
}

function moorlordToTop() {
    //Move to top, and fade away.
    moorlord.x = moorlordPhantasm.x;
    moorlord.y = moorlordPhantasm.y;
    moorlordPhantasm.x = -30;
    moorlordPhantasm.y = 245;
    moorlord.image.src = "moorlord.gif";
    moorlordMovement = 2;
    textChooser = Math.random() * 2;
    if (textChooser > 1) {
        moorlordText = 1;
        setTimeout(resetMoorlordText, 5000);
    } else {
        moorlordText = 2;
        setTimeout(resetMoorlordText, 5000);
    }
}

function boatStop(e) {
    //On key release, stop the appropriate actions.
    switch (e.keyCode) {
        case 87:
            cannonMovement = 0;
            break;
        case 83:
            cannonMovement = 0;
            break;
    }
}

function cannonReload() {
    //Allows ammunition to be fired.
    canShoot = 1;
}

function irisTurnReload() {
    //Switches direction that iris faces and prepares to do it again recursively.
    if (iris.image.src != "lady2grab.gif") {
        if (irisTurn == 0) {
            iris.image.src = "lady2.gif";
            irisTurn = 1;
        } else {
            iris.image.src = "lady.gif";
            irisTurn = 0;
        }
    }
    setTimeout(irisTurnReload, 6000);
}

function skullFlapReload() {
    //Switches wing stance on skull and prepares to do it again recursively.
    if (skullFlap == 0) {
        skull.image.src = "FloatingSkull1.gif"
        skullFlap = 1;
    } else {
        skull.image.src = "FloatingSkull2.gif"
        skullFlap = 0;
    }
    setTimeout(skullFlapReload, 300);
}

function appleReload() {
    //NOW can raise lawrence apple.
    canRaise = 1;
}

function appleWait() {
    //Lowering lawrence apple. Must wait.
    lawrence.image.src = "farmer.gif";
    appleRaised = 0;
    setTimeout(appleReload, 3000);
}

function catchReload() {
    //NOW can raise iris arms.
    canCatch = 1;
}

function catchWait() {
    //Lowering iris arms. Must wait.
    iris.image.src = "lady2.gif";
    armsRaised = 0;
    setTimeout(catchReload, 1000);
}

function repairReload() {
    //Completing repair and allowing it to occur again.
    repairing = 0;
    boatHealth += 40;
    if (boatHealth >= 100) {
        boatHealth = 100;
    }
    //Beginning javert's 2 line
    javertText = 2;
    setTimeout(resetJavertText, 5000);
}

function wretchedArrival() {
    //Used to initiate movement.
    irisText = 2;
    setTimeout(resetIrisText, 5000);
    wretchedArrive = 1;
    wretch.x = 900;
    wretch.y = 220;
}

function huronArrival() {
    //Used to initiate movement.
    huronArrive = 1;
    huron.x = 700;
    huron.y = 120;
    irisText = 1;
    setTimeout(resetIrisText, 5000);
}

function skullArrival() {
    //Used to initiate movement.
    irisText = 5;
    setTimeout(resetIrisText, 5000);
    skullArrive = 1;
    skull.x = 900;
    skull.y = 190;
}

function resetStalwartText() {
    //Resets text for character, triggers any necessary follow-up text.
    if (stalwartText == 4) {
        lawrenceText = 6;
        setTimeout(resetLawrenceText, 5000);
    }
    stalwartText = 0;
}

function resetIrisText() {
    //Resets text for character, triggers any necessary follow-up text.
    if (irisText == 2) {
        textChooser = Math.random() * 2;
        if (textChooser > 1) {
            lawrenceText = 2;
            setTimeout(resetLawrenceText, 5000);
        } else {
            javertText = 3;
            setTimeout(resetJavertText, 5000);
        }
    } else if (irisText == 7) {
        javertText = 7;
        setTimeout(resetJavertText, 5000);
    } else if (irisText == 8) {
        javertText = 8;
        setTimeout(resetJavertText, 5000);
        //Initiates various character arrivals.
        setTimeout(wretchedArrival, 10000);
        setTimeout(huronArrival, 90000);
        setTimeout(skullArrival, 100000);
    }
    irisText = 0;
}

function resetJavertText() {
    //Resets text for character, triggers any necessary follow-up text.
    if (javertText == 1) {
        stalwartText = 1;
        setTimeout(resetStalwartText, 5000);
    } else if (javertText == 6) {
        stalwartText = 4;
        setTimeout(resetStalwartText, 5000);
    } else if (javertText == 7) {
        irisText = 8;
        setTimeout(resetIrisText, 5000);

    }
    javertText = 0;
}

function resetLawrenceText() {
    //Resets text for character, triggers any necessary follow-up text.
    if (lawrenceText == 4) {
        irisText = 3;
        setTimeout(resetIrisText, 5000);
    } else if (lawrenceText == 6) {
        irisText = 7;
        setTimeout(resetIrisText, 5000);
    }
    lawrenceText = 0;
}

function resetMoorlordText() {
    //Resets text for character, triggers any necessary follow-up text.
    if (moorlordText == 1) {
        lawrenceText = 5;
        setTimeout(resetLawrenceText, 5000);
    } else if (moorlordText == 2) {
        javertText = 5;
        setTimeout(resetJavertText, 5000);
    }
    moorlordText = 0;
}

function introTextAdvance() {
    //Begins actual game after intro is over. Enables shooting, etc.
    if (introText != 12) {
        setTimeout(introTextAdvance, 5000);
    } else {
        gameStart = 0;
        canShoot = 1;
        canRaise = 1;
        canCatch = 1;
        setTimeout(beginningText, 8000);
    }
    introText += 1;
}

function beginningText() {
    //Begins first text of game.
    javertText = 6;
    setTimeout(resetJavertText, 5000);

    introSong.stop();
    if (mute != 1) {
        midSongUpdate();
    }

}

function midSongUpdate() {
    if (mute != 1) {
        midSong.play();
        setTimeout(midSongUpdate, 1);
    }
}

function winScreen() {
    //Used to delay going to win screen until after text by Javert.
    win = 1;
}

function toggleMouse() {
    if (mouseToggle == 0) {
        animFrame.canvas.addEventListener("mousemove", mouseMove);
        mouseToggle = 1;
    } else {
        animFrame.canvas.removeEventListener("mousemove", mouseMove);
        mouseToggle = 0;
    }
}

function createEnvironment() {
    //Creating components in the environment.
    moon = new component(61, 61, "moon.gif", 320, 50, "image");
    mountain1 = new component(300, 200, "mountain1.gif", 380, 140, "image");
    mountain2 = new component(300, 150, "mountain2.gif", 680, 140, "image");
    mountain3 = new component(300, 250, "mountain3.gif", 100, 140, "image");
    mountain4 = new component(150, 125, "mountain3.gif", 180, 160, "image");
    mountain5 = new component(150, 75, "mountain2.gif", 400, 180, "image");
    mountain6 = new component(150, 100, "mountain1.gif", 650, 160, "image");
    bogTree1 = new component(135, 220, "bog_tree.gif", 100, 150, "image");
    bogTree2 = new component(135, 220, "bog_tree.gif", 200, 155, "image");
    bogTree3 = new component(135, 220, "bog_tree.gif", 300, 153, "image");
    bogTree4 = new component(135, 220, "bog_tree.gif", 400, 152, "image");
    bogTree5 = new component(135, 220, "bog_tree.gif", 500, 151, "image");
    bogTree6 = new component(135, 220, "bog_tree.gif", 600, 154, "image");
    bogTree7 = new component(135, 220, "bog_tree.gif", 700, 155, "image");
    bogTree8 = new component(135, 220, "bog_tree.gif", 800, 156, "image");
    forGrass = new component(640, 150, "#26610e", 320, 400, "shape");
    forWater = new component(640, 50, "#26207e", 320, 300, "shape");
    backWater = new component(640, 50, "#26207e", 320, 250, "shape");
    backgrass = new component(640, 50, "#26610e", 320, 200, "shape");
    reeds1 = new component(300, 32, "reeds.gif", 230, 222, "image");
    reeds2 = new component(300, 32, "reeds.gif", 520, 220, "image");
    reeds3 = new component(300, 32, "reeds.gif", 810, 225, "image");
    reeds4 = new component(300, 32, "reeds.gif", 1100, 224, "image");
    reeds5 = new component(300, 32, "reeds.gif", 1400, 223, "image");
    sky = new component(640, 300, "#3a207e", 320, 150, "shape");
    stars = new component(640, 200, "stars.gif", 320, 100, "image");
    forest1 = new component(160, 40, "forest.gif", 320, 180, "image");
    forest2 = new component(160, 40, "forest.gif", 600, 170, "image");
    forest3 = new component(160, 40, "forest.gif", 100, 170, "image");
    boatwave1 = new component(32, 32, "boatwave.gif", 450, 270, "image");
    boatwave2 = new component(32, 32, "boatwave.gif", 450, 275, "image");
    boatwave3 = new component(32, 32, "boatwave.gif", 400, 270, "image");
    boatwave4 = new component(32, 32, "boatwave.gif", 400, 275, "image");
    boatwave5 = new component(32, 32, "boatwave.gif", 350, 270, "image");
    boatwave6 = new component(32, 32, "boatwave.gif", 350, 275, "image");
    passage = new component(74, 67, "passage.gif", 800, 185, "image");
    blackScreen = new component(640, 350, "#000000", 320, 175, "shape");
    introScreen = new component(640, 480, "introImage.gif", 320, 235, "image");
}

function createCharacters() {
    //Creating components of characters.
    moorlord = new component(43, 63, "moorlord.gif", 0, -30, "image");
    moorlordAxe = new component(15, 30, "moorlordAxe.gif", 0, -30, "image");
    moorlordPhantasm = new component(27, 62, "moorlord_teleport.gif", -30, 245, "image");
    stalwart = new component(38, 48, "stalwartFaceLeft.gif", 255, 245, "image");
    javert = new component(21, 50, "old_man.gif", 365, 245, "image");
    iris = new component(50, 50, "lady.gif", 340, 190, "image");
    lawrence = new component(16, 43, "farmer.gif", 402, 247, "image");
    huron = new component(97, 60, "eagle.gif", 700, 120, "image");
    wretched = new component(65, 68, "armoredWretchFloat.gif", 900, 220, "image");
    skull = new component(25, 18, "FloatingSkull1.gif", 900, 190, "image");
}

function createBoat() {
    //Creating components of boat.
    boat = new component(240, 71, "boatFinal.gif", 340, 240, "image");
    wheel = new component(102, 102, "wheelFinal.gif", 315, 240, "image");
    cannon = new component(30, 30, "cannon.gif", 243, 242, "image");
    cannonBall = new component(4, 4, "cannonBall.gif", 100, 100, "image");
}

function startGame() {
    //Creating shapes and image components
    createEnvironment();
    createCharacters();
    createBoat();
    if (mute != 1) {
        introSong.play();
    }
    animFrame.start();
}

function stopGame() {
    //Ends the game, changing the dimensions of the canvas.
    animFrame.stop();
    animFrame.clear();
    introSong.stop();
    midSong.stop();
}

function muteGame() {
    introSong.stop();
    midSong.stop();
    mute = 1;
}

var animFrame = {
    //Creating canvas
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 640;
        this.canvas.height = 350;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateAnimFrame, 20);
    },
    //Clearing canvas
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //Stopping canvas
    stop: function() {
        clearInterval(this.interval);
        this.canvas.width = 0;
        this.canvas.height = 0;
    }
}

function component(width, height, color, x, y, type) {
    //Used to create new components
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    } else if (type == "shape") {
        //nothing special
    }
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.x = x;
    this.y = y;
    //Enables components to change images / colors.
    this.update = function() {
        ctx = animFrame.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        //Allows for image rotation.
        if (type == "image") {
            ctx.drawImage(this.image,
                this.width / -2,
                this.height / -2,
                this.width, this.height);
        } else if (type == "shape") {
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        }
        ctx.restore();
        //Checks if the component is within the scope of the canvas, and, if so, it should not be invincible.
        if (this.x < 0 || this.x > animFrame.canvas.width || this.y > animFrame.canvas.height || this.y < 0) {
            this.invincible = 1;
        } else {
            this.invincible = 0;
        }
    }
}

function sound(src) {
    //Constructor for sound
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

function updateEnvironmentBackground() {
    //Updating various background components, and resetting their Xs (perhaps in a random range) if looping.
    sky.update();
    stars.update();
    moon.update();
    mountain4.update();
    mountain5.update();
    mountain6.update();
    mountain1.x -= .05 * boatSpeed;
    if (mountain1.x < -180) {
        mountain1.x = 840 - Math.random() * 100;
    }
    mountain1.update();
    mountain2.x -= .05 * boatSpeed;
    if (mountain2.x < -180) {
        mountain2.x = 840 - Math.random() * 100;
    }
    mountain2.update();
    mountain3.x -= .05 * boatSpeed;
    if (mountain3.x < -180) {
        mountain3.x = 840 - Math.random() * 100;
    }
    mountain3.update();
    backWater.update();
    if (reeds1.x < -400) {
        reeds1.x = 940;
    }
    reeds1.x -= 1 * boatSpeed;
    reeds1.update();
    if (reeds2.x < -400) {
        reeds2.x = 940;
    }
    reeds2.x -= 1 * boatSpeed;
    reeds2.update();
    if (reeds3.x < -400) {
        reeds3.x = 940;
    }
    reeds3.x -= 1 * boatSpeed;
    reeds3.update();
    if (reeds4.x < -400) {
        reeds4.x = 940;
    }
    reeds4.x -= 1 * boatSpeed;
    reeds4.update();
    if (reeds5.x < -400) {
        reeds5.x = 940;
    }
    reeds5.x -= 1 * boatSpeed;
    reeds5.update();
    backgrass.update();
    forest1.x -= .05 * boatSpeed;
    if (forest1.x < -180) {
        forest1.x = 840 - Math.random() * 100;
    }
    forest1.update();
    forest2.x -= .05 * boatSpeed;
    if (forest2.x < -180) {
        forest2.x = 840 - Math.random() * 100;
    }
    forest2.update();
    forest3.x -= .05 * boatSpeed;
    if (forest3.x < -180) {
        forest3.x = 840 - Math.random() * 100;
    }
    forest3.update();
    if (skulls >= 3) {
        passage.x -= .8 * boatSpeed;
    }
    passage.update();
    if (bogTree1.x < -80) {
        bogTree1.x = 940 - Math.random() * 240;
    }
    if (bogTree2.x < -80) {
        bogTree2.x = 940 - Math.random() * 210;
    }
    if (bogTree3.x < -80) {
        bogTree3.x = 940 - Math.random() * 210;
    }
    if (bogTree4.x < -80) {
        bogTree4.x = 940 - Math.random() * 210;
    }
    if (bogTree5.x < -80) {
        bogTree5.x = 940 - Math.random() * 210;
    }
    if (bogTree6.x < -80) {
        bogTree6.x = 940 - Math.random() * 210;
    }
    if (bogTree7.x < -80) {
        bogTree7.x = 940 - Math.random() * 210;
    }
    if (bogTree8.x < -80) {
        bogTree8.x = 940 - Math.random() * 210;
    }
    bogTree1.x -= 1 * boatSpeed;
    bogTree1.update();
    bogTree2.x -= 1 * boatSpeed;
    bogTree2.update();
    bogTree3.x -= 1 * boatSpeed;
    bogTree3.update();
    bogTree4.x -= 1 * boatSpeed;
    bogTree4.update();
    bogTree5.x -= 1 * boatSpeed;
    bogTree5.update();
    bogTree6.x -= 1 * boatSpeed;
    bogTree6.update();
    bogTree7.x -= 1 * boatSpeed;
    bogTree7.update();
    bogTree8.x -= 1 * boatSpeed;
    bogTree8.update();
}

function updateEnvironmentMidground() {
    //Updating various midground components, and resetting their Xs (perhaps in a random range) if looping.
    forWater.update();
    if (boatwave1.x <= -50) {
        boatwave1.x = 450;
        boatwave1.y = 270;
    }
    if (boatwave2.x <= -50) {
        boatwave2.x = 450;
        boatwave2.y = 275;
    }
    if (boatwave3.x <= -50) {
        boatwave3.x = 400;
        boatwave3.y = 270;
    }
    if (boatwave4.x <= -50) {
        boatwave4.x = 400;
        boatwave4.y = 275;
    }
    if (boatwave5.x <= -50) {
        boatwave5.x = 350;
        boatwave5.y = 270;
    }
    if (boatwave6.x <= -50) {
        boatwave6.x = 350;
        boatwave6.y = 275;
    }
    boatwave1.x -= 1.5 * boatSpeed;
    boatwave1.y -= .05 * boatSpeed;
    boatwave1.update();
    boatwave2.x -= 1.5 * boatSpeed;
    boatwave2.y += .05 * boatSpeed;
    boatwave2.update();
    boatwave3.x -= 1.5 * boatSpeed;
    boatwave3.y -= .05 * boatSpeed;
    boatwave3.update();
    boatwave4.x -= 1.5 * boatSpeed;
    boatwave4.y += .05 * boatSpeed;
    boatwave4.update();
    boatwave5.x -= 1.5 * boatSpeed;
    boatwave5.y -= .05 * boatSpeed;
    boatwave5.update();
    boatwave6.x -= 1.5 * boatSpeed;
    boatwave6.y += .05 * boatSpeed;
    boatwave6.update();
}

function mouseMove(e){
    var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }


    if(mouseX >= 243){
        mouseX = mouseX - 243;
    } else {
        mouseX = 0 - (243 - mouseX); 
    }

    if(mouseY >= 242){
        mouseY = mouseY - 242;
    } else {
        mouseY = 0 - (242 - mouseY);
    }

    cannon.angle = Math.atan2((mouseX - 2*mouseX), mouseY);

    if(mouseX <= cannon.x) {
        stalwart.x = 255;
        stalwart.image.src = "stalwartFaceLeft.gif";
    } else {
        stalwart.x = 235;
        stalwart.image.src = "stalwartFaceRight.gif";
    }
}

function updateBoat() {
    //Updating various boat components, and resetting their Xs (perhaps in a random range) if looping.
    wheel.angle += boatSpeed * Math.PI / 180;
    wheel.update();
    stalwart.update();
    javert.update();
    iris.update();
    lawrence.update();
    //Depending on the key that is pressed and current position of the cannon, either don't shift cannon, or move left or right.
    if (cannonMovement == 1 && cannon.angle + 5 * Math.PI / 180 <= 360 * Math.PI / 180) {
        cannon.angle += 4 * Math.PI / 180;
    } else if (cannonMovement == -1 && cannon.angle + 5 * Math.PI / 180 >= 0 * Math.PI / 180) {
        cannon.angle -= 4 * Math.PI / 180;
    }
    //If cannon is facing left or right, Stalwart should face left or right, respectively.
    if (cannon.angle <= Math.PI && cannonMovement != 0) {
        stalwart.x = 255;
        stalwart.image.src = "stalwartFaceLeft.gif";
    } else if (cannon.angle > Math.PI && cannonMovement != 0) {
        stalwart.x = 235;
        stalwart.image.src = "stalwartFaceRight.gif";
    }
    cannon.update();
    
    //Adjusts the speed of the boat in accordance with its current health.
    if (boatHealth > 75) {
        boatSpeed = 1;
    } else if (boatHealth > 50) {
        boatSpeed = 0.5;
    } else if (boatHealth > 25) {
        boatSpeed = 0.3;
    }
    //Or, if the boat is near the passage, stop.
    if (Math.abs(boat.x - passage.x) <= 10 && skulls >= 3) {
        boatSpeed = 0;
        if (winning == 0) {
            winning = 1;
            javertText = 4;
            setTimeout(resetJavertText, 5000);
            setTimeout(winScreen, 5200);
        }
    }
}

function updateForeground() {
    //Updating foreground various components, and resetting their Xs (perhaps in a random range) if looping.
    if (skullArrive == 1) {
        skull.x -= 2 * boatSpeed;
        skull.update();
    }
    if (skull.x <= -10) {
        skull.x = 900;
        skull.y = 190;
        //Delayed x reset
        setTimeout(skullArrival, 110000);
        skullArrive = 0;
    }
    skull.update();

    if (wretchedArrive == 1) {
        wretched.x -= .2 + .8 * boatSpeed;
    }
    if (wretched.x <= -40) {
        wretchedArrive = 0;
        textChooser = Math.random() * 2;
        if (textChooser > 1) {
            stalwartText = 2;
            setTimeout(resetStalwartText, 5000);
        } else {
            irisText = 4;
            setTimeout(resetIrisText, 5000);
        }
        wretched.x = 900;
        //Delayed x arrival, plus how much DAMAGE the player dealt.
        setTimeout(moorlordArrival, 10000 + 100 * damageDealt);
    }
    wretched.update();
    forGrass.update();
    updateFont();
    if (huronArrive == 1) {
        huron.x -= 5;
        if (huron.x >= lawrence.x) {
            huron.y += 1.5;
        } else {
            huron.y -= .25;
        }
    }

    if (huron.x <= -100) {
        //Delayed x reset.
        huron.x = 700;
        huron.y = 120;
        setTimeout(huronArrival, 100000);
        huronArrive = 0;
    }

    //Receiving huron's delivery, if it has been made.
    if ((Math.abs(huron.x - lawrence.x) <= 10) && appleRaised == 1) {
        textChooser = Math.random() * 2;
        if (textChooser > 1) {
            lawrenceText = 1;
            setTimeout(resetLawrenceText, 5000);
        } else {
            lawrenceText = 3;
            setTimeout(resetLawrenceText, 5000);
        }
        ammunition += 100;
        repairKits += 1;
        appleRaised = 0;
        lawrence.image.src = "farmer.gif";
    }
    huron.update();

    cannonBall.x -= 18 * cannonShotXAngle;
    cannonBall.y += 18 * cannonShotYAngle;
    cannonBall.update();
}

function updateFont() {
    //Updating font and text.
    animFrame.context.textAlign = "left";
    animFrame.context.font = "12px Sans Serif";
    animFrame.context.strokeStyle = "fuchsia";
    animFrame.context.strokeText("Health: " + boatHealth, 10, 340);
    animFrame.context.strokeText("Ammunition: " + ammunition, 85, 340);
    animFrame.context.strokeText("Damage: " + damageDealt, 194, 340);
    animFrame.context.strokeText("Repair Kits: " + repairKits, 270, 340);
    animFrame.context.strokeText("Skulls: " + skulls, 360, 340);
    animFrame.context.textAlign = "center";
    animFrame.context.strokeStyle = "gray";
    if (javertText == 1) {
        animFrame.context.strokeText("Beginning repairs! Easy on the cannon, Stalwart.", javert.x, javert.y - 25);
    } else if (javertText == 2) {
        animFrame.context.strokeText("Repairs complete -- Stalwart, light em' up!", javert.x, javert.y - 25);
    } else if (javertText == 3) {
        animFrame.context.strokeText("Creepy things...", javert.x, javert.y - 25);
    } else if (javertText == 4) {
        animFrame.context.strokeText("Everybody, off the ship!", javert.x, javert.y - 25);
    } else if (javertText == 5) {
        animFrame.context.strokeText("Everyone okay?", javert.x, javert.y - 25);
    } else if (javertText == 6) {
        animFrame.context.strokeText("Stalwart, you have that cannon ready? (Press 'W' and 'D' to move cannon.)", javert.x, javert.y - 25);
    } else if (javertText == 7) {
        animFrame.context.strokeText("Iris, you sure if you collect three of those skulls, that portal will just... appear?", javert.x, javert.y - 25);
    } else if (javertText == 8) {
        animFrame.context.strokeText("Alright... Let's do this. (Press 'D' to use repair kit on ship.)", javert.x, javert.y - 25);
    }
    animFrame.context.strokeStyle = "magenta";
    if (irisText == 1) {
        animFrame.context.strokeText("Huron incoming!", iris.x, iris.y - 25);
    } else if (irisText == 2) {
        animFrame.context.strokeText("Another shaman, dead ahead. Blast it!", iris.x, iris.y - 25);
    } else if (irisText == 3) {
        animFrame.context.strokeText("Shut up, farmer!", iris.x, iris.y - 25);
    } else if (irisText == 4) {
        animFrame.context.strokeText("Get ready, our old friend will be returning soon enough.", iris.x, iris.y - 25);
    } else if (irisText == 5) {
        animFrame.context.strokeText("Bonehead incoming! I'll catch it... I hope.", iris.x, iris.y - 25);
    } else if (irisText == 6) {
        animFrame.context.strokeText("Aha! Got it.", iris.x, iris.y - 25);
    } else if (irisText == 7) {
        animFrame.context.strokeText("You just focus on drawing in Huron, Lawrence... (Press 'F' to raise apple.)", iris.x, iris.y - 25);
    } else if (irisText == 8) {
        animFrame.context.strokeText("Er, according to legend, it should... (Press 'E' to catch skull.)", iris.x, iris.y - 25);
    }
    animFrame.context.strokeStyle = "aqua";
    if (stalwartText == 1) {
        animFrame.context.strokeText("Holding fire. Sort of.", stalwart.x, stalwart.y - 25);
    } else if (stalwartText == 2) {
        animFrame.context.strokeText("Brace yourselves. The Moorlord will arrive soon.", stalwart.x, stalwart.y - 25);
    } else if (stalwartText == 3) {
        animFrame.context.strokeText("Let's settle this...", stalwart.x, stalwart.y - 25);
    } else if (stalwartText == 4) {
        animFrame.context.strokeText("Ready to fire. (Press 'A' to fire cannon.)", stalwart.x, stalwart.y - 25);
    }
    animFrame.context.strokeStyle = "#26ff00";
    if (lawrenceText == 1) {
        animFrame.context.strokeText("Wo-ho-ho! Did you see that? It almost ripped my fingers off!", lawrence.x, lawrence.y - 25);
    } else if (lawrenceText == 2) {
        animFrame.context.strokeText("Eugh, does anyone else smell that? Smells swampy.", lawrence.x, lawrence.y - 25);
    } else if (lawrenceText == 3) {
        animFrame.context.strokeText("Supplies! Supplies! Load the cannons, repair the ship. Now!", lawrence.x, lawrence.y - 25);
    } else if (lawrenceText == 4) {
        animFrame.context.strokeText("We're all going to die!", lawrence.x, lawrence.y - 25);
    } else if (lawrenceText == 5) {
        animFrame.context.strokeText("That didn't sound friendly.", lawrence.x, lawrence.y - 25);
    } else if (lawrenceText == 6) {
        animFrame.context.strokeText("The more you hits you make, the more distance between us and the Moorlord.", lawrence.x, lawrence.y - 25);
    }
    animFrame.context.strokeStyle = "red";
    if (moorlordText == 1) {
        animFrame.context.strokeText("...In due time I will break you all...", moorlord.x, moorlord.y - 30);
    } else if (moorlordText == 2) {
        animFrame.context.strokeText("...Adeu, friends...", moorlord.x, moorlord.y - 30);
    }
}

function updateMoorlord() {
    //Updating and moving moorlord.
    moorlordPhantasm.update();
    moorlord.update();
    moorlordAxe.x += 8;
    moorlordAxe.update();
    if (moorlordMovement == 1) {
        moorlord.x += 5;
    }
    if (moorlordMovement == 2) {
        moorlord.x -= 1 * boatSpeed;
    }
    //Prepare for arrival of wretch if moorlord is done.
    if (moorlord.x <= -100 && moorlordArrive == 1) {
        setTimeout(wretchedArrival, 50000);
        moorlordArrive = 0;
    }
}

function updateAnimFrame() {

    //Catches skull if in collision.
    if (armsRaised == 1 && Math.abs(skull.x - iris.x) <= 10) {
        skull.x = 0;
        skull.y = 0;
        skulls += 1;
        irisText = 6;
        setTimeout(resetIrisText, 5000);
    }

    animFrame.clear();
    if (boatHealth > 0 && win != 1 && gameStart == 0) {
        updateEnvironmentBackground();
        updateBoat();
        updateEnvironmentMidground();
        boat.update();
        updateMoorlord();
        updateForeground();
    } else if (boatHealth <= 0 && gameStart == 0) {
        //Losing text.
        blackScreen.update();
        animFrame.context.textAlign = "center";
        animFrame.context.font = "20px Sans Serif";
        animFrame.context.strokeStyle = "fuchsia";
        animFrame.context.strokeText("Alas,", 320, 50);
        animFrame.context.strokeText("...the heroes were overtaken by the MOORLORD...", 320, 100);
        animFrame.context.strokeText("...only to join the rest of the creatures...", 320, 150);
        animFrame.context.strokeText("...lost in the muck...", 320, 200);
    } else if (boatHealth > 0 && win == 1 && gameStart == 0) {
        //Winning text.
        blackScreen.update();
        animFrame.context.textAlign = "center";
        animFrame.context.font = "20px Sans Serif";
        animFrame.context.strokeStyle = "#26ff00";
        animFrame.context.strokeText("The heroes entered the mystic passage,", 320, 50);
        animFrame.context.strokeText("...eluding the MOORLORD'S grasp...", 320, 100);
        animFrame.context.strokeText("...in the hopes of bringing peace once again...", 320, 150);
        animFrame.context.strokeText("...to the rivers, mountains, and forests...", 320, 200);
    } else if (gameStart == 1) {
        //Game start text.
        introScreen.update();
        if (introScreen.y > 150) {
            introScreen.y -= .05;
        }
        animFrame.context.textAlign = "center";
        animFrame.context.font = "20px Sans Serif";
        animFrame.context.strokeStyle = "white";
        if (introText == 0) {
            animFrame.context.strokeText("A perfect_boy production", 320, 150);
        } else if (introText == 1) {
            animFrame.context.strokeText("Designed and programmed by Keith Daniel Lovett", 320, 150);
        } else if (introText == 2) {
            animFrame.context.strokeText("Music and  programming by Addison Clark Dowell", 320, 150);
        } else if (introText == 3) {
            animFrame.context.font = "35px Sans Serif";
            animFrame.context.strokeStyle = "#26ff00";
            animFrame.context.strokeText("STALWART'S LINEAGE: THE MIRE", 320, 150);
        } else if (introText == 4) {
            animFrame.context.font = "20px Sans Serif";
            animFrame.context.strokeStyle = "white";
            animFrame.context.strokeText("...Somewhere in the dark heart of the swamps...", 320, 150);
        } else if (introText == 5) {
            animFrame.context.strokeText("...Master sailor JAVERT, along with knowledgable treasure hunter IRIS...", 320, 150);
        } else if (introText == 6) {
            animFrame.context.strokeText("...make haste to rescue STALWART from the power of the MOORLORD...", 320, 150);
        } else if (introText == 7) {
            animFrame.context.strokeText("...and in their journeys, take aboard farmer LAWRENCE of ATAVAS...", 320, 150);
        } else if (introText == 8) {
            animFrame.context.strokeText("...in hopes to bring them both to safety...", 320, 150);
        } else if (introText == 9) {
            animFrame.context.strokeText("...before it is too late...", 320, 150);
        } else if (introText == 10) {
            animFrame.context.strokeText("...", 320, 150);
        }
    }

    //Checks if the x and y are appropriate to inflict damage, and the enemy is on-screen.
    if (Math.abs(cannonBall.x - moorlord.x) <= 13 && Math.abs(cannonBall.y - moorlord.y) <= 30 && moorlord.invincible == 0) {
        damageDealt += 1;
        cannonBall.x = 0;
        cannonBall.y = 0;
    }
    if (Math.abs(cannonBall.x - wretched.x) <= 13 && Math.abs(cannonBall.y - wretched.y) <= 20 && wretched.invincible == 0) {
        damageDealt += 1;
        cannonBall.x = 0;
        cannonBall.y = 0;
    }

}