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
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 10000, 0), scene);
	light.intensity = .5;
	var light2 = new BABYLON.PointLight("hemi", new BABYLON.Vector3(0, 100, 0), scene);
	light2.intensity = .1;
	//Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -1.5, 0);

    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;
	
	function checkDeath(camera){
		taco = camera.position;
		console.log(taco)
		camera.applyGravity = true;
		if (camera.position.y < 2.1){
			camera.position = new BABYLON.Vector3(0, 30, 0); 
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
	var red = new BABYLON.StandardMaterial("std", scene);
	red.diffuseColor = new BABYLON.Color3(1, .2, .2);
	var green = new BABYLON.StandardMaterial("std", scene);
	green.diffuseColor = new BABYLON.Color3(0, 2, 0);
	var blue = new BABYLON.StandardMaterial("std", scene);
	blue.diffuseColor = new BABYLON.Color3(0,0,1);
	var black = new BABYLON.StandardMaterial("std", scene);
	black.diffuseColor = new BABYLON.Color3(0,0,0);
	
	var StartPlatform = BABYLON.Mesh.CreateBox("Start", 10,  scene); StartPlatform.scaling.x = 10; StartPlatform.scaling.z = 5;
	StartPlatform.material = red;
	StartPlatform.checkCollisions = true;
	StartPlatform.position.y = 20
	
	var StartPlatformWall = BABYLON.Mesh.CreateBox("Wall", 10,  scene); StartPlatformWall.scaling.x = 1; StartPlatformWall.scaling.z = 30; StartPlatformWall.scaling.y = 20;
	StartPlatformWall.checkCollisions = true;
	StartPlatformWall.position.x = -50
	StartPlatformWall.position.y = 110
	StartPlatformWall.position.z = 60
	
	var StartPlatformWall2 = BABYLON.Mesh.CreateBox("Wall", 10,  scene); StartPlatformWall2.scaling.x = 1; StartPlatformWall2.scaling.z = 30; StartPlatformWall2.scaling.y = 20;
	StartPlatformWall2.checkCollisions = true;
	StartPlatformWall2.position.x = 50
	StartPlatformWall2.position.y = 110
	StartPlatformWall2.position.z = 60
		
	var Jump1 = BABYLON.Mesh.CreateBox("Wall", 10,  scene); Jump1.scaling.x = 10; Jump1.scaling.z = 4; Jump1.scaling.y = 5;
	Jump1.checkCollisions = true;
	Jump1.material = green;
	Jump1.position.x = 0
	Jump1.position.y = 22.5
	Jump1.position.z = 45
	
	var Jump2 = BABYLON.Mesh.CreateBox("Wall", 10,  scene); Jump2.scaling.x = 10; Jump2.scaling.z = 4; Jump2.scaling.y = 5;
	Jump2.checkCollisions = true;
	Jump2.material = green;
	Jump2.position.x = 0
	Jump2.position.y = 72.5
	Jump2.position.z = 85
	
	var Jump3 = BABYLON.Mesh.CreateBox("Jump3", 10, scene); Jump3.scaling.x = 7; Jump3.scaling.z = 6; Jump3.scaling.y = 1;
	Jump3.checkCollisions = true;
	Jump3.material = blue;
	Jump3.position.x = 0;
	Jump3.position.y = 70;
	Jump3.position.z = 175;
	
	var Jump4 = BABYLON.Mesh.CreateBox("Jump3", 10, scene); Jump4.scaling.x = 2; Jump4.scaling.z = 2; Jump4.scaling.y = 2;
	Jump4.checkCollisions = true;
	Jump4.material = blue;
	Jump4.position.x = 20;
	Jump4.position.y = 100;
	Jump4.position.z = 210;
	
	var Jump5 = BABYLON.Mesh.CreateBox("Jump3", 10, scene); Jump5.scaling.x = 2; Jump5.scaling.z = 2; Jump5.scaling.y = 2;
	Jump5.checkCollisions = true;
	Jump5.material = red;
	Jump5.position.x = -5;
	Jump5.position.y = 120;
	Jump5.position.z = 210;
	
	var Jump6 = BABYLON.Mesh.CreateBox("Jump3", 10, scene); Jump6.scaling.x = 2; Jump6.scaling.z = 10; Jump6.scaling.y = 2;
	Jump6.checkCollisions = true;
	Jump6.material = green;
	Jump6.position.x = -5;
	Jump6.position.y = 150;
	Jump6.position.z = 290;
	
	var Jump7 = BABYLON.Mesh.CreateBox("Jump3", 10, scene); Jump7.scaling.x = 4; Jump7.scaling.z = 2; Jump7.scaling.y = 2;
	Jump7.checkCollisions = true;
	Jump7.material = blue;
	Jump7.position.x = -40;
	Jump7.position.y = 180;
	Jump7.position.z = 330;
	
	var Jump8 = BABYLON.Mesh.CreateBox("Jump3", 10, scene); Jump8.scaling.x = 2; Jump8.scaling.z = 6; Jump8.scaling.y = 2;
	Jump8.checkCollisions = true;
	Jump8.material = red;
	Jump8.position.x = -40;
	Jump8.position.y = 200;
	Jump8.position.z = 270;
	
	var Jump9 = BABYLON.Mesh.CreateBox("Start", 10,  scene); Jump9.scaling.x = 10; Jump9.scaling.z = 5;
	Jump9.material = red;
	Jump9.checkCollisions = true;
	Jump9.position.y = 200
	
	var Jump10 = BABYLON.Mesh.CreateBox("Start", 10,  scene); Jump10.scaling.x = 2; Jump10.scaling.z = 2;
	Jump10.material = blue;
	Jump10.checkCollisions = true;
	Jump10.position.x = 15
	Jump10.position.y = 180
	Jump10.position.z = -90
	
	var Jump11 = BABYLON.Mesh.CreateBox("Start", 10,  scene); Jump11.scaling.x = 3; Jump11.scaling.z = 11;
	Jump11.material = green;
	Jump11.checkCollisions = true;
	Jump11.position.x = 0
	Jump11.position.y = 150
	Jump11.position.z = -200
	
    var ground = BABYLON.MeshBuilder.CreateGround("gd", {width: 10000, height: 10000, subdivsions: 4}, scene);
	ground.material = black;
}

