function run() {

  console.log('Im Running Events')
  const app = new App()
  // const events = new Events()
}

if (document.readyState != 'loading') run();
   
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);

else document.attachEvent('onreadystatechange', function () {
  if (document.readyState == 'complete') run();
});


// document.addEventListener('DOMContentLoaded', function () {
//   console.log('Im Running Events')
//   const app = new App()
//   // do something
// });