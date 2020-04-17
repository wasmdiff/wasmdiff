// The tests compares with expected values from https://github.com/iden3/go-iden3-core

function test() {
	// poseidon.PoseidonHash
	let r;
	r = poseidonHash(
		JSON.stringify(["1", "2", "0", "0", "0", "0"]),
	);
	assert(r, "12242166908188651009877250812424843524687801523336557272219921456462821518061");

	// poseidon.Hash
	r = hash(
		JSON.stringify(["1", "2"]),
	);
	assert(r, "4932297968297298434239270129193057052722409868268166443802652458940273154855");

	// poseidon.HashBytes
	r = hashBytes("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
	assert(r, "16019700159595764790637132363672701294192939959594423814006267756172551741065");
	r = hashBytes("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet.");
	assert(r, "2978613163687734485261639854325792381691890647104372645321246092227111432722");
	console.log("\nTests finished");
}

//const niter = 100;

function benchmark(niter) {
	// benchmark Poseidon
	// niter is number of runs
	r = "0";
	let t0 = performance.now();
	for (let i=0; i<niter; i++) {
		r = poseidonHash(
			JSON.stringify([r, r, r, r, r, r]),
		);
	}
	let t1 = performance.now();
	let bench = t1-t0;
	//printBench("WASM poseidon", bench);
	//assert(r, "14532772156263699886931148860088087375165210901125466225828085835422353075742");

	// // benchmark iden3js/poseidon
	// r = iden3.bigInt(0);
	// t0 = performance.now();
	// for (let i=0; i<niter; i++) {
	// 	r = iden3.crypto.poseidon.hash([r, r, r, r, r, r]);
	// }
	// t1 = performance.now();
	// bench = t1-t0;
	// //printBench("iden3js/poseidon", bench);
	// assert(r, "14532772156263699886931148860088087375165210901125466225828085835422353075742");

	if(niter == 10){
		var benchmarks = document.getElementById('ten');
		benchmarks.insertAdjacentHTML('afterend','<br>');
		benchmarks.insertAdjacentHTML('afterend','<div id="results">Average running time: <span id="bench_div_10"></span> ms<br></div>');
		benchmarks.insertAdjacentHTML('afterend','<div id="results_a">WASM Poseidon took: <span id="bench_10"></span> ms for 10 iterations<br></div>');
		document.getElementById("bench_10").innerHTML = bench.toFixed(3);
		document.getElementById("bench_div_10").innerHTML = (bench/10).toFixed(3);

	}else if(niter == 100){
		var benchmarks = document.getElementById('hundred');
		benchmarks.insertAdjacentHTML('afterend','<br>');
		benchmarks.insertAdjacentHTML('afterend','<div id="results">Average running time: <span id="bench_div_100"></span> ms<br></div>');
		benchmarks.insertAdjacentHTML('afterend','<div id="results_a">WASM Poseidon took: <span id="bench_100"></span> ms for 100 iterations<br></div>');
		document.getElementById("bench_100").innerHTML = bench.toFixed(3);
		document.getElementById("bench_div_100").innerHTML = (bench/100).toFixed(3);
	}
	else if(niter == 1000){
		var benchmarks = document.getElementById('thousand');
		benchmarks.insertAdjacentHTML('afterend','<br>');
		benchmarks.insertAdjacentHTML('afterend','<div id="results">Average running time: <span id="bench_div_1000"></span> ms<br></div>');
		benchmarks.insertAdjacentHTML('afterend','<div id="results_a">WASM Poseidon took: <span id="bench_1000"></span> ms for 1000 iterations<br></div>');
		document.getElementById("bench_1000").innerHTML = bench.toFixed(3);
		document.getElementById("bench_div_1000").innerHTML = (bench/1000).toFixed(3);
	}
}

function printBench(name, bench) {
	console.log(name + " " + niter + " iterations took " + bench + " milliseconds.");
	console.log(name + " benchmark: " + bench/1000 + "ms");
}

function assert(a, b) {
	if (a!=b) {
		console.error("Expected to be equal:\n", a, "\n", b);
	}
}

