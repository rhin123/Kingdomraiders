import game from "index";

export default class Entity {

    constructor(entityType, x, y, w, h) {
        //Misc helper variables
        this.camera = game.getUI.getCurrentScreen.getCamera;

        this.entityType = entityType;

        //Note: these this.x & y values are meant to display the true position of the entity /w out rotation offsets.
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.rotation = 0;
    }

    setCameraPivot(rotation, x, y) {
        //Move the sprite based on camera location
        var differenceInDistanceX = game.getPlayer.getX - x;
        var differenceInDistanceY = game.getPlayer.getY - y;

        var radians = (Math.PI / 180) * (this.rotation);

        //Sprite rotatation offset
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        var camPosOffsetX = (cos * differenceInDistanceX) - (sin * differenceInDistanceY);
        var camPosOffsetY = (cos * differenceInDistanceY) + (sin * differenceInDistanceX);

        //For some reason, the x axis is moving 

        this.sprite.x -= camPosOffsetX;
        this.sprite.y -= camPosOffsetY;
        //..



        //Camera rotation (Moves the sprite's around the player)
        if (this.rotation != rotation) {

            var radians = (Math.PI / 180) * (this.rotation - rotation);

            //Sprite rotatation offset
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var newX = (cos * (this.sprite.x - this.camera.position.x)) + (sin * (this.sprite.y - this.camera.position.y)) + this.camera.position.x;
            var newY = (cos * (this.sprite.y - this.camera.position.y)) - (sin * (this.sprite.x - this.camera.position.x)) + this.camera.position.y;

            this.sprite.x = newX;
            this.sprite.y = newY;
        }

        //..

        this.rotation = rotation;
    }

    setVelocity(x, y) {
        // console.log(x + "," + y);
        this.x += x;
        this.y += y;

        //Fake x,y for camera rotation offset.
        var rotation = game.getUI.getCurrentScreen.camera.rotation;
        var radians = (Math.PI / 180) * rotation;

        //Sprite rotatation offset
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        //Ofset the cos & sin
        var testX = (y * sin) + (-(x * cos));
        var testY = (y * cos) + (x * sin);

        this.sprite.x -= testX;
        this.sprite.y += testY;
    }

    kill() {
        this.sprite.destroy();
    }

    update() {
        this.setCameraPivot(this.camera.rotation, this.camera.pivot.x, this.camera.pivot.y);
    }
}