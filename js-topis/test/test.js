// 19. ATM Simulator – Allow 3 withdrawals
// Start with ₹1000 balance. Ask withdrawal amount 3 times.
// If enough balance → deduct
// Else → print “Insufficient balance”
let stop = "stop";
let count = 0;

while (true) {
    let ip = prompt("enter any word");

    // handle cancel
    if (ip === null) {
        console.log("cancelled");
        break;
    }

    ip = ip.trim().toLowerCase();

    if (ip === stop) {
        console.log("stopped");
        break;
    }

    if (ip === "yes") {
        count++;
    }
}

console.log(count);