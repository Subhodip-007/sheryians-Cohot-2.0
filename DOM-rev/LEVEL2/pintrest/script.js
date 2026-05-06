// what we r going to create 
// pintrest 
// you will get a array of obj and it will have a img , name 
// our task is to show all 
// we r making pintrest feature 
// adding posts using array of obj {img title}
// create func to show cards using foreach binging a obj using a clutter add `<div class="box">
    //     <img class="cursor-pointer" src="${obj.image}" alt="image">
    //     <div class="caption">Lorem ipsum </div>
    // </div>
let cont=document.querySelector(".container");
let input=document.querySelector("#searchinput");
let overlay=document.querySelector(".overlay");

const posts = [
  {
    title: "Mountain Retreat",
    imgsrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    addresslink: "https://example.com/locations/mountain-retreat"
  },
  {
    title: "Beachfront Villa",
    imgsrc: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    addresslink: "https://example.com/locations/beachfront-villa"
  },
  {
    title: "City Center Apartment",
    imgsrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    addresslink: "https://example.com/locations/city-center"
  },
  {
    title: "Desert Oasis",
    imgsrc: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0",
    addresslink: "https://example.com/locations/desert-oasis"
  },
  {
    title: "Lakeside Cabin",
    imgsrc: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    addresslink: "https://example.com/locations/lakeside-cabin"
  },
  {
    title: "Forest Treehouse",
    imgsrc: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7",
    addresslink: "https://example.com/locations/forest-treehouse"
  },
  {
    title: "Tropical Resort",
    imgsrc: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    addresslink: "https://example.com/locations/tropical-resort"
  },
  {
    title: "Historic Castle",
    imgsrc: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310",
    addresslink: "https://example.com/locations/historic-castle"
  },
  {
    title: "Countryside Cottage",
    imgsrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    addresslink: "https://example.com/locations/countryside-cottage"
  },
  {
    title: "Snowy Chalet",
    imgsrc: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    addresslink: "https://example.com/locations/snowy-chalet"
  },
  {
    title: "Jungle Lodge",
    imgsrc: "https://images.unsplash.com/photo-1518182170546-076616fd61fd",
    addresslink: "https://example.com/locations/jungle-lodge"
  },
  {
    title: "Cliffside Inn",
    imgsrc: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a",
    addresslink: "https://example.com/locations/cliffside-inn"
  },
  {
    title: "Valley Farmhouse",
    imgsrc: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    addresslink: "https://example.com/locations/valley-farmhouse"
  },
  {
    title: "Island Bungalow",
    imgsrc: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
    addresslink: "https://example.com/locations/island-bungalow"
  },
  {
    title: "Urban Loft",
    imgsrc: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    addresslink: "https://example.com/locations/urban-loft"
  },
  {
    title: "Riverside Camp",
    imgsrc: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
    addresslink: "https://example.com/locations/riverside-camp"
  },
  {
    title: "Safari Tent",
    imgsrc: "https://images.unsplash.com/photo-1504280741564-96f30a9167b5",
    addresslink: "https://example.com/locations/safari-tent"
  },
  {
    title: "Alpine Hut",
    imgsrc: "https://images.unsplash.com/photo-1443632864897-14973fa006cf",
    addresslink: "https://example.com/locations/alpine-hut"
  },
  {
    title: "Coastal Lighthouse",
    imgsrc: "https://images.unsplash.com/photo-1469522774134-2e9ee066f1e3",
    addresslink: "https://example.com/locations/coastal-lighthouse"
  },
  {
    title: "Desert Glamping",
    imgsrc: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d",
    addresslink: "https://example.com/locations/desert-glamping"
  },
  {
    title: "Historic Mansion",
    imgsrc: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    addresslink: "https://example.com/locations/historic-mansion"
  },
  {
    title: "Eco Pod",
    imgsrc: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    addresslink: "https://example.com/locations/eco-pod"
  },
  {
    title: "Vineyard Estate",
    imgsrc: "https://images.unsplash.com/photo-1562601579-599dec564e06",
    addresslink: "https://example.com/locations/vineyard-estate"
  },
  {
    title: "Ski Resort",
    imgsrc: "https://images.unsplash.com/photo-1551524164-687a55dd1126",
    addresslink: "https://example.com/locations/ski-resort"
  }
];

function CreatePosts(){
 let clutter="";

 posts.forEach(element => {
    clutter+=`                    <div class="box">
                        <img class="cursor-pointer"
                            src="${element.imgsrc}"
                            alt="image">
                        <div class="caption">${element.title}</div>
                    </div>`
 
 });
 cont.innerHTML=clutter;
}
CreatePosts();

// search bar 
// on clicking on search bar there is a overlay div class="overlay hidden fixed w-full h-screen bg-black/80"></div> i want to make the hidden style display bolck/flex 
// now when it should happen when clicked on search input <input id="searchinput" addevt active/click to remove add evt blur with display none
// now if i type something in input that related obj should come using evt input inpput.value now filter it filter obj.name.startswith(input.value)
// also make this none <div class="hidden searchdats `<div class="res flex px-8 py-3">
        //     <i class="ri-search-line font-semibold mr-5"></i>
        //     <h3 class="font-semibold">${obj.name}</h3>
        // </div>`
input.addEventListener("click",()=>{
    overlay.style.display="block";
})
overlay.addEventListener("click",()=>{
    overlay.style.display="none";
                    document.querySelector(".searchdata").style.display = "none";
})
input.addEventListener("input",()=>{
    let filteredsearch=posts.filter((obj)=>{
       return obj.title.toLowerCase().startsWith(input.value);
    })
    console.log(filteredsearch);
    let clutter="";
    filteredsearch.forEach((obj)=>{
        clutter+=`<div class="res flex px-8 py-3">
            <i class="ri-search-line font-semibold mr-5"></i>
            <h3 class="font-semibold">${obj.title}</h3>
        </div>`
                document.querySelector(".searchdata").style.display = "block";
        document.querySelector(".searchdata").innerHTML = clutter;
    })



})