const courses = [
  {code:"MTH101",title:"Engineering Mathematics I",credits:4,difficulty:"Beginner",semester:1,prerequisites:[],tags:["Mathematics","Calculus"]},
  {code:"PHY101",title:"Engineering Physics",credits:4,difficulty:"Beginner",semester:1,prerequisites:[],tags:["Physics","Mechanics"]},
  {code:"CS101",title:"Problem Solving & Programming",credits:4,difficulty:"Beginner",semester:1,prerequisites:[],tags:["C","Programming","Logic"]},
  {code:"ENG101",title:"English for Engineers",credits:2,difficulty:"Beginner",semester:1,prerequisites:[],tags:["Communication","Writing"]},
  {code:"ME101",title:"Engineering Graphics",credits:3,difficulty:"Beginner",semester:1,prerequisites:[],tags:["CAD","Design"]},
  {code:"MTH102",title:"Engineering Mathematics II",credits:4,difficulty:"Beginner",semester:2,prerequisites:["MTH101"],tags:["Mathematics","Linear Algebra"]},
  {code:"CHE101",title:"Engineering Chemistry",credits:4,difficulty:"Beginner",semester:2,prerequisites:[],tags:["Chemistry","Materials"]},
  {code:"CS102",title:"Object-Oriented Programming",credits:4,difficulty:"Intermediate",semester:2,prerequisites:["CS101"],tags:["Java","OOP","Classes"]},
  {code:"CS103",title:"Digital Logic & Systems",credits:3,difficulty:"Beginner",semester:2,prerequisites:[],tags:["Logic","Hardware"]},
  {code:"EEE101",title:"Basic Electrical Engineering",credits:3,difficulty:"Beginner",semester:2,prerequisites:[],tags:["Circuits","Electrical"]},
  {code:"MTH201",title:"Discrete Mathematics",credits:4,difficulty:"Intermediate",semester:3,prerequisites:["MTH102"],tags:["Logic","Graphs","Sets"]},
  {code:"CS201",title:"Data Structures",credits:4,difficulty:"Intermediate",semester:3,prerequisites:["CS102"],tags:["Arrays","Trees","Algorithms"]},
  {code:"CS202",title:"Computer Organization",credits:3,difficulty:"Intermediate",semester:3,prerequisites:["CS103"],tags:["CPU","Architecture","Memory"]},
  {code:"CS203",title:"Database Management Systems",credits:4,difficulty:"Intermediate",semester:3,prerequisites:["CS102"],tags:["SQL","Databases","ER"]},
  {code:"CS204",title:"Web Technologies I",credits:3,difficulty:"Intermediate",semester:3,prerequisites:["CS102"],tags:["HTML","CSS","JavaScript"]},
  {code:"CS205",title:"Python Programming",credits:3,difficulty:"Beginner",semester:3,prerequisites:["CS101"],tags:["Python","Scripting","Pandas"]},
  {code:"MTH202",title:"Probability & Statistics",credits:4,difficulty:"Intermediate",semester:4,prerequisites:["MTH102"],tags:["Statistics","Probability"]},
  {code:"CS301",title:"Design & Analysis of Algorithms",credits:4,difficulty:"Advanced",semester:4,prerequisites:["CS201","MTH201"],tags:["Algorithms","Complexity","DP"]},
  {code:"CS302",title:"Operating Systems",credits:4,difficulty:"Advanced",semester:4,prerequisites:["CS201","CS202"],tags:["Processes","Threads","Linux"]},
  {code:"CS303",title:"Computer Networks",credits:4,difficulty:"Intermediate",semester:4,prerequisites:["CS202"],tags:["TCP/IP","Protocols","Networks"]},
  {code:"CS304",title:"Software Engineering",credits:3,difficulty:"Intermediate",semester:4,prerequisites:["CS203"],tags:["Agile","Testing","UML"]},
  {code:"CS305",title:"Web Technologies II",credits:3,difficulty:"Intermediate",semester:4,prerequisites:["CS204","CS203"],tags:["React","APIs","Node.js"]},
  {code:"CS306",title:"Linear Algebra for Computing",credits:3,difficulty:"Intermediate",semester:4,prerequisites:["MTH102"],tags:["Vectors","Matrices","ML"]},
  {code:"CS401",title:"Machine Learning",credits:4,difficulty:"Advanced",semester:5,prerequisites:["CS205","MTH202","CS306"],tags:["ML","Regression","Classification"]},
  {code:"CS402",title:"Artificial Intelligence",credits:4,difficulty:"Advanced",semester:5,prerequisites:["CS301","MTH201"],tags:["AI","Search","Heuristics"]},
  {code:"CS403",title:"Cloud Computing",credits:3,difficulty:"Advanced",semester:5,prerequisites:["CS302","CS303"],tags:["Cloud","Docker","AWS"]},
  {code:"CS404",title:"Full-Stack Development",credits:4,difficulty:"Advanced",semester:5,prerequisites:["CS305","CS203"],tags:["React","Express","MongoDB"]},
  {code:"CS405",title:"Data Visualization",credits:3,difficulty:"Intermediate",semester:5,prerequisites:["CS205","MTH202"],tags:["Charts","Dashboards","D3"]},
  {code:"CS406",title:"Cybersecurity Fundamentals",credits:3,difficulty:"Intermediate",semester:5,prerequisites:["CS303","CS302"],tags:["Security","Cryptography","Network"]},
  {code:"CS501",title:"Deep Learning",credits:4,difficulty:"Advanced",semester:6,prerequisites:["CS401"],tags:["Neural Networks","TensorFlow","AI"]},
  {code:"CS502",title:"Natural Language Processing",credits:4,difficulty:"Advanced",semester:6,prerequisites:["CS401","CS402"],tags:["NLP","Text","Transformers"]},
  {code:"CS503",title:"Big Data Analytics",credits:4,difficulty:"Advanced",semester:6,prerequisites:["CS401","CS203"],tags:["Spark","Hadoop","Data"]},
  {code:"CS504",title:"Mobile Application Development",credits:3,difficulty:"Advanced",semester:6,prerequisites:["CS305"],tags:["Android","React Native","Mobile"]},
  {code:"CS505",title:"DevOps Engineering",credits:3,difficulty:"Advanced",semester:6,prerequisites:["CS403","CS304"],tags:["CI/CD","Git","Docker"]},
  {code:"CS506",title:"Blockchain Technology",credits:3,difficulty:"Advanced",semester:6,prerequisites:["CS301","CS406"],tags:["Blockchain","Smart Contracts","Web3"]},
  {code:"CS601",title:"Capstone Project I",credits:6,difficulty:"Advanced",semester:7,prerequisites:["CS404","CS304"],tags:["Project","Teamwork","Industry"]},
  {code:"CS602",title:"Generative AI",credits:4,difficulty:"Advanced",semester:7,prerequisites:["CS501","CS502"],tags:["LLM","Generative AI","Prompting"]},
  {code:"CS603",title:"Industrial Training",credits:6,difficulty:"Advanced",semester:8,prerequisites:["CS601"],tags:["Internship","Industry","Practice"]},
  {code:"CS604",title:"Capstone Project II",credits:8,difficulty:"Advanced",semester:8,prerequisites:["CS601"],tags:["Project","Research","Presentation"]}
];

