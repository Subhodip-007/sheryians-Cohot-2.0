function fixedSizewindowmaxsum(arr,k){
 let st=0;
let end=k;
let sum=0;
let res=-Infinity
for(let i=st;i<end;i++){
    sum+=arr[i]
    
}
while(end<arr.length){
    st++;
    end++;
    res=Math.max(res,sum)
    sum-=arr[st-1];
    sum+=arr[end];
}
 return res;
}
let arr=[10,20,30,40,50]
let k=2;
console.log(fixedSizewindowmaxsum(arr,k));