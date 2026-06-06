
// duplicate number
//Input: nums = [1,3,4,2,2]
//Output: 2
// we can salve using freq table/hast table map
// let slove it with slow-fast pointer
function duplicatenumSlowFastPointer(arr){
    let slow = arr[0];
    let fast = arr[0];

    while(true){

        slow = arr[slow];
        fast = arr[fast];
        fast = arr[fast];

        if(slow == fast){
            break;
        }
    }

    slow = 0;

    while(slow != fast){
        slow = arr[slow];
        fast = arr[fast];
    }

    console.log(slow);
}

let arr = [3,2,1,4,1];

duplicatenumSlowFastPointer(arr)
