function footernavbar(){    
let icon4=React.createElement('h1',{className:'icon2'},"Blog")
let arrow=React.createElement('i',{className:'ri-arrow-right-up-line'})
let icon5=React.createElement('h1',{className:'icon2'},["Book-A-call",arrow])
let icongrpleft=React.createElement('div',{className:'naviconGrpleft'},icon5);
let icongrpright=React.createElement('div',{className:'naviconGrpright'}[icon4]);
return React.createElement('div',{className:'footernav'},icongrpright,icongrpleft)
}
export default footernavbar;