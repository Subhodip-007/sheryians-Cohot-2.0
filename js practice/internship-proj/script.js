const $ = id => document.getElementById(id);


const fullname=$('fullname'),username=$('username'),email=$('email'),phone=$('phone'),
      password=$('password'),confirm=$('confirm');
const fullnameMsg=$('fullnameMsg'),usernameMsg=$('usernameMsg'),emailMsg=$('emailMsg'),
      phoneMsg=$('phoneMsg'),confirmMsg=$('confirmMsg');
const pwMeter=$('pwMeter'),pwLabel=$('pwLabel'),pwEntropy=$('pwEntropy'),pwSuggest=$('pwSuggest');
const progressBar=$('progressBar'),previewContent=$('previewContent'),aiFeedback=$('aiFeedback');
const genBtn=$('genBtn'),suggestBtn=$('suggestBtn'),resetBtn=$('resetBtn'),form=$('form');


document.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();
  tl.from('main', { opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.out' })
    .from('h1, .muted', { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, "-=0.2")
    .from('form > *:not(.full)', { opacity: 0, y: 20, stagger: 0.05, duration: 0.3 }, "-=0.2")
    .from('form > .full', { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 }, "-=0.3");
});


const isEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone=v=>v===''||/^\d{10}$/.test(v);
const isUser=v=>/^[a-zA-Z0-9._-]{3,20}$/.test(v);

const save=()=>localStorage.setItem('smartForm',JSON.stringify({
  fullname:fullname.value,username:username.value,email:email.value,phone:phone.value
}));
const load=()=>{try{
  let d=JSON.parse(localStorage.getItem('smartForm')||'{}');
  fullname.value=d.fullname||'';username.value=d.username||'';email.value=d.email||'';phone.value=d.phone||'';
}catch{localStorage.removeItem('smartForm');}};

const updatePrev=()=>{
    const content = [];
    if (fullname.value) content.push(`<b>Name:</b> ${fullname.value}`);
    if (username.value) content.push(`<b>Username:</b> ${username.value}`);
    if (email.value) content.push(`<b>Email:</b> ${email.value}`);
    if (phone.value) content.push(`<b>Phone:</b> ${phone.value}`);

    if (content.length > 0) {
        previewContent.innerHTML = content.join('<br>');
    } else {
        previewContent.innerHTML = 'Your info will appear here.';
    }
};

const progress=()=>{const f=[fullname,username,email,password,confirm];
  progressBar.style.width=(f.filter(x=>x.value.trim()).length/f.length*100)+'%';};

function analyze(pw){
  if(!pw)return{score:0,entropy:0,s:[]};
  let c=0;if(/[a-z]/.test(pw))c+=26;if(/[A-Z]/.test(pw))c+=26;if(/[0-9]/.test(pw))c+=10;if(/[^a-zA-Z0-9]/.test(pw))c+=32;
  let e=Math.round(Math.log2(Math.pow(c||1,pw.length))),s=0;
  if(pw.length>=8)s++;if(pw.length>=12)s++;if(/[A-Z]/.test(pw)&&/[a-z]/.test(pw))s++;if(/[0-9]/.test(pw)&&/[^a-zA-Z0-9]/.test(pw))s++;
  if(e>60)s=Math.min(4,s+1);
  let sug=[];if(pw.length<12)sug.push('Use 12+ chars.');if(!/[A-Z]/.test(pw))sug.push('Add uppercase.');
  if(!/[0-9]/.test(pw))sug.push('Add numbers.');if(!/[^a-zA-Z0-9]/.test(pw))sug.push('Add symbols.');
  return{score:s,entropy:e,s:sug};
}
function updatePw(){
  let p=password.value,r=analyze(p),lv=['Very weak','Weak','Okay','Strong','Excellent'];
  pwLabel.textContent=lv[Math.min(r.score,4)];
  pwEntropy.textContent=r.entropy+' bits';
  pwMeter.style.width=(r.score*25)+'%'; 
  pwMeter.style.background=r.score<2?'var(--pw-weak)':r.score==2?'var(--pw-okay)':'var(--pw-strong)';
  pwSuggest.innerHTML=r.s.slice(0,3).map(x=>'• '+x).join('<br>');
}


const suggestUser = base => {
  const b = base.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10) || 'user';
  const prefixes = ['the', 'its', 'real', 'get', 'go'];
  const suffixes = [
    'dev', 'pro', 'hub', 'io', 'app', 'xyz', 'online', 'net', 'co', 'lab', 
    'space', 'world', 'digital', 'studio', 'works', 'design', 'cloud', 'tech', 'codes', 'js', 'py'
  ];
  const nouns = [
    'Nomad', 'Coder', 'Hacker', 'Guru', 'Dev', 'Pixel', 'Byte', 'Matrix', 'Cloud', 'Data', 'World'
  ];
  const separators = ['_', '.', ''];
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomNumber = () => Math.floor(Math.random() * 90 + 10);

  const suggestions = new Set();

  // Pattern 1: base + separator + noun
  suggestions.add(b + separators[0] + nouns[Math.floor(Math.random()*nouns.length)].toLowerCase());
  suggestions.add(b + separators[1] + nouns[Math.floor(Math.random()*nouns.length)].toLowerCase());

  suffixes.forEach(s => suggestions.add(b + s));

 
  prefixes.forEach(p => suggestions.add(p + b));

  
  separators.forEach(sep => {
    suggestions.add(b + sep + currentYear);
    suggestions.add(b + sep + randomNumber());
  });

  
  return Array.from(suggestions)
    .filter(name => name.length < 20)
    .sort(() => 0.5 - Math.random()); 
};
function genPw(){
  const adjectives = [
    'Vivid', 'Silent', 'Golden', 'Silver', 'Bronze', 'Cosmic', 'Solar', 'Lunar', 'Aqua', 'Terra', 'Aero', 'Pyro', 
    'Arctic', 'Crimson', 'Azure', 'Jade', 'Ember', 'Cobalt', 'Indigo', 'Violet', 'Scarlet', 'Amber', 'Ruby', 'Topaz'
  ];
  const nouns = [
    'River', 'Mountain', 'Ocean', 'Galaxy', 'Comet', 'Forest', 'Meadow', 'Breeze', 
    'Winter', 'Shadow', 'Light', 'Crystal', 'Diamond', 'Journey', 'Quest', 'Riddle', 
    'Puzzle', 'Cipher', 'Matrix', 'Vector', 'Pixel', 'Vortex', 'Nebula', 'Quasar', 
    'Aurora', 'Titan', 'Atlas', 'Apollo', 'Zephyr', 'Ember', 'Flame', 'Frost', 
    'Glacier', 'Island', 'Jungle', 'Lagoon', 'Mirage', 'Nomad', 'Oracle', 'Phoenix', 'Dragon', 'Falcon', 'Spirit'
  ];
  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const adj = randomItem(adjectives);
  const noun = randomItem(nouns);
  const num = Math.floor(Math.random() * 900 + 100);
  const sym = randomItem(symbols);


  if (adj.toLowerCase() === noun.toLowerCase()) {
    return genPw(); 
  }

  return `${adj}${noun}${num}${sym}`;
}
function isAvailSim(n){return!/x$/i.test(n);}
function common(){updatePrev();progress();save();aiLiveAnalyze();}
let aiAnalysisTimeout;

