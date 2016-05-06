// Global variables
var canvas, engine, scene, camera;


/**
* Load the scene when the canvas is fully loaded
*/
document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        initScene()
		initGame();
    }
}, false);

/**
 * Creates a new BABYLON Engine and initialize the scene
 */
function initScene() {
    // Get canvas
    canvas = document.getElementById("renderCanvas");

    // Create babylon engine
    engine = new BABYLON.Engine(canvas, true);

    // Create scene
    scene = new BABYLON.Scene(engine);

	var player = new Player(this);
	
    // Create the camera
    camera = player.camera;
    camera.attachControl(canvas);
	
	

    // Create light
    var light = new BABYLON.PointLight("hemi", new BABYLON.Vector3(100, 10000, 0), scene);
	light.intensity = .5;
	//Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -3.5, 0);

    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;
	
	function checkDeath(camera){
		taco = camera.position.y;
		console.log(taco)
		camera.applyGravity = true;
		if (camera.position.y < 2.1){
			camera.position = new BABYLON.Vector3(0, 1010, 0); 
		}	
	};
	
	
	engine.runRenderLoop(function () {
		player.move();
		scene.render();
		checkDeath(camera);
	});
}

/**
 * Initialize the game
 * Creates the game map.
 */
function initGame() {
	
	// Define a material
	var material = new BABYLON.StandardMaterial("std", scene);
	material.diffuseColor = new BABYLON.Color3(1, .2, .2);
	
	var StartPlatform = BABYLON.Mesh.CreateBox("Start", 5,  scene); StartPlatform.scaling.x = 30; StartPlatform.scaling.z = 20;
	StartPlatform.material = material;
	StartPlatform.checkCollisions = true;
	StartPlatform.position.y = 100
	
    var ground = BABYLON.MeshBuilder.CreateGround("gd", {width: 800, height: 800, subdivsions: 4}, scene);
	ground.checkCollisions = true;
}

