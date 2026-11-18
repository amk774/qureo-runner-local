/* QUREO RUNNER local rule engine.
   This is a transparent pattern-based starter, not a universal QUREO solver. */
(function(global){
"use strict";
const rules=[
 {id:"hello",match:t=>/hello\s*world|مرحبا\s*بالعالم|اطبع\s+hello/i.test(t),
  build:l=>l==="python"?'print("Hello World")':'console.log("Hello World");',
  explain:"يستخدم أمر الطباعة لإظهار النص Hello World في نافذة الإخراج."},
 {id:"count-1-10",match:t=>/(1\s*(?:إلى|الى|لحد|حتى|-)\s*10|من\s+1\s+إلى\s+10|الأعداد.*1.*10|numbers.*1.*10)/i.test(t),
  build:l=>l==="python"?'for i in range(1, 11):\n    print(i)':'for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}',
  explain:"تبدأ الحلقة من 1 وتستمر حتى 10. في Python لا تشمل range قيمة النهاية، لذلك نستخدم 11."},
 {id:"sum-1-10",match:t=>/(مجموع|اجمع|sum).*(1.*10|من\s+1\s+إلى\s+10)|sum.*1.*10/i.test(t),
  build:l=>l==="python"?'total = sum(range(1, 11))\nprint(total)':'let total = 0;\nfor (let i = 1; i <= 10; i++) total += i;\nconsole.log(total);',
  explain:"نجمع الأعداد من 1 إلى 10 ثم نطبع الناتج، وهو 55."},
 {id:"even-1-10",match:t=>/(زوجي|الأعداد الزوجية|even).*(1.*10|من\s+1\s+إلى\s+10)/i.test(t),
  build:l=>l==="python"?'for i in range(2, 11, 2):\n    print(i)':'for (let i = 2; i <= 10; i += 2) {\n  console.log(i);\n}',
  explain:"نبدأ من 2 ونزيد بمقدار 2 في كل مرة لطباعة الأعداد الزوجية."},
 {id:"variable",match:t=>/(أنشئ|اعمل|عرّف|عرف|create|declare).*(متغير|variable).*(\d+|رقم)/i.test(t),
  build:(l,t)=>{const n=(t.match(/\d+/)||["0"])[0];return l==="python"?`value = ${n}\nprint(value)`:`let value = ${n};\nconsole.log(value);`;},
  explain:"ينشئ متغيرًا باسم value ويضع فيه القيمة الرقمية المذكورة ثم يطبعها."}
];
function solve(prompt,language){
 const t=String(prompt||"").trim();if(!t)return {ok:false,message:"اكتب نص التمرين أولًا."};
 const lang=language==="auto"?( /\bpython\b/i.test(t)?"python":"javascript"):language;
 const rule=rules.find(r=>r.match(t));
 if(!rule)return {ok:false,message:"لم أتعرف على هذا النمط بعد. لم يتم إنشاء إجابة تخمينية. أضف قاعدة مناسبة إلى js/solver-engine.js بعد مراجعة صيغة السؤال."};
 return {ok:true,language:lang,rule:rule.id,code:typeof rule.build==="function"?rule.build(lang,t):"",explanation:rule.explain};
}
global.QureoLocalSolver={solve};
})(window);