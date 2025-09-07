const createElement=(arr)=>{
  const htmlElement=arr.map((el)=>`<span class="btn">${el}<span/>`);
  return htmlElement.join(" ");
};

const managespinner=(status)=>{
if(status==true){
  document.getElementById("spinner").classList.remove("hidden")
  document.getElementById("word-container").classList.add("hidden")
}else{
  document.getElementById("spinner").classList.add("hidden")
  document.getElementById("word-container").classList.remove("hidden")
}
}

const loadleeson=()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res=>res.json())
.then(json=>displaylesson(json.data));
}
const removeActive=()=>{
    const lessonButton=document.querySelectorAll(".lesson-btn")
    lessonButton.forEach((btn)=>btn.classList.remove("active"));
}
const loadlabelword=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
     fetch(url)
     .then(res=>res.json())
     .then(data=>{
       
       removeActive()
        const clickbtn=document.getElementById(`lesson-btn-${id}`);
        console.log(clickbtn)
        clickbtn.classList.add("active")
        displaylableword(data.data);
     })
}
const loadwordDetail= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    const res= await fetch(url);
    const detalis=await res.json();
    displaylabledatils(detalis.data)
}
const displaylabledatils=(word)=>{
const datilesbox=document.getElementById("datils-container")
datilesbox.innerHTML=`
 <div class="">
    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i> ${word.pronunciation}</h2>
  </div>
  <div class="">
    <h2 class="text-[18px] font-bold">Meaning</h2>
    <p class="text-[24px]">${word.meaning}</p>
  </div>
  <div class="">
    <h2 class="text-[18px] font-bold">Example</h2>
    <p class="text-[24px]">${word.sentence}</p>
  </div>
  <div class=""${word.synonyms}>
    <h2 class="text-[18px] font-bold">সমার্থক শব্দ গুলো</h2>
  <span class="btn1 "></span>
  <span class="btn2"></span>
  <span class="btn2"></span>
  </div>
`
document.getElementById("word_modal").showModal();
}

  const displaylableword=(words)=>{
 const wordContainer=document.getElementById("word-container")
  wordContainer.innerHTML="";
  if(words.length==0){
  wordContainer.innerHTML=`
 
 <div class="text-center col-span-full rounded-xl space-y-6">
  <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-[34.31px]">নেক্সট Lesson এ যান।</h2>
  </div>
 `
    return;
}
words.forEach((word) => {
    console.log(word)
  const card =document.createElement("div");
  card.innerHTML=`
  <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 ">
  <h2 class="font-bold text-[32px]">${word.word ? word.word:"শব্দ পাওয়া যায় নি"}</h2>
  <p class="text-[20px] ">Meaning /Pronounciation</p>
  <div class="font-semibold text-[32px]">"${word.meaning}/ ${word.pronunciation}"</div>
  <div class="flex justify-between items-center">
  <button onclick="loadwordDetail(${word.id})" class="bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info" > </i></button>
  <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
  </div>
  </div>
  `  
  wordContainer.append(card)
});
}
const displaylesson=(leesons)=>{

const lavelContainer=document.getElementById("label-container")
lavelContainer.innerHTML="";
for(let leeson of leesons){
    const btndiv=document.createElement("div")
    btndiv.innerHTML=`
     <button id="lesson-btn-${leeson.level_no}" onclick = "loadlabelword(${leeson.level_no})" class=" btn btn-outline btn-primary lesson-btn"> 
    <i class="fa-solid fa-book-open"></i> Lesson - ${leeson.level_no} </button>  
    `
    lavelContainer.append(btndiv);
}
}
loadleeson()

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase(); 
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data =>{
      const allword=data.data
      console.log(allword)
      const filterwords=allword.filter((word)=>{
       return word.word.toLowerCase().includes(searchValue)
       
      })
     displaylableword(filterwords)
    }); 

});
