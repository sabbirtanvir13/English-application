const loadleeson=()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res=>res.json())
.then(json=>displaylesson(json.data));
}
const displaylesson=(leesons)=>{
console.log(leesons)
const lavelContainer=document.getElementById("label-container")
lavelContainer.innerHTML="";
for(let leeson of leesons){
    const btndiv=document.createElement("div")
    btndiv.innerHTML=`
     <button class=" btn btn-outline btn-primary"> 
    <i class="fa-solid fa-book-open"></i> Lesson - ${leeson.level_no} </button>  
    `
    lavelContainer.append(btndiv);
}
}
loadleeson()