Task = {
  id: string,
  title: string,
  subject: string,       // предмет
  type: 'ДЗ'|'Проект'|'Экзамен'|'Чтение'|'Лабораторная',
  priority: 'low'|'medium'|'high'|'critical',
  status: 'todo'|'progress'|'review'|'done',
  deadline: ISO date string,
  estimate: number (hours),
  description: string,
  createdAt: ISO,
  updatedAt: ISO,
  tags: []
}




const STORAGE_KEY = 'studyPlanner.tasks.v1';
const SUBJECTS = ['Математический анализ','Программирование','Физика','Английский язык','История','Базы данных','Экономика','Философия'];
const TYPES = ['Домашнее задание','Проект','Экзамен','Чтение','Лабораторная','Эссе'];
const PRIORITIES = {low:{label:'Низкий',color:'#64748b'}, medium:{...}, high:{...}, critical:{...}};
const STATUSES = {todo:{label:'К выполнению'}, progress:{label:'В работе'}, review:{label:'На проверке'}, done:{label:'Выполнено'}};



const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>'t'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const todayISO=()=>new Date().toISOString().slice(0,10);
function parseDate(iso){const [y,m,d]=iso.split('-').map(Number);return new Date(y,m-1,d);}
function daysUntil(iso){const t=parseDate(todayISO()); const d=parseDate(iso); return Math.round((d-t)/86400000);}



function validateTitle(raw){
  const v = (raw??'').trim();
  if(!v) return {ok:false,msg:'Укажите название задачи'};
  if(v.length<3) return {ok:false,msg:'Название должно содержать не менее 3 символов'};
  if(v.length>120) return {ok:false,msg:'Название не должно превышать 120 символов'};
  return {ok:true,value:v};
}
function validateSubject(raw){...}
function validateDeadline(raw,{allowPast=false}={}){...}
function validateEstimate(raw){...}
function validateDescription(raw){ max 500 }





let tasks = load();
let ui = {q:'',subject:'all',priority:'all',status:'all',overdue:false,sort:'deadline'};








const ICON = {
  edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash:'<svg ...><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>',
  calendar:'...',
  clock:'...'
};



function toast(msg,{type='info',action}={}){...}



const TESTS=[
  {name:'Отклонение пустого названия', run:()=>validateTitle('').ok===false},
  ...
 ];







 function seed(){
  const d = n => { const t=new Date(); t.setDate(t.getDate()+n); return t.toISOString().slice(0,10); };
  return [
    {id:uid(),title:'Решить 12 задач по рядам Фурье',subject:'Математический анализ',type:'Домашнее задание',priority:'high',status:'progress',deadline:d(2),estimate:3,description:'Глава 8, задачи 8.1–8.12. Особое внимание — сходимость.',createdAt:...,updatedAt:...},
    ...
  ];
}



