function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
}
  
  async function f1() {
    await resolveAfter2Seconds();
    console.log('end');
    window.location.href = "index.html";
} 

window.onload = function() {
    console.log('start');
    f1();
}