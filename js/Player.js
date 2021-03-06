/**
 * A player is represented by a box and a free camera.
 * @param scene
 * @param game
 * @param spawnPoint The spawning point of the player
 * @constructor
 */
 
 
Player = function(game, spawnPoint) {

    if (!spawnPoint) {
        spawnPoint = new BABYLON.Vector3(0,30,0);
    }

    // The player spawnPoint
    this.spawnPoint = spawnPoint;
    // The game scene
    this.scene = game.scene;
    // The game
    this.game = game;
    // The player eyes height
    this.height = 1;
    // The player speed
    this.speed = 2.5;
    // The player inertia
    this.inertia = .9;
    // The player angular inertia
    this.angularInertia =  -.98;
    // The mouse sensibility (lower the better sensible)
    this.angularSensibility = 3000;
    // The player camera
    this.camera = this._initCamera();
    // The player must click on the canvas to activate control
    this.controlEnabled = false;
    var _this = this;
	
	
	//Jump function
	this.jump = false;
	this.jumpInProgress = false;
	
	
	
	this._initMovement();

    var canvas = this.scene.getEngine().getRenderingCanvas();
    // Event listener on click on the canvas
    canvas.addEventListener("click", function(evt) {
        var width = _this.scene.getEngine().getRenderWidth();
        var height = _this.scene.getEngine().getRenderHeight();

        if (_this.controlEnabled) {
            var pickInfo = _this.scene.pick(width/2, height/2, null, false, _this.camera);
            _this.handleUserMouse(evt, pickInfo);
        }
    }, false);
	

    // Event listener to go pointer lock
    this._initPointerLock();



};

Player.prototype = {

	/**
	_init pointer lock used to lock mouse pointer to screen
	**/
    _initPointerLock : function() {
        var _this = this;
        // Request pointer lock
        var canvas = this.scene.getEngine().getRenderingCanvas();
        canvas.addEventListener("click", function(evt) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }, false);

        // Event listener when the pointerlock is updated.
        var pointerlockchange = function (event) {
            _this.controlEnabled = (document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas || document.msPointerLockElement === canvas || document.pointerLockElement === canvas);
            if (!_this.controlEnabled) {
                _this.camera.detachControl(canvas);
            } else {
                _this.camera.attachControl(canvas);
            }
        };
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    },

    /**
     * Init the player camera
     * @returns {BABYLON.FreeCamera}
     * @private
     */
    _initCamera : function() {

        cam = new BABYLON.FreeCamera("camera", this.spawnPoint, this.scene);
        cam.attachControl(this.scene.getEngine().getRenderingCanvas());
        cam.ellipsoid = new BABYLON.Vector3(2, this.height, 2);
        cam.checkCollisions = true;
        cam.applyGravity = true;
        // WASD
        cam.keysUp = [87]; // W
        cam.keysDown = [83]; // A
        cam.keysLeft = [65]; // S
        cam.keysRight = [68]; // D
        cam.speed = this.speed;
        cam.inertia = this.inertia;
        cam.angularInertia = this.angularInertia;
        cam.angularSensibility = this.angularSensibility;
        cam.layerMask = 2;

        return cam;
    },


	
	// Create Jump Function
	_initMovement : function () {
		var onKeyDown = function(evt) {
			console.log(evt.keyCode);
			if (evt.keyCode == 32) {
				if (!Player.jumpInProgress){
					Player.jumpInProgress = true
					Player.jump = true;
					
					setTimeout(function(){
						Player.jump = false;
					}, 100);
				}
			}
		};
		
		var onKeyUp = function(evt) {
			Player.jump = false;
		};
		
		// Register events
		BABYLON.Tools.RegisterTopRootEvents([{
			name: "keydown",
			handler: onKeyDown
		}, {
			name: "keyup",
			handler: onKeyUp
		}]);		
	},
	
	move : function () {
		if (Player.jump){
			Player.jumpInProgress = true
			camera.position.y += 15
			 setTimeout(function(){
				 Player.jumpInProgress = false;
			 }, 1000);			 
		}
	}

};