const defaultProfile = {name:"Alex Kumar",branch:"CSE",semester:"1st Semester",experience:"Beginner",career:"Full-Stack Web"};
let profile = load("skillsprout_profile") || defaultProfile;
let state = load("skillsprout_state") || {enrolled:{},completed:{},activeSemester:1};
let currentSemester = state.activeSemester || 1;
let toastTimer;

function load(key){ try{return JSON.parse(localStorage.getItem(key));}catch(e){return null;} }
function save(){ localStorage.setItem("skillsprout_profile",JSON.stringify(profile)); localStorage.setItem("skillsprout_state",JSON.stringify(state)); }

function topologicalSort(items){
  const indegree = new Map(items.map(c=>[c.code, c.prerequisites.filter(p=>items.some(i=>i.code===p)).length]));
  const dependents = new Map(items.map(c=>[c.code,[]]));
  items.forEach(c=>c.prerequisites.forEach(p=>{if(dependents.has(p))dependents.get(p).push(c.code);}));
  const queue = items.filter(c=>indegree.get(c.code)==0).map(c=>c.code);
  const result=[];
  while(queue.length){const code=queue.shift();result.push(items.find(c=>c.code==code));dependents.get(code).forEach(d=>{indegree.set(d,indegree.get(d)-1);if(indegree.get(d)==0)queue.push(d);});}
  if(result.length!==items.length) return {valid:false,order:[]};
  return {valid:true,order:result};
}

