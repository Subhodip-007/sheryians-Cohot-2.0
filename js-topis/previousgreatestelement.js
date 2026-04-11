function prevGretestElem(arr){
    let stack=[];
    for(let i=0;i<arr.length;i++){
        while(stack.length !==0 && stack[stack.length-1]<arr[i]){
            stack.pop();
        }
        if(stack.length==0){
            console.log(-1);
        }
        if(stack[stack.length-1]>arr[i]){
             console.log(stack[stack.length-1]);
        }
        stack.push(arr[i])
    }
}
let nums=[7,4,6,1,5,2,3];
prevGretestElem(nums);

