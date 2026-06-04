


function togglesys(){
      if(window.matchMedia("(prefers-color-scheme: dark)").matches ){
          document.body.classList.add("dark");
      } else {
          document.body.classList.remove("dark");
      }
    }


    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        togglesys();
    });


    document.getElementById("lettglbtn").addEventListener("click", () => {
     if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark");
     }else{
        document.body.classList.add("dark");
     }
    });


