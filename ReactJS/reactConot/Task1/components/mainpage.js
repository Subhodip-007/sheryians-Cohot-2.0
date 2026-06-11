function mainpage(){
    let herotaxt=React.createElement('h1',{className:'herotext'},"Spider-man");
    let herotaxt2=React.createElement('h1',{className:'herotext2'},"Go back to home");
    let conttext=React.createElement('div',{className:'cont-text'},[herotaxt,herotaxt2]);
    return conttext;
}
export default mainpage;