/* ---------- Утилиты ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));




function render(){
  renderStats();
  renderBoard();
  renderActiveFilters();
}


function renderBoard(){
  const list = filteredSorted();
  STATUS_ORDER.forEach(st=>{
    const col = $(`#col-${st}`);
    const items = list.filter(t=>t.status===st);
    col.querySelector('.col-count').textContent = items.length;
    const body = col.querySelector('.col-body');
    body.innerHTML = items.length ? items.map(taskCard).join('') : `<div class="empty">Перетащите задачу сюда или создайте новую</div>`;
  });
}

board.addEventListener('dragstart', e=>{
  const card = e.target.closest('.task'); if(!card) return;
  dragId = card.dataset.id;
  card.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.setData('text/plain', dragId);
});
board.addEventListener('dragend', e=>{ ... remove class, clear column highlights });
board.addEventListener('dragover', e=>{
  const col = e.target.closest('.col'); if(!col) return;
  e.preventDefault();
  col.classList.add('drop-target');
});
board.addEventListener('dragleave', e=>{ const col=e.target.closest('.col'); if(col && !col.contains(e.relatedTarget)) col.classList.remove('drop-target'); });
board.addEventListener('drop', e=>{
  const col = e.target.closest('.col'); if(!col) return;
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain') || dragId;
  setStatus(id, col.dataset.status);
});



board.addEventListener('click', e=>{
  const btn = e.target.closest('[data-act]'); if(!btn) return;
  const id = btn.closest('.task').dataset.id;
  const act = btn.dataset.act;
  if(act==='edit') openModal(getTask(id));
  if(act==='del') removeTask(id);
  if(act==='next') advance(id);
});


const TESTS = [
  {id:'TC-01', name:'Пустое название отклоняется', fn:()=>{const r=validateTitle('   '); return !r.ok;}},
  ...
];




{name:'Фильтр «просроченные» возвращает только задачи с прошедшим сроком', fn:()=>{
  const sample=[{deadline:addDays(-1),status:'todo'},{deadline:addDays(3),status:'todo'},{deadline:addDays(-2),status:'done'}];
  return sample.filter(isOverdue).length===1;
}}


let editingId = null;
function openModal(task=null){
  editingId = task ? task.id : null;
  $('#modalTitle').textContent = task ? 'Редактировать задачу' : 'Новая задача';
  const f = $('#taskForm');
  f.reset();
  clearErrors();
  if(task){
    f.title.value = task.title;
    f.subject.value = task.subject;
    f.type.value = task.type;
    f.priority.value = task.priority;
    f.status.value = task.status;
    f.deadline.value = task.deadline;
    f.estimate.value = task.estimate ?? '';
    f.description.value = task.description ?? '';
  } else {
    f.deadline.value = addDays(1) ... hmm default empty better. Let's default to today+3? I'll leave empty to force choice. Actually default to addDays(3) is friendlier and still valid.
    f.priority.value='medium';
    f.status.value='todo';
    f.type.value='homework';
  }
  updateCounter();
  $('#modalBackdrop').classList.add('open');
  setTimeout(()=>f.title.focus(),50);
}



$('#taskForm').addEventListener('submit', e=>{
  e.preventDefault();
  const data = {
    title: $('#f-title').value,
    subject: $('#f-subject').value,
    type: $('#f-type').value,
    priority: $('#f-priority').value,
    status: $('#f-status').value,
    deadline: $('#f-deadline').value,
    estimate: $('#f-estimate').value,
    description: $('#f-description').value
  };
  const errors = validateTask(data, {isNew: !editingId});
  clearErrors();
  if(Object.keys(errors).length){
    Object.entries(errors).forEach(([k,msg])=>setError(k,msg));
    return;
  }
  ...save...
});



const addDays=(n)=>{const d=new Date();d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}


function daysUntil(iso){
  if(!iso) return null;
  const [y,m,d]=iso.split('-').map(Number);
  const target=new Date(y,m-1,d);
  const now=new Date(); const t=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  return Math.round((target-t)/86400000);
}




function filteredSorted(){
  const q = ui.q.trim().toLowerCase();
  let list = tasks.filter(t=>{
    if(ui.subject!=='all' && t.subject!==ui.subject) return false;
    if(ui.priority!=='all' && t.priority!==ui.priority) return false;
    if(ui.status!=='all' && t.status!==ui.status) return false;
    if(ui.overdue && !isOverdue(t)) return false;
    if(q){
      const hay = (t.title+' '+t.subject+' '+(t.description||'')).toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
  const cmp = {
    deadline:(a,b)=>a.deadline.localeCompare(b.deadline),
    priority:(a,b)=>PRIO_ORDER[a.priority]-PRIO_ORDER[b.priority] || a.deadline.localeCompare(b.deadline),
    created:(a,b)=>b.createdAt.localeCompare(a.createdAt),
    title:(a,b)=>a.title.localeCompare(b.title,'ru')
  }[ui.sort];
  return list.sort(cmp);
}






















































