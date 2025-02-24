const mapDict = {
    "Belle's Rock": 0, "Bridge Too Far": 1, "Canal Grande": 2, "Center Stage": 3,
    "Double Swoosh": 4, "Dueling Beetles": 5, "Flaring Phoenix": 6, "Goldarm Gulch": 7,
    "Hard Rock Mine": 8, "Hideout": 9, "Hot Potato": 10, "Kaboom Canyon": 11,
    "Last Stop": 12, "Open Business": 13, "Out in the Open": 14, "Parallel Plays": 15,
    "Penalty Kick": 16, "Pinball Dreams": 17, "Ring of Fire": 18, "Safe Zone": 19,
    "Shooting Star": 20, "Snake Prairie": 21, "Triple Dribble": 22, "Undermine": 23
}

const modDict = {"Classic": 0, "Gadgets Galore": 1, "Sick Beats": 2, "Quickfire": 3}

const brawlers = ["8Bit", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Chuck", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "Primo", "Emz", "Eve", "Fang", "Frank", "Gale", "Gene", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Janet", "Jessie", "Kit", "Larry", "Leon", "Lily", "Lola", "Lou", "Maisie", "Mandy", "Max", "Meg", "Melodie", "Mico", "Moe", "Mortis", "MrP", "Nani", "Nita", "Otis", "Pam", "Pearl", "Penny", "Piper", "Poco", "RT", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shelly", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Tara", "Tick", "Willow"];


function doThings(banNum) {
    if (banNum<30) {
        return banNum;
    }
    if (banNum>=30 && banNum<44) {
        return banNum+1;
    }
    if (banNum>44 && banNum<68) {
        return banNum;
    }
    if (banNum==68) {
        return 30;
    }
    if (banNum==69 || banNum==70) {
        return banNum;
    }
    if (banNum==71) {
        return 68;
    }
    if (banNum>71) {
        return banNum-1;
    }
}

function lookupImage(num) {
    var image = document.getElementById("ban" + num).src;
    image = image.split("Icons/")[1];
    image = image.replace(".png", "");
    if (image=="Default") {
        return -1;
    }
    return brawlers.indexOf(image);
}

function changeImage(brawlerNum) {
    var banNum = 1;
    while (banNum<7) {
        var image = document.getElementById("ban" + banNum);
        if (image.getAttribute('src') != "Icons/Default.png") {
            banNum++;
        }
        else {
            break;
        }
    }
    if (banNum==7) {
        return;
    }
    document.getElementById("ban" + banNum).src = "Icons/" + brawlers[doThings(brawlerNum)] + ".png";
    var newNum = doThings(brawlerNum);
    for (var j=1; j<7; j++) {
        var sndImage = document.getElementById("ban" + j);
        if (j!=banNum && image.getAttribute('src') == sndImage.getAttribute('src')) {
            document.getElementById("ban" + banNum).src = "Icons/Default.png";
            return;
        }
    }
    banList.push(newNum);
}

function changeDraft(brawlerNum) {
    for (var l=0; l<banList.length; l++) {
        if (banList[l] == doThings(brawlerNum)) {
            return;
        }
    }
    var count = 0;
    var i = 1;
    var imageNum = 0;
    while (i<7) {
        var image = document.getElementById("pick" + i);
        if (image.getAttribute('src') != "Icons/Blue.png" && image.getAttribute('src') != "Icons/Red.png") {
            count++;
        }
        i++;
    }
    if (count==6) {
        return;
    }
    if (firstPick) {
        imageNum = bluePicks[count];
    }
    else {
        imageNum = redPicks[count];
    }
    var image = document.getElementById("pick" + imageNum);
    document.getElementById("pick" + imageNum).src = "Icons/" + brawlers[doThings(brawlerNum)] + ".png";
    var newNum = doThings(brawlerNum);
    for (var j=1; j<7; j++) {
        var sndImage = document.getElementById("pick" + j);
        if (j!=imageNum && image.getAttribute('src') == sndImage.getAttribute('src')) {
            if (imageNum<4) {
                document.getElementById("pick" + imageNum).src = "Icons/Blue.png";
            }
            else {
                document.getElementById("pick" + imageNum).src = "Icons/Red.png";
            }
            return;
        }
    }
    pickList.push(newNum);
    callCompute();
}

