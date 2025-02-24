// Test Cases designed to ensure correct logic is used in the Draft Helper according to principles of drafting in Brawl Stars, major helper functions work properly, and that unusual behavior is correcly dealt with
// Maximum score is 155 points across 50 tests


const {RED, YELLOW, GREEN, gemGrab, brawlBall, heist, bounty, knockout, hotZone, crowdControl, ranged, snipers, assassins, closeAssassins, tanks, tankCounters, throwers, controllers, squishies, wallBreak, wallBreakGadget, mids, heistDPS, shred, tierList, five_maxes, changeELOS, compute} = require('./brawlerInfo.js');


// Helper functions used in test cases

// Helper function to count successes - used in many test cases
function cnt(solMatrix, target) {
    var count = 0;
    for (var k = 0; k<solMatrix[1].length; k++) {
        if (solMatrix[1][k] == target) {
            count++;
        }
    }
    return count;
}

// Helper function to count successes given multiple inputs - used in many test cases
function cntMultiple(solMatrix, targets) {
    var count = 0;
    for (var k = 0; k<solMatrix[1].length; k++) {
        if (targets.indexOf(solMatrix[1][k]) != -1) {
            count++;
        }
    }
    return count;
}

// Helper function to count successes across multiple arrays - used in several test cases
function cntMultipleArrays(solMatrix, targetArrays) {
    var count = 0;
    for (var j = 0; j<targetArrays.length; j++) {
        for (var k = 0; k<solMatrix[1].length; k++) {
            if (targetArrays[j].indexOf(solMatrix[1][k]) != -1) {
                count++;
            }
        }
    }
    return count;
}

// Helper function to count number of suggestions at or above a certain tier in a given game mode - used in tests 7-12
function cntTier(gameMode, targets, tierNum) {
    for (var j = 0; j<targets.length; j++) {
        var s = compute(tierList, [], targets[j], 0, 1, []);
        for (var k = 0; k<s[1].length; k++) {
            if (gameMode[s[1][k]] < tierNum) {
                return 0;
            }
        }
    }
    return 1;
}

// Helper function to create a temporary copy of an array
function makeArray(arr) {
    var temp = new Array(arr.length);
    for (var h=0; h<arr.length; h++) {
        temp[h] = arr[h];
    }
    return temp;
}

// Helper function to generate a random Brawler(s)
function generate(brawlerClass, num) {
    var brawlers = new Array(num).fill(-1);
    var k = 0;
    while (k<num) {
        var pos = brawlerClass[Math.floor(Math.random() * brawlerClass.length)];
        if (brawlers.indexOf(pos) == -1) {
            brawlers[k] = pos;
            k++;
        }
    }
    return brawlers;
}

let testsPassed = 0;
let points = 0;





// Test Cases


// Tests 1-4: Error Handling (Max Points = 12)

// Test 1 - Checks that a banned Brawler cannot be suggested
console.log("Test 1 (Returning Banned Brawlers):");
var s1 = compute(tierList, [], 0, 0, 1, []);
var bestBrawler = s1[1][0];
var t = compute(tierList, [bestBrawler], 0, 0, 1, []);
if (bestBrawler == t[1][0]) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points += 3;}



// Test 2 - Checks that a banned Brawler cannot be picked
console.log("Test 2 (Picking Banned Brawlers):");
var s2 = compute(tierList, [1, 15, 27, 40, 41, 66], 2, 0, 1, [0, 14, 15, 22]);
var testNum = s2[1][0];
if (testNum != -1) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points += 3;}



// Test 3 - Checks that a Brawler cannot be picked twice
console.log("Test 3 (Duplicate Brawler Pick):");
var s3 = compute(tierList, [], 0, 0, 1, [1, 1]);
var testNum = s3[1][0];
if (testNum != -1) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points += 3;}



// Test 4 - Checks that a picked Brawler cannot be suggested
console.log("Test 4 (Returning Picked Brawlers):");
var s4 = compute(tierList, [], 1, 0, 1, []);
var bestBrawler = s4[1][0];
var t = compute(tierList, [], 1, 0, 1, [bestBrawler]);
if (bestBrawler == t[1][0]) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points += 3;}





// Tests 5-6: Helper Function Checks (Max Points = 15)

// Test 5 - Checks that all the counting functions used on test cases work correctly (except cntTier since it requires use of the compute function)
console.log("Test 5 (Counting Functions):");
var count = 0;

