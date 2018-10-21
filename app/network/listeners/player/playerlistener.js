import game from "index";

import GameScreen from "../../../ui/scene/gamescreen";
import MPPlayer from "../../../player/mpplayer/mpplayer";

export default class PlayerListener {
    constructor() {

    }

    handleMessage(message) {
        var json = JSON.parse(message.data);
            switch (json.type) {

                //Client-based packets
                case "JoinGame":
                    this.handleJoinResponse(json);
                    break;

                case "PositionUpdate":
                    this.handlePositionUpdate(json);
                    break;

                //MPPlayer based packets
                case "MPJoinGame":
                    this.handleMPJoinResponse(json);
                    break;

                case "MPLeaveGame":
                    this.handleMPLeaveResponse(json);
                    break;

                case "MPPositionUpdate":
                    this.handleMPPositionUpdate(json);
                    break;

                case "MPMovementTarget":
                    this.handleMPMovementTarget(json);
                    break;
            }
    }

    handleJoinResponse(json) {
        game.getUI.setScreen(new GameScreen());
    }

    handlePositionUpdate(json) {
        game.getPlayer.movement.updatePosition(json.x, json.y);
    }

    //MPPlayer based response
    handleMPJoinResponse(json) {
        game.getEntityMap.entityMap.push(new MPPlayer(json));
    }

    handleMPLeaveResponse(json) {
        game.getEntityMap.getMPPlayerByID(json.id).leaveGame();
    }

    handleMPPositionUpdate(json) {
        //Set the exact position of the mpplayer.
        game.getEntityMap.getMPPlayerByID(json.id).setPosition(json.x, json.y);
    }

    handleMPMovementTarget(json) {
        //Move the mpplayer to the target /w velocity.
        if (game.getPlayer.inGame) //temp.. remove later.
        game.getEntityMap.getMPPlayerByID(json.id).recivePosition(json);
    }
}