load();updatePrev();progress();updatePw();


function aiLiveAnalyze(){
  const feedback=[];
  const allInputs = [fullname, username, email, phone, password, confirm];
  const isFormEmpty = allInputs.every(input => input.value.trim() === '');

  if (isFormEmpty) {
    aiFeedback.innerHTML = `<b>AI Review:</b><br>Please start by filling out the form.`;
    return; // Exit early if the form is blank
  }

  if(fullname.value && fullname.value.trim().split(" ").length < 2) feedback.push("Consider adding both first and last name.");
  if(username.value && username.value.length < 4) feedback.push("Try a longer username for better uniqueness.");
  else if(username.value && /[^a-zA-Z0-9._-]/.test(username.value)) feedback.push("Username should only contain letters, numbers, '.', '_', or '-'.");
  if(email.value && !isEmail(email.value)) feedback.push("Please check your email format.");
  if(phone.value && !isPhone(phone.value)) feedback.push("Phone number should be 10 digits.");
  
  const r=analyze(password.value);
  if(password.value) {
    if(r.score <= 2) feedback.push("Password could be stronger. Try adding more character types.");
    if(password.value && confirm.value && password.value !== confirm.value) feedback.push("Passwords do not match.");
  }

  if (feedback.length > 0) {
    aiFeedback.innerHTML=`<b>AI Review:</b><br>${feedback.join("<br>")}`;
  } else {
    aiFeedback.innerHTML=`<b>AI Review:</b><br><span style='color:var(--success-color)'>All checks passed!</span>`;
  }
}


const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const handleInput = (e) => {
  const { id } = e.target;
  if (id === 'fullname') fullnameMsg.textContent = fullname.value.length < 3 ? 'Enter 3+ chars.' : '';
  if (id === 'username') usernameMsg.textContent = !isUser(username.value) ? '3–20 chars, letters/numbers/_/.' : isAvailSim(username.value) ? 'Looks available.' : 'Name taken.';
  if (id === 'email') emailMsg.textContent = isEmail(email.value) ? '' : 'Invalid email.';
  if (id === 'phone') phoneMsg.textContent = isPhone(phone.value) ? '' : '10-digit only.';
  if (id === 'password') updatePw();
  if (id === 'confirm') confirmMsg.textContent = confirm.value === password.value ? 'Matches.' : 'No match.';
  
  updatePrev();
  progress();
  save();
  
  clearTimeout(aiAnalysisTimeout);
  aiAnalysisTimeout = setTimeout(aiLiveAnalyze, 500);
};

