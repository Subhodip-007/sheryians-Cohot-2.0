useeffect-- two run any task in sidestack
react ka primary task hai UI banana(main stack)
oor sidestack/task datainsert krrna (other task)
jaise API call 
async task 
inside rafce
useeffect(function(){

},[dependency]) mtlb jabjab the following depencency will chance use effect will run and if u leave blank it will run only once 