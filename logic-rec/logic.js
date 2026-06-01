
// Phase 1 – Recursion Mindset Reset (No Math, No Strings)
// 🎯Goal: Understanding the core.
// 1. Write a recursive function that prints "Hello" exactly 5 times.
// 2. Print numbers from 1 to 5 using recursion without parameters.
// 3. Print numbers from 5 to 1 using recursion without loops.
// 4. Print "Before Call" and "After Call" to observe call order.
// 5. Print numbers from 1 to n after the recursive call.
// 6. Print numbers from 1 to n before the recursive call.
// 7. Print "Start" only once and "End" only once using recursion.
// 8. Print the current value of n during each recursive call.
// 9. Write a recursive function that stops only when n == 0.
// 10. Dry-run a recursive function manually and write call stack states.

// function print(n){
//     if(n==0){
//         return
//     }
//     console.log("helloo")
//     print(n-1);
// }
// print(5)


//     let i=1;
// function numWithoutPara(){

// if(i==5){
//     return
// }
// console.log(i);
// i++;
// numWithoutPara()
// }
// numWithoutPara()

// function recLoop(n){
//  if(n==0){
//     return;
//  }
//  console.log(n);
//  recLoop(n-1);
// }
// recLoop(5)

// function callobserve(){
//     console.log("before call")
//     callobserve()
//     console.log("after call")
// }
// callobserve()
// note this will give stack overflow 
// function never reaches after call because it is 
// been call before printing  and dont have any basecase to terminate 
// function printAfterCall(n){
// if(n==0){
//     return
// }
// printAfterCall(n-1);
// console.log(n);
// }
// printAfterCall(5)
// note in after call the function calls ifselt everytime and never get chance to print 
// until it hits the base case and return it stores a the call valuse in call stack return together

// function printBeforeCall(n){
// if(n==0){
//     return
// }
// console.log(n);
// printBeforeCall(n-1);
// }
// printBeforeCall(5)
// note we are printion before calling function so it prints everytion for every call
// function startEndOnce(n=1){
//     if(n===0){
//         return;
//     }
//     console.log("start");
//     console.log("end");
//     startEndOnce(n-1);
// }
// startEndOnce()

// function printEacnCall(n){
// if(n==0){
//     return
// }
// printAfterCall(n-1);
// console.log(n);
// }
// printAfterCall(5)

// 1. Print numbers from 1 to n using recursion.
// 2. Print numbers from n to 1 using recursion.
// 3. Print even numbers from 1 to n using recursion.
// 4. Print odd numbers from 1 to n using recursion.
// 5. Find the sum of first n natural numbers using recursion.
// 6. Find the factorial of a number using recursion.
// 7. Calculate xⁿ (power of a number) using recursion.
// 8. Find the nth Fibonacci number using recursion.
// 9. Print Fibonacci series up to n terms using recursion.
// function printNum1ton(n){
//     if(n==0){
//         return
//     }
//     printNum1ton(n-1);
//     console.log(n);
// }
// printNum1ton(6)

// function printNumNto1(n){
//     if(n==0){
//         return
//     }
//     console.log(n);
//     printNumNto1(n-1);
  
// }
// printNumNto1(6)

// function evennum(n){
//  if(n==0){
//     return
//  }
//  evennum(n-1);
//  if(n%2==0){
//     console.log(n)
//  }
// }
// evennum(9)

// function oddnum(n){ 
//     if(n==0){
//         return;
//     }
//     oddnum(n-1);
//     if(n%2!==0) console.log(n)
// }
// oddnum(6)

// let sum=0;
// function sumofrec(n){
//     if(n==0){
//         return
//     }
//     sumofrec(n-1);
//    return sum=sum+n
// }
// console.log(sumofrec(3))
// note or
// function factorial(n){
//     if(n===0||n===1){
//         return 1;
//     }
//     return n*factorial(n-1);

// }
// console.log(factorial(5))
 
function powerOfX(x,n){
 if(n===0){
    return 1;
 }
 return x*powerOfX(x,n-1);
}
console.log(powerOfX(2,3))

function nthfibonacci(n){
    
}