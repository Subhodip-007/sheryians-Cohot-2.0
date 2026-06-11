
function navbar(){    
let logo=React.createElement('img',{ className:'logo',src:'https://i.pinimg.com/1200x/e1/4b/0e/e14b0e0023d1ccfa079444078a65b803.jpg'})    
let icon1=React.createElement('h1',{className:'icon1'},"About-Me")
let icon2=React.createElement('h1',{className:'icon2'},"PoMofair")
let icon3=React.createElement('h1',{className:'icon2'},"Services")
let icon4=React.createElement('h1',{className:'icon2'},"Blog")
let arrow=React.createElement('i',{className:'ri-arrow-right-up-line'})
let icon5=React.createElement('h1',{className:'icon2'},["Book-A-call",arrow])
let icongrpleft=React.createElement('div',{className:'naviconGrpleft'},icon5);
let icongrpright=React.createElement('div',{className:'naviconGrpright'},logo,[icon1,icon2,icon3,icon4]);
return React.createElement('div',{className:'nav'},icongrpright,icongrpleft)
}
export default navbar;