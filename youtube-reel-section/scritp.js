let storyinfo=[
  {
    id: "1",
    name: "Dev Mastery",
    videoName: "Building a Next.js App from Scratch",
    thumbnail: "https://example.com/thumbnails/nextjs-tutorial.jpg",
    profileImg: "https://example.com/profiles/dev_channel.jpg",
    likeCount: 24500,
    dislikeCount: 112,
    shareCount: 3450,
    commentCoun: 1205,
    iSliked:false,
    iSsubscribed:true,
    videosource:"reels/video5.mp4"
  },
  {
    id: "2",
    name: "CSS Masterclass",
    videoName: "10 CSS Tricks You Need to Know",
    thumbnail: "https://example.com/thumbnails/css-tricks.jpg",
profileImg: "https://example.com/profiles/css_master.jpg",
    likeCount: 8900,
    dislikeCount: 45,
    shareCount: 1200,
    commentCount: 432,
    iSliked:false,
    iSsubscribed:false,
    videosource:"reels/video2.mp4"
  },
  {
    id: "3",
    name: "Tech Life Vlogs",
    videoName: "A Day in the Life of a Software Engineer",
    thumbnail: "https://example.com/thumbnails/day-in-life.jpg",
    profileImg: "https://example.com/profiles/tech_vlogger.jpg",
    likeCount: 150000,
    dislikeCount: 2100,
    shareCount: 12400,
    commentCount: 8900,
    iSliked:false,
    iSsubscribed:false,
    videosource:"reels/video3.mp4"
  },
  {
    id: "4",
    name: "Code Academy",
    videoName: "Understanding JavaScript Closures",
    thumbnail: "https://example.com/thumbnails/js-closures.jpg",
    profileImg: "https://example.com/profiles/code_academy.jpg",
    likeCount: 5430,
    dislikeCount: 12,
    shareCount: 890,
    commentCount: 215,
    iSliked:false,
    iSsubscribed:false,
    videosource:"reels/video4.mp4"
  }
] 
let add=document.querySelector(".shorts-cont")
function maker(){
  
let clutter=``;
storyinfo.forEach((element,idx) => {
    clutter+=`            <div class="short">
                <video id="main-screen" src="${element.videosource}" autoplay muted loop></video>
               

                <div class="overlay">
                    <!-- icons, buttons -->
                    <div class="left-content-info">
                        <div class="profile-info">
                            <img src="${element.profileImg}" alt="">
                            <samp>${element.name}</samp>
                            <button class="subscribe">${element.iSsubscribed ? "subscribe": "unsubscribe"}</button>
                            <div class="vid-content-info">
                                <a href="">link</a>
                                <p>${element.videoName}</p>
                                <a href=""></a>
                            </div>
                        </div>
                    </div>

                    <div class="right-elem-group">
                        <div  class="like" class="elem-icon"><i id="${idx}" class="${element.iSliked ? "ri-heart-fill" : "ri-heart-line"}"></i>
                        <h1 class="text" id>${element.likeCount}</h1></div>
                        <div id="comment" class="elem-icon"><i class="ri-message-line"></i>
                        <h1 class="text" id></h1></div>
                        <div id="share" class="elem-icon"><i class="ri-send-ins-fill"></i>
                        <h1 class="text" id>${element.shareCount}</h1></div>
                        <div id="remix" class="elem-icon"><i class="ri-remix-line"></i>
                       </div>
                    </div>

                </div>
            </div>`
            
});
add.innerHTML=clutter;
}
maker()
add.addEventListener("click", (dets) => {
  let idx = dets.target.id;

  if (idx === "") return;

  let item = storyinfo[idx];

  if (item.iSliked === false) {
    item.likeCount++;
    item.iSliked = true;
  } else {
    item.likeCount--;
    item.iSliked = false;
  }
console.log(dets.target)
  maker();
});


            // <div class="short">
            //     <video id="main-screen" src="reels\video4.mp4" autoplay muted loop></video>
               

            //     <div class="overlay">
            //         <!-- icons, buttons -->
            //         <div class="left-content-info">
            //             <div class="profile-info">
            //                 <img src="" alt="">
            //                 <samp>shub</samp>
            //                 <button>subsss</button>
            //                 <div class="vid-content-info">
            //                     <a href="">link</a>
            //                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, debitis.</p>
            //                     <a href=""></a>
            //                 </div>
            //             </div>
            //         </div>

            //         <div class="right-elem-group">
            //             <div id="like" class="elem-icon"><i class="ri-thumb-up-line"></i>
            //             <h1 class="text" id>0</h1></div>
            //             <div id="dislike" class="elem-icon"><i class="ri-thumb-down-line"></i>
            //             <h1 class="text" id>0</h1></div>
            //             <div id="comment" class="elem-icon"><i class="ri-message-line"></i>
            //             <h1 class="text" id>0</h1></div>
            //             <div id="share" class="elem-icon"><i class="ri-send-ins-fill"></i>
            //             <h1 class="text" id>0</h1></div>
            //             <div id="remix" class="elem-icon"><i class="ri-remix-line"></i>
            //            </div>
            //         </div>

            //     </div>
            // </div>