// Test 5a) - cnt
var testCases5a = [[[], []], [[], [0]], [[], [1]], [[], [1, 1, 1, 1, 1]], [[], [1.0, 1, 1.00, 1.0000, 1.01]], [[], [2, 1, 7, 1, 11]], [[], [1, 0, 1, 0, 1, 0, 1]]];
var expectedSols5a = [0, 0, 1, 5, 4, 2, 4];
for (var k=0; k<testCases5a.length; k++) {
    if (cnt(testCases5a[k], 1)==expectedSols5a[k]) {
        count++;
    }
}

// Test 5b) - cntMultiple
var testCases5b = [[[], []], [[], [0]], [[], [1]], [[], [1, 2, 3]], [[], [1, 1, 2, 2]], [[], [5, 18, 90, 60, 10]], [[], [1, 8, 2, 7, 1]], [[], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]]];
var expectedSols5b = [0, 0, 1, 2, 4, 0, 3, 10];
for (var k=0; k<testCases5b.length; k++) {
    if (cntMultiple(testCases5b[k], [1, 2])==expectedSols5b[k]) {
        count++;
    }
}

// Test 5c) - cntMultipleArrays
var testCases5c = [[[], []], [[], [1]], [[], [20]], [[], [19]], [[], [19, 20, 21, 22, 23]], [[], [999, 888, 777, 666, 555]], [[], [1, 2, 4, 8, 16, 32, 64, 80]]];
var expectedSols5c = [0, 0, 1, 2, 7, 0, 1];
for (var k=0; k<testCases5c.length; k++) {
    if (cntMultipleArrays(testCases5c[k], [heistDPS, shred])==expectedSols5c[k]) {
        count++;
    }
}

if (count==22) {console.log(GREEN, 'Passed'); testsPassed++; points += 10}
else if (count>0) {console.log(YELLOW, count + "/22 cases passed"); points += Math.floor(count/3);}
else {console.log(RED, 'Failed');}


// Test 6 - Checks that the five maxes function works as intended
console.log("Test 6 (Five Maxes):");
var count = 0;
var testCases6 = [[], [1], [1, 1], [1, 2, 3, 4, 5], [10, 8, 6, 4, 2, 1, 3, 5, 7, 9]];
var expectedSols6 = [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[1, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [[1, 1, 0, 0, 0], [1, 0, 0, 0, 0]], [[5, 4, 3, 2, 1], [4, 3, 2, 1, 0]], [[10, 9, 8, 7, 6], [0, 9, 1, 8, 2]]];
for (var k=0; k<testCases6.length; k++) {
    if (JSON.stringify(five_maxes(testCases6[k])) === JSON.stringify(expectedSols6[k])) {
        count++;
    }
}
if (count==5) {console.log(GREEN, 'Passed'); testsPassed++; points += 5}
else if (count>0) {console.log(YELLOW, count + "/5 cases passed"); points += count;}
else {console.log(RED, 'Failed');}





// Tests 7-12: Game Mode Viability (Max Points = 6)

// Test 7 - Checks that all initial suggested Brawlers on all Heist Maps are at least B tier in Heist
console.log("Test 7 (Heist Meta Brawler Checker):");
var heistMaps = [1, 10, 11, 19]
if (cntTier(heist, heistMaps, 3)==0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points++;}



// Test 8 - Checks that all initial suggested Brawlers on all Knockout maps are at least B tier in Knockout
console.log("Test 8 (Knockout Meta Brawler Checker):");
var knockoutMaps = [0, 6, 7, 14];
if (cntTier(knockout, knockoutMaps, 3)==0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points++;}



// Test 9 - Checks that all initial suggested Brawlers on all Bounty maps are at least B tier in Bounty
console.log("Test 9 (Bounty Meta Brawler Checker):");
var bountyMaps = [2, 9, 20, 21];
if (cntTier(bounty, bountyMaps, 3)==0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points++;}



// Test 10 - Checks that all suggested Brawlers on Penalty Kick are at least B tier in Brawl Ball
console.log("Test 10 (Brawl Ball Meta Brawler Checker):");
var brawlBallMaps = [3, 16, 17, 22];
if (cntTier(brawlBall, brawlBallMaps, 3)==0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points++;}



// Test 11 - Checks that all suggested Brawlers on Hard Rock Mine are at least B tier in Gem Grab
console.log("Test 11 (Gem Grab Meta Brawler Checker):");
var gemGrabMaps = [4, 8, 12, 23];
if (cntTier(gemGrab, gemGrabMaps, 3)==0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points++;}



// Test 12 - Checks that all suggested Brawlers on all Hot Zone maps are at least B tier in Hot Zone
console.log("Test 12 (Hot Zone Meta Brawler Checker):");
var hotZoneMaps = [5, 13, 15, 18];
if (cntTier(hotZone, hotZoneMaps, 3)==0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points++;}





// Tests 13-18: Bounty Scenarios (Max Points = 14)

// Test 13 - Shooting Star I (checks that all suggested Brawlers are ranged)
console.log("Test 13 (Shooting Star I):");
var s13 = compute(tierList, [], 20, 0, 1, []);
var i = 0;
var count = 0;
while (i<5) {
    for (var j=0; j<ranged.length; j++) {
        if (s13[1][i]==ranged[j]) {
            count++;
            break;
        }
    }
    i++;
}
if (count<5) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}



