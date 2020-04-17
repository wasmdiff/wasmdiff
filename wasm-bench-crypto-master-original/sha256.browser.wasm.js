/* global emscripten */
const buffer100b = new Uint8Array(100);
const buffer1k = new Uint8Array(1024);
const buffer1m = new Uint8Array(1024 * 1024);

const Module = emscripten({
  locateFile,
  onRuntimeInitialized,
});

function locateFile() {
  return 'libnettle.wasm';
}

const SHA256_DIGEST_SIZE = 32;

function test_crypto(buffer) {
  const sha256_ptr = Module._create_sha256();

  const input_ptr = Module._malloc(buffer.length);
  Module.HEAPU8.set(buffer, input_ptr);

  Module._nettle_sha256_update(sha256_ptr, buffer.length, input_ptr);
  Module._free(input_ptr);

  const output_ptr = Module._malloc(SHA256_DIGEST_SIZE);

  Module._nettle_sha256_digest(sha256_ptr, SHA256_DIGEST_SIZE, output_ptr);
  const result = Module.HEAPU8.slice(
    output_ptr,
    output_ptr + SHA256_DIGEST_SIZE
  );

  Module._free(output_ptr);
  Module._free(sha256_ptr);

  return result;
}

function test(fn, buf, times) {
  let time = 0;

  for (let i = 0; i < times; ++i) {
    const start = performance.now();

    fn(buf);
    time += performance.now() - start;
  }

  return time;
}


function onRuntimeInitialized() {

  if(run){
    if(times == 10){
      const t1 = test(test_crypto, buffer100b, 1e1);
      const t2 = test(test_crypto, buffer1k, 1e1);
      const t3 = test(test_crypto, buffer1m, 1e1);

      var benchmarks = document.getElementById('bench10');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash the 1 mb byte string 1 time on average is: <span id="t3_ten_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash a 1 mb byte string 10 times is: <span id="t3_ten"></span> ms<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash the 1 kb string 1 time on average is: <span id="t2_ten_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash a 1 kb string 10 times is: <span id="t2_ten"></span> ms<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash the 100 byte string 1 time on average is: <span id="t1_ten_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash a 100 byte string 10 times is: <span id="t1_ten"></span> ms<br></div>');

      document.getElementById("t1_ten").innerHTML = t1.toFixed(3);
      document.getElementById("t2_ten").innerHTML = t2.toFixed(3);
      document.getElementById("t3_ten").innerHTML = t3.toFixed(3);

      document.getElementById("t1_ten_div").innerHTML = (t1/10).toFixed(3);
      document.getElementById("t2_ten_div").innerHTML = (t2/10).toFixed(3);
      document.getElementById("t3_ten_div").innerHTML = (t3/10).toFixed(3);

    }else if (times == 100){

      const t1 = test(test_crypto, buffer100b, 1e2);
      const t2 = test(test_crypto, buffer1k, 1e2);
      const t3 = test(test_crypto, buffer1m, 1e2);

      var benchmarks = document.getElementById('bench100');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div id="results">The time it took to hash the 1 mb byte string 1 time on average is: <span id="t3_hun_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div id="results">The time it took to hash a 1 mb byte string 100 times is: <span id="t3_hun"></span> ms<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div id="results">The time it took to hash the 1 kb string 1 time on average is: <span id="t2_hun_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div id="results">The time it took to hash a 1 kb string 100 times is: <span id="t2_hun"></span> ms<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div id="results">The time it took to hash the 100 byte string 1 time on average is: <span id="t1_hun_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div id="results">The time it took to hash a 100 byte string 100 times is: <span id="t1_hun"></span> ms<br></div>');

      document.getElementById("t1_hun").innerHTML = t1.toFixed(3);
      document.getElementById("t2_hun").innerHTML = t2.toFixed(3);
      document.getElementById("t3_hun").innerHTML = t3.toFixed(3);

      document.getElementById("t1_hun_div").innerHTML = (t1/100).toFixed(3);
      document.getElementById("t2_hun_div").innerHTML = (t2/100).toFixed(3);
      document.getElementById("t3_hun_div").innerHTML = (t3/100).toFixed(3);


    }else if (times == 1000){

      const t1 = test(test_crypto, buffer100b, 1e3);
      const t2 = test(test_crypto, buffer1k, 1e3);
      const t3 = test(test_crypto, buffer1m, 1e3);

      var benchmarks = document.getElementById('bench1000');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash the 1 mb byte string 1 time on average is: <span id="t3_thou_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash a 1 mb byte string 1000 times is: <span id="t3_thou"></span> ms<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash the 1 kb string 1 time on average is: <span id="t2_thou_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash a 1 kb string 1000 times is: <span id="t2_thou"></span> ms<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<br>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash the 100 byte string 1 time on average is: <span id="t1_thou_div"></span> ms.<br></div>');
      benchmarks.insertAdjacentHTML('afterend','<div>The time it took to hash a 100 byte string 1000 times is: <span id="t1_thou"></span> ms<br></div>');

      document.getElementById("t1_thou").innerHTML = t1.toFixed(3);
      document.getElementById("t2_thou").innerHTML = t2.toFixed(3);
      document.getElementById("t3_thou").innerHTML = t3.toFixed(3);

      document.getElementById("t1_thou_div").innerHTML = (t1/1000).toFixed(3);
      document.getElementById("t2_thou_div").innerHTML = (t2/1000).toFixed(3);
      document.getElementById("t3_thou_div").innerHTML = (t3/1000).toFixed(3);
    }
  }
}
