function longestlengthofwindowlessthentgt(arr,tgt){
    let st=0;
    let end=0;
    let sum=0;
    let res=-Infinity;
    for(end=0; end<arr.length;end++){
        sum+=arr[end];
         while(sum>tgt){
        sum-=arr[st];
      
        st++;
    }
      let len=end-st+1;
        res=Math.max(res,len);
    } 
   
    return res;

}
let arr=[5,10,10,5,5,5,20];
let k=10;
console.log(longestlengthofwindowlessthentgt(arr,k));