// Test 124- Shooting Star II (checks that all suggested Brawlers are still ranged with Quickfire modifier on AND have different scores from classic modifier)
console.log("Test 14 (Shooting Star II):");
var s14a = compute(tierList, [], 20, 0, 1, []);
var s14b = compute(tierList, [], 20, 3, 1, []);
var sameScore = 0;
for (var i = 0; i<5; i++) {
    if (s14a[0][i] == s14b[0][i]) {
        sameScore++;
    }
}
if (cntMultiple(s14b, ranged)<5 || sameScore==5) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}



// Test 15 - Shooting Star III (given squishy enemy team, checks that 6th pick suggestions include assassins)
console.log("Test 15 (Shooting Star III):");
var randInt = Math.floor(Math.random() * 8);
var s15 = compute(tierList, [0, 1, 3, 7], 20, 0, 0, [77, 2, 6, 15, throwers[randInt]]);
var k = 0;
var count = 0;
while (k<5) {
    for (var j=0; j<assassins.length; j++) {
        if (s15[1][k]==assassins[j]) {
            count++;
            break;
        }
    }
    k++;
}

if (count<2) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=3;}



// Test 16 - Shooting Star IV (checks that 5th pick can counter potential enemy thrower)
console.log("Test 16 (Shooting Star IV):");
var throwerCounters = [16, 25, 37, 39, 46, 57, 68, 76, 82, 82, 82, 82, 82, 82, 82]
var s16 = compute(tierList, [], 20, 0, 1, [53, 59, generate(ranged, 1)[0], 75])
if (cntMultipleArrays(s16, [assassins, throwerCounters])<3) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=3;}



// Test 17 - Snake Prairie I (checks that Bo, Tara, and Rosa are all suggested)
console.log("Test 17 (Snake Prairie I):");
var s17 = compute(tierList, [], 21, 0, 1, [])
if (cntMultiple(s17, [9, 70, 80])<3) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}



// Test 18 - Snake Prairie II (given 3 enemy tanks, checks that Shelly or Rosa is #1 pick)
console.log("Test 18 (Snake Prairie II):");
var enemyTanks = generate(tanks, 3);
var s18 = compute(tierList, [], 21, 0, 0, [enemyTanks[0], 80, 9, enemyTanks[1], enemyTanks[2]]);
if (s18[1][0]!=74 && s18[1][0]!=70) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}





// Tests 19-26: Brawl Ball Scenarios (Max Points = 20)

// Test 19 - Center Stage I (checks that at least 3/5 of SpenLC's recommended picks are shown) 
console.log("Test 19 (Center Stage I):");
var spenPicks = [13, 35, 57, 69, 79];
var s19 = compute(tierList, [], 3, 0, 1, []);
if (cntMultiple(s19, spenPicks)<3) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}



// Test 20 - Center Stage II (checks that no tanks are suggested into enemy Surge and Gale)
console.log("Test 20 (Center Stage II):");
var s20 = compute(tierList, [], 3, 0, 1, [24, 35, 79]);
if (cntMultiple(s20, tanks)!=0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}



// Test 21 - Center Stage III (given enemy Rico, checks that adequate amount of wallbreakers are suggested) 
console.log("Test 21 (Center Stage III):");
var s21 = compute(tierList, [], 3, 0, 0, [69]);
var count = (3*cntMultiple(s21, wallBreakGadget)) + cntMultiple(s21, wallBreak);
if (count<5) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=3;}



