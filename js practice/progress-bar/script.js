 const progressBar = document.getElementById('progressBar');
 document.querySelector("#downloadBtn").addEventListener("click",()=>{
 let width = 0;
            const interval = setInterval(() => {
                if (width <100) {
                   
                  width++
                  progressBar.style.width = width + '%';
                    progressBar.textContent = width + '%';
                } else {
                   
                   clearInterval(interval);
                }
            }, 50); 
 })
  