function isUnlocked(course){
  return course.prerequisites.every(code=>state.completed[code]);
}
function hasStarted(course){return state.enrolled[course.code];}
function courseStatus(course){
  if(state.completed[course.code]) return "complete";
  if(hasStarted(course)) return "enrolled";
  if(isUnlocked(course)) return "unlocked";
  return "locked";
}

function init(){
  applyProfile();
  bindEvents();
  renderAll();
  if(!load("skillsprout_profile")) openModal();
}

function applyProfile(){
  const firstName=profile.name?.trim().split(" ")[0] || "Alex";
  document.getElementById("studentName").textContent=profile.name;
  document.getElementById("studentBranch").textContent=`${profile.branch} · ${profile.semester}`;
  document.querySelector(".profile-avatar").textContent=getInitials(profile.name);
  document.querySelector(".avatar").textContent=getInitials(profile.name);
  document.getElementById("greetingName").textContent=firstName;
  document.getElementById("intakeName").value=profile.name;
  document.getElementById("intakeBranch").value=profile.branch;
  document.getElementById("intakeSemester").value=profile.semester;
}
function getInitials(name){return name.split(" ").filter(Boolean).slice(0,2).map(n=>n[0].toUpper()).join("") || "AK";}

function bindEvents(){
  document.querySelectorAll(".nav-item[data-view]").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.view)));
  document.querySelectorAll("[data-view-link]").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.viewLink)));
  document.getElementById("menuButton").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
  document.getElementById("editProfileButton").addEventListener("click",openModal);
  document.getElementById("profileButton").addEventListener("click",openModal);
  document.getElementById("topProfileButton").addEventListener("click",openModal);
  document.getElementById("closeModal").addEventListener("click",closeModal);
  document.getElementById("onboardingModal").addEventListener("click",e=>{if(e.target.id==="onboardingModal")closeModal();});
  document.querySelectorAll(".next-step").forEach(btn=>btn.addEventListener("click",()=>changeStep(1)));
  document.querySelectorAll(".prev-step").forEach(btn=>btn.addEventListener("click",()=>changeStep(-1)));
  document.getElementById("intakeForm").addEventListener("submit",submitProfile);
  document.getElementById("courseSearch").addEventListener("input",debounce(renderCatalog,180));
  document.getElementById("difficultyFilter").addEventListener("change",renderCatalog);
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLower()=="k"){e.prevent();switchView("catalog");document.getElementById("courseSearch").focus();}});
  document.getElementById("exportRoadmap").addEventListener("click",exportRoadmap);
}
function debounce(fn,wait){let timer;return(...args)=>{clearTimeout(timer);timer=setTimeout(()=>fn(...args),wait);};}

function switchView(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById(view+"View").classList.add("active");
  document.queryList?.();
  document.querySelectorAll(".nav-item[data-view]").forEach(n=>n.classList.toggle("active",n.dataset.view===view));
  document.getElementById("sidebar").classList.remove("open");
  if(view==="catalog") document.getElementById("courseSearch").focus();
}

