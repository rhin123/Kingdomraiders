/**
 * Application entry point
 */

// Load application styles
import "styles/index.scss";

//Universal imports
import * as $ from "jquery";
import * as PIXI from "pixi.js";
import Smoothie from "pixi-smoothie";
import "pixi-sound";
import "pixi-layers";
import '@babel/polyfill';

import UserInterface from "./ui/ui";
import Player from "./player/player";
import Network from "./network/network";
import LoadingScreen from "./ui/scene/loadingscreen";

var game;
var smoothie;

function initGame() {

    //Apply settings here..
    //Fixes blurry sprites & fonts
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.RENDER_OPTIONS.roundPixels = true;
    //PIXI.settings.RENDER_OPTIONS.forceFXAA = true;

    //..

    game = new PIXI.Application(window.innerWidth, window.innerHeight, { backgroundColor: 0x1099bb });
    document.body.appendChild(game.view);

    //Post-Object settings..
    game.stage = new PIXI.display.Stage();
    game.stage.group.enableSort = true;
    //..


    //Smoothie for update threads.
    smoothie = new Smoothie({
        engine: PIXI,
        renderer: game,
        root: game.stage,
        fps: 60,
        update: update.bind(this)
    });

    console.log("Welcome to Kingdomraiders!")
}

function update() {
    //game.getUI.update();
}

function initConfigurations() {
    //Our configurations..
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    PIXI.Application.prototype.WIDTH = renderer.width;
    PIXI.Application.prototype.HEIGHT = renderer.height;

    PIXI.Application.prototype.getUI = new UserInterface();
    PIXI.Application.prototype.getPlayer = new Player();
    PIXI.Application.prototype.getNetwork = new Network();

    game.getUI.setScreen(new LoadingScreen());

    smoothie.start();
}

initGame();
export default game;

initConfigurations();