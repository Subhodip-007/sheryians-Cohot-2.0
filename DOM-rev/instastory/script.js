const userStories = [
  { username: "alex_dev", storyimg: "https://picsum.photos/id/10/1080/1920", profileimg: "https://picsum.photos/id/10/150/150" },
  { username: "sarah.codes", storyimg: "https://picsum.photos/id/11/1080/1920", profileimg: "https://picsum.photos/id/11/150/150" },
  { username: "mike_smith99", storyimg: "https://picsum.photos/id/12/1080/1920", profileimg: "https://picsum.photos/id/12/150/150" },
  { username: "jessica_ui", storyimg: "https://picsum.photos/id/13/1080/1920", profileimg: "https://picsum.photos/id/13/150/150" },
  { username: "chris.frontend", storyimg: "https://picsum.photos/id/14/1080/1920", profileimg: "https://picsum.photos/id/14/150/150" },
  { username: "amanda_tech", storyimg: "https://picsum.photos/id/15/1080/1920", profileimg: "https://picsum.photos/id/15/150/150" },
  { username: "david_backend", storyimg: "https://picsum.photos/id/16/1080/1920", profileimg: "https://picsum.photos/id/16/150/150" },
  { username: "laura.designs", storyimg: "https://picsum.photos/id/17/1080/1920", profileimg: "https://picsum.photos/id/17/150/150" },
  { username: "ryan_fullstack", storyimg: "https://picsum.photos/id/18/1080/1920", profileimg: "https://picsum.photos/id/18/150/150" },
  { username: "emily_creative", storyimg: "https://picsum.photos/id/19/1080/1920", profileimg: "https://picsum.photos/id/19/150/150" },
  { username: "daniel.js", storyimg: "https://picsum.photos/id/20/1080/1920", profileimg: "https://picsum.photos/id/20/150/150" },
  { username: "olivia_web", storyimg: "https://picsum.photos/id/21/1080/1920", profileimg: "https://picsum.photos/id/21/150/150" },
  { username: "matthew_code", storyimg: "https://picsum.photos/id/22/1080/1920", profileimg: "https://picsum.photos/id/22/150/150" },
  { username: "sophia_ux", storyimg: "https://picsum.photos/id/23/1080/1920", profileimg: "https://picsum.photos/id/23/150/150" },
  { username: "joshua_dev", storyimg: "https://picsum.photos/id/24/1080/1920", profileimg: "https://picsum.photos/id/24/150/150" },
  { username: "isabella_art", storyimg: "https://picsum.photos/id/25/1080/1920", profileimg: "https://picsum.photos/id/25/150/150" },
  { username: "andrew_apps", storyimg: "https://picsum.photos/id/26/1080/1920", profileimg: "https://picsum.photos/id/26/150/150" },
  { username: "mia_creates", storyimg: "https://picsum.photos/id/27/1080/1920", profileimg: "https://picsum.photos/id/27/150/150" },
  { username: "ethan_builds", storyimg: "https://picsum.photos/id/28/1080/1920", profileimg: "https://picsum.photos/id/28/150/150" },
  { username: "charlotte_ui", storyimg: "https://picsum.photos/id/29/1080/1920", profileimg: "https://picsum.photos/id/29/150/150" },
  { username: "joseph_pixel", storyimg: "https://picsum.photos/id/30/1080/1920", profileimg: "https://picsum.photos/id/30/150/150" },
  { username: "amelia_design", storyimg: "https://picsum.photos/id/31/1080/1920", profileimg: "https://picsum.photos/id/31/150/150" },
  { username: "william_tech", storyimg: "https://picsum.photos/id/32/1080/1920", profileimg: "https://picsum.photos/id/32/150/150" },
  { username: "harper_code", storyimg: "https://picsum.photos/id/33/1080/1920", profileimg: "https://picsum.photos/id/33/150/150" },
  { username: "james_webdev", storyimg: "https://picsum.photos/id/34/1080/1920", profileimg: "https://picsum.photos/id/34/150/150" },
  { username: "evelyn_styles", storyimg: "https://picsum.photos/id/35/1080/1920", profileimg: "https://picsum.photos/id/35/150/150" },
  { username: "benjamin_react", storyimg: "https://picsum.photos/id/36/1080/1920", profileimg: "https://picsum.photos/id/36/150/150" },
  { username: "abigail_vue", storyimg: "https://picsum.photos/id/37/1080/1920", profileimg: "https://picsum.photos/id/37/150/150" },
  { username: "lucas_node", storyimg: "https://picsum.photos/id/38/1080/1920", profileimg: "https://picsum.photos/id/38/150/150" },
  { username: "ella_python", storyimg: "https://picsum.photos/id/39/1080/1920", profileimg: "https://picsum.photos/id/39/150/150" },
  { username: "henry_java", storyimg: "https://picsum.photos/id/40/1080/1920", profileimg: "https://picsum.photos/id/40/150/150" },
  { username: "avery_swift", storyimg: "https://picsum.photos/id/41/1080/1920", profileimg: "https://picsum.photos/id/41/150/150" },
  { username: "alexander_c", storyimg: "https://picsum.photos/id/42/1080/1920", profileimg: "https://picsum.photos/id/42/150/150" },
  { username: "sofia_ruby", storyimg: "https://picsum.photos/id/43/1080/1920", profileimg: "https://picsum.photos/id/43/150/150" },
  { username: "michael_go", storyimg: "https://picsum.photos/id/44/1080/1920", profileimg: "https://picsum.photos/id/44/150/150" },
  { username: "camila_rust", storyimg: "https://picsum.photos/id/45/1080/1920", profileimg: "https://picsum.photos/id/45/150/150" },
  { username: "elijah_php", storyimg: "https://picsum.photos/id/46/1080/1920", profileimg: "https://picsum.photos/id/46/150/150" },
  { username: "aria_sql", storyimg: "https://picsum.photos/id/47/1080/1920", profileimg: "https://picsum.photos/id/47/150/150" },
  { username: "mason_aws", storyimg: "https://picsum.photos/id/48/1080/1920", profileimg: "https://picsum.photos/id/48/150/150" },
  { username: "scarlett_cloud", storyimg: "https://picsum.photos/id/49/1080/1920", profileimg: "https://picsum.photos/id/49/150/150" },
  { username: "logan_docker", storyimg: "https://picsum.photos/id/50/1080/1920", profileimg: "https://picsum.photos/id/50/150/150" },
  { username: "victoria_linux", storyimg: "https://picsum.photos/id/51/1080/1920", profileimg: "https://picsum.photos/id/51/150/150" },
  { username: "jackson_mac", storyimg: "https://picsum.photos/id/52/1080/1920", profileimg: "https://picsum.photos/id/52/150/150" },
  { username: "madison_win", storyimg: "https://picsum.photos/id/53/1080/1920", profileimg: "https://picsum.photos/id/53/150/150" },
  { username: "sebastian_ios", storyimg: "https://picsum.photos/id/54/1080/1920", profileimg: "https://picsum.photos/id/54/150/150" },
  { username: "luna_android", storyimg: "https://picsum.photos/id/55/1080/1920", profileimg: "https://picsum.photos/id/55/150/150" },
  { username: "jack_game", storyimg: "https://picsum.photos/id/56/1080/1920", profileimg: "https://picsum.photos/id/56/150/150" },
  { username: "grace_play", storyimg: "https://picsum.photos/id/57/1080/1920", profileimg: "https://picsum.photos/id/57/150/150" },
  { username: "aiden_stream", storyimg: "https://picsum.photos/id/58/1080/1920", profileimg: "https://picsum.photos/id/58/150/150" },
  { username: "chloe_live", storyimg: "https://picsum.photos/id/59/1080/1920", profileimg: "https://picsum.photos/id/59/150/150" }
];
const container = document.querySelector(".story-panel");
userStories.forEach(function(user) {
  container.innerHTML += `
        <div class="profile">
            <div class="img-cont">
                <img src="${user.profileimg}" alt="${user.username}">
            </div> 
            <h4 class="display-user-name">${user.username}</h4>
        </div>
    `
});
 const profileimgstory=document.querySelector(".user-story-top-profile-img");
const story=document.querySelector(".story");
const openStory=document.querySelector(".open-story-user");
const storyoutBar=document.querySelector(".bar")
  let intbar = 0;
addEventListener("click",function(){
    //  userStories.forEach(val => {
            // openStory.style.backgroundImage = `url('${val.storyimg}')`;
            // profileimgstory.src=val.storyimg;
            openStory.style.display = "flex";
   let intv = setInterval(() => {
        storyoutBar.style.width = `${intbar}%`;
        console.log(intbar);
        intbar++;
    },100)
             setTimeout(() => {
        clearInterval(intv)
        intbar=0
        storyoutBar.style.width = `${intbar}%`;
         openStory.style.display = "none";
    }, 10000);

})

    //  });