function openModal(){document.getElementById("onboardingModal").classList.add("open");changeStep(0,1);}
function closeModal(){document.getElementById("onboardingModal").classList.remove("open");}
function changeStep(delta,forced){
  const steps=[...document.querySelectorAll(".intake-step")];
  let current=steps.findIndex(s=>s.classList.contains("active"));
  const next=forced||Math.max(0,Math.min(steps.length-1,current+delta));
  steps.forEach((s,i)=>s.classList.toggle("active",i===next));
  document.querySelectorAll(".step-indicator span").forEach((s,i)=>s.classList.toggle("active",i<=next));
}
function submitProfile(e){
  e.preventDefault();
  const data=new FormData(e.target);
  profile={name:data.get("name").trim(),branch:data.get("branch"),semester:data.get("semester"),experience:data.get("experience"),career:data.get("career")};
  save();applyProfile();closeModal();renderAll();
  showToast("Roadmap created","Courses are matched to your goals.");
}

function renderAll(){
  renderTabs();
  renderDashboardRoadmap();
  renderProgress();
  renderStats();
  renderRecommendations();
  renderFullRoadmap();
  renderCatalog();
  renderGroups();
}

function semesterCourses(semester){return courses.filter(c=>c.semester===semester);}
function renderTabs(){
  const semesters=[1,2,3,4,5,6,7,8];
  const html=semesters.map(s=>`<button class="semester-tab ${s===currentSemester?"active":""}" data-semester="${s}">Semester ${s}</button>`).join("");
  document.getElementById("semesterTabs").innerHTML=html;
  document.getElementById("fullSemesterTabs").innerHTML=html;
  document.querySelectorAll(".semester-tab").forEach(btn=>btn.addEventListener("click",()=>{
    currentSemester=Number(btn.dataset.semester);state.activeSemester=currentSemester;save();
    renderTabs();renderDashboardRoadmap();renderProgress();renderFullRoadmap();
  }));
}

function renderDashboardRoadmap(){
  const items=topologicalSort(semesterCourses(currentSemester)).order;
  document.getElementById("dashboardRoadmap").innerHTML=items.slice(0,5).map(c=>{
    const status=courseStatus(c);
    const icon=status==="complete"?"✓":status==="locked"?"−":"";
    const label=status==="complete"?"Completed":status==="locked"?"Locked":status==="enrolled"?"Enrolled":"Unlocked";
    return `<div class="roadmap-row">
      <div class="course-status-dot ${status==="unlocked"?"enrolled":status}">${icon}</div>
      <div class="roadmap-row-info"><strong>${c.code} — ${c.title}</strong><span>${c.credits} credits · ${c.difficulty}</span></div>
      <span class="status-pill ${status==="unlocked"?"unlocked":""}">${label}</span>
    </div>`;
  }).join("") || '<p class="catalog-meta">No courses planned for this semester.</p>';
}

function renderProgress(){
  const items=semesterCourses(currentSemester);
  const totalCredits=items.reduce((s,c)=>s+c.credits,0);
  const completed=items.filter(c=>state.completed[c.code]);
  const completedCredits=completed.reduce((s,c)=>s+c.credits,0);
  const percent=totalCredits?Math.round(completedCredits/totalCredits*100):0;
  document.getElementById("progressPercent").textContent=percent+"%";
  document.getElementById("progressRing").style.setProperty("--progress",percent*3.6+"deg");
  document.getElementById("courseProgress").textContent=`${completed.length} / ${items.length}`;
  document.getElementById("creditProgress").textContent=`${completedCredits} / ${totalCredits}`;
}
function renderStats(){
  const allEnrolled=Object.keys(state.enrolled).filter(code=>state.enrolled[code]);
  const completed=Object.keys(state.completed).filter(code=>state.completed[code]);
  const completedCredits=completed.reduce((sum,code)=>sum+(courses.find(c=>c.code===code)?.credits||0),0);
  const semester=semesterCourses(currentSemester);
  const totalCredits=semester.reduce((sum,c)=>sum+c.credits,0);
  const studyHours=allEnrolled.reduce((sum,code)=>{const c=courses.find(x=>x.code===code);return sum+(c?.difficulty==="Advanced"?6:c?.difficulty==="Intermediate"?4:3);},0);
  document.getElementById("creditsCompleted").textContent=completedCredits;
  document.getElementById("totalCredits").textContent=totalCredits;
  document.getElementById("enrolledCount").textContent=allEnrolled.length;
  document.getElementById("studyHours").textContent=studyHours;
}

