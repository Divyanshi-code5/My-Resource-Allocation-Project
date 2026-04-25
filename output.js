function goBack(){
            window.location.href="input.html";
        }
        function goHome() {
            window.location.href="index.html";
        }

    const regions = JSON.parse(localStorage.getItem("regionsData")) || [] ;
    const Resources = JSON.parse(localStorage.getItem("Resources")) || {} ;
    console.log(regions);

    
    const container = document.querySelector(".zonebox") ;
    let index=0 ;
    regions.forEach(region =>{
        let html = `
        <div class="main">
            <div class=graphbox>
                
            <div class="barbox">
                <value>${Math.round(region.percentage)}%</value>
                <div class="barfill">
                </div>
            </div>
        </div>
        <div class="zonenumber">${region.name.toUpperCase() || "unknown"}</div>
        </div>
        `;
    container.innerHTML += html ;
    });
    const colors = {
        critical :"red",
        high :"orange",
        medium :"yellow",
        low :"green"
    };
    const barFills = document.querySelectorAll(".barfill") ;
    
    barFills.forEach((barFill , index) =>{
        const region = regions[index] ;
        const bar = document.createElement("div") ;
        bar.style.width = "40px" ;
        bar.style.height = region.percentage + "%" ;
        bar.style.background = colors[region.severity] ;

        barFill.innerHTML = "";
        barFill.appendChild(bar);
    }) ;

    const allocationTable = document.querySelector(".allocationtable") ;

    regions.forEach(region =>{
        let tableBox = `
        <table>
            <tr>
                <td>${region.name.toUpperCase() || "unknown"}</td>
                <td>₹${Math.round(region.allocation)}</td>
                <td>₹${region.resources?.food || 0}</td>
                <td>₹${region.resources?.water || 0}</td>
                <td>₹${region.resources?.medical || 0}</td>
                <td>₹${region.resources?.shelter || 0}</td> 
            </tr>
        </table>
        `;
        allocationTable.innerHTML += tableBox ;
    });
    
    document.querySelector(".totalfoodbudget").innerHTML = `₹${Resources.food || 0}`;
    document.querySelector(".totalwaterbudget").innerHTML = `₹${Resources.water || 0}`;
    document.querySelector(".totalshelterbudget").innerHTML = `₹${Resources.shelter || 0}`;
    document.querySelector(".totalmedicalbudget").innerHTML = `₹${Resources.medical || 0}`;
    
    console.log(document.getElementById("map"));
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const bounds=[];

    regions.forEach(region =>{
        bounds.push([region.latitude,region.longitude]);
        let color = "green" ;

        if(region.percentage > 50){
            color="red" ;
        }
        else if(region.percentage > 25){
            color="orange" ;
        }
        else {
            color="yellow" ;
        }
        L.circle([region.latitude,region.longitude],{
            color : color ,fillColor : color,fillOpacity : 0.5 , radius : 5000
        })
        .addTo(map)
        .bindPopup(`${region.name} - ${Math.round(region.percentage)}% `) ;
        L.marker([region.latitude, region.longitude]).addTo(map)
        .bindPopup(`${region.name} - ${Math.round(region.percentage)}% `) ;
        L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
],{color:'red'}).addTo(map).bindPopup(`${region.severity}`);
    });
    map.fitBounds(bounds) ;

    

    function graphAllocation(regions){
        const contain=document.getElementById("allocationbox") ;
    contain.innerHTML = "";
    regions.forEach(r =>{
        const div = document.createElement("div") ;
        
        contain.appendChild(div) ;
    });
    regions.forEach(r =>{
        const bar = document.createElement("div");
        bar.style.width = r.percentage + "%";
        bar.style.background="blue";
        bar.style.margin = "5px" ;
        bar.style.color = "white";
        bar.innerText=`${r,name} : ${Math.round(r.percentage)}`;
        contain.appendChild(bar) ;
        });
    }



    function generateAI(regions){
        const top = regions.reduce((a,b) => a.score > b.score ? a:b);
        const severityText = {
            low : "low risk",
            medium : "moderate risk",
            high : "high risk",
            critical : "critical condition"
        };
        if(regions.length == 0){
            console.log("no data");
        }
        return {
            recommendation : `${top.name.toUpperCase()} is the highest priority region due to its ${severityText[top.severity]} and population pressure . Immediate resurce allocation required .`,
            summary : `Resources distributed based on severity and population weighting across ${regions.length} regions`,
            topRegion : top.name.toUpperCase() 
        };
    }

    const ai = generateAI(regions) ;
    document.getElementById("aiRecommendation").innerText = ai.recommendation;
    document.getElementById("topRegion").innerText = ai.topRegion;
    document.getElementById("prioritySummary").innerText = ai.summary;
    graphAllocation(regions) ;

