async function wasmInit(fileName) {
	return new Promise(resolve => {
		fetch(fileName).then(response =>
			response.arrayBuffer()
		).then(bytes =>
			WebAssembly.instantiate(bytes)
		).then(result => {
			resolve(result.instance.exports);
		});
	});
}

let wasmProcessor;

function jsfn(a) {
	return Math.sin(a);
}

const runWasm = async () => {
	wasmProcessor = await wasmInit("./pkg/wasm_processing_test_bg.wasm");
	//console.log("PROCESSING LIBRARY: ", wasmProcessor);

	//console.log("CONTEXT I/O TEST");
	contextInOutPerformanceTest();

	//console.log("IN CONTEXT PROCESSING TEST");
	const start = performance.now();
	inContextProcessingTest();
};

function contextInOutPerformanceTest() {
	let k = 1000000;
	
	//console.log("JS");
	//console.time();

	for (let i = 0; i <= k; i++) {
		jsfn(i);
	}

	//console.timeEnd();

	//console.log("WASM");
	//console.time();

	for (let i = 0; i <= k; i++) {
		wasmProcessor.wsin(i);
	}

	//console.timeEnd();
}

function inContextProcessingTest() {
	let canvas = document.querySelector('.c1');
	let ctx = canvas.getContext('2d');

	let w = canvas.width;
	let h = canvas.height;
	let usub = new Uint8ClampedArray(new ArrayBuffer(w * h * 4), 0, w * h * 4);

	//console.log("JS");
	//console.time();
	for (let x = 0; x < w; x++) {
		for (let y = 0; y < h; y++) {
			let pbuf = (x + y * w) * 4;

			usub[pbuf] = Math.ceil(128 + 128 * Math.cos(((h - y) + 100) / 15 * (x + 100) / 16));
			usub[pbuf + 1] = Math.ceil(128 + 128 * Math.sin((y + 70) / 20 * ( -x + 300) / 20));
			usub[pbuf + 2] = Math.ceil(128 + 128 * Math.sin((-y + 70) / 30 * ( -x + 300) / 40));
			usub[pbuf + 3] = 255;
		}
	}
	//console.timeEnd();

	if(iter == true){
		var end=0;
			for(var i = 0; i<10; i++){
				var start = performance.now();
				let img = new ImageData(usub, w, h)
				ctx.putImageData(img, 0, 0);

			// -------------------

				canvas = document.querySelector('.c2');
				ctx = canvas.getContext('2d');

				let byteSize = w * h * 4;
				let pointer = wasmProcessor.alloc(byteSize);
				let usub2 = new Uint8ClampedArray(wasmProcessor.memory.buffer, pointer, byteSize);
				//console.log("WASM");
				//console.time();
		
				wasmProcessor.fill(pointer, w, h);
		
				//console.timeEnd();
		
				let img2 = new ImageData(usub2, w, h);
				ctx.putImageData(img2, 0, 0);
		
				end = performance.now() - start + end;
			}

		var benchmarks = document.getElementById('iterations');
		benchmarks.insertAdjacentHTML('afterend','<div id=bench> The time it took to process one image on average using WASM is <span id="end_it_10"></span> ms<br></div>');
		benchmarks.insertAdjacentHTML('afterend','<div id=bench> The time it took to process the image 10 times using WASM is <span id="end_it"></span> ms<br></div>');
		document.getElementById("end_it").innerHTML = end.toFixed(3);
		document.getElementById("end_it_10").innerHTML = (end/10).toFixed(3);
		
	}else if(click == true){
		const start = performance.now();

		let img = new ImageData(usub, w, h)
		ctx.putImageData(img, 0, 0);

		// -------------------

		canvas = document.querySelector('.c2');
		ctx = canvas.getContext('2d');

		let byteSize = w * h * 4;
		let pointer = wasmProcessor.alloc(byteSize);
		let usub2 = new Uint8ClampedArray(wasmProcessor.memory.buffer, pointer, byteSize);
		//console.log("WASM");
		//console.time();
		wasmProcessor.fill(pointer, w, h);
	
		//console.timeEnd();
	
		let img2 = new ImageData(usub2, w, h);
		ctx.putImageData(img2, 0, 0);
	
		const end = performance.now() - start;
		
	
		var benchmarks = document.getElementById('benchmarks');
		benchmarks.insertAdjacentHTML('afterend','<div id=bench> The time it took to process the image using WASM is <span id="end"></span> ms<br></div>');
		document.getElementById("end").innerHTML = end.toFixed(3);
	}

}
runWasm();