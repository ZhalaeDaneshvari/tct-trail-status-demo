export const sections = [
 {id:'svaneti',name:'Svaneti',detail:'Alpine section',country:'Georgia',coords:[43.04,42.73]},
 {id:'racha',name:'Racha',detail:'Valley section',country:'Georgia',coords:[42.58,43.45]},
 {id:'dilijan',name:'Dilijan',detail:'Forest section',country:'Armenia',coords:[40.74,44.86]},
 {id:'gegham',name:'Gegham Mountains',detail:'Highland section',country:'Armenia',coords:[40.27,44.97]}
];
export const statuses = {closed:{label:'Closed',symbol:'×',color:'#a44435'},caution:{label:'Caution',symbol:'!',color:'#9b6718'},clear:{label:'No known issues',symbol:'✓',color:'#32634d'},unknown:{label:'Status unknown',symbol:'?',color:'#64716d'}};
export const today = () => new Date().toLocaleDateString('en-CA');
export function dateOffset(n) { const d=new Date();d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function seedState(){
 return {version:1,reports:[
 {id:'DEMO-101',section:'dilijan',type:'Fallen tree / obstruction',observed:dateOffset(-1),location:'Forest path near the example junction',description:'A fallen tree is blocking the main path. Hikers are stepping off the path to get around it.',source:'Website form',state:'pending',created:new Date().toISOString(),history:[{at:new Date().toISOString(),action:'Sample report received via website form'}]},
 {id:'DEMO-102',section:'racha',type:'Wayfinding / trail markings',observed:dateOffset(-2),location:'The example fork above the valley',description:'A direction marker is missing at the fork. The two paths are difficult to distinguish.',source:'Slack form link',state:'pending',created:new Date().toISOString(),history:[{at:new Date().toISOString(),action:'Sample report received via Slack form link'}]}
 ],advisories:[
 {id:'ADV-001',section:'svaneti',status:'closed',title:'Example crossing closure',message:'Demonstration only: a river crossing is closed pending inspection. This is a fictional advisory, not a real closure.',location:'Example crossing',observed:dateOffset(-3),verified:dateOffset(-1),reviewDate:dateOffset(2),active:true},
 {id:'ADV-002',section:'gegham',status:'caution',title:'Example water availability advisory',message:'Demonstration only: a seasonal water source is reported dry. This is a fictional advisory, not current water information.',location:'Example highland water point',observed:dateOffset(-2),verified:dateOffset(-1),reviewDate:dateOffset(3),active:true},
 {id:'ADV-003',section:'racha',status:'clear',title:'Example staff condition check',message:'Demonstration only: no issues were recorded during a sample staff check. This does not guarantee safe conditions.',location:'Example valley section',observed:dateOffset(-3),verified:dateOffset(-3),reviewDate:dateOffset(4),active:true}
 ]};
}
export function publicAdvisories(state){return state.advisories.filter(a=>a.active);}
export function sectionStatus(state,section){
 const items=publicAdvisories(state).filter(a=>a.section===section);
 // Unresolved hazards remain visible even after their review date. A stale clear check becomes unknown.
 for(const key of ['closed','caution'])if(items.some(a=>a.status===key))return key;
 if(items.some(a=>a.status==='unknown'))return 'unknown';
 return items.some(a=>a.status==='clear'&&a.reviewDate>=dateOffset(0))?'clear':'unknown';
}
export function publishReport(state,id,fields){
 const report=state.reports.find(r=>r.id===id);
 if(!report||!['pending','needs-info'].includes(report.state))throw new Error('This report is no longer awaiting review.');
 if(!sections.some(s=>s.id===fields.section)||!statuses[fields.status]||!fields.title?.trim()||!fields.message?.trim()||!fields.reviewDate||fields.reviewDate<dateOffset(0))throw new Error('Complete the public summary, status, section, and a current or future review date.');
 const at=new Date().toISOString();
 const advisory={id:`ADV-${id}`,section:fields.section,status:fields.status,title:fields.title.trim(),message:fields.message.trim(),location:fields.location?.trim()||'',observed:report.observed,verified:dateOffset(0),reviewDate:fields.reviewDate,active:true,reportId:id};
 report.state='approved';report.advisoryId=advisory.id;report.history.push({at,action:'Reviewed and published by Demo reviewer'});state.advisories.push(advisory);return advisory;
}
export function decideReport(state,id,decision,note,target){
 const report=state.reports.find(r=>r.id===id);
 if(!report||!['pending','needs-info'].includes(report.state))throw new Error('This report is no longer awaiting review.');
 if(!['rejected','needs-info','duplicate'].includes(decision)||!note?.trim())throw new Error('Add a review note explaining this decision.');
 if(decision==='duplicate'&&!state.advisories.some(a=>a.id===target&&a.active&&a.section===report.section))throw new Error('Choose an active advisory in the same section.');
 report.state=decision;report.note=note.trim();if(target)report.duplicateOf=target;
 report.history.push({at:new Date().toISOString(),action:`${decision==='needs-info'?'More information requested':decision==='duplicate'?'Linked to existing advisory':'Report declined'}: ${note.trim()}`});
}
export function resolveAdvisory(state,id,note){
 const a=state.advisories.find(a=>a.id===id&&a.active);if(!a||!note?.trim())throw new Error('Add a resolution note.');
 a.active=false;a.resolvedAt=new Date().toISOString();a.resolution=note.trim();
 // Resolving an issue does not create a new all-clear condition check.
 const r=state.reports.find(r=>r.id===a.reportId);if(r)r.history.push({at:a.resolvedAt,action:`Advisory resolved: ${note.trim()}`});
}