function removeBan(num) {
    var n = lookupImage(num);
    var image = document.getElementById("ban" + num);
    image.src = "Icons/Default.png";
    if (n != -1) {
        var index = banList.indexOf(n);
        if (index != -1) {
            banList.splice(index, 1);
        }
    }
}

function resetBans() {
    for (var i=1; i<7; i++) {
        document.getElementById("ban" + i).src = "Icons/Default.png";
    }
    banList = [];
}

function checkContinue() {
    var map = document.getElementById("maps");
    var mapOption = map.options[map.selectedIndex];
    if (mapOption.disabled) {
        document.getElementById("error-message").innerHTML = "Please select a map to continue.";
        return;
    }
    var modifier = document.getElementById("modifiers");
    var modOption = modifier.options[modifier.selectedIndex];
    if (modOption.disabled) {
        document.getElementById("error-message").innerHTML = "Please select a modifier to continue.";
        return;
    }
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("banned-brawlers").hidden="hidden";
    document.getElementById("picked-brawlers").removeAttribute("hidden");
    document.getElementById("pick-selections").removeAttribute("hidden");
    document.getElementById("suggestions").removeAttribute("hidden");
    document.getElementById("left-3").removeAttribute("hidden");
    document.getElementById("draft").removeAttribute("hidden");
    document.getElementById("game-info").hidden="hidden";
    document.getElementById("bottom-box").hidden="hidden";
    document.getElementById("left").hidden="hidden";
    document.getElementById("left-2").hidden="hidden";
    document.getElementById("error-box").hidden="hidden";
    callCompute();
}

function callCompute() {
    var map = document.getElementById("maps").value;
    var mod = document.getElementById("modifiers").value;
    var mapNum = mapDict[map];
    var modNum = modDict[mod];
    firstPick = !document.getElementById("switch").checked;
    var suggestions = compute(tierListJan25, banList, mapNum, modNum, firstPick, pickList);
    for (var i=0; i<5; i++) {
        var banNum = i+1;
        document.getElementById("suggestions" + banNum).src = "Icons/" + brawlers[suggestions[1][i]] + ".png";
    }
    var maxScore = suggestions[0][0];
    var scores = [0, 0, 0, 0];
    scores[0] = Math.round(100*(suggestions[0][1])/maxScore);
    scores[1] = Math.round(100*(suggestions[0][2])/maxScore);
    scores[2] = Math.round(100*(suggestions[0][3])/maxScore);
    scores[3] = Math.round(100*(suggestions[0][4])/maxScore);
    for (var i=0; i<4; i++) {
        var c = i+2;
        if (scores[i]>=90) {
            document.getElementById("scores"+c).style.backgroundColor = "gold";
        }
        else if (scores[i]>=80) {
            document.getElementById("scores"+c).style.backgroundColor = "silver";
        }
        else if (scores[i]>=70) {
            document.getElementById("scores"+c).style.backgroundColor = "sandybrown";
        }
        else {
            document.getElementById("scores"+c).style.backgroundColor = "green";
        }
    }
    document.getElementById("score1").innerHTML = 100;
    document.getElementById("score2").innerHTML = scores[0];
    document.getElementById("score3").innerHTML = scores[1];
    document.getElementById("score4").innerHTML = scores[2];
    document.getElementById("score5").innerHTML = scores[3];
}

function resetDraft() {
    var i = 1;
    while (i<4) {
        document.getElementById("pick" + i).src = "Icons/Blue.png";
        i++;
    }
    while (i<7) {
        document.getElementById("pick" + i).src = "Icons/Red.png";
        i++;
    }
    pickList = [];
    callCompute();
}