function recommendedCourses(){
  const careerTags={
    "Full-Stack Web":["React","APIs","Node.js","HTML","CSS","JavaScript","Express","MongoDB"],
    "Data Science":["Python","Pandas","Statistics","Data","ML","Regression"],
    "AI / ML":["AI","ML","Neural Networks","TensorFlow","Python","Linear Algebra"],
    "Core Engineering":["Logic","Circuits","Materials","Mechanics","Architecture"]
  };
  const tags=careerTags[profile.career]||careerTags["Full-Stack Web"];
  return courses
    .filter(c=>c.semester<=4)
    .sort((a,b)=>{
      const scoreA=a.tags.filter(t=>tags.includes(t)).length;
      const scoreB=b.tags.filter(t=>tags.includes(t)).length;
      return scoreB-scoreA;
    })
    .slice(0,3);
}

function renderRecommendations(){
  document.getElementById("recommendations").innerHTML=recommendedCourses().map(courseCard).join("");
  bindCourseCards();
}

function courseCard(c){
  const status=courseStatus(c);
  const progress=status==="complete"?100:status==="enrolled"?60:0;
  return `<article class="course-card">
    <div class="course-card-head"><span class="course-code">${c.code}</span><span class="difficulty ${c.difficulty.toLowerCase()}">${c.difficulty}</span></div>
    <h3>${c.title}</h3>
    <div class="course-card-meta"><span>${c.credits} credits</span><div class="mini-progress"><span style="width:${progress}%"></span></div></div>
  </article>`;
}

function renderFullRoadmap(){
  const items=semesterCourses(currentSemester);
  const sorted=topologicalSort(items).valid?topologicalSort(items).order:[...items];
  document.getElementById("fullRoadmap").innerHTML=sorted.length?`<article class="timeline-card">
    <h3>Semester ${currentSemester} · ${sorted.reduce((sum,c)=>sum+c.credits,0)} credits</h3>
    ${sorted.map(c=>{
      const status=courseStatus(c);
      const icon=status==="complete"?"✓":status==="enrolled"?"•":"";
      const canEnroll=status==="unlocked";
      const label=status==="complete"?"Completed":status==="enrolled"?"Enrolled":isUnlocked(c)? "Enroll":"Locked";
      return `<div class="timeline-course">
        <span class="course-status-dot ${status==="unlocked"?"enrolled":status}">${icon}</span>
        <div class="timeline-course-info"><strong>${c.code} — ${c.title}</strong><small>${c.credits} credits · ${c.prerequisites.length?c.prerequisites.join(", ")+" required":"No prerequisites"}</small></div>
        <button class="enroll-button ${status==="enrolled"||status==="complete"?"enrolled":""}" data-action="${status==="enrolled"?"complete":status==="complete"?"none":"enroll"}" data-code="${c.code}" ${status==="locked"||status==="complete"?"disabled":""}>${label}</button>
      </div>`;
    }).join("")}
  </article>`:'<p class="catalog-meta">No courses planned for this semester.</p>';
  document.querySelectorAll(".enroll-button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(btn.dataset.action==="enroll") enrollCourse(btn.dataset.code);
      if(btn.dataset.action==="complete") completeCourse(btn.dataset.code);
    });
  });
}

