function run() {
 
  console.log('Im Running showEvent from App')
  const app = new App();
  
  
}

if (document.readyState != 'loading') run();
   
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);

else document.attachEvent('onreadystatechange', function () {
  if (document.readyState == 'complete') run();
});