const setupEventListeners = () => {
  
  [fullname, username, email, phone, password, confirm].forEach(el => {
    el.addEventListener("input", handleInput);
  });

  
  genBtn.addEventListener('click', () => {
  password.value = genPw();
  updatePw();
  common();
  pwSuggest.innerHTML = 'Generated strong password.';
  confirm.value = '';
  confirmMsg.textContent = '';
});
  suggestBtn.addEventListener('click', () => {
  const n = (fullname.value.split(' ')[0] || username.value || 'user');
  let list = suggestUser(n);
  let first = list.find(isAvailSim);
  if (first) {
    username.value = first;
    usernameMsg.textContent = 'Suggested: ' + first;
    common();
  }
});
  const clearMessages = () => {
    [fullnameMsg, usernameMsg, emailMsg, phoneMsg, confirmMsg, pwSuggest].forEach(el => {
      el.textContent = '';
    });
  };

  resetBtn.addEventListener('click', () => {
  form.reset();
  localStorage.removeItem('smartForm');
  updatePrev();
  progress();
  updatePw();
  clearMessages();
  aiLiveAnalyze();
});


  form.addEventListener('submit', e => {
  e.preventDefault();
  aiLiveAnalyze();
  if(fullname.value.length>=3&&isUser(username.value)&&isEmail(email.value)&&phone.value.length>0&&isPhone(phone.value)&&password.value.length>=8&&password.value===confirm.value){
    aiFeedback.innerHTML+=`<br><br><span style='color:var(--success-color)'><b>All checks passed!</b> Ready for submission.</span>`;
  }else{
    aiFeedback.innerHTML+=`<br><br><span style='color:var(--error-color)'><b>Fix issues before submitting.</b></span>`;
  }
});

  
  const toggleVisibility = (inputEl, buttonEl) => {
    const icon = buttonEl.querySelector('i');
    const isPassword = inputEl.type === 'password';
    inputEl.type = isPassword ? 'text' : 'password';
    icon.className = isPassword ? 'ri-eye-off-line' : 'ri-eye-line';
  };


  $('togglePw').addEventListener('click', () => toggleVisibility(password, $('togglePw')));
  $('toggleConfirm').addEventListener('click', () => toggleVisibility(confirm, $('toggleConfirm')));
};

setupEventListeners();


async function aiValidate(field, value) {
  const feedbackBox=document.getElementById(field.id+"Msg");
  if(!value.trim())return;
  feedbackBox.textContent=" Thinking...";
  try{
    const response=await fetch("/api/openai",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        model:"gpt-3.5-turbo",
        messages:[
          {role:"system",content:"You are a strict but polite form validator. Check if the given input is valid, explain issues, and suggest improvements."},
          {role:"user",content:`Field: ${field.id}, Value: "${value}". Evaluate and give 1 short helpful suggestion.`}
        ],
        max_tokens:50,
        temperature:0.4
      })
    });
    const data=await response.json();
    feedbackBox.textContent=data.choices?.[0]?.message?.content?.trim()||" Looks fine!";
  }catch(err){
    console.error(err);
    feedbackBox.textContent=" AI check unavailable.";
  }
}
[fullname,username,email,phone,password].forEach(f=>
  f.addEventListener("blur",()=>aiValidate(f,f.value))
);



async function aiSuggestPreview(){
  const formData={name:fullname.value,username:username.value,email:email.value,
    phone:phone.value,password:password.value
  };
  aiFeedback.textContent=" Analyzing your form...";

  try{
    const response=await fetch("/api/openai",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        model:"gpt-3.5-turbo",
        messages:[
          {role:"system",content:"You are an assistant that reviews full user forms and suggests short, helpful improvements."},
          {role:"user",content:`Analyze this data and give 2-3 concise tips:
          Name:${formData.name}
          Username:${formData.username}
          Email:${formData.email}
          Phone:${formData.phone}
          Password:${formData.password}`}
        ],
        max_tokens:90,
        temperature:0.5
      })
    });
    const data=await response.json();
    aiFeedback.innerHTML=`<b>AI Suggestion:</b> ${data.choices?.[0]?.message?.content?.trim()||"All good!"}`;
  }catch(err){
    console.error(err);
    aiFeedback.textContent=" AI Suggestion unavailable.";
  }
}
const debouncedAiSuggestPreview = debounce(aiSuggestPreview, 1500);
form.addEventListener("input", debouncedAiSuggestPreview);
