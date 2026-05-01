function maxSumOfFixedWindow(arr, k) {
    let start = 0;
    let end = k;
    let res = -Infinity;
    let sum = 0;
    for (let i = start; i < k; i++) {
        sum += arr[i];
    }
    res = Math.max(res, sum);
    while (end < arr.length) {

        sum -= arr[start];
        sum += arr[end];
        res = Math.max(res, sum);
                start++;
        end++;
    }
    return res;
}
let arr = [10, 20, 40, 30, 10];
let k = 2;
console.log(maxSumOfFixedWindow(arr, k));
