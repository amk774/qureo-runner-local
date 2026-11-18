(function(){
const prompt=document.getElementById("prompt"),language=document.getElementById("language");
const solveBtn=document.getElementById("solve"),status=document.getElementById("status");
const answer=document.getElementById("answer"),code=document.getElementById("code"),explanation=document.getElementById("explanation");
solveBtn.addEventListener("click",()=>{
 const result=QureoLocalSolver.solve(prompt.value,language.value);
 answer.hidden=true;status.hidden=false;
 if(!result.ok){status.className="empty";status.textContent=result.message;return;}
 status.hidden=true;answer.hidden=false;code.textContent=result.code;explanation.textContent=result.explanation;
});
document.getElementById("copy").addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(code.textContent);document.getElementById("copy").textContent="تم النسخ";}
 catch(e){document.getElementById("copy").textContent="تعذر النسخ من المتصفح";}
});
})();