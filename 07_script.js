function goHome(){
        window.location.href = "01_index.html" ;
    }

    document.getElementById("submitBtn").addEventListener("click",handleSubmit);

    function validateRegions(regions){
        let isValid = true ;
        const validSeverity = ["low","medium","high","critical"];

        
        regions.forEach((region,index) =>{
            const i = index+1 ;
            if(!region.name || region.name.trim() === ""){
                showError(`region${i}name`,"Enter valid name");
                isValid = false ;
            }
            if(!region.population || isNaN(region.population) || region.population <= 0){
                showError(`region${i}pop`,"Invalid population");
                isValid = false ;
            }
            if(!validSeverity.includes(region.severity.toLowerCase())){
                showError(`region${i}sev`,"Invalid severity");
                isValid = false ;
            }
            if(region.latitude === "" || isNaN(region.latitude) || region.latitude < -90 || region.latitude > 90){
                showError(`lat${i}`,"Invalid latitude");
                isValid = false ;
            }
            if(region.longitude === "" || isNaN(region.longitude) || region.longitude < -180 || region.longitude > 180){
                showError(`lng${i}`,"Invalid longitude");
                isValid = false ;
            }
        });
        return isValid ;
    }
    function getRegions() {
  const regions = [];

  for (let i = 1; i <= 5; i++) {
    const name = document.getElementById(`region${i}name`).value.trim();
    const population = Number(document.getElementById(`region${i}pop`).value);
    const severity = document.getElementById(`region${i}sev`).value;
    const latitude = document.getElementById(`lat${i}`).value;
    const longitude = document.getElementById(`lng${i}`).value;


    regions.push({
      name,
      population,
      severity,
      latitude,
      longitude
    });
  }

  return regions;
}

    function showError(id,message) {
        document.getElementById(id+"error").innerText = message ;
    }
    function handleSubmit(){
        clearErrors();
        console.log("submit clicked . ") ;

        const regions = getRegions();
        console.log("regions fetched") ;

        const isValid = validateRegions(regions);
        console.log("validation result",isValid);

        if(!isValid){
            console.log("stopped due to validation");
            return ;
        }
        console.log("valid data ", regions) ;

        displayOutput(regions);
    }
    function clearErrors(){
        document.querySelectorAll("small").forEach(el => el.innerText = "") ;
    }


    
function displayOutput(regions){

console.log(regions) ;


 const Budget = document.getElementById("budget").value ;
 const Disaster = document.getElementById("disaster").value ;

const severityWeight = {
    critical : 4, high : 3, medium : 2,low : 1} ;

    regions.forEach(region =>{
        region.weight = severityWeight[region.severity] ;
        region.score = region.population * region.weight ;
    });

    const totalScore = regions.reduce((sum,region)=>
    sum + region.score,0 );
    console.log(totalScore);

    if (totalScore == 0){
        alert("invalid input");
    }
    else {
        regions.forEach(region => {
        region.allocation = Budget * region.score /totalScore ;
        region.percentage = (region.score/totalScore)*100 ;
    })
    
    const disasterWeights = {
        Flood : {water:5 , food:4 , shelter:4 , medical:2},
        Earthquake : {water:2 , food:3 , shelter:4 , medical:5},
        Pandemic : {water:3 , food:3 , shelter:2 , medical:5},
        War : {water:4 , food:4 , shelter:3 , medical:4},
        Drought : {water:4 , food:4 , shelter:2 , medical:3},
    };
    console.log(disasterWeights);

    const needWeights = disasterWeights[Disaster] ;
    console.log("print",needWeights);
    if (!needWeights){
        console.error("Invalid disaster type") ;
    }
    else {
        const totalWeight = Object.values(needWeights).reduce((a,b) => a+b ,0) ;
        console.log("run at mid step");
    regions.forEach(region => {
        region.resources = {};
        for( let key in needWeights){
            region.resources[key] = Math.round(region.allocation * needWeights[key] / totalWeight) ;
            console.log("run at mid step");
            
        }
    }) ;
    }
    }

    const totalResources = {};
    regions.forEach(region =>{
        if(!region.resources){return ;}
        else {
            for(let key in region.resources){
            totalResources[key] = (totalResources[key] || 0) + region.resources[key] ;
        }
        }
    });
    localStorage.setItem("Resources",JSON.stringify(totalResources)) ;
    localStorage.setItem("regionsData",JSON.stringify(regions)) ; 
    
    window.location.href = "03_output.html" ;
};
    console.log("run at last step");

  