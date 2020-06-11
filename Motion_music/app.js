const video = document.getElementById( 'webcam' );
const canvasElement = document.getElementById( 'canvas' );
const context = canvasElement.getContext( '2d' );
const snapSoundElement = document.getElementById( 'snapSound' );
const webcam = new Webcam( video, 'user', canvasElement, snapSoundElement );

let isVideo = true;
let model = null;
let videoInterval = 100;
let isRecording = false;
let recording = [];
let playlist = [];

const modelParams = {
	flipHorizontal: true, // flip e.g for video
	maxNumBoxes: 1, // maximum number of boxes to detect
	iouThreshold: 0.5, // ioU threshold for non-max suppression
	scoreThreshold: 0.6 // confidence threshold for predictions.
};

// Load the model.
handTrack.load( modelParams ).then( ( lmodel ) => {
	// detect objects in the image.
	model = lmodel;
} );

function stopVideo() {
	webcam.stop();
}

function removeTransition( e ) {
	if ( e.propertyName !== 'transform' ) return;
	e.target.classList.remove( 'playing' );
}

const keys = Array.from( document.querySelectorAll( '.sound' ) );
keys.forEach( key => key.addEventListener( 'transitionend', removeTransition ) );

function drawCenter( x, y, context, canvas ) {
	context.clearRect( 0, 0, canvas.width, canvas.height );
	context.beginPath();
	context.moveTo( x, y );
	context.arc( x, y, 5, 0, 2 * Math.PI, true );
	context.fillStyle = 'blue';
	context.fill();
	context.closePath();
}

function startRecording() {
	recording = [];
	isRecording = true;
}

function stopRecording() {
	isRecording = false;
	if ( !recording ) return;
	playlist = [];
	for ( let i = 0; i < recording.length; i++ ) {
		switch ( recording[i] ) {
			case 1:
				playlist.push( "./sounds/clap.wav" );
				break;
			case 2:
				playlist.push( "./sounds/hihat.wav" );
				break;
			case 3:
				playlist.push( "./sounds/kick.wav" );
				break;
			case 4:
				playlist.push( "./sounds/openhat.wav" );
				break;
			default:
				break;
		}

	}
	console.log( playlist )
}

function playRecording() {
	if ( !playlist ) return;
	sound = new Howl( {
		src: playlist[0],
		volume: 0.5,
		onend: function () {
			playlist.shift();
			// if (file_names.length > 0) {
			//     play_audio(file_names);
			// }
		}
	} );
	sound.play();
}

// Handtracking

function runDetection() {
	model.detect( video ).then( ( predictions ) => {
		// Draw bounding box around detected hand in canvas
		//model.renderPredictions( predictions, canvas, context, video );
		if ( predictions[0] ) {
			let midValX = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
			let midValY = predictions[0].bbox[1] + predictions[0].bbox[3] / 2;
			drawCenter( midValX, midValY, context, canvasElement );
			if ( midValX > ( 640 - 160 - 455 ) && midValX < ( 640 - 455 ) && midValY > ( 14 ) && midValY < ( 14 + 120 ) ) {
				let audio = document.querySelector( 'audio.sound1' );
				let key = document.querySelector( 'div.sound1' );
				key.classList.add( 'playing' );
				audio.currentTime = 0;
				audio.play();
				if ( isRecording ) {
					recording.push( 1 );
				}
			} else if ( midValX > ( 640 - 160 - 455 ) && midValX < ( 640 - 455 ) && midValY > ( 340 ) && midValY < ( 340 + 120 ) ) {
				let audio = document.querySelector( 'audio.sound3' );
				let key = document.querySelector( 'div.sound3' );
				key.classList.add( 'playing' );
				audio.currentTime = 0;
				audio.play();
				if ( isRecording ) {
					recording.push( 3 )
				}
			} else if ( midValX > ( 640 - 160 - 19 ) && midValX < ( 640 - 19 ) && midValY > ( 14 ) && midValY < ( 14 + 120 ) ) {
				let audio = document.querySelector( 'audio.sound2' );
				let key = document.querySelector( 'div.sound2' );
				key.classList.add( 'playing' );
				audio.currentTime = 0;
				audio.play();
				if ( isRecording ) {
					recording.push( 2 )
				}
			} else if ( midValX > ( 640 - 160 - 19 ) && midValX < ( 640 - 19 ) && midValY > ( 340 ) && midValY < ( 340 + 120 ) ) {
				let audio = document.querySelector( 'audio.sound4' );
				let key = document.querySelector( 'div.sound4' );
				key.classList.add( 'playing' );
				audio.currentTime = 0;
				audio.play();
				if ( isRecording ) {
					recording.push( 4 )
				}
			}
		}
		if ( isVideo ) {
			setTimeout( () => {
				runDetection( video );
			}, videoInterval );
		}
	} );
}

function start() {
	webcam.start().then( runDetection ).catch( ( err ) => {
		console.log( err );
	} );
}
