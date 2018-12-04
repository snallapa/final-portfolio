const svg = document.getElementById('svg');
const svgns = "http://www.w3.org/2000/svg"
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var myReuseableStylesheet = document.createElement('style'),
    addKeyFrames = null;
    myReuseableStylesheet.appendChild(document.createTextNode(""));
document.head.appendChild( myReuseableStylesheet );
// we can safely assume that the browser supports unprefixed version.
addKeyFrames = function(name, frames){
    myReuseableStylesheet.innerHTML +=  "@keyframes " + name + "{" + frames + "}\n"
}
const colors = ["#FFCDD2", "#F8BBD0", "#E1BEE7", 
"#3F51B5","#1E88E5", "#00897B", "#4CAF50", "#F57C00", "#A1887F"]
const seconds = 15
function drawCircles(lower, limit, delay) {

    numberCircles = getRandomInt(limit - lower) + limit
    for (let i = 0; i < numberCircles; i++) {
        const circle = document.createElementNS(svgns, 'circle');
        radius = getRandomInt(25)
        x = getRandomInt(window.innerWidth - radius)
        y = getRandomInt(window.innerHeight - radius)
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', radius);
        getRandomInt(colors.length)
        circle.setAttributeNS(null, 'fill', colors[getRandomInt(colors.length)]);
        circle.setAttributeNS(null, 'filter', "url(#blur)");
        newX = getRandomInt(400) - 200;
        newY = getRandomInt(400) - 200;
        addKeyFrames(
            `translate-${i}`,
            `0%{transform: translate(0);opacity:0;}
            10%{opacity:.06;}
            90%{opacity:.06;}
            100%{transform:translate(${newX}px, ${newY}px);opacity:0;}`
        );
        circle.style.animationTimingFunction = 'linear';
        circle.style.animationDuration = `${seconds}s`;
        circle.style.animationDelay = `${delay}s`
        circle.style.animationName = `translate-${i}`;
        svg.appendChild(circle);
    }
}
drawCircles(40,80, 3)
setInterval(function () {
    myReuseableStylesheet.innerHTML = "";
    while (svg.childElementCount > 2) {
        svg.removeChild(svg.lastChild);
    }
    drawCircles(40,80, 1)
}, (seconds+5) * 1000)