// Test 22 - Center Stage IV (given friendly Berry and random controller, checks that tank is suggested)
console.log("Test 22 (Center Stage IV):");
var randController = Math.floor(Math.random() * 15);
var s22 = compute(tierList, [], 3, 0, 1, [7, 47, 58, controllers[randController]]);
if (cntMultiple(s22, tanks)<3) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=3;}



// Test 23 - Penalty Kick I (checks that Barley is suggested given L+L ban)
console.log("Test 23 (Penalty Kick I):");
var s23 = compute(tierList, [46], 16, 0, 1, []);
if (cnt(s23, 4)==0) {console.log(RED, 'Failed');}
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}



// Test 24 - Penalty Kick II (tests 3 Surge scenarios)
console.log("Test 24 (Penalty Kick II):");

// Test 24a: Surge Suggested for 1st pick
var s24a = compute(tierList, [], 16, 0, 1, []);
var count = 0;
count += cnt(s24a, 79);

// Test 24b: Surge Not Suggested into Throwers
var enemyThrowers = generate(throwers, 2);
var s24b = compute(tierList, [], 16, 0, 1, [8, enemyThrowers[0], enemyThrowers[1]]);
count -= cnt(s24b, 79);
count++;

// Test 24c: Surge Suggested into Tank + Assassin
var s24c = compute(tierList, [], 16, 0, 0, [generate(tanks, 1)[0], 5, 16, generate(assassins, 1)[0], generate(controllers, 1)[0]]);
count += cnt(s24c, 79);

if (count<3) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed'); testsPassed++; points+=2;}



// Test 25 - Penalty Kick III (given 2 thrower teammates, checks that throwers and squishies not suggested)
console.log("Test 25 (Penalty Kick III):");
var friendlyThrowers = generate(throwers, 2);
var s25 = compute(tierList, [], 16, 0, 1, [friendlyThrowers[0], 79, 44, friendlyThrowers[1]]);
if (cntMultipleArrays(s25, [squishies, throwers])>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=3;}



// Test 26 - Penalty Kick IV (checks that CC Brawlers aren't suggested into random tank with Sick Beats)
console.log("Test 26 (Penalty Kick IV):");
var randTank = Math.floor(Math.random() * 15);
var s26 = compute(tierList, [], 16, 0, 0, [tanks[randTank]]);
var count = 0;
var k = 0;
while (k<5) {
    if (crowdControl[s26[1][k]] == 3) {
        count++;
        break;
    }
    k++;
}

