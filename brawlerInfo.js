const BRAWLER_NAMES = ["8-bit", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Chuck", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Frank", "Gale", "Gene", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Janet", "Jessie", "Kit", "Larry & Lawrie", "Leon", "Lily", "Lola", "Lou", "Maisie", "Mandy", "Max", "Meg", "Melodie", "Mico", "Moe", "Mortis", "Mr. P", "Nani", "Nita", "Otis", "Pam", "Pearl", "Penny", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shelly", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Tara", "Tick", "Willow"];
const NAMES_AND_POSITIONS = [["8-bit", 0], ["Amber", 1], ["Angelo", 2], ["Ash", 3], ["Barley", 4], ["Bea", 5], ["Belle", 6], ["Berry", 7], ["Bibi", 8], ["Bo", 9], ["Bonnie", 10], ["Brock", 11], ["Bull", 12], ["Buster", 13], ["Buzz", 14], ["Byron", 15], ["Carl", 16], ["Charlie", 17], ["Chester", 18], ["Chuck", 19], ["Clancy", 20], ["Colette", 21], ["Colt", 22], ["Cordelius", 23], ["Crow", 24], ["Darryl", 25], ["Doug", 26], ["Draco", 27], ["Dynamike", 28], ["Edgar", 29], ["El Primo", 30], ["Emz", 31], ["Eve", 32], ["Fang", 33], ["Frank", 34], ["Gale", 35], ["Gene", 36], ["Gray", 37], ["Griff", 38], ["Grom", 39], ["Gus", 40], ["Hank", 41], ["Jacky", 42], ["Janet", 43], ["Jessie", 44], ["Kit", 45], ["Larry & Lawrie", 46], ["Leon", 47], ["Lily", 48], ["Lola", 49], ["Lou", 50], ["Maisie", 51], ["Mandy", 52], ["Max", 53], ["Meg", 54], ["Melodie", 55], ["Mico", 56], ["Moe", 57], ["Mortis", 58], ["Mr. P", 59], ["Nani", 60], ["Nita", 61], ["Otis", 62], ["Pam", 63], ["Pearl", 64], ["Penny", 65], ["Piper", 66], ["Poco", 67], ["R-T", 68], ["Rico", 69], ["Rosa", 70], ["Ruffs", 71], ["Sam", 72], ["Sandy", 73], ["Shelly", 74], ["Spike", 75], ["Sprout", 76], ["Squeak", 77], ["Stu", 78], ["Surge", 79], ["Tara", 80], ["Tick", 81], ["Willow", 82]];
const GAME_MODES = ["Gem Grab", "Brawl Ball", "Bounty", "Heist", "Knockout"];
const MAPS = ["Belle's Rock 0", "Bridge Too Far 1", "Canal Grande 2", "Center Stage 3", "Double Swoosh 4", "Dueling Beetles 5", "Flaring Phoenix 6", "Goldarm Gulch 7", "Hard Rock Mine 8", "Hideout 9", "Hot Potato 10", "Kaboom Canyon 11", "Last Stop 12", "Open Business 13", "Out in the Open 14", "Parallel Plays 15", "Penalty Kick 16", "Pinball Dreams 17", "Ring of Fire 18", "Safe Zone 19", "Shooting Star 20", "Snake Prairie 21", "Triple Dribble 22", "Undermine 23"];
const MODIFIERS = ["Classic 0", "Gadgets Galore 1", "Sick Beats 2", "Quickfire 3"];
const RED = "\u001b[31m";
const YELLOW = "\u001b[33m";
const GREEN = "\u001b[32m";
const redPicks = [6, 1, 2, 5, 4, 3];
const bluePicks = [1, 6, 5, 2, 3, 4];
const blueTurns = [1, 0, 0, 1, 1, 0];
const redTurns = [0, 1, 1, 0, 0, 1];
var banList = [];
var mapNum = -1;
var firstPick = -1;
var pickList = [];

// each map is formatted as [GameMode, Amount of Water (1-5), Openness (1-5), Amount of Walls (1-5), Amount of Grass (1-5)]
const mapStats = [[4, 1, 3, 4, 2], [3, 4, 4, 1, 1], [2, 5, 2, 4, 3], [1, 1, 3, 4, 4], [0, 1, 3, 2, 4], [5, 2, 2, 4, 2], [4, 2, 4, 3, 3], [4, 2, 3, 3, 2], [0, 1, 3, 2, 4], [2, 1, 5, 3, 2], [3, 1, 2, 4, 4], [3, 4, 5, 2, 3], [0, 2, 4, 2, 3], [5, 1, 3, 5, 2], [4, 4, 5, 2, 3], [5, 3, 2, 5, 2], [1, 1, 1, 5, 2], [1, 1, 2, 4, 3], [5, 2, 4, 2, 3], [3, 4, 5, 2, 1], [2, 2, 5, 2, 1], [2, 1, 2, 2, 5], [1, 1, 2, 5, 1], [0, 1, 4, 3, 4]];

// Array of 83 ones, used for debugging 
const ones = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// Map-dependent statistics - how well each Brawler can deal with different environments - 3=excellent, 2=good, 1=fair, 0=poor
const water = [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 2, 1, 1, 0, 3, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
const range = [2, 1, 3, 0, 0, 2, 3, 0, 1, 1, 2, 3, 0, 1, 1, 2, 1, 1, 1, 2, 0, 1, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 2, 1, 0, 1, 2, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 2, 3, 0, 1, 1, 1, 2, 3, 0, 2, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0];
const grass = [1, 2, 0, 3, 0, 1, 0, 1, 2, 2, 1, 1, 3, 3, 3, 0, 1, 2, 3, 1, 3, 1, 2, 2, 2, 2, 3, 2, 0, 2, 3, 2, 1, 1, 1, 2, 2, 0, 1, 2, 1, 0, 3, 2, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 1, 1, 1, 2, 1, 3, 0, 2, 2, 3, 1, 0, 1, 0, 2, 2, 1, 0];
const walls = [1, 1, 0, 2, 3, 1, 1, 3, 3, 0, 0, 1, 2, 3, 3, 0, 1, 1, 1, 1, 3, 0, 0, 3, 1, 2, 3, 2, 3, 2, 2, 2, 0, 1, 2, 1, 1, 2, 1, 3, 1, 3, 3, 2, 2, 2, 3, 2, 2, 1, 2, 1, 0, 1, 3, 1, 3, 2, 1, 2, 0, 2, 1, 1, 1, 1, 0, 1, 2, 3, 2, 2, 2, 2, 1, 2, 3, 3, 2, 3, 1, 3, 3];

// Mode-dependent statistics - how well each Brawler performs in each competitive game mode on a 1-5 scale, with 5 being the best
const gemGrab = [4, 3, 4, 3, 2, 3, 2, 3, 3, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 1, 3, 2, 3, 4, 3, 3, 2, 3, 2, 1, 1, 4, 3, 3, 3, 4, 5, 4, 3, 2, 5, 2, 3, 4, 4, 2, 3, 4, 4, 3, 2, 2, 2, 5, 4, 2, 2, 4, 3, 4, 2, 3, 4, 5, 3, 5, 4, 2, 3, 3, 4, 5, 2, 5, 3, 4, 2, 4, 4, 4, 5, 2, 3];
const brawlBall = [2, 3, 2, 3, 5, 3, 2, 3, 4, 3, 1, 3, 3, 4, 4, 3, 3, 3, , 1, 5, 2, 3, 4, 2, 4, 3, 3, 4, 3, 4, 3, 1, 4, 4, 4, 1, 3, 4, 2, 3, 3, 4, 2, 3, 3, 5, 3, 3, 2, 1, 3, 1, 5, 3, 4, 2, 4, 4, 2, 2, 5, 4, 2, 2, 3, 2, 4, 3, 5, 3, 3, 4, 5, 4, 4, 3, 3, 5, 5, 3, 1, 3];
const heist = [4, 4, 3, 1, 5, 2, 3, 4, 3, 3, 3, 4, 4, 2, 3, 2, 3, 3, 2, 5, 4, 5, 5, 3, 5, 5, 1, 2, 5, 4, 3, 3, 3, 2, 2, 3, 1, 1, 4, 3, 1, 1, 1, 1, 4, 2, 4, 3, 3, 4, 1, 2, 2, 4, 3, 5, 3, 5, 1, 1, 3, 5, 3, 2, 2, 2, 4, 1, 2, 5, 1, 2, 3, 2, 2, 3, 3, 2, 1, 2, 3, 1, 1];
const bounty = [3, 2, 5, 1, 1, 3, 4, 2, 3, 3, 3, 4, 1, 3, 3, 5, 3, 2, 2, 1, 1, 2, 3, 2, 3, 2, 1, 2, 1, 2, 1, 1, 3, 3, 2, 2, 5, 3, 2, 4, 5, 1, 2, 3, 2, 3, 3, 4, 4, 1, 1, 1, 5, 3, 2, 2, 2, 4, 4, 3, 5, 1, 2, 1, 4, 4, 5, 1, 5, 2, 3, 3, 1, 1, 3, 2, 5, 2, 3, 3, 3, 5, 2];
const knockout = [3, 2, 4, 1, 2, 3, 4, 4, 2, 2, 3, 4, 1, 5, 3, 5, 3, 2, 3, 1, 2, 2, 3, 3, 3, 4, 1, 3, 2, 4, 1, 1, 3, 4, 2, 2, 5, 4, 1, 4, 4, 2, 2, 2, 2, 5, 4, 4, 5, 2, 1, 1, 5, 2, 3, 2, 4, 4, 4, 3, 4, 1, 1, 2, 5, 3, 5, 1, 5, 3, 1, 2, 2, 2, 2, 3, 5, 2, 2, 1, 5, 3];
const hotZone = [3, 4, 3, 2, 5, 3, 3, 5, 3, 4, 1, 2, 1, 4, 2, 4, 3, 3, 4, 3, 3, 2, 2, 3, 2, 3, 3, 4, 3, 2, 1, 3, 2, 3, 3, 5, 2, 3, 4, 2, 3, 3, 3, 3, 4, 2, 5, 3, 3, 2, 5, 2, 1, 4, 5, 1, 3, 4, 2, 2, 2, 3, 2, 3, 2, 4, 3, 4, 3, 2, 2, 3, 2, 5, 3, 3, 4, 5, 3, 4, 2, 3, 3];

// Modifier-dependent statistics - how much of an edge each Brawler gains from different modifiers, 0-3 scale (1-5 for Quickfire)
const gadget = [2, 3, 2, 2, 4, 3, 2, 4, 3, 1, 4, 4, 5, 5, 4, 3, 4, 5, 3, 1, 2, 5, 2, 3, 4, 1, 2, 5, 5, 5, 1, 4, 4, 3, 4, 2, 4, 4, 4, 3, 3, 1, 5, 4, 2, 4, 3, 3, 5, 2, 3, 3, 3, 4, 3, 4, 3, 2, 4, 2, 4, 3, 3, 5, 4, 4, 4, 3, 3, 5, 3, 3, 4, 5, 5, 3, 2, 4, 4, 5, 5, 3, 3];
const crowdControl = [0, 0, 0, 0, 1, 2, 1, 1, 1, 2, 0, 1, 1, 2, 3, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 3, 0, 2, 3, 0, 1, 3, 3, 1, 0, 1, 1, 1, 1, 2, 0, 1, 1, 0, 0, 0, 0, 3, 3, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 2, 1, 2, 2, 1, 2, 0, 1, 0, 1, 2, 1, 0];
const quickfire = [3, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 3, 0, 2, 2, 0, 0, 3, 1, 2, 0, 3, 1, 2, 2, 0, 1, 1, 2, 1, 2, 1, 0, 0, 3, 3, 0, 3, 0, 0, 0, 0, 0, 1, 0, 1, 3, 1, 3, 2, 0, 0, 3, 2, 0, 0, 2, 0, 0, 1, 0, 2, 2, 2, 1, 1, 0, 0, 3, 1, 1, 1, 0, 2, 2, 0, 0, 1, 1, 2, 0, 0];

// Brawler Classes and Sub-Classes - arrays of Brawlers that belong to certain groups

// Sharpshooters and Ranged Brawlers
const ranged = [0, 2, 5, 6, 10, 11, 15, 22, 36, 40, 52, 60, 66, 68, 69];
const snipers = [2, 5, 6, 11, 15, 52, 60, 66];
const hardHitters = [2, 5, 52, 60, 66];

// Assassins
const assassins = [10, 14, 23, 24, 29, 33, 45, 47, 48, 55, 56, 58, 72, 78];
const dashAssassins = [29, 56, 58];
const closeAssassins = [14, 25, 29, 33, 45, 48, 58, 72];

// Tanks
const tanks = [3, 8, 12, 13, 19, 25, 26, 27, 30, 34, 41, 42, 54, 55, 70, 72];
const wallTanks = [8, 14, 26, 41, 42, 48, 55];

// Anti-Tanks/Anti-Assassins
const tankCounters = [0, 5, 17, 18, 20, 21, 23, 31, 35, 38, 49, 50, 51, 61, 62, 69, 70, 74, 75, 79, 80];
const hardTankCounters = [20, 21, 35, 50, 51, 74, 79];
const antiAssassin = [12, 14, 17, 18, 20, 23, 26, 30, 34, 35, 38, 42, 50, 51, 54, 62, 63, 64, 68, 69, 70, 73, 74, 79, 80];

// Throwers
const throwers = [4, 7, 28, 39, 46, 76, 81, 82]; 

// Controllers
const controllers = [1, 9, 17, 19, 31, 35, 36, 38, 44, 50, 59, 62, 65, 73, 77];


// Miscellaneous Information about groups of Brawlers


// array of Brawlers that can break walls easily with gadget
const wallBreakGadget = [11, 22, 38]

// array of Brawlers that can break walls with super
const wallBreak = [9, 12, 18, 28, 30, 34, 39, 64, 65, 66, 71, 74, 78];

// array of squishy (<=6000HP) Brawlers (29)
const squishies = [2, 4, 5, 6, 7, 11, 15, 22, 25, 28, 32, 39, 44, 45, 46, 52, 53, 56, 56, 60, 66, 69, 71, 75, 76, 78, 79, 81, 82];

// array of healers 
const healers = [7, 15, 36, 63, 67];

// array of low DPS Brawlers
const lowDPS = [2, 7, 10, 13, 32, 36, 37, 40, 41, 43, 52, 56, 58, 59, 65, 67, 77, 78];

// how well each Brawler can scout/break grass - 3=major ability, 2=medium ability, 1=minor ability, 0=no ability
const scout = [0, 2, 0, 1, 0, 1, 0, 1, 0, 3, 0, 1, 1, 0, 3, 0, 0, 2, 1, 0, 0, 0, 2, 1, 1, 0, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1, 2, 0, 1, 2, 0, 0, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 1, 1, 1, 1, 1, 0, 0, 0, 3, 0, 0, 2, 2, 0, 0, 1, 0, 0, 3, 2, 0];

// array of single-shot Brawlers
const singleShot = [2, 5, 6, 10, 15, 17, 21, 33, 36, 37, 40, 51, 52, 66, 68, 78, 79];

// array of Brawlers with squishy pets
const pets = [17, 32, 59, 71, 80];

// array of piercing Brawlers
const pierce = [1, 4, 7, 8, 13, 14, 16, 19, 26, 27, 28, 29, 30, 31, 34, 39, 41, 42, 43, 44, 45, 46, 48, 56, 58, 61, 65, 67, 70, 72, 73, 76, 77, 80, 81, 82];

// array of piercing Brawlers that counter Spawners well
const antiPets = [1, 13, 16, 31, 34, 43, 44, 61, 65, 67, 73, 77, 80];

// array of close-range Brawlers with low DPS - countered by Tanks
const lowAndClose = [3, 7, 8, 13, 14, 19, 27, 34, 36, 37, 43, 45, 48, 55, 56, 59, 72, 73];

// array of Brawlers that rely on turrets
const turret = [44, 63, 65];

// array of Brawlers with protective Gadgets
const protect = [5, 9, 39, 43, 47, 54, 65, 75];

// array of Gem Grab mids
const mids = ones;

// array of Gem Grab lanes
const lanes = ones;

// array of Brawlers that have very high DPS against Heist safe
const heistDPS = [19, 20, 21, 22, 24, 25, 29, 38, 44, 49, 55, 57, 61, 69, 75, 80];

// array of Brawlers that shred the Heist safe - must picks
const shred = [19, 21, 22, 24, 55];

// how safe each Brawler is to pick early on in the draft, 1-5 scale
const sixthPick = [4, 4, 5, 2, 3, 5, 5, 3, 3, 5, 4, 5, 2, 3, 2, 5, 3, 4, 5, 5, 1, 3, 5, 4, 3, 2, 2, 2, 1, 1, 2, 4, 5, 2, 3, 4, 5, 3, 5, 1, 5, 2, 3, 5, 5, 3, 4, 3, 2, 5, 4, 2, 5, 5, 5, 5, 1, 5, 1, 1, 4, 4, 5, 5, 5, 5, 5, 4, 5, 5, 2, 5, 2, 5, 3, 4, 1, 1, 5, 4, 4, 3, 2];

// how well each Brawler generally performs in the current meta, 1-5 scale
const tierList = [3, 3, 4, 1, 4, 3, 3, 4, 2, 1, 1, 2, 1, 4, 2, 4, 3, 2, 5, 2, 4, 4, 2, 3, 3, 5, 1, 2, 3, 2, 1, 2, 2, 2, 4, 5, 3, 3, 2, 2, 4, 1, 2, 1, 3, 4, 4, 2, 4, 3, 2, 1, 3, 4, 4, 3, 1, 5, 4, 1, 2, 3, 2, 2, 2, 1, 4, 2, 3, 4, 2, 2, 1, 3, 2, 2, 2, 1, 4, 4, 3, 3, 2];

const tierListJan25 = [3, 4, 5, 5, 4, 2, 4, 4, 2, 1, 1, 3, 1, 5, 3, 5, 3, 1, 2, 2, 2, 3, 2, 3, 3, 5, 1, 2, 3, 1, 2, 1, 3, 1, 5, 2, 5, 4, 2, 1, 5, 1, 2, 3, 2, 3, 4, 2, 3, 3, 5, 2, 3, 5, 2, 5, 1, 2, 2, 1, 3, 4, 4, 1, 4, 5, 4, 2, 2, 4, 2, 2, 1, 4, 2, 2, 2, 2, 5, 5, 3, 3, 2];


// Functions used to generate suggestions for the best Brawlers to pick during the draft


// Helper function that checks for potential errors
function checkErrors(bans, picks) {
    for (var i=0; i<picks.length; i++) {
        for (var j=0; j<picks.length; j++) {
            if (i!=j && picks[i]==picks[j]) {
                return 0;
            }
        }
    }
    for (var i=0; i<picks.length; i++) {
        for (var j=0; j<bans.length; j++) {
            if (picks[i]==bans[j]) {
                return 0;
            }
        }
    }
    return 1;
}

// Helper function that changes ELO values of all values in an array - prevents needless writing of hundreds of for loops in modifyVals
function changeELOS(list, arr, scaleFactor) {
    for (var i=0; i<arr.length; i++) {
        list[arr[i]] *= scaleFactor;
    }
    return list;
}

// Helper function that returns the 5 largest values from an array and their corresponding indices
function five_maxes(arr) {
    let vals = [0, 0, 0, 0, 0];
    let indices = [0, 0, 0, 0, 0];
    let j=0;
    while (j<arr.length) {
        if (arr[j] >= vals[0]) {
            vals[4] = vals[3];
            vals[3] = vals[2];
            vals[2] = vals[1];
            vals[1] = vals[0];
            vals[0] = arr[j];
            indices[4] = indices[3];
            indices[3] = indices[2];
            indices[2] = indices[1];
            indices[1] = indices[0];
            indices[0] = j;
        }
        else if (arr[j] >= vals[1]) {
            vals[4] = vals[3];
            vals[3] = vals[2];
            vals[2] = vals[1];
            vals[1] = arr[j];
            indices[4] = indices[3];
            indices[3] = indices[2];
            indices[2] = indices[1];
            indices[1] = j;
        }
        else if (arr[j] >= vals[2]) {
            vals[4] = vals[3];
            vals[3] = vals[2];
            vals[2] = arr[j];
            indices[4] = indices[3];
            indices[3] = indices[2];
            indices[2] = j;
        }
        else if (arr[j] >= vals[3]) {
            vals[4] = vals[3];
            vals[3] = arr[j];
            indices[4] = indices[3];
            indices[3] = j;
        }
        else if (arr[j] >= vals[4]) {
            vals[4] = arr[j];
            indices[4] = j;
        }
        j++;
    }
    let sol = [vals, indices];
    return sol;
}

// computes the 5 best brawlers for the map given a variety of info
function compute(list, bans, map, modifier, firstPick, picks) {
    let temp = new Array(list.length);
    for (let h=0; h<list.length; h++) {
        temp[h] = list[h];
    }
    let i=0;
    temp = initialize(temp, mapStats[map], modifier);
    while (i<bans.length) {
        temp[bans[i]] = 0;
        i++;
    }
    let j=0;
    while (j<picks.length) {
        temp[picks[j]] = 0;
        j++;
    }
    var error = checkErrors(bans, picks);
    if (error==0) {
        return [[-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1]];
    }
    temp = modifyVals(temp, firstPick, picks);
    return five_maxes(temp);
}


// helper function that changes ELO values based on picked Brawlers
function modifyVals(list, firstPick, picks) {
    var turns;
    if (firstPick) {turns = blueTurns;}
    else {turns = redTurns;}
    for (var n=0; n<picks.length; n++) {
        if (turns[n]==1) {
            // Friendly Supports
            //supports that synergize with tanks (Berry, Byron, Kit, Poco)
            if (picks[n]==7 || picks[n]==15 || picks[n]==45 || picks[n]==67) {
                list = changeELOS(list, tanks, 1.4);
            }
            //supports that increase mobility (Max, Sandy) - helps Gene and tanks, hurts ranged Brawlers
            if (picks[n]==53|| picks[n]==73) {
                list[36] *= 1.5;
                list = changeELOS(list, tanks, 1.2);
                list = changeELOS(list, ranged, 0.95);
            }
            //Ruffs - super helps squishies and ranged Brawlers most, doesn't synergize well with tanks and assassins
            if (picks[n]==71) {
                list = changeELOS(list, squishies, 1.1);
                list = changeELOS(list, ranged, 1.1);
                list = changeELOS(list, tanks, 0.95);
                list = changeELOS(list, assassins, 0.95);
            }
            //Gus - shield benefits tanks + assassins most
            if (picks[n]==40) {
                list = changeELOS(list, assassins, 1.1);
                list = changeELOS(list, tanks, 1.05);
            }

            // Friendly Throwers - hurts throwers and squishies, having multiple on team is very easy to counter
            if (throwers.indexOf(picks[n]) != -1) {
                list = changeELOS(list, throwers, 0.6+(0.01*picks.length**2));
                list = changeELOS(list, squishies, 0.7+(0.012*picks.length**2));
            }

            // Friendly Low-DPS - best not to pick multiple in same comp
            if (lowDPS.indexOf(picks[n]) != -1) {
                list = changeELOS(list, lowDPS, 0.9);
                list = changeELOS(list, tankCounters, 1.05);
            }

            // Friendly Snipers - best not to pick multiple in same comp
            if (snipers.indexOf(picks[n]) != -1) {
                list = changeELOS(list, snipers, 0.9);
            }

            // Friendly Tanks - best not to pick multiple in same comp
            if (tanks.indexOf(picks[n]) != -1) {
                list = changeELOS(list, tanks, 0.75);
                var tankSyn = [7, 15, 45, 67];
                list = changeELOS(list, tankSyn, 1.3);
                list[53] *= 1.1;
                list[73] *= 1.1;
            }
        }
        else if (turns[n]==0) {
            // Amber
            if (picks[n]==1) {
                list = changeELOS(list, snipers, 1.15);
                list[24] *= 1.15;
            }

            // Rico
            if (picks[n]==69) {
                list = changeELOS(list, wallBreak, 1.2);
                list = changeELOS(list, wallBreakGadget, 1.3);
                list = changeELOS(list, throwers, 1.2);
            }

            // Gray/Mr. P, counter Throwers
            if (picks[n]==37 || picks[n]==59) {
                list = changeELOS(list, throwers, 0.85);
            }

            // Brawlers that spawn squishy pets
            if (picks[n]==17 || picks[n]==32 || picks[n]==59 || picks[n]==71 || picks[n]==80) {
                list = changeELOS(list, pierce, 1.1);
                list = changeELOS(list, antiPets, 1.15);
                list = changeELOS(list, singleShot, 0.85);
            }

            // Throwers, countered by Assassins and wall break
            if (throwers.indexOf(picks[n]) != -1) {
                list = changeELOS(list, assassins, 1.15);
                list = changeELOS(list, dashAssassins, 1.15);
                list = changeELOS(list, wallBreak, 1.1);
                list = changeELOS(list, wallBreakGadget, 1.2);
                list = changeELOS(list, turret, 0.85);
                list[37] *= 1.05;
                list[59] *= 1.05;
            }

            // Wall Break
            if (wallBreak.indexOf(picks[n]) != -1) {
                list = changeELOS(list, throwers, 0.9);
                list[69] *= 0.9;
            }
            if (wallBreakGadget.indexOf(picks[n]) != -1) {
                list = changeELOS(list, throwers, 0.9);
                list[69] *=0.95;
            }

            // Turret Brawlers (Jessie, Penny, Pam), countered by Throwers
            if (turret.indexOf(picks[n]) != -1) {
                list = changeELOS(list, throwers, 1.15);
            }

            // Long Range, countered by Hard-Hitters
            if (picks[n]==6 || picks[n]==11 || picks[n]==15 || picks[n]==21 || picks[n]==22 || picks[n]==24 || picks[n]==75) {
                list = changeELOS(list, snipers, 1.1);
                list = changeELOS(list, hardHitters, 1.05);
            }

            // Snipers that get hard-countered by Nani
            if (picks[n]==66) {
                list[60] *= 1.25;
            }
            if (picks[n]==2 || picks[n]==52) {
                list[60] *= 1.1;
            }
            if (picks[n]==68) {
                list[60] *= 1.05;
            }

            // Single-shot Brawlers
            if (singleShot.indexOf(picks[n]) != -1) {
                list = changeELOS(list, pets, 1.1);
                list = changeELOS(list, protect, 1.05);
            }

            // Piercing Brawlers
            if (pierce.indexOf(picks[n]) != -1) {
                list = changeELOS(list, pets, 0.95);
            }
            if (antiPets.indexOf(picks[n]) != -1) {
                list = changeELOS(list, pets, 0.85);
            }

            // Hard-hitting Snipers
            if (hardHitters.indexOf(picks[n]) != -1) {
                var countered = [6, 11, 15, 21, 22, 24, 75];
                list = changeELOS(list, countered, 0.9);
            }

            // Tank Counters
            if (tankCounters.indexOf(picks[n]) != -1) {
                list = changeELOS(list, tanks, 0.8);
            }
            if (hardTankCounters.indexOf(picks[n]) != -1) {
                list = changeELOS(list, tanks, 0.75);
            }

            // Tanks
            if (tanks.indexOf(picks[n]) != -1) {
                list = changeELOS(list, tankCounters, 1.2);
                list = changeELOS(list, hardTankCounters, 1.1);
                list = changeELOS(list, lowAndClose, 0.9);
            }

            // Countered by Coccoon/Shadow Realm
            if (picks[n]==19 || picks[n]==29 || picks[n]==33 || picks[n]==45 || picks[n]==55) {
                list[17] *= 1.15;
                list[23] *= 1.15;
            }

            // Close-range Assassins/Low DPS
            if (lowAndClose.indexOf(picks[n]) != -1) {
                list = changeELOS(list, tanks, 1.15);
            }

            // Bouncing Projectiles
            if (list[n]==6 || list[n]==44 | list[n]==65) {
                var countered = [0, 13, 36, 49, 63];
                list = changeELOS(list, countered, 0.9);
            }

            // Countered by Bouncing Projectiles
            if (picks[n]==0 || picks[n]==13 || picks[n]==36 || picks[n]==49 || picks[n]==63) {
                list[6] *= 1.1;
                list[44] *= 1.1;
                list[65] *= 1.05;
            }

            // Countered by Crow
            if (healers.indexOf(picks[n]) != -1 || picks[n]==53) {
                list[24] *= 1.2;
            }

            // Dashing Assassins
            if (dashAssassins.indexOf(picks[n]) != -1) {
                list = changeELOS(list, throwers, 0.5);
            }

            // Close-range Assassins
            if (closeAssassins.indexOf(picks[n]) != -1) {
                list = changeELOS(list, antiAssassin, 1.2);
            }

            // Anti-assassin
            if (antiAssassin.indexOf(picks[n]) != -1) {
                list = changeELOS(list, closeAssassins, 0.8);
            }

        }
        for (var k=0; k<list.length; k++) {
            list[k] *= (1.2 - 0.04*sixthPick[k]);
        }
    }
    return list;
}

// helper function that computes starting ELO values based on the selected map and mode
function initialize(arr, map, mod) {
    let temp = arr;
    let h = 0;
    while (h<temp.length) {
        temp[h] *= 0.125;
        temp[h]++;
        h++;
    }
    let i = 0;
    while (i<temp.length) {
        if (map[0]==0) {
            temp[i] *= (1 + (-5+gemGrab[i])/12);
        }
        if (map[0]==1) {
            temp[i] *= (1 + (-5+brawlBall[i])/12);
        }
        if (map[0]==2) {
            temp[i] *= (1 + (-5+bounty[i])/12);
        }
        if (map[0]==3) {
            temp[i] *= (1 + (-5+heist[i])/8);
            if (shred.indexOf(i) != -1) {
                temp[i] *= 1.4;
            }
        }
        if (map[0]==4) {
            temp[i] *= (1 + (-5+knockout[i])/12);
        }
        if (map[0]==5) {
            temp[i] *= (1 + (-5+hotZone[i])/10);
        }
        temp[i] *= (1 + ((map[1]-1)**2)/16 * ((water[i]**3)/100));
        temp[i] *= (1 + ((2*map[2]-5) * (range[i]-1))/40);
        temp[i] *= (1 + ((2*map[3]-5) * (walls[i]-1))/40);
        temp[i] *= (1 + ((2*map[4]-5) * (grass[i]-1))/40);
        if (map[4]>=3) {
            temp[i] *= (1 + 10*(scout[i])**2/(20*(4**(6-map[4]))));
        }
        if (map[2]>=4 && map[4]<=2) {
            temp[i] *= (1 + (range[i]-2)/10);
        }
        temp[i] *= (0.5 + 0.1*sixthPick[i]);
        i++;
    }
    let j = 0; 
    while (j<temp.length) {
        if (mod==0) {
            break;
        }
        if (mod==1) {
            temp[j] *= (1 + (-5+gadget[j])/15);
        }
        if (mod==2) {
            temp[j] *= (1 - ((crowdControl[j])**2)/15);
            if (j==0) {
                changeELOS(arr, tanks, 1.1);
                changeELOS(arr, assassins, 1.05);
                changeELOS(arr, lowDPS, 0.95);
                changeELOS(arr, snipers, 0.95);
                changeELOS(arr, throwers, 0.9);
            }
        }
        if (mod==3) {
            temp[j] *= (1 + (-3+quickfire[j])/6);
        }
        j++;
    }
    return temp;
}

module.exports = {RED, YELLOW, GREEN, gemGrab, brawlBall, heist, bounty, knockout, hotZone, crowdControl, ranged, snipers, assassins, closeAssassins, tanks, tankCounters, throwers, controllers, squishies, wallBreak, wallBreakGadget, mids, heistDPS, shred, five_maxes, changeELOS, tierList, compute};