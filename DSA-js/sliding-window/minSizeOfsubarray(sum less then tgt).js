function minLenghtSubarray(arr,tgt){
    let st=0;
    let end=0;
    let sum=0;
    let res=Infinity;
    for(end=0; end<arr.length;end++){
        sum+=arr[end];
         while(sum>=tgt){
        let len=end-st+1;
        res=Math.min(res,len);
        sum-=arr[st];
        st++;
    }
    } 
   
    return res;

}
let arr=[5,4,4,4];
let k=5;
console.log(minLenghtSubarray(arr,k));