if (count>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed'); testsPassed++; points+=3;}





// Tests 27-32: Gem Grab Scenarios (Max Points = 17)

// Test 27 - Hard Rock Mine I (checks that no throwers are suggested for first pick)
console.log("Test 27 (Hard Rock Mine I):");
var s27 = compute(tierList, [], 8, 0, 1, []);
if (cntMultiple(s27, throwers)>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 28 - Hard Rock Mine II (checks that Rosa is suggested into assassins + throwers)
console.log("Test 28 (Hard Rock Mine II):");
var randThrower = throwers[Math.floor(Math.random() * 8)];
var enemyAssassins = generate(closeAssassins, 2);
var s28 = compute(tierList, [], 8, 0, 0, [enemyAssassins[0], 44, 69, randThrower, enemyAssassins[1]]);
if (cnt(s28, 70)==0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 29 - Hard Rock Mine III (checks that Tara (with significant ELO advantage) is not suggested into Amber and Sandy)
console.log("Test 29 (Hard Rock Mine III):");
var temp = makeArray(tierList);
temp[80] *= 1.5;
var s29 = compute(temp, [], 8, 0, 1, [9, 1, 73]);
if (cnt(s29, 80)>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=3;}



// Test 30 - Hard Rock Mine IV (checks two scenarios - i) gem carrier suggested as 5th pick with 2 lane teammates, ii) 2nd gem carrier not suggested)
console.log("Test 30 (Hard Rock Mine IV):");
var count = 0;
var s30a = compute(tierList, [], 8, 0, 1, [73, 2, 46, 74]);
count += Math.min(cntMultiple(s30a, mids));

var randMid = mids[Math.floor(Math.random()*mids.length)];
var s30b = compute(tierList, [], 8, 0, 1, [randMid]);
count -= Math.max(cntMultiple(s30b, mids), 0);
if (count<1) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=6;}



// Test 31 - Last Stop I (checks that Crow is suggested into Pam, Poco, and Max)
console.log("Test 31 (Last Stop I):");
var s31 = compute(tierList, [], 12, 0, 0, [53, 2, 9, 63, 67]);
if (cnt(s31, 24)==0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++;points+=2;}



// Test 32 - Last Stop II (checks that Gene is first suggestion with 2 tank teammates and Momentum modifier)
console.log("Test 32 (Last Stop II):");
var friendlyTanks = generate(tanks, 2);
var s32 = compute(tierList, [], 12, 3, 1, [friendlyTanks[0], 47, 66, friendlyTanks[1]]);
if (cnt(s32, 36)==0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}





// Tests 33-38: Heist Scenarios (Max Points = 14)

// Test 33 - Bridge Too Far I (checks that Colette is NOT suggested as a first pick)
console.log("Test 33 (Bridge Too Far I):");
var s33 = compute(tierList, [], 1, 0, 1, []);
if (cnt(s33, 21)>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 34 - Bridge Too Far II (checks that both Piper and Nani are suggested into Brock and Colt)
console.log("Test 34 (Bridge Too Far II):");
var s34 = compute(tierList, [], 1, 0, 1, [19, 11, 22]);
if (cntMultiple(s34, [60, 66])<2) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 35 - Bridge Too Far III (checks that one heavy damage dealer is suggested when teammates are Angelo and Piper)
console.log("Test 35 (Bridge Too Far III):");
const s35 = compute(tierList, [], 1, 0, 0, [2, 1, 69, 66]);
if (cntMultiple(s35, heistDPS)<3) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=3;}



// Test 36 - Bridge Too Far IV (checks that Nani is suggested into Piper and not suggested into Melodie + Chuck)
console.log("Test 36 (Bridge Too Far IV):");

// Test 36a) - Nani suggested into Piper
var s36a = compute(tierList, [], 1, 0, 0, [66]);
var count = cnt(s36a, 60);

// Test 36b) - Nani not suggested into Melodie + Chuck
var s36b = compute(tierList, [], 1, 0, 1, [22, 19, 55]);
count -= cnt(s36b, 60);

if (count<1) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=3;}



// Test 37 - Hot Potato I (checks that Chuck is not suggested)
console.log("Test 37 (Hot Potato I):");
var s37 = compute(tierList, [], 10, 0, 1, []);
if (cnt(s37, 19)>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 38 - Hot Potato II (checks that wallbreak or thrower is suggested into Rico)
console.log("Test 38 (Hot Potato II):");
var s38 = compute(tierList, [], 10, 0, 0, [69]);
if (cntMultipleArrays(s38, [throwers, wallBreak, wallBreakGadget])<2) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}





// Tests 39-42: Knockout Scenarios (Max Points = 10)

// Test 39 - Flaring Phoenix I (checks that Piper and Mandy are suggested)
console.log("Test 39 (Flaring Phoenix I):");
var s39 = compute(tierList, [], 6, 0, 1, []);
if (cntMultiple(s39, [52, 66])<2) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 40 - Flaring Phoenix II (checks that a second sniper is not suggested)
console.log("Test 40 (Flaring Phoenix II):");
var s40 = compute(tierList, [], 6, 0, 1, [66]);
if (cntMultiple(s40, snipers)>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 41 - Flaring Phoenix III (checks that Byron is suggested when teammates are Kit + Darryl)
console.log("Test 41 (Flaring Phoenix III):");
var s41 = compute(tierList, [], 6, 0, 1, [25, 45]);
if (cnt(s41, 15)==0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=3;}



// Test 42 - Flaring Phoenix IV (checks that throwers aren't suggested into Gray and Mr. P)
console.log("Test 42 (Flaring Phoenix IV):");
var s42 = compute(tierList, [], 6, 0, 1, [2, 37, 59]);
if (cntMultiple(s42, throwers)>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=3;}





// Tests 43-48: Hot Zone Scenarios (Max Points = 15)

// Test 43 - Out in the Open I (checks that Pearl is suggested into Carl and Mortis)
console.log("Test 43 (Out in the Open I):");
var s43 = compute(tierList, [], 14, 0, 1, [2, 16, 58]);
if (cnt(s43, 64)==0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 44 - Out in the Open II (checks that Lily is suggested into 3 snipers)
console.log("Test 44 (Out in the Open II):");
var enemySnipers = generate(snipers, 3);
var s44 = compute(tierList, [], 14, 0, 1, [enemySnipers[0], 32, 9, enemySnipers[1], enemySnipers[2]]);
if (cnt(s44, 48)==0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 45 - Dueling Beetles I (checks that Lou is suggested into 3 tanks/assassins)
console.log("Test 45 (Dueling Beetles I):");
var enemyTanks = generate(tanks, 2);
var enemyAssassin = assassins[Math.floor(Math.random() * 14)];
var s45 = compute(tierList, [], 5, 0, 0, [enemyTanks[0], 54, 7, enemyTanks[1], enemyAssassin]);
if (cnt(s45, 50)==0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 46 - Dueling Beetles II (checks that Barley + L&L are suggested into Penny)
console.log("Test 46 (Dueling Beetles II):");
var s46 = compute(tierList, [], 5, 0, 0, [65]);
if (cntMultiple(s46, [4, 46])<2) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=2;}



// Test 47 - Dueling Beetles III (checks that Berry isn't suggested as first pick but is suggested with Buster teammate)
console.log("Test 47 (Dueling Beetles III):");
var count = 0;
var s47a = compute(tierList, [], 5, 0, 1, []);
count -= cnt(s47a, 7);

var s47b = compute(tierList, [], 5, 0, 1, [13]);
count += cnt(s47b, 7);

if (count<1) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=3;}



// Test 48 - Dueling Beetles IV (checks that throwers+snipers aren't suggested with L+L and Stu as teammates)
console.log("Test 48 (Dueling Beetles IV):");
var s48 = compute(tierList, [], 5, 0, 0, [16, 46, 78]);
if (cntMultipleArrays(s46, [throwers, snipers])>0) {console.log(RED, 'Failed'); }
else {console.log(GREEN, 'Passed');testsPassed++; points+=4;}





// Tests 49-50: Summative Tests (Max Points = 30)

// Test 49 - Heist Summative (checks that Chuck and Melodie are suggested lowest on Hot Potato, checks that 3+ heavy damage dealers are suggested, checks that tanks aren't suggested outside of Hot Potato)
console.log("Test 49 (Heist Summative):")
var stagesPassed = 0;

// Test 49a) - checks that Chuck and Melodie have the lowest Heist ratings in Hot Potato
var heistMaps = [1, 10, 11, 19];
var temp1 = makeArray(tierList);

temp1[19] *= 500;
temp1[55] *= 50;

var chuckVals = [];
var melodieVals = [];
heistMaps.forEach(map => {
    const [chuck, melodie] = compute(temp1, [], map, 0, 1, [])[0];
    chuckVals.push(chuck);
    melodieVals.push(melodie);
});

var chuckIndex = chuckVals.indexOf(Math.min(...chuckVals));
var melodieIndex = melodieVals.indexOf(Math.min(...melodieVals));

if (chuckIndex === 1 && melodieIndex === 1) {
    stagesPassed++;
}


// Test 49b) - checks that high damage dealers make up at least 50% of first pick suggestions
var count = 0;
for (var k=0; k<4; k++) {
    var s49b = compute(tierList, [], heistMaps[k], 0, 1, []);
    count += cntMultiple(s49b, heistDPS);
}
if (count>=10) {
    stagesPassed++;
}

// Test 49c) - checks that tanks aren't suggested for first pick outside of Hot Potato
var rangedHeistMaps = [1, 11, 19];
var count = 0;
for (var k=0; k<3; k++) {
    var s49b = compute(tierList, [], rangedHeistMaps[k], 0, 1, []);
    count += cntMultiple(s47b, tanks);
    count -= cnt(s47b, 19);
    count -= cnt(s47b, 55);
}
if (count==0) {
    stagesPassed++;
}

var stages49 = [
    { message: 'Failed', color: RED, points: 0 },
    { message: '1/3 cases passed', color: YELLOW, points: 1 },
    { message: '2/3 cases passed', color: YELLOW, points: 3 },
    { message: 'Passed', color: GREEN, points: 6 }
]

var stage = stages49[stagesPassed];
console.log(stage.color, stage.message);
points += stage.points;
if (stagesPassed === 3) testsPassed++;



// Test 50 - Counterpicks Summative (checks that wallbreaks get increased ELO from thrower picks, checks that tank counters get increased ELO from tank picks, checks that tanks get increased ELO from assassin picks, checks that throwers get decreased ELO from assassin picks, checks that throwers get increased ELO from sniper picks if walls>=3 and vice versa if walls<3, checks that assassin ELO increases into throwers and snipers)
console.log("Test 50 (Counterpick Summative):")
var stagesPassed = 0;

// Test 50a) - checks tanks get increased ELO from assassin picks
var count = 0;
for (var k=0; k<10; k++) {
    var temp = makeArray(tierList);
    var randTank = tanks[Math.floor(Math.random() * 15)];
    var randAssassin = assassins[Math.floor(Math.random() * 14)];
    temp[randTank] *= 100;
    var randMap = Math.floor(Math.random() * 24);
    var s50a1 = compute(tierList, [], randMap, 0, 0, []);
    var s50a2 = compute(tierList, [], randMap, 0, 0, [randAssassin]);
    if (s50a1[0][0] < s50a2[0][0]) {
        count++;
    }
}
if (count>7) {
    stagesPassed++;
}

// Test 50b) - checks that wallbreaks get increased ELO from thrower picks
var count = 0;
for (var k=0; k<10; k++) {
    var temp = makeArray(tierList);
    var randWallbreak = wallBreak[Math.floor(Math.random() * 3)];
    var randThrower = throwers[Math.floor(Math.random() * 8)];
    temp[randWallbreak] *= 100;
    var randMap = Math.floor(Math.random() * 24);
    var s50b1 = compute(tierList, [], randMap, 0, 0, []);
    var s50b2 = compute(tierList, [], randMap, 0, 0, [randThrower]);
    if (s50b1[0][0] < s50b2[0][0]) {
        count++;
    }
}
if (count>7) {
    stagesPassed++;
}

// Test 50c) - checks that assassins get increased ELO from sniper picks
var count = 0;
for (var k=0; k<10; k++) {
    var temp = makeArray(tierList);
    var randAssassin = assassins[Math.floor(Math.random() * 14)];
    var randSniper = snipers[Math.floor(Math.random() * 8)];
    temp[randAssassin] *= 100;
    var randMap = Math.floor(Math.random() * 24);
    var s50c1 = compute(tierList, [], randMap, 0, 0, []);
    var s50c2 = compute(tierList, [], randMap, 0, 0, [randSniper]);
    if (s50c1[0][0] < s50c2[0][0]) {
        count++;
    }
}
if (count>7) {
    stagesPassed++;
}

// Test 50d) - checks that assassins get increase ELO from thrower picks
var count = 0;
for (var k=0; k<10; k++) {
    var temp = makeArray(tierList);
    var randAssassin = assassins[Math.floor(Math.random() * 14)];
    var randThrower = throwers[Math.floor(Math.random() * 8)];
    temp[randAssassin] *= 100;
    var randMap = Math.floor(Math.random() * 24);
    var s50c1 = compute(tierList, [], randMap, 0, 0, []);
    var s50c2 = compute(tierList, [], randMap, 0, 0, [randThrower]);
    if (s50c1[0][0] < s50c2[0][0]) {
        count++;
    }
}
if (count>7) {stagesPassed++;}

// Test 50e) - checks that tank counters get increased ELO from tank picks
var count = 0;
for (var k=0; k<10; k++) {
    var temp = makeArray(tierList);
    var randTankCounter = tankCounters[Math.floor(Math.random() * 21)];
    var randTank = tanks[Math.floor(Math.random() * 15)];
    temp[randTankCounter] *= 100;
    var randMap = Math.floor(Math.random() * 24);
    var s50c1 = compute(tierList, [], randMap, 0, 0, []);
    var s50c2 = compute(tierList, [], randMap, 0, 0, [randTank]);
    if (s50c1[0][0] < s50c2[0][0]) {
        count++;
    }
}
if (count>7) {stagesPassed++;}


var stages50 = [
    { message: 'Failed', color: RED, points: 0 },
    { message: '1/5 cases passed', color: YELLOW, points: 4 },
    { message: '2/5 cases passed', color: YELLOW, points: 8 },
    { message: '3/5 cases passed', color: YELLOW, points: 12 },
    { message: '4/5 cases passed', color: YELLOW, points: 18 },
    { message: 'Passed', color: GREEN, points: 24 }
];

var stage = stages50[stagesPassed];
console.log(stage.color, stage.message);
points += stage.points;
if (stagesPassed === 5) testsPassed++;



console.log(" ");
console.log("Tests Passed: " + testsPassed + "/50");
console.log("Total Points: " + points + "/155");