function renderCatalog(){
  const query=document.getElementById("courseSearch").value.trim().toLower();
  const difficulty=document.getElementById("difficultyFilter").value;
  const filtered=courses.filter(c=>{
    const matchesQuery=!query||[c.code,c.title,...c.tags,String(c.credits)].join(" ").toLower().includes(query);
    const matchesDifficulty=difficulty==="all"||c.difficulty===difficulty;
    return matchesQuery&&matchesDifficulty;
  });
  document.getElementById("catalogCount").textContent=`${filtered.length} course${filtered.length===1?"":"s"} found`;
  document.getElementById("catalogGrid").innerHTML=filtered.length?filtered.map(c=>{
    const status=courseStatus(c);
    return `<article class="course-card" data-code="${c.code}">
      <div class="course-card-head"><span class="course-code">${c.code}</span><span class="difficulty ${c.difficulty.toLowerCase()}">${c.difficulty}</span></div>
      <h3>${c.title}</h3>
      <div class="course-card-meta"><span>${c.credits} credits · Sem ${c.semester}</span><span class="${status==="locked"?"":"text-button"}">${status==="complete"?"✓ Completed":status==="enrolled"?"Enrolled":status==="unlocked"?"Available":"Locked"}</span></div>
    </article>`;
  }).join(""):'<p class="catalog-meta">No courses match your filters.</p>';
}

function bindCourseCards(){}

function enrollCourse(code){
  const course=courses.find(c=>c.code===code);
  if(!course) return;
  if(!isUnlocked(course)){
    showToast("Prerequisite required",`Complete ${course.prerequisites.join(", ")} first.`,"!");
    return;
  }
  state.enrolled[code]=true;
  save();renderAll();
  showToast("Course enrolled",`${course.code} was added to your semester.`);
}
function completeCourse(code){
  const course=courses.find(c=>c.code===code);
  if(!course) return;
  state.completed[code]=true;
  save();renderAll();
  showToast("Module completed",`Progress updated for ${course.code}.`);
}

function renderGroups(){
  const groups=[
    {name:"Full-Stack Builders",topic:"React · APIs · Databases",members:["RM","SK","AJ","NV"]},
    {name:"DSA Sprint",topic:"Algorithms · Problem solving",members:["VK","PM","SL"]},
    {name:"AI Lab Crew",topic:"Python · Machine learning",members:["AN","RK","DM","JP"]}
  ];
  document.getElementById("groupsGrid").innerHTML=groups.map(g=>`<article class="group-card">
    <span class="difficulty intermediate">${g.topic}</span>
    <h3>${g.name}</h3>
    <p>Study together this week and share solutions.</p>
    <div class="group-members">${g.members.map(m=>`<span>${m}</span>`).join("")}<span>+${g.members.length+2}</span></div>
  </article>`).join("");
}

function showToast(title,message,icon="✓"){
  document.getElementById("toastTitle").textContent=title;
  document.getElementById("toastMessage").textContent=message;
  document.getElementById("toastIcon").textContent=icon;
  const toast=document.getElementById("toast");
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove("show"),3000);
}

function exportRoadmap(){
  const text=[
    "SKILLSPROUT - ACADEMIC ROADMAP",
    `Student: ${profile.name}`,
    `Branch: ${profile.branch} | ${profile.semester}`,
    `Career pathway: ${profile.career}`,
    "",
    ...Array.from({length:8},(_,i)=>{
      const sem=i+1;
      const list=semesterCourses(sem).map(c=>`  ${c.code} - ${c.title} (${c.credits} credits)`).join("\n");
      return `SEMESTER ${sem}\n${list}`;
    })
  ].join("\n");
  const blob=new Blob([text],{type:"text/plain"});
  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;link.download="SkillSprout_Roadmap.txt";link.click();
  URL.revokeObjectURL(url);
  showToast("Roadmap exported","Your academic plan was downloaded.");
}

const cycleCheck=topologicalSort(courses);
if(!cycleCheck.valid){
  console.warn("Circular prerequisite dependency detected.");
  showToast("Catalog error","A circular prerequisite was detected.","!");
}

init();