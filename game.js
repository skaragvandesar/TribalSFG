const K='staemmchen_v2',$=s=>document.querySelector(s);
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const R=n=>Math.floor(Math.random()*n),P=a=>a[R(a.length)];
const ft=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const RN={h:'🪵',l:'🧱',e:'⛓️'},RK=['h','l','e'];
const B={
 wood:{n:'Holzfäller',ic:'🪓',c:[40,30,10],r:'h',d:'Hackt Holz und singt dabei falsch.'},
 clay:{n:'Lehmgrube',ic:'🧱',c:[35,45,10],r:'l',d:'Matschig, aber ehrlich.'},
 iron:{n:'Eisenmine',ic:'⛏️',c:[50,40,25],r:'e',d:'Die Zwerge fragen nicht nach Lohn. Doch, tun sie.'},
 store:{n:'Speicher',ic:'📦',c:[60,50,20],d:'Mehr Platz für Zeug, das du eh nicht brauchst.'},
 farm:{n:'Bauernhof',ic:'🌾',c:[70,60,30],d:'Mehr Bauern, mehr hungrige Münder.'},
 barr:{n:'Kaserne',ic:'🛡️',c:[120,100,60],d:'Schaltet Truppen frei und bildet sie schneller aus.'},
 tav:{n:'Taverne',ic:'🍺',c:[100,80,40],d:'Mehr Mut für Abenteuer. Der Wirt schreibt an.'},
 wall:{n:'Wall',ic:'⛰️',c:[80,100,30],d:'Erdwall und Palisaden: +5 % Abwehr je Stufe.'},
 mauer:{n:'Mauer',ic:'🗼',c:[150,250,150],d:'Steinmauer: +8 % Abwehr und 4 Plätze für Bogenschützen je Stufe.'},
 rally:{n:'Versammlungsplatz',ic:'🏛️',c:[300,300,200],d:'Hier wirbst du Fürsten an (ab Stufe 3 und Kaserne 10). Nur mit einem Fürsten lassen sich Dörfer übernehmen.'}};
const REQ={mauer:['wall',3],rally:['barr',5]};
const reqOk=k=>!REQ[k]||S.b[REQ[k][0]]>=REQ[k][1];
const reqTxt=k=>reqOk(k)?'':`🔒 Benötigt ${B[REQ[k][0]].n} Stufe ${REQ[k][1]}`;
const U={sp:{n:'Speerträger',ic:'🔱',c:[50,30,20],a:8,d:14,t:6,cr:20,need:1,s:1,p:1},ax:{n:'Axtschwinger',ic:'🪓',c:[70,40,40],a:22,d:4,t:8,cr:10,need:2,s:.95,p:1},sw:{n:'Schwertkämpfer',ic:'🗡️',c:[40,50,70],a:14,d:10,t:10,cr:15,need:3,s:1.15,p:1},bw:{n:'Bogenschütze',ic:'🎯',c:[60,50,40],a:16,d:6,t:9,cr:12,need:4,s:1,p:1},rt:{n:'Reiter',ic:'🏇',c:[140,100,120],a:30,d:12,t:18,cr:40,need:6,s:.55,p:2},rr:{n:'Ritter',ic:'⚜️',c:[220,160,220],a:50,d:30,t:30,cr:30,need:8,s:.8,p:3},fs:{n:'Fürst',ic:'👑',c:[3000,3000,3000],g:2,a:5,d:5,t:600,cr:0,need:10,s:3,p:5,lord:true}};
const CL={K:{n:'Krieger',ic:'⚔️',d:'Haut erst, fragt später. Angriff +20 %.'},M:{n:'Magier',ic:'🔮',d:'Feuerbälle für Kleinigkeiten. Quest-Erfahrung +50 %.'},S:{n:'Späher',ic:'🏹',d:'Findet Münzen im Sofa. Beute +30 %.'}};
const GT={fire:{n:'Feuer',ic:'🔥',c:'#d9532f'},frost:{n:'Frost',ic:'❄️',c:'#4aa3df'},poison:{n:'Gift',ic:'☠️',c:'#6fae3a'}};
const RAR=['Gewöhnlich','Selten','Episch','Legendär','Set'],RC=['#8a7f6c','#3f74e8','#9a4fe0','#e07a10','#2f9e44'];
const FX={crit:['Krit-Chance',6],life:['Lebensraub',8],thorn:['Dornen',15],loot:['Beute & Drops',12],xp:['Erfahrung',10],surv:['Überleben: Bedürfnisse sinken langsamer',15],mut:['Mut-Erholung',20],prod:['Produktion',8],atkp:['Angriff',8],resall:['Alle Widerstände',6]};
const SETS={wolf:{n:'Frostwolf-Rudel',p:{w:['Frostzahn','crit'],a:['Pelz des Alphas','thorn'],m:['Heulstein','life']},b2:{atkp:15},b3:{crit:15,resall:15}},
 bier:{n:'Schankmeister-Garnitur',p:{w:['Zapfhahn des Wirts','xp'],a:['Schürze des Schankmeisters','surv'],m:['Bierkrug-Amulett','mut']},b2:{surv:25},b3:{xp:25,mut:30}},
 gier:{n:'Plünderer-Beute',p:{w:['Dolch der Diebe','loot'],a:['Räubermantel','prod'],m:['Münzbeutel','loot']},b2:{loot:20},b3:{prod:25,loot:25,crit:10}}};
const PT=[[118,118],[215,108],[95,200],[232,205],[60,95],[262,92],[160,278],[40,235],[160,38],[288,172],[22,170],[110,262],[210,260],[290,240],[25,70],[280,40],[75,45],[300,110],[30,250],[260,160]];
const LV=[['Lager','⛺'],['Weiler','🛖'],['Dorf','🏡'],['Burg','🏰'],['Festung','🏯']];
const NP=['Schnarch','Gier','Mecker','Grumpel','Zank','Hohl','Nebel','Pfeffer','Brumm','Faul'],NS=['dorf','burg','hausen','heim','stedt','tal'];
const tier=i=>Math.min(i,7)+Math.max(0,i-7)*.4;
const newPw=(i,lv)=>Math.round(30*1.75**tier(i)*(1+lv*.12));
const SP={prod:.2,build:8,train:4,mut:.25,surv:.4,travel:8};
const FIRE=300000,WARN=180000,WELL=60000;
const xpN=l=>Math.round(l*100*(1+l*.15));
const RELC={n:'#000',war:'#d9302f',peace:'#4aa3df',trade:'#2fbf5a'};
const CN=[['Gernegroß-Burg','fire'],['Weiler Wehwehchen','frost'],['Dorf Sauflust','poison'],['Schnarchheim','frost'],['Räuberhöhle Bierbauch','fire'],['Burg Blamage','poison'],['Festung Fettnapf','frost'],['Schloss Größenwahn','fire']];
const WIN=['%c fällt! Die Wachen hielten „Kapitulation“ für ein Eintopfrezept.','%c ist geplündert. Der Schatzmeister weint in sein Kissen.','Sieg bei %c! Dein Held rief „Für den Ruhm!“ – mit vollem Mund.'];
const LOSE=['%c hat euch vertrieben. Ein Huhn war maßgeblich beteiligt.','Niederlage bei %c. Die Verteidiger lachten, bis sie husteten.'];
const MS=[{n:'Glutgoblin',ic:'👺',g:'fire'},{n:'Frostwolf',ic:'🐺',g:'frost'},{n:'Giftspinne',ic:'🕷️',g:'poison'},{n:'Feuerhuhn',ic:'🐔',g:'fire'},{n:'Eisbär mit Hut',ic:'🐻',g:'frost'},{n:'Moorschleim',ic:'🦠',g:'poison'}];
const QP=[['Der Wirt sucht seine Katze','Sie saß die ganze Zeit auf deinem Kopf.'],['Bring dem Bäcker zwölf Brezeln','Du hast elf abgeliefert. Niemand hat gezählt.'],['Vertreibe die Ratten aus dem Keller','Die Ratten haben jetzt Hausverbot – und einen Betriebsrat.'],['Begleite den Händler nach Fettnapf','Er redete den ganzen Weg über sein Rückenleiden.'],['Besiege den Schrecken von Schlammstedt','Es war ein Gänserich. Ein sehr, sehr großer Gänserich.']];
const FD={water:{n:'Wasser',ic:'💧',w:40,f:0,mu:0},bread:{n:'Brot',ic:'🍞',w:0,f:30,mu:0},stew:{n:'Eintopf',ic:'🍲',w:10,f:50,mu:0,wm:10},mead:{n:'Met',ic:'🍯',w:25,f:0,mu:12},meat:{n:'Wildbret',ic:'🍖',w:0,f:40,mu:0,en:8},tea:{n:'Kräutertee',ic:'🍵',w:20,f:0,mu:0,wm:25,en:10}};
const LQ=[['Eskortiere die Karawane durch den Düsterwald','Die Karawane bestand aus einem Esel. Der Esel hat dich geführt.'],['Bewache die Brauerei eine ganze Nacht','Du hast „probiert“. Fachlich.'],['Erkunde die Verlorene Gruft','Die Gruft war nie verloren. Nur schlecht ausgeschildert.']];
const SUF=['des Grauens','der Gemütlichkeit','vom Dachboden','mit Kratzer','der Verwirrung','des Wirts'];
const BN={w:['Schwert','Streitkolben','Axt','Bratpfanne'],a:['Wams','Kettenhemd','Topfrüstung'],m:['Amulett','Talisman','Glücksbringer']};
const SLOT={w:'Waffe',a:'Rüstung',m:'Amulett'},SIC={w:'🗡️',a:'🛡️',m:'📿'};
let S,tab='dorf',armed=false,tt,F=null,G=null,Mr=null,sel=0,Iv=false,ua=null,mz={x:240,y:220,z:1},moved=false;

const SAVE_V=5;
let impT='',expT='';
const fresh=()=>({v:SAVE_V,lastExp:0,t:Date.now(),r:{h:150,l:150,e:100},b:{wood:1,clay:1,iron:1,store:1,farm:1,barr:0,tav:0,wall:0,mauer:0,rally:0},u:{sp:0,ax:0,sw:0,bw:0,rt:0,rr:0,fs:0},bq:null,tq:[],at:[],inc:[],q:null,qo:[],enc:[],mut:60,wt:100,fd:100,en:100,wm:100,fire:0,well:0,diff:100,aggr:2,nat:1200,wp:0,rq:[],reports:[],coin:{b:0,s:0,g:0},dust:0,rep:50,nw:Date.now()+300000,hero:null,eq:{w:null,a:null,m:null},inv:[],lvq:[],camps:CN.map(([n,g],i)=>({n,g,w:0,loy:100,own:false,lv:Math.min(3,i>>1),rel:'n',tr:{u:0,t:0},cd:0,wl:0,pw:newPw(i,Math.min(3,i>>1))})),ns:Date.now()+1800000,ng:Date.now()+900000,auto:{eat:false,q:false,rec:{sp:0,ax:0,sw:0,bw:0,rt:0,rr:0,fs:0}},bqq:[],log:[]});
/* Spielstand: Version, Zusammenführen mit Standardwerten und Migration.
   Neue Spielfunktionen: Standardwerte in fresh() ergänzen. Nur bei Umbauten bestehender Daten SAVE_V erhöhen und in migrate() einen Schritt ergänzen. */
function merge(base,inc){if(inc===undefined||inc===null)return base;if(base===null||typeof base!=='object'||Array.isArray(base))return inc;const o=Object.assign({},base);for(const k in inc)o[k]=(k in base)?merge(base[k],inc[k]):inc[k];return o}
function migrate(d){const v=d.v||1;let s=merge(fresh(),d);
 s.camps=s.camps.map((c,i)=>{c=Object.assign({g:'fire',w:0,loy:100,own:false,lv:Math.min(3,i>>1),rel:'n',tr:{u:0,t:0},cd:0,wl:0},c);if(c.pw==null)c.pw=Math.round(30*1.75**tier(i)*(1+(c.lv|0)*.12)*1.12**(c.w|0));return c});
 /* Beispiel für ein künftiges Update: if(v<4){ s.neuesFeld=...; } */
 s.v=SAVE_V;return s}
const exp=()=>({game:'castle-day',v:SAVE_V,exported:new Date().toISOString(),data:S});
function dl(){S.lastExp=Date.now();save();try{const b=new Blob([JSON.stringify(exp())],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='castle-day-spielstand-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500);toast('Spielstand gespeichert. Nichts passiert? Nutze „Als Text kopieren“.')}catch(e){toast('Download nicht möglich – nutze „Als Text kopieren“.')}}
function importText(t){let d;try{d=JSON.parse(t)}catch(e){toast('Das ist keine gültige Spielstand-Datei.');return}
 if(d&&d.game&&d.game!=='castle-day'){toast('Die Datei gehört zu einem anderen Spiel.');return}
 const raw=d&&d.data?d.data:d,v=(d&&d.v)||(raw&&raw.v)||1;
 if(!raw||!raw.hero){toast('Kein Held im Spielstand gefunden.');return}
 if(v>SAVE_V){toast('Der Spielstand stammt aus einer neueren Version. Bitte zuerst das Spiel aktualisieren.');return}
 try{localStorage.setItem(K+'_backup',JSON.stringify(S))}catch(e){}
 S=migrate(raw);S.t=Date.now();S.inc=[];F=null;G=null;impT='';save();render();toast('Spielstand eingespielt ✔')}
function load(){S=fresh();try{const raw=localStorage.getItem(K),s=JSON.parse(raw);if(s&&s.hero){if((s.v||1)!==SAVE_V){try{localStorage.setItem(K+'_bak_v'+(s.v||1),raw)}catch(e){}}S=migrate(s)}}catch(e){}}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}

const D=()=>S.diff/100;
const dmul=()=>Math.max(.5,1-['wt','fd','en','wm'].reduce((a,k)=>a+(S[k]<=0?.15:S[k]<25?.08:0),0));
const PH=[[6,'dawn','🌅','Morgen'],[10,'day','☀️','Tag'],[17,'dusk','🌇','Abend'],[20,'night','🌙','Nacht']];
function tod(){const h=(Date.now()/1000%1800)/1800*24;let i=3;if(h>=6)for(let k=0;k<4;k++)if(h>=PH[k][0])i=k;
 const nx=PH[(i+1)%4],nb=nx[0]>h?nx[0]:nx[0]+24;return{key:PH[i][1],icon:PH[i][2],name:PH[i][3],h,nextName:nx[3],secs:(nb-h)*75}}
const night=()=>tod().key==='night';
const hAtk=()=>Math.round((6+S.hero.lv*3+(S.eq.w?S.eq.w.v:0))*dmul()*(S.hero.c==='K'?1.2:1)*(1+fx('atkp')/100));
const hHp=()=>60+S.hero.lv*12+(S.eq.a?S.eq.a.v*3:0);
const hDef=()=>S.hero.lv*2+(S.eq.a?S.eq.a.v:0);
const luck=()=>(S.eq.m?S.eq.m.v:0)+Math.round(fx('loot')/2);
function res(g){let s=0;for(const k of ['w','a','m']){const it=S.eq[k];if(it)it.s.forEach(x=>{if(x.g===g)s+=.08*x.lv})}return Math.min(.75,s+fx('resall')/100)}
const rate=(k,l=S.b[k])=>l?0.5*SP.prod*l*1.1**l:0;
const cap=(l=S.b.store)=>Math.round(400*1.45**(l-1));
const popMax=(l=S.b.farm)=>20+15*(l-1);
const mutMax=(l=S.b.tav)=>100+10*l;
const mutRegen=(l=S.b.tav)=>(0.15+0.05*l)*SP.mut*(dmul()<1?.5:1)*(1+fx('mut')/100);
const bc=k=>B[k].c.map(x=>Math.round(x*1.5**S.b[k]));
const bt=k=>Math.round(10*SP.build*1.45**S.b[k]);
const uc=(k,n=1)=>U[k].c.map(x=>x*n);
const ut=k=>U[k].t*SP.train*0.92**Math.max(0,S.b.barr-1);
const campDef=i=>Math.round(S.camps[i].pw*(1+(S.camps[i].wl|0)*.06)*D());
const trSec=(i,u)=>dist(i)*SP.travel*Math.max(0,...Object.keys(u).filter(k=>u[k]>0).map(k=>U[k].s));
const dist=i=>6+Math.round(Math.hypot(PT[i][0]-160,PT[i][1]-150)*.25);
const owned=()=>S.camps.filter(c=>c.own).length;
const armyAtk=()=>Object.keys(U).reduce((a,k)=>a+S.u[k]*U[k].a,0)+hAtk();
const homeDef=()=>Math.round((Object.keys(U).reduce((a,k)=>a+S.u[k]*U[k].d,0)+hDef()+S.wp*U.bw.a*1.5)*(1+S.b.wall*.05+S.b.mauer*.08)*((S.wt<=0||S.fd<=0)?.5:1)*(S.en<=0?.7:1));
const pop=()=>S.wp*U.bw.p+Object.keys(U).reduce((a,k)=>a+S.u[k]*U[k].p,0)+S.tq.reduce((a,t)=>a+t.n*U[t.u].p,0)+S.at.reduce((a,x)=>a+Object.keys(x.u).reduce((p,k)=>p+x.u[k]*U[k].p,0),0);
const afford=c=>S.r.h>=c[0]&&S.r.l>=c[1]&&S.r.e>=c[2];
const pay=c=>{S.r.h-=c[0];S.r.l-=c[1];S.r.e-=c[2]};
const lg=t=>{S.log.unshift(t);S.log.length=Math.min(S.log.length,40)};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2600)}
function addRes(k,n){S.r[k]+=Math.min(n,Math.max(0,cap()-S.r[k]))}
const rollRar=(b=0)=>{const x=Math.random()-luck()*.0005-b;return x<.004?3:x<.025?2:x<.2?1:0};
const setCnt=s=>['w','a','m'].filter(k=>S.eq[k]&&S.eq[k].set===s).length;
function fx(id){let t=0;for(const k of ['w','a','m']){const it=S.eq[k];if(!it||!it.fx)continue;const v=it.fx[id];if(v)t+=v*(it.set?1+.25*(setCnt(it.set)-1):1)}
 for(const q in SETS){const c=setCnt(q);if(c>=2)t+=SETS[q].b2[id]||0;if(c>=3)t+=SETS[q].b3[id]||0}return t}
function genItem(k,r){const lv=S.hero.lv,v=Math.round((k==='m'?2:5)*(1+r*.6)*(1+lv*.15))+R(3),f={};
 if(r>=2){const ids=Object.keys(FX);for(let i=0;i<(r===3?2:1);i++){const id=P(ids);f[id]=Math.round(FX[id][1]*(r===3?1.8:1.2)*(1+lv*.04))}}
 return{k,n:`${r===3?'★ ':''}${P(BN[k])} ${P(SUF)}`,ic:SIC[k],v,r,so:1+(r>=2?1:0),s:[],fx:f}}
function genSet(){const q=P(Object.keys(SETS)),k=P(['w','a','m']),[n,id]=SETS[q].p[k],lv=S.hero.lv;
 return{k,n,ic:SIC[k],v:Math.round((k==='m'?3:7)*(1+lv*.15))+R(3),r:4,so:2,s:[],set:q,fx:{[id]:Math.round(FX[id][1]*1.5*(1+lv*.04))}}}
const genDrop=b=>Math.random()<.01+luck()*.0004?genSet():genItem(P(['w','a','m']),rollRar(b));
const sbt=b=>Object.keys(b).map(k=>`${FX[k][0]} +${b[k]} %`).join(', ');
function fxHtml(it){let o='';if(it.fx)for(const id in it.fx)o+=`<p style="color:${RC[it.r]}">✦ ${FX[id][0]} +${it.fx[id]} %</p>`;
 if(it.set){const c=setCnt(it.set),st=SETS[it.set];o+=`<p style="color:${RC[4]}">Set ${st.n} (${c}/3 getragen) – 2 Teile: ${sbt(st.b2)}; 3 Teile: ${sbt(st.b3)}. Jedes weitere Set-Teil verstärkt die Set-Effekte um 25 %.</p>`}return o}
function resHtml(it){const m={};(it.s||[]).forEach(x=>m[x.g]=(m[x.g]||0)+8*x.lv);const t=Object.keys(m).map(g=>`${GT[g].ic} ${m[g]} %`).join(' ');return `<p>Widerstände: ${t||'keine'}</p>`}
const genGem=(g,lv)=>({k:'g',g,lv,n:`${GT[g].n}-Edelstein ${['I','II','III'][lv-1]}`,ic:'💎'});
const mkFood=id=>({k:'f',id,n:FD[id].n,ic:FD[id].ic});
function addItem(it){if(S.inv.length<30){S.inv.push(it);return}for(const k of RK)addRes(k,10*((it.r||0)+1));lg(`🎒 Inventar voll – ${it.n} wurde zu Rohstoffen zerlegt.`)}
function istat(it){if(it.k==='g')return `${GT[it.g].ic} ${GT[it.g].n}-Widerstand +${8*it.lv} %`;
 if(it.k==='f'){const f=FD[it.id];return [f.w&&`Durst +${f.w}`,f.f&&`Hunger +${f.f}`,f.mu&&`Mut +${f.mu}`,f.en&&`Energie +${f.en}`,f.wm&&`Wärme +${f.wm}`].filter(Boolean).join(' · ')}
 return `${{w:'Angriff',a:'Abwehr & Leben',m:'Glück'}[it.k]} +${it.v} · ${RAR[it.r]}`}
function rollReward(lv){const x=Math.random();
 if(x<.6)return genDrop(lv%5===0?.02:0);
 if(x<.85)return genGem(P(Object.keys(GT)),Math.min(3,1+(lv>=6?1:0)+(Math.random()<.15?1:0)));
 return mkFood(P(['stew','mead']))}
function gain(xp){xp=Math.round(xp*(1+fx('xp')/100));const h=S.hero;h.xp+=xp;while(h.xp>=xpN(h.lv)){h.xp-=xpN(h.lv);h.lv++;S.lvq.push(h.lv);lg(`🎉 ${h.n} erreicht Stufe ${h.lv}!`)}}
function genQ(){const lv=S.hero.lv,m=S.hero.c==='M'?1.5:1,q=[];
 const mk=(t,x,dur)=>{const mn=dur/60;return{t,x,mut:Math.round(8+mn*.8),dur,xp:Math.round(mn*(5+lv*1.6)*m*(dur>=1800?1.3:1)),res:P(RK),amt:Math.round(mn*(10+lv*2))}};
 const ids=[],n=Math.random()<.4?2:3;while(ids.length<n){const i=R(QP.length);if(!ids.includes(i))ids.push(i)}
 ids.forEach(i=>q.push(mk(QP[i][0],QP[i][1],300+R(601))));
 const lq=()=>{const l=P(LQ);return mk('⏳ '+l[0],l[1],1800+R(1801))};
 if(q.length===2)q.push(lq());else if(Math.random()<.3)q[2]=lq();
 return q}
const genEnc=()=>[0,1,2].map(()=>({m:R(MS.length),l:Math.max(1,S.hero.lv+R(3)),el:Math.random()<.2}));

function startFight(i){
 const e=S.enc[i],m=MS[e.m],hp0=Math.round((60+e.l*30)*D()*(e.el?1.6:1)),ma=(6+e.l*3.6)*D()*(night()?1.2:1)*(e.el?1.3:1),HP=hHp(),a=hAtk(),r=res(m.g);
 let hh=HP,mh=hp0;const ev=[{t:`⚔️ ${S.hero.n} gegen ${e.el?'💀 Elite-':''}${m.n} (Stufe ${e.l})!`,hh,mh}];
 for(let n=0;n<40&&hh>0&&mh>0;n++){
  const cr=Math.random()<.1+luck()*.01+fx('crit')/100,d=Math.round(a*(.85+Math.random()*.3)*(cr?1.8:1));mh-=d;hh=Math.min(HP,hh+Math.round(d*fx('life')/100));ev.push({t:`${cr?'💥 Krit! ':''}${S.hero.n} trifft für ${d}`,hh,mh:Math.max(0,mh)});if(mh<=0)break;
  const d2=Math.round(ma*(.85+Math.random()*.3)*(1-r));hh-=d2;mh-=Math.round(d2*fx('thorn')/100);ev.push({t:`${m.n} trifft für ${d2}${r?` (${Math.round(r*100)} % ${GT[m.g].n}-Widerstand)`:''}`,hh:Math.max(0,hh),mh})}
 const win=mh<=0;S.mut-=8;S.en=Math.max(0,S.en-6);F={m,ev,i:0,hp0,HP,done:false};
 if(win){const xp=Math.round((12+e.l*8)*(e.el?1.8:1)),rw=[];
  if(Math.random()<.25*(e.el?1.8:1)+luck()*.002)rw.push(genDrop(0));
  if(Math.random()<.25)rw.push(genGem(m.g,1+(R(10)<e.l/3?1:0)));
  if(Math.random()<.3)rw.push(mkFood(P(['bread','water','stew','meat','tea'])));
  const a2=Math.round((20+e.l*8)*(1+fx('loot')/100));RK.forEach(k=>addRes(k,a2));rw.forEach(addItem);gain(xp);
  const txt=`🏆 Sieg! ${xp} EP, 🪵🧱⛓️ je ${a2}${rw.length?', Beute: '+rw.map(x=>x.n).join(', '):''}.`;ev.push({t:txt,hh:Math.max(1,hh),mh:0});lg(`🏆 ${m.n} besiegt. ${txt}`)}
 else{S.wt=Math.max(0,S.wt-10);S.fd=Math.max(0,S.fd-10);const txt='😵 Bewusstlos! Der Wirt trägt dich heim (Durst und Hunger −10).';ev.push({t:txt,hh:0,mh});lg(`❌ ${m.n} war zu stark. ${txt}`)}
 S.enc[i]=genEnc()[0];F.timer=setInterval(()=>{F.i++;if(F.i>=F.ev.length-1){F.i=F.ev.length-1;F.done=true;clearInterval(F.timer)}drawFight();live()},650);
}
function drawFight(){const e=$('#fight');if(!e||!F)return;const v=F.ev[F.i];
 e.innerHTML=`<div class="card"><div class="row"><span class="ic">${CL[S.hero.c].ic}</span><div class="g"><div class="bar"><i style="width:${Math.max(0,v.hh/F.HP*100)}%"></i></div></div><span class="ic">${F.m.ic}</span><div class="g"><div class="bar"><i style="width:${Math.max(0,v.mh/F.hp0*100)}%;background:linear-gradient(#a070e0,#4a2a80)"></i></div></div></div>${F.ev.slice(Math.max(0,F.i-3),F.i+1).map(x=>`<p>${E(x.t)}</p>`).join('')}${F.done?'<div class="row"><button class="b" data-a="fdone">Weiter</button></div>':''}</div>`}

function report(t,ok,lines){const r={t,ok,lines,at:Date.now()};S.reports.unshift(r);S.reports.length=Math.min(S.reports.length,20);S.rq.push(r)}
function resolve(a){
 const c=S.camps[a.c],H=hAtk(),lord=(a.u.fs||0)>0;let atk=H,n=0;const L=[`Ziel: ${c.n} (${LV[c.lv|0][1]} ${LV[c.lv|0][0]}, ${GT[c.g].ic} ${GT[c.g].n})`];
 for(const k in a.u){if(!a.u[k])continue;const v=a.u[k]*U[k].a;atk+=v;n+=a.u[k];L.push(`${U[k].ic} ${a.u[k]}× ${U[k].n}: Angriff ${v}`)}
 L.push(`${CL[S.hero.c].ic} ${S.hero.n}: Angriff ${H}`);
 const def=campDef(a.c),win=atk>def,r=res(c.g),f=(win?Math.min(.8,.6*def/atk):.75)*(1-r);let loss=0,carry=0;const lr=[];
 for(const k in a.u){const l=Math.round(a.u[k]*f);loss+=l;S.u[k]+=a.u[k]-l;carry+=(a.u[k]-l)*U[k].cr;if(l)lr.push(`${U[k].ic} ${l}`)}
 if(lord&&a.u.fs-Math.round(a.u.fs*f)<=0)L.push('⚰️ Der Fürst ist gefallen.');L.push(`Gesamtangriff ${atk} gegen Verteidigung ${def}.`,`${GT[c.g].ic}-Widerstand ${Math.round(r*100)} %: senkt deine Verluste.`);
 if(win){const base=Math.round(70*1.6**tier(a.c)*(S.hero.c==='S'?1.3:1)*(1+fx('loot')/100)),each=Math.min(base,Math.floor(carry/3)),coin=2+Math.round(tier(a.c)*3),xp=10*(a.c+1);
  RK.forEach(k=>addRes(k,each));addCoin({b:coin});c.w++;c.pw=Math.max(20,Math.round(c.pw*.8));gain(xp);
  L.push('✅ Sieg!',`Beute: 🪵${each} 🧱${each} ⛓️${each} und ${coin} 🥉.`,`Verluste: ${lr.join(' · ')||'keine'}.`,'Die Verteidiger des Dorfes sind geschwächt (Stärke −20 %).',`${S.hero.n} erhält ca. ${xp} EP.`);
  if(lord){const cut=25+R(11);c.loy-=cut;c.wl=(c.wl|0)+2;c.pw=Math.round(c.pw*1.1);L.push(`👑 Der Fürst erschüttert die Herrschaft: Loyalität −${cut} % (jetzt ${Math.max(0,c.loy)} %).`,'Das Dorf rüstet nach: Wälle +2, die Verteidigung wächst.')}
  if(c.loy<=0){c.own=true;c.rel='n';gain(30*(a.c+1));L.push(`🚩 ${c.n} ist erobert und liefert nun Rohstoffe.`)}
  lg(`✅ ${P(WIN).replace('%c',c.n)}`);toast('Sieg bei '+c.n+'!')}
 else{gain(2);L.push('❌ Niederlage.',`Verluste: ${lr.join(' · ')||'keine'} (${loss} von ${n}).`);lg(`❌ ${P(LOSE).replace('%c',c.n)}`);toast('Niederlage bei '+c.n)}
 report((win?'✅ Sieg: ':'❌ Niederlage: ')+c.n,win,L)}
function incoming(a){const c=S.camps[a.c],r=res(c.g),pw=Math.round(a.p*(1-r)),df=homeDef();
 const tr=Object.keys(U).filter(k=>S.u[k]>0).map(k=>`${U[k].ic} ${S.u[k]}× → ${S.u[k]*U[k].d}`);
 const L=[`Angreifer: ${c.n} (${GT[c.g].ic} ${GT[c.g].n}${c.rel==='war'?', im Krieg mit dir':''})`,`Angriffsstärke ${a.p}${r?`, nach deinem ${Math.round(r*100)} % Widerstand ${pw}`:''}.`,`Verteidiger: ${tr.length?tr.join(', '):'keine Truppen'} · ${CL[S.hero.c].ic} Held ${hDef()}`];
 if(S.wt<=0||S.fd<=0)L.push('😩 Durst/Hunger: Verteidigung halbiert.');if(S.en<=0)L.push('😴 Erschöpft: Verteidigung −30 %.');
 if(S.b.wall||S.b.mauer)L.push(`Wall und Mauer: +${S.b.wall*5+S.b.mauer*8} % Abwehr.`);L.push(`Deine Abwehr gesamt: ${df}.`);const wl0=S.wp,wlr=pw>df?.4:.15;if(wl0>0){const al=Math.min(wl0,Math.round(wl0*wlr+Math.random()*.9));S.wp-=al;L.push(`🗼 ${wl0} Bogenschützen kämpften auf der Mauer, ${al} gefallen, ${S.wp} noch auf den Zinnen. Gefallene Plätze musst du im Dorf-Tab neu besetzen.`)}
 if(pw>df){RK.forEach(k=>{S.r[k]=Math.floor(S.r[k]*.8)});let l=0;const lr=[];for(const k in U){const x=Math.round(S.u[k]*.25);S.u[k]-=x;l+=x;if(x)lr.push(`${U[k].ic} ${x}`)}
  L.push('❌ Der Überfall gelingt.','20 % deiner Rohstoffe wurden geplündert.',`Verluste: ${lr.join(' · ')||'keine'}.`);lg(`🔥 ${c.n} hat dich überfallen!`);toast('Überfall von '+c.n+'!');report('❌ Überfall von '+c.n,false,L)}
 else{gain(5+a.c*2);c.pw=Math.max(20,Math.round(c.pw*.9));L.push('🛡️ Du wehrst den Angriff ab!',`Die Angreifer verlieren Stärke (−10 %), ${S.hero.n} erhält Erfahrung.`);lg(`🛡️ Überfall von ${c.n} abgewehrt!`);toast('Überfall abgewehrt!');report('🛡️ Abwehr: '+c.n,true,L)}}
function finishQuest(){const q=S.q;S.q=null;addRes(q.res,q.amt);gain(q.xp);let it='';
 if(Math.random()<.2+q.dur/3600*.5+luck()*.01){const x=genDrop(0);addItem(x);it=' Bonus: '+x.n+'.'}
 lg(`📜 „${q.t}“ erledigt. ${q.x} Lohn: ${RN[q.res]}${q.amt}, ${q.xp} EP.${it}`);toast('Quest erledigt!');S.qo=genQ()}

const dd=(a,b)=>{const i=S.camps.indexOf(a),j=S.camps.indexOf(b);return Math.hypot(PT[i][0]-PT[j][0],PT[i][1]-PT[j][1])};
function aiWar(now){for(let n=0;n<2&&now>=S.nw;n++){S.nw+=240000+R(240000);const ai=S.camps.filter(c=>!c.own);if(ai.length<2)continue;
 const a=P(ai),t=P(ai.filter(x=>x!==a).sort((p,q)=>dd(a,p)-dd(a,q)).slice(0,3)),A=a.pw*(.8+Math.random()*.4),T=t.pw*(.8+Math.random()*.4);
 if(A>T){t.pw=Math.max(20,Math.round(t.pw*.82));a.pw=Math.round(a.pw*1.06);lg(`⚔️ ${a.n} überfällt ${t.n} und plündert es aus.`)}else{a.pw=Math.max(20,Math.round(a.pw*.92));lg(`🛡️ ${t.n} wehrt einen Angriff von ${a.n} ab.`)}}
 if(now>S.nw+3600000)S.nw=now+300000;return false}
function devTick(now){let ch=false;
 for(let n=0;n<3&&now>=S.ng;n++){S.ng+=900000;S.camps.forEach(x=>{if(!x.own){x.pw=Math.round(x.pw*1.03);x.loy=Math.min(100,x.loy+5);if(Math.random()<.5)x.wl=Math.min(12,(x.wl|0)+1)}});const c=S.camps.filter(c=>!c.own&&c.lv<4);if(c.length){const v=P(c);v.lv++;v.pw=Math.round(v.pw*1.15);lg(`📈 ${v.n} ist gewachsen: jetzt ${LV[v.lv][1]} ${LV[v.lv][0]}.`);ch=true}}
 if(now>S.ng+3600000)S.ng=now+900000;
 for(let n=0;n<3&&now>=S.ns;n++){S.ns+=1800000;if(S.camps.length<PT.length){const g=P(Object.keys(GT));let nm;do{nm=P(NP)+P(NS)}while(S.camps.some(c=>c.n===nm));S.camps.push({n:nm,g,w:0,loy:100,own:false,lv:0,rel:'n',tr:{u:0,t:0},cd:0,wl:0,pw:newPw(S.camps.length,0)});lg(`🗺️ Neues Dorf entdeckt: ${nm}.`);toast('🗺️ Neues Dorf: '+nm);ch=true}}
 if(now>S.ns+3600000)S.ns=now+1800000;return ch}
function autoTick(now){let ch=false;const A=S.auto;
 if(!S.bq&&S.bqq.length){const k=S.bqq[0],c=bc(k);if(!reqOk(k)){S.bqq.shift();lg(`🤖 ${B[k].n} aus der Schleife entfernt: ${reqTxt(k)}.`);ch=true}else if(afford(c)){pay(c);S.bq={k,start:now,end:now+bt(k)*1000};S.bqq.shift();lg(`🤖 Bauschleife: ${B[k].n} wird ausgebaut.`);ch=true}}
 for(const k in U){const tgt=A.rec[k]||0;if(!tgt||U[k].lord||S.b.barr<U[k].need||S.tq.length>=3)continue;
  const have=S.u[k]+S.tq.filter(t=>t.u===k).reduce((a,t)=>a+t.n,0)+S.at.reduce((a,x)=>a+(x.u[k]||0),0),n=Math.min(5,tgt-have,Math.floor((popMax()-pop())/U[k].p));
  if(n>0&&afford(uc(k,n))){pay(uc(k,n));S.tq.push({u:k,n,st:now,end:now+n*ut(k)*1000});lg(`🤖 ${n}× ${U[k].n} in Ausbildung.`);ch=true}}
 if(A.eat){const use=f=>{const i=S.inv.findIndex(it=>it.k==='f'&&FD[it.id][f]>0);if(i<0)return false;const it=S.inv[i],d=FD[it.id];S.wt=Math.min(100,S.wt+d.w);S.fd=Math.min(100,S.fd+d.f);S.mut=Math.min(mutMax(),S.mut+d.mu);S.en=Math.min(100,S.en+(d.en||0));S.wm=Math.min(100,S.wm+(d.wm||0));S.inv.splice(i,1);lg(`🤖 ${it.n} verzehrt.`);return true};
  if(S.wt<30){if(now>=S.well){S.wt=Math.min(100,S.wt+30);S.well=now+WELL;lg('🤖 Wasser am Brunnen geschöpft.');ch=true}else if(use('w'))ch=true}
  if(S.fd<30&&use('f'))ch=true;
  if(S.wm<30&&night()&&now>=S.fire&&S.r.h>=15){S.r.h-=15;S.fire=now+FIRE;lg('🤖 Lagerfeuer entzündet.');ch=true}}
 if(A.q&&!S.q&&S.qo.length&&!blocked('quest')){const q=S.qo.filter(x=>x.mut<=S.mut).sort((a,b)=>a.mut-b.mut)[0];if(q){S.mut-=q.mut;S.q=Object.assign({},q,{start:now,end:now+q.dur*1000});S.en=Math.max(0,S.en-10);lg(`🤖 Quest angenommen: ${q.t}`);ch=true}}
 return ch}
function tick(){
 const now=Date.now(),dt=Math.min((now-S.t)/1000,28800);S.t=now;if(!S.hero)return;
 if(dt>5)S.inc=[];
 const pm=((S.wt<=0||S.fd<=0)?.8:1)*(1+fx('prod')/100)*(1-Math.min(.36,.06*wars()));
 for(const k of ['wood','clay','iron']){const r=B[k].r;if(S.r[r]<cap())S.r[r]=Math.min(cap(),S.r[r]+rate(k)*dt*pm)}
 S.camps.forEach((c,i)=>{if(c.own){const r=RK[i%3];if(S.r[r]<cap())S.r[r]=Math.min(cap(),S.r[r]+.3*SP.prod*1.3**tier(i)*dt)}});
 S.mut=Math.min(mutMax(),S.mut+mutRegen()*dt);
 const ad=Math.min(dt,600),sm=1-Math.min(.6,fx('surv')/100),fl=now<S.fire,K=SP.surv;S.wt=Math.max(0,S.wt-.05*K*ad*sm);S.fd=Math.max(0,S.fd-.03*K*ad*sm);S.en=Math.min(100,Math.max(0,S.en-.012*K*ad*sm+(fl?.03*ad:0)));S.wm=Math.min(100,Math.max(0,S.wm+(fl?.05:night()?-.03*sm:.02)*ad));
 let ch=false;
 if(S.aggr>0){S.nat-=Math.min(dt,3);if(S.nat<=0&&!S.inc.length&&S.hero.lv>=2){const pool=[];S.camps.forEach((c,i)=>{if(c.own||c.rel==='peace'||c.rel==='trade')return;for(let q=0;q<(c.rel==='war'?3:1);q++)pool.push(i)});
  if(pool.length){const c=P(pool);S.inc.push({c,p:Math.round(campDef(c)*.6*(S.camps[c].rel==='war'?1.2:1)),end:now+WARN});lg(`⚠️ ${S.camps[c].n} greift in ${WARN/60000} Min. an!`);toast('⚠️ Angriff naht!');ch=true}
  S.nat=(900+R(600))/[0,.5,1,2][S.aggr]/(1+.15*owned()+.3*wars())}}
 if(S.bq&&S.bq.end<=now){S.b[S.bq.k]++;lg(`🏗️ ${B[S.bq.k].n} ist jetzt Stufe ${S.b[S.bq.k]}.`);toast(B[S.bq.k].n+' fertig!');S.bq=null;ch=true}
 S.tq=S.tq.filter(t=>{if(t.end<=now){S.u[t.u]+=t.n;lg(`🪖 ${t.n}× ${U[t.u].n} marschbereit.`);ch=true;return false}return true});
 S.at=S.at.filter(a=>{if(a.end<=now){resolve(a);ch=true;return false}return true});
 S.inc=S.inc.filter(a=>{if(a.end<=now){incoming(a);ch=true;return false}return true});
 if(devTick(now))ch=true;aiWar(now);if(autoTick(now))ch=true;
 if(S.q&&S.q.end<=now){finishQuest();ch=true}
 if(ch&&!F)render();live();
}
function live(){
 if(!S.hero)return;
 RK.forEach(k=>$('#r'+k).textContent=Math.floor(S.r[k]));$('#cap').textContent=cap();
 document.querySelectorAll('.tb').forEach(e=>{const st=+e.dataset.s,en=+e.dataset.e,n=Date.now(),pc=Math.min(100,Math.max(0,(n-st)/(en-st)*100));if(e.dataset.x&&n>en){e.remove();return}e.firstChild.style.width=pc+'%';e.querySelector('b').textContent=ft((en-n)/1000)+' · '+Math.floor(pc)+' %'});
 const hm=Object.keys(U).reduce((a,k)=>a+S.u[k],0),ou=S.at.reduce((a,x)=>a+Object.values(x.u).reduce((p,q)=>p+q,0),0),tr2=S.tq.reduce((a,t)=>a+t.n,0);$('#army').textContent=`🪖 Im Dorf: ${hm} (${Object.keys(U).filter(k=>S.u[k]>0).map(k=>U[k].ic+' '+S.u[k]).join(' · ')||'–'}) · ⚔️ unterwegs: ${ou} · im Drill: ${tr2}${S.wp?` · 🗼 ${S.wp} auf der Mauer`:''}`;
 const hh_=S.hero,nx=xpN(hh_.lv);$('#xpb').style.width=(hh_.xp/nx*100)+'%';$('#xpt').textContent=`EP ${hh_.xp}/${nx}`;{const T=tod(),hh=Math.floor(T.h),mm=Math.floor((T.h-hh)*60);$('#dn').textContent=`${T.icon} ${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')} · ${T.nextName} in ${ft(T.secs)}`;document.body.dataset.tod=T.key}
 
 document.querySelectorAll('[data-bar]').forEach(e=>e.style.width=Math.max(0,S[e.dataset.bar])+'%');
 document.querySelectorAll('[data-cd]').forEach(e=>e.textContent=ft((+e.dataset.cd-Date.now())/1000));
 document.querySelectorAll('[data-cost]').forEach(e=>{e.disabled=!afford(e.dataset.cost.split(',').map(Number))||(e.dataset.bq&&!!S.bq)});
 
 const mb=$('#mutb');if(mb){mb.style.width=(S.mut/mutMax()*100)+'%';$('#mutt').textContent=Math.floor(S.mut)+' / '+mutMax()}
}
function eff(k,l){const b=B[k];if(b.r)return rate(k,l).toFixed(1)+'/s';
 if(k==='store')return cap(l)+' Platz';if(k==='farm')return popMax(l)+' Bauern';
 if(k==='barr')return l?Math.round((1-0.92**(l-1))*100)+' % schneller':'gesperrt';if(k==='wall')return '+'+l*5+' % Abwehr';if(k==='mauer')return '+'+l*8+' % Abwehr, '+l*4+' Plätze';if(k==='rally')return l>=3?'Fürsten möglich':'Fürst ab Stufe 3';return 'Mut max. '+mutMax(l)}
const chips=c=>c.map((v,i)=>`<span class="ch">${RN[RK[i]]} ${v}</span>`).join('');
const hb=n=>`<b class="hd" style="font-size:20px">${n}</b>`;

const tbar=(label,st,en,cls='',tmp='')=>`<div class="tb ${cls}" data-s="${Math.round(st)}" data-e="${Math.round(en)}" ${tmp?'data-x="1"':''}><i></i><span>${label} · <b></b></span></div>`;
function hdrTimers(){const o=[];
 if(S.bq)o.push(tbar(`🔨 ${B[S.bq.k].n} → Stufe ${S.b[S.bq.k]+1}`,S.bq.start||S.bq.end-bt(S.bq.k)*1000,S.bq.end,'c'));
 if(S.q)o.push(tbar('📜 '+E(S.q.t),S.q.start||S.q.end-S.q.dur*1000,S.q.end,'c'));
 S.inc.forEach(a=>o.push(tbar(`⚠️ ${E(S.camps[a.c].n)} greift an`,a.end-WARN,a.end,'r c')));
 S.tq.forEach(t=>o.push(tbar(`🪖 ${t.n}× ${U[t.u].n}`,t.st||t.end-t.n*ut(t.u)*1000,t.end,'g c')));
 S.at.forEach(a=>o.push(tbar(`⚔️ ${E(S.camps[a.c].n)}`,a.st||a.end-dist(a.c)*2000,a.end,'b c')));
 $('#tm').innerHTML=o.slice(0,4).join('')}
const qlv=k=>S.b[k]+(S.bq&&S.bq.k===k?1:0)+S.bqq.filter(x=>x===k).length;
const qTarget=i=>{const k=S.bqq[i];return S.b[k]+(S.bq&&S.bq.k===k?1:0)+S.bqq.slice(0,i+1).filter(x=>x===k).length};
function wallCard(){const sl=S.b.mauer*4,free=sl-S.wp;
 if(!S.b.mauer)return '<div class="card"><h2>🗼 Mauerbesatzung</h2><p>Baue Wall (Stufe 3) und danach eine Mauer, um Bogenschützen auf den Zinnen zu platzieren. Wall: +5 % Abwehr je Stufe, Mauer: +8 % und 4 Plätze je Stufe.</p></div>';
 return `<div class="card"><h2>🗼 Mauerbesatzung</h2><p>Plätze: <b>${S.wp}/${sl}</b> · Bogenschützen im Dorf: <b>${S.u.bw}</b> · Wall und Mauer: +${S.b.wall*5+S.b.mauer*8} % Abwehr</p><p>Platzierte Bogenschützen verteidigen mit ${Math.round(U.bw.a*1.5)} statt ${U.bw.d} Punkten, fallen aber im Kampf. Gefallene Plätze musst du nach Angriffen neu besetzen.</p>${free>0&&S.u.bw>0?`<p style="color:var(--bad)">${free} Plätze sind frei.</p>`:''}<div class="row" style="margin-top:6px"><button class="b s" data-a="wp" data-n="1">＋1 platzieren</button><button class="b s" data-a="wp" data-n="5">＋5</button><button class="b s" data-a="wp" data-n="all">Alle</button><button class="b s" data-a="wpc">Abziehen</button></div></div>`}
function vDorf(){
 let h=(S.bqq.length?`<div class="card"><h2>🤖 Bauschleife</h2>${S.bqq.map((k,i)=>`<div class="row"><span>${B[k].ic} ${B[k].n} → Stufe ${qTarget(i)}</span><button class="b s" style="margin-left:auto" data-a="qdel" data-i="${i}">✕</button></div>`).join('')}<p>Startet automatisch, sobald nichts gebaut wird und die Rohstoffe reichen.</p></div>`:'')+Object.keys(B).map(k=>{const b=B[k],lv=S.b[k],c=bc(k),busy=S.bq&&S.bq.k===k;
 return `<div class="card"><div class="row"><span class="ic">${b.ic}</span><div class="g">${hb(b.n)} <span class="t">Stufe ${lv}</span><p>${b.d}</p>${reqOk(k)?'':`<p style="color:var(--bad)">${reqTxt(k)}</p>`}<p class="e">${eff(k,lv)} → ${eff(k,lv+1)}</p></div></div>
 <div class="row" style="margin-top:6px">${busy?`${tbar(`🔨 Ausbau → Stufe ${lv+1}`,S.bq.start||S.bq.end-bt(k)*1000,S.bq.end)}`:`${chips(c)}<span class="t">⏱ ${ft(bt(k))}</span><button class="b" data-a="build" data-k="${k}" data-cost="${c}" data-bq="1">${lv?'Ausbauen':'Bauen'}</button>`}<button class="b s" data-a="qadd" data-k="${k}">＋ Schleife (→ Stufe ${qlv(k)+1})</button></div></div>`}).join('');
 h+=wallCard()+`<h2>Truppen</h2><p class="t">Bauern: ${pop()} / ${popMax()}</p>`+Object.keys(U).map(k=>{const u=U[k],ok=S.b.barr>=u.need&&(!u.lord||S.b.rally>=3);
  return `<div class="card"><div class="row"><span class="ic">${u.ic}</span><div class="g">${hb(u.n)} <span class="t">zu Hause: ${S.u[k]}</span><p>Angriff ${u.a} · Abwehr ${u.d} · Tragkraft ${u.cr} · ⏱ ${ut(k).toFixed(1)} s je Einheit</p></div></div>
  <div class="row" style="margin-top:6px">${ok?`${chips(uc(k))}${u.g?`<span class="ch">🥇 ${u.g}</span>`:''}<span style="margin-left:auto" class="row">${(u.lord?[1]:[1,5]).map(n=>`<button class="b s" data-a="train" data-u="${k}" data-n="${n}" data-cost="${uc(k,n)}">+${n} · ${ft(ut(k)*n)}</button>`).join('')}</span>`:`<span class="t">🔒 Kaserne Stufe ${u.need}${u.lord?' und Versammlungsplatz Stufe 3':''} nötig</span>`}</div></div>`}).join('');
 if(S.tq.length)h+=`<div class="card"><h2>Im Drill</h2>${S.tq.map(t=>tbar(`🪖 ${t.n}× ${U[t.u].n}`,t.st||t.end-t.n*ut(t.u)*1000,t.end,'g')).join('')}</div>`;
 return h}

const px=i=>[(PT[i][0]-160)*1.4+240,(PT[i][1]-150)*1.4+220];
const vb=()=>`${mz.x-240/mz.z} ${mz.y-220/mz.z} ${480/mz.z} ${440/mz.z}`;
function svgMap(){
 let s=`<svg id="map" viewBox="${vb()}" style="width:100%;aspect-ratio:480/440;display:block;border:2px solid var(--line);border-radius:4px;background:var(--map);touch-action:none" role="img" aria-label="Karte der Nachbardörfer"><g opacity=".7"><ellipse cx="90" cy="250" rx="40" ry="22" fill="var(--forest)"/><ellipse cx="400" cy="270" rx="46" ry="24" fill="var(--forest)"/><ellipse cx="290" cy="360" rx="34" ry="17" fill="var(--forest)"/><ellipse cx="170" cy="110" rx="30" ry="15" fill="var(--forest)"/><path d="M0 70 Q120 110 230 70 T480 95" stroke="#2f5d8a" stroke-width="10" fill="none"/></g>`;
 S.camps.forEach((c,i)=>{const [x,y]=px(i),a=S.inc.some(q=>q.c===i);s+=`<line x1="240" y1="220" x2="${x}" y2="${y}" stroke="${a?'var(--bad)':'var(--line)'}" stroke-width="${a?4:2}" stroke-dasharray="6 5"/>`});
 S.camps.forEach((c,i)=>{const [x,y]=px(i);s+=`<g data-a="sel" data-c="${i}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="${i===sel?20:17}" fill="${c.own?'#c9a24a':GT[c.g].c}" stroke="${i===sel?'#fff':RELC[c.rel||'n']}" stroke-width="${i===sel?4:3}"/><text x="${x}" y="${y}" font-size="${14+(c.lv|0)*2}" text-anchor="middle" dominant-baseline="central">${LV[c.lv|0][1]}</text>${c.own?`<text x="${x+13}" y="${y-13}" font-size="13">🚩</text>`:''}<text x="${x}" y="${y+30}" font-size="10" font-weight="800" text-anchor="middle" fill="var(--ink)">${E(c.n)} · ${LV[c.lv|0][0]}</text></g>`});
 return s+`<circle cx="240" cy="220" r="19" fill="#c9a24a" stroke="#000" stroke-width="3"/><text x="240" y="220" font-size="20" text-anchor="middle" dominant-baseline="central">🏠</text></svg>`}
let sendSel={},tradeSel={o:'h',w:'l',n:50};
const relTxt=c=>({n:'😐 Neutral',war:'⚔️ Krieg',peace:'🕊️ Frieden',trade:'🤝 Handelspakt'}[c.rel||'n']);
const wars=()=>S.camps.filter(c=>!c.own&&c.rel==='war').length;
const peaceP=i=>{const c=S.camps[i];return Math.min(.9,Math.max(.1,.4+(armyAtk()/Math.max(1,campDef(i))-1)*.25-(c.rel==='war'?.15:0)+(S.rep-50)/200))};
const pctSel=()=>{let a=0,b=0;for(const k in U){a+=sendSel[k]||0;b+=S.u[k]}return b?Math.round(a/b*20)*5:0};
function sumSend(){let n=0,atk=0,slow=0,sk='';for(const k in U){const v=Math.min(sendSel[k]||0,S.u[k]);if(v>0){n+=v;atk+=v*U[k].a;if(U[k].s>=slow){slow=U[k].s;sk=k}}}
 if(!n)return 'Wähle Truppen aus.';const tot=atk+hAtk(),d=campDef(sel),one=dist(sel)*SP.travel*slow;
 return `Truppen: <b>${n}</b> · Angriff <b>${tot}</b> (inkl. Held) gegen <b>${d}</b> – ${tot>d*1.5?'sehr gute Chancen':tot>d?'knapper Sieg':'riskant'}<br>⏱ Hinweg ${ft(one)} (langsamste Truppe ${U[sk].ic}), Rückkehr nach ${ft(2*one)}${sendSel.fs>0?'<br>👑 Fürst dabei: Bei einem Sieg sinkt die Loyalität des Dorfes.':''}`}
const updSend=()=>{const e=$('#ssum');if(e)e.innerHTML=sumSend()};
function sliderInput(e){const t=e.target;if(t.classList&&t.classList.contains('ua')){sendSel[t.dataset.u]=+t.value;const n=$('#un_'+t.dataset.u);if(n)n.textContent=t.value;updSend();return true}
 if(t.id==='gsc'){document.querySelectorAll('.ua').forEach(x=>{const v=Math.round(S.u[x.dataset.u]*t.value/100);x.value=v;sendSel[x.dataset.u]=v;const n=$('#un_'+x.dataset.u);if(n)n.textContent=v});updSend();return true}return false}
function attackCard(){const ks=Object.keys(U).filter(k=>S.u[k]>0),bl=blocked('attack');
 if(!ks.length)return '<div class="card"><h2>⚔️ Angriff</h2><p>Keine Truppen im Dorf. Bilde Truppen in der Kaserne aus.</p></div>';
 return `<div class="card"><h2>⚔️ Angriff planen</h2>${bl?`<div class="warn">${bl}</div>`:''}<p>Menge aller Truppen (Skala):</p><input type="range" id="gsc" min="0" max="100" step="5" value="${pctSel()}" aria-label="Anteil der Truppen"><p style="margin-top:6px">Oder je Truppenart einstellen:</p>${ks.map(k=>`<div class="row" style="margin:4px 0"><span>${U[k].ic} ${U[k].n}</span><input type="range" class="ua" data-u="${k}" min="0" max="${S.u[k]}" value="${sendSel[k]||0}" style="flex:1 1 90px" aria-label="${U[k].n}"><b id="un_${k}">${sendSel[k]||0}</b><span class="t">/${S.u[k]} · ⏱ ${ft(dist(sel)*SP.travel*U[k].s)}</span></div>`).join('')}<p id="ssum" style="color:var(--ink);margin-top:6px">${sumSend()}</p><div class="row" style="margin-top:6px"><button class="b" data-a="send">⚔️ Losschicken</button></div></div>`}
function diploCard(c,rel){const def=campDef(sel),t=Math.round(40+tier(sel)*30),free=armyAtk()>=2*def,pc=Math.round(peaceP(sel)*100);let b='';
 if(rel==='n')b=`<button class="b s" data-a="peace">🕊️ Frieden anbieten · ${pc} %</button><button class="b s" data-a="war">⚔️ Krieg erklären</button>`;
 else if(rel==='war')b=`<button class="b s" data-a="peace">🕊️ Frieden erbitten · ${pc} %${free?' · kein Tribut':` · Tribut 🪵🧱⛓️ je ${t}`}</button>`;
 else if(rel==='peace')b='<button class="b s" data-a="pact">🤝 Handelspakt schließen</button><button class="b s" data-a="war">⚔️ Frieden brechen (Krieg)</button>';
 else b='<button class="b s" data-a="unpact">Pakt kündigen</button><button class="b s" data-a="war">⚔️ Vertrag brechen (Krieg)</button>';
 return `<div class="card"><h2>🕊️ Diplomatie</h2><p>Beziehung: ${relTxt(c)} · Dein Ruf: ${S.rep}/100</p><div class="row" style="margin-top:6px">${b}</div><p>Frieden schützt dich vor Angriffen dieses Dorfes. Ein Überfall auf ein neutrales Dorf bedeutet Krieg. Ein gebrochener Vertrag kostet Ruf.</p></div>`}
function tradeCard(c){const T=tradeSel,left=Date.now()>c.tr.t?200:200-c.tr.u,bt2=(f,v,l)=>`<button class="b s ${T[f]===v?'on':''}" data-a="tset" data-f="${f}" data-v="${v}">${l}</button>`;
 return `<div class="card"><h2>🤝 Handelspakt</h2><p>Tausche 1:1. Bis zu 200 Rohstoffe je 15 Minuten, noch ${left}.</p><p>Ich biete:</p><div class="row">${RK.map(k=>bt2('o',k,RN[k])).join('')}</div><p>Ich erhalte:</p><div class="row">${RK.map(k=>bt2('w',k,RN[k])).join('')}</div><p>Menge:</p><div class="row">${[25,50,100].map(n=>`<button class="b s ${T.n===n?'on':''}" data-a="tset" data-f="n" data-v="${n}">${n}</button>`).join('')}<button class="b" data-a="trade">Tauschen ${T.n} ${RN[T.o]} → ${RN[T.w]}</button></div></div>`}
function warCard(){const w=wars();return `<div class="card"><h2>⚔️ Kriegsfolgen</h2><p>Aktive Kriege: <b>${w}</b> · Ruf ${S.rep}/100</p>${w?`<p style="color:var(--bad)">Kriegswirtschaft: Produktion −${Math.min(36,6*w)} %. Kriegsgegner greifen dich dreimal so oft und 20 % stärker an.</p>`:'<p class="e">Kein Krieg: volle Produktion.</p>'}<p>Siegfrieden: Bist du doppelt so stark wie der Gegner, entfällt der Tribut. Wer Verträge bricht, verliert Ruf, und Handelspartner können abspringen.</p></div>`}
function vKarte(){
 const c=S.camps[sel],g=GT[c.g],d=campDef(sel),rel=c.rel||'n';for(const k in sendSel)sendSel[k]=Math.min(sendSel[k]||0,S.u[k]||0);
 let h=svgMap()+`<div class="row" style="margin:8px 0"><button class="b s" data-a="zoom" data-v="1">＋ Zoom</button><button class="b s" data-a="zoom" data-v="-1">－</button><button class="b s" data-a="zoom" data-v="0">Alles</button><button class="b s" data-a="zoom" data-v="c">Auswahl</button></div><p class="t">Karte ziehen zum Verschieben. ${S.camps.length} Dörfer, neue entstehen mit der Zeit. Randfarbe: rot Krieg, blau Frieden, grün Handelspakt.</p>`;
 h+=`<div class="card"><div class="row"><span class="ic">${c.own?'🚩':LV[c.lv|0][1]}</span><div class="g">${hb(E(c.n))}<p>${g.ic} ${g.n}-Gegner · dein Widerstand ${Math.round(res(c.g)*100)} %</p><p>${LV[c.lv|0][1]} ${LV[c.lv|0][0]} · Entwicklung ${(c.lv|0)+1}/5${c.own?'':' – wächst mit der Zeit'}</p>`;
 if(c.own)h+=`<p class="e">Erobert: +${(.3*SP.prod*1.3**tier(sel)).toFixed(2)} ${RN[RK[sel%3]]}/s</p></div></div></div>`;
 else{h+=`<p>${relTxt(c)} · Verteidigung <b>${d}</b> (Wälle und Mauern +${(c.wl|0)*6} %) · Beute ~${Math.round(70*1.6**tier(sel))}</p><div class="bar x"><i style="width:${Math.max(0,c.loy)}%"></i></div><p>Loyalität ${Math.max(0,c.loy)} % – nur ein Fürst (👑) kann sie senken. Bei 0 % wird das Dorf übernommen.</p></div></div></div>`;h+=attackCard()+diploCard(c,rel);if(rel==='trade'||rel==='peace')h+='<div class="card"><p>🛒 Handel mit diesem Partner findest du im Tab „Händler“.</p></div>'}
 h+=warCard();
 if(S.at.length)h+=`<div class="card"><h2>Unterwegs</h2>${S.at.map(a=>tbar(`⚔️ ${E(S.camps[a.c].n)} (zurück in)`,a.st||a.end-trSec(a.c,a.u)*2000,a.end,'b')).join('')}</div>`;
 if(S.inc.length)h+=`<div class="card"><h2>Angriff naht</h2>${S.inc.map(a=>tbar(`⚠️ ${E(S.camps[a.c].n)} greift an`,a.end-WARN,a.end,'r')+`<p>Angriffsstärke ${a.p} gegen deine Abwehr ${homeDef()}</p>`).join('')}</div>`;
 return h}
function blocked(k){const hung=S.wt<=0||S.fd<=0;
 if(k==='quest'||k==='fight'){if(hung)return '😩 Du bist zu schwach: Durst/Hunger auf 0. Iss und trink erst etwas.';if(S.en<10)return '😴 Zu erschöpft (Energie unter 10). Ruh dich am Lagerfeuer aus oder iss etwas.';if(k==='fight'&&S.wm<=0)return '🥶 Dir ist zu kalt zum Kämpfen. Zünde ein Feuer an.'}
 if(k==='attack'){if(hung)return '😩 Deine Truppen marschieren nicht, solange Durst/Hunger bei 0 sind.';if(S.en<5)return '😴 Zu erschöpft, um Truppen zu führen.';if(S.wm<=0)return '🥶 Zu kalt zum Ausrücken. Zünde ein Feuer an.'}
 return ''}
function consHtml(){const o=[];[['quest','Quests'],['fight','Kämpfe'],['attack','Angriffe']].forEach(([k,n])=>{const m=blocked(k);if(m)o.push(`<p style="color:var(--bad)">${n} gesperrt: ${m}</p>`)});
 if(S.wt<=0||S.fd<=0)o.push('<p style="color:var(--bad)">Verteidigung nur halb so stark.</p>');if(S.en<=0)o.push('<p style="color:var(--bad)">Verteidigung −30 % durch Erschöpfung.</p>');return o.join('')}
const cv=()=>S.coin.b+10*S.coin.s+100*S.coin.g;
const setCv=v=>{S.coin={g:Math.floor(v/100),s:Math.floor(v%100/10),b:v%10}};
const addCoin=c=>setCv(cv()+(c.b||0)+10*(c.s||0)+100*(c.g||0));
const coinsFor=it=>{const v=it.v,r=it.r||0;return r===0?{b:3+v}:r===1?{b:10+2*v,s:1}:r===2?{s:3+(v/3|0)}:r===3?{g:1+(v/12|0),s:3}:{g:1+(v/10|0),s:2}};
const coinTxt=c=>[c.g&&`🥇${c.g}`,c.s&&`🥈${c.s}`,c.b&&`🥉${c.b}`].filter(Boolean).join(' ')||'–';
const dustFor=g=>[0,2,6,15][g.lv];
const gemChance=n=>{const m=n/25-1;return{p3:Math.min(.4,.01+m*.015),p2:Math.min(.5,.1+m*.04)}};
let tradeP=-1;
const partners=()=>S.camps.map((c,i)=>i).filter(i=>{const c=S.camps[i];return !c.own&&(c.rel==='peace'||c.rel==='trade')});
const coinV=v=>({g:Math.floor(v/100),s:Math.floor(v%100/10),b:v%10});
function genOffers(){const g=P(Object.keys(GT)),lv=Math.random()<.2?3:1+R(2);return[{k:'dust',n:4+R(7),p:0},{k:'gem',g,lv,p:[0,25,70,160][lv]},{k:'food',id:P(['stew','tea','meat','mead']),p:10}].map(x=>{if(x.k==='dust')x.p=x.n*3;return x})}
function vHandel(){const now=Date.now(),T=tradeSel;
 let o=`<div class="card"><p style="color:var(--ink)">🥉 ${S.coin.b} · 🥈 ${S.coin.s} · 🥇 ${S.coin.g}</p></div><h2>🛒 Marktstand</h2><div class="card"><p>Verkauft Verpflegung für Bronze.</p><div class="row">${[['water',2],['bread',4],['tea',4],['stew',8],['mead',6]].map(([id,p])=>`<button class="b s" data-a="buy" data-id="${id}" data-p="${p}">${FD[id].ic} ${FD[id].n} · 🥉${p}</button>`).join('')}</div></div><h2>🤝 Handel mit Partnern</h2>`;
 const ps=partners();
 if(!ps.length)return o+'<div class="card"><p>Du hast noch keine Friedens- oder Handelspartner. Biete einem Dorf auf der Karte Frieden an. Mit einem Handelspakt bekommst du bessere Preise.</p></div>';
 if(!ps.includes(tradeP))tradeP=ps[0];
 const c=S.camps[tradeP],pact=c.rel==='trade';if(!c.so||now>(c.sot||0)){c.so=genOffers();c.sot=now+1200000}
 const rate=pact?1:2,cap2=pact?200:100,left=now>c.tr.t?cap2:cap2-c.tr.u,bt2=(f,v,l)=>`<button class="b s ${T[f]===v?'on':''}" data-a="tset" data-f="${f}" data-v="${v}">${l}</button>`;
 o+=`<div class="card"><div class="row">${ps.map(i=>`<button class="b s ${i===tradeP?'on':''}" data-a="tp" data-i="${i}">${LV[S.camps[i].lv|0][1]} ${E(S.camps[i].n)}</button>`).join('')}</div><p style="margin-top:6px">${relTxt(c)} · ${pact?'Faire Preise (1:1) und 20 % Rabatt auf Sonderangebote.':'Ohne Handelspakt zahlst du 2:1. Schließe auf der Karte einen Handelspakt für 1:1 und Rabatt.'}</p></div>`;
 o+=`<div class="card"><h2>Rohstoffe tauschen</h2><p>Du zahlst ${rate}:1. Noch ${left} von ${cap2} Rohstoffen in diesem 15-Minuten-Fenster.</p><p>Ich erhalte:</p><div class="row">${RK.map(k=>bt2('w',k,RN[k])).join('')}</div><p>Ich biete:</p><div class="row">${RK.map(k=>bt2('o',k,RN[k])).join('')}</div><p>Menge, die ich erhalte:</p><div class="row">${[25,50,100].map(n=>`<button class="b s ${T.n===n?'on':''}" data-a="tset" data-f="n" data-v="${n}">${n}</button>`).join('')}<button class="b" data-a="trade">Tauschen: ${T.n*rate} ${RN[T.o]} → ${T.n} ${RN[T.w]}</button></div></div>`;
 o+=`<h2>Sonderangebote</h2><div class="card"><p>Neue Angebote in ${ft((c.sot-now)/1000)}.</p>${c.so.map((x,i)=>{const pr=Math.round(x.p*(pact?.8:1)),nm2=x.k==='dust'?`💠 ${x.n} Quarzstaub`:x.k==='gem'?`💎 ${GT[x.g].ic} ${GT[x.g].n}-Edelstein ${['I','II','III'][x.lv-1]}`:`${FD[x.id].ic} 2× ${FD[x.id].n}`;
  return `<div class="row" style="margin-top:6px"><div class="g">${nm2}<p>${coinTxt(coinV(pr))}</p></div><button class="b s" data-a="sbuy" data-i="${i}" ${x.sold?'disabled':''}>${x.sold?'Verkauft':'Kaufen'}</button></div>`}).join('')}</div>`;
 return o}
function vWerk(){const L=S.inv.map((it,i)=>[it,i]),gear=L.filter(x=>'wam'.includes(x[0].k)),gems=L.filter(x=>x[0].k==='g');
 let o=`<div class="card"><p style="color:var(--ink)">🥉 ${S.coin.b} · 🥈 ${S.coin.s} · 🥇 ${S.coin.g} · 💠 Quarzstaub ${S.dust}</p></div><h2>⚒️ Schmiede</h2><div class="card"><p>Zerlegt Ausrüstung und prägt Münzen: gewöhnlich und selten ergeben Bronze, episch Silber, legendär und Set Gold. 10 Bronze = 1 Silber, 10 Silber = 1 Gold.</p>`;
 o+=gear.length?gear.map(([it,i])=>`<div class="row" style="margin-top:6px"><span class="ic">${it.ic}</span><div class="g">${hb(nm(it))}<p>${RAR[it.r||0]} · ergibt ${coinTxt(coinsFor(it))}</p></div><button class="b s" data-a="smelt" data-i="${i}">Prägen</button></div>`).join(''):'<p>Keine Ausrüstung im Rucksack.</p>';
 if(gear.some(x=>(x[0].r||0)<2))o+='<div class="row" style="margin-top:8px"><button class="b" data-a="smeltall">Alles Gewöhnliche &amp; Seltene prägen</button></div>';
 o+=`</div><h2>🧙 Hexe</h2><div class="card"><p>Zerlegt Edelsteine zu Quarzstaub (I: 2, II: 6, III: 15). Aus genug Staub fertigt sie einen neuen Edelstein. Mehr Staub erhöht die Chance auf einen besseren, ein Fehlschlag mit einem einfachen Stein ist immer möglich.</p>`;
 o+=gems.length?gems.map(([it,i])=>`<div class="row" style="margin-top:6px"><span class="ic">💎</span><div class="g">${hb(nm(it))}<p>${istat(it)} · ergibt 💠 ${dustFor(it)}</p></div><button class="b s" data-a="dust" data-i="${i}">Zerlegen</button></div>`).join(''):'<p>Keine Edelsteine im Rucksack.</p>';
 o+=`<h2 style="font-size:18px;margin-top:10px">Edelstein fertigen</h2>${[25,50,100,200].map(n=>{const c=gemChance(n);return `<div class="row" style="margin-top:4px"><span>💠 ${n}</span><span class="t">III: ${Math.round(c.p3*100)} % · II: ${Math.round(c.p2*100)} % · sonst I</span><button class="b s" style="margin-left:auto" data-a="gemcraft" data-n="${n}" ${S.dust>=n?'':'disabled'}>Fertigen</button></div>`}).join('')}</div>`;
 return o}
const nm=it=>`<span style="color:${RC[it.r||0]}">${E(it.n)}</span>`;
function slotCard(k){const it=S.eq[k];
 if(!it)return `<div class="card"><div class="row"><span class="ic">${SIC[k]}</span><div class="g">${hb(SLOT[k])}<p>Leer – leg etwas aus dem Rucksack an.</p></div></div></div>`;
 const free=it.so-it.s.length;
 return `<div class="card"><div class="row"><span class="ic">${it.ic}</span><div class="g">${hb(nm(it))}<p style="color:${RC[it.r]}">${istat(it)}</p>${fxHtml(it)}${resHtml(it)}<div class="row" style="margin-top:4px">${it.s.map((x,j)=>`<button class="b s" data-a="unsock" data-s="${k}" data-j="${j}">${ua===k+j?'Zerstören?':GT[x.g].ic+['I','II','III'][x.lv-1]+' ✕'}</button>`).join('')}${Array(free).fill(0).map(()=>G!==null?`<button class="b s" data-a="sock" data-s="${k}">◯ Einsetzen</button>`:'<span class="ch">◯ leer</span>').join('')}</div></div></div></div>`}
const CATS=[['all','Alle'],['w','🗡️ Waffen'],['a','🛡️ Rüstung'],['m','📿 Amulette'],['g','💎 Steine'],['f','🍞 Verbrauch']];
let icat='all';
function vEquip(){const cnt=k=>k==='all'?S.inv.length:S.inv.filter(x=>x.k===k).length;
 let o=['w','a','m'].map(slotCard).join('')+`<div class="card"><p style="color:var(--ink)">🥉 ${S.coin.b} · 🥈 ${S.coin.s} · 🥇 ${S.coin.g} · 💠 Quarzstaub ${S.dust}</p></div><h2>Rucksack (${S.inv.length}/30)</h2><div class="row" style="margin-bottom:8px">${CATS.map(c=>`<button class="b s ${icat===c[0]?'on':''}" data-a="icat" data-c="${c[0]}">${c[1]} ${cnt(c[0])}</button>`).join('')}</div>`;
 if(G!==null)o+='<p class="e">Tippe bei einem Item auf „◯ Einsetzen“. Gesockelte Edelsteine lassen sich mit ✕ entfernen, werden dabei aber zerstört.</p>';
 const list=S.inv.map((it,i)=>[it,i]).filter(x=>icat==='all'||x[0].k===icat).sort((p,q)=>(q[0].r||0)-(p[0].r||0));
 if(!list.length)o+='<div class="card"><p>In dieser Kategorie ist nichts. Besiege Monster oder steig auf, um Beute zu finden.</p></div>';
 return o+list.map(([it,i])=>`<div class="card"><div class="row"><span class="ic">${it.ic}</span><div class="g">${hb(nm(it))}<p style="color:${RC[it.r||0]}">${istat(it)}${it.so?` · Sockel ${it.so}`:''}</p>${it.k==='g'||it.k==='f'?'':fxHtml(it)+resHtml(it)}</div>
 ${it.k==='g'?`<button class="b ${G===i?'on':''}" data-a="gem" data-i="${i}">${G===i?'Abbrechen':'Einsetzen'}</button>`:it.k==='f'?`<button class="b" data-a="use" data-i="${i}">Nutzen</button>`:`<button class="b s" data-a="eq" data-i="${i}">Anlegen</button>`}</div></div>`).join('')}
function vHeld(){const h=S.hero,c=CL[h.c],dm=dmul(),fl=Date.now()<S.fire,ef=Object.keys(FX).map(id=>[id,fx(id)]).filter(x=>x[1]);
 return `<div class="card"><div class="row"><span class="ic">${c.ic}</span><div class="g">${hb(E(h.n))} <span class="t">${c.n}, Stufe ${h.lv}</span><div class="bar x"><i style="width:${h.xp/(xpN(h.lv))*100}%"></i></div><p>${h.xp} / ${xpN(h.lv)} EP</p></div></div><p style="margin-top:4px">⚔️ Angriff ${hAtk()} · ❤️ Leben ${hHp()} · 🛡️ Abwehr ${hDef()} · 🍀 Glück ${luck()}</p><div class="row" style="margin-top:6px"><button class="b" data-a="inv">🎒 Inventar öffnen</button></div></div>
 <div class="card"><h2>Überleben</h2>${[['💧','bw','wt'],['🍖','bf','fd'],['⚡','be','en'],['🔥','bm','wm']].map(x=>`<div class="row"><span>${x[0]}</span><div class="g bar ${x[1]}"><i data-bar="${x[2]}"></i></div></div>`).join('')}
 <p class="${dm<1?'':'e'}">${dm<1?`😩 Geschwächt: Angriff ×${dm.toFixed(2)}, Mut-Erholung halbiert. Sterben kannst du nicht.`:'😊 Gut versorgt'}</p>${consHtml()}<p>${night()?'🌙 Nacht: Es wird kalt, Monster sind 20 % stärker. Ein Feuer wärmt dich und lässt dich ausruhen.':'☀️ Tag: Du wärmst dich langsam auf.'}</p>
 ${Date.now()<S.fire?tbar('🔥 Lagerfeuer brennt',S.fire-FIRE,S.fire,'o',1):''}${Date.now()<S.well?tbar('💧 Brunnen wieder bereit',S.well-WELL,S.well,'b',1):''}<div class="row" style="margin-top:6px"><button class="b s" data-a="well">💧 Brunnen</button><button class="b s" data-a="fire">🔥 Feuer${fl?' brennt':' 🪵15'}</button><button class="b s" data-a="craft" data-id="bread" data-cost="25,5,0">🍞 Brot</button><button class="b s" data-a="craft" data-id="stew" data-cost="40,20,0">🍲 Eintopf</button><button class="b s" data-a="craft" data-id="tea" data-cost="10,0,0">🍵 Tee</button></div><p>Feuer brennt 5 Minuten. Brunnen: gratis, 1 Minute Pause. Brot 🪵25 🧱5, Eintopf 🪵40 🧱20, Tee 🪵10.</p></div>
 <div class="card"><h2>Aktive Effekte</h2>${ef.length?ef.map(x=>`<p style="color:var(--ink)">✦ ${FX[x[0]][0]} +${Math.round(x[1])} %</p>`).join(''):'<p>Keine. Epische, legendäre und Set-Items haben Spezialeffekte.</p>'}${Object.keys(SETS).map(q=>{const n=setCnt(q);return n?`<p style="color:${RC[4]}">Set ${SETS[q].n}: ${n}/3</p>`:''}).join('')}</div>`}
function vAbenteuer(){
 let o=`<div class="card"><p>Mut <b id="mutt"></b> (jeder Kampf kostet 8)</p><div class="bar"><i id="mutb"></i></div></div>${blocked('fight')?`<div class="warn">${blocked('fight')}</div>`:''}<div id="fight"></div><h2>Monster in der Nähe</h2>${night()?'<p class="t">🌙 Nachts sind Monster 20 % stärker.</p>':''}`;
 o+=S.enc.map((e,i)=>{const m=MS[e.m],g=GT[m.g];return `<div class="card"><div class="row"><span class="ic">${m.ic}</span><div class="g">${hb((e.el?'💀 ':'')+m.n)} <span class="t">Stufe ${e.l}${e.el?' · Elite':''}</span><p>${g.ic} ${g.n} · dein Widerstand ${Math.round(res(m.g)*100)} %</p></div><button class="b" data-a="fight" data-i="${i}" ${F||S.mut<8?'disabled':''}>Kämpfen</button></div></div>`}).join('');
 o+='<h2>Aushang</h2>';
 o+=S.q?`<div class="card"><b>${E(S.q.t)}</b>${tbar('📜 Quest läuft',S.q.start||S.q.end-S.q.dur*1000,S.q.end)}<p>Belohnung: ${S.q.xp} EP</p></div>`:S.qo.map((q,i)=>`<div class="card"><b>${q.t}</b><div class="row" style="margin-top:6px"><span class="ch">💪 ${q.mut}</span><span class="ch">⏱ ${ft(q.dur)}</span><span class="ch">${q.xp} EP</span><span class="ch">${RN[q.res]} ${q.amt}</span><button class="b" data-a="quest" data-i="${i}">Annehmen</button></div></div>`).join('');
 return o}

function vMehr(){const A=['Aus','Selten','Normal','Oft'];let bk=false;try{bk=!!localStorage.getItem(K+'_backup')}catch(e){}
 return `<div class="card"><h2>Schwierigkeit</h2><p>Gegnerstärke: <b id="dl">${S.diff} %</b> – wirkt sofort auf Dörfer, Monster und Überfälle. Ändere sie jederzeit, wenn gerade weniger Zeit ist.</p><input type="range" id="diff" min="25" max="200" step="5" value="${S.diff}" aria-label="Gegnerstärke">
 <p style="margin-top:8px">Überfälle auf dich (nur während du spielst):</p><div class="row">${A.map((a,i)=>`<button class="b s ${S.aggr===i?'on':''}" data-a="aggr" data-v="${i}">${a}</button>`).join('')}</div></div>
 <div class="card"><h2>💾 Spielstand sichern</h2><p>Dein Spielstand liegt nur in diesem Browser. Sichere ihn regelmäßig, vor allem vor einem Update. Neue Funktionen werden beim Einspielen automatisch ergänzt, nichts geht verloren.</p><p>Letzte Sicherung: <b>${S.lastExp?new Date(S.lastExp).toLocaleString('de-DE'):'noch nie'}</b></p><div class="row" style="margin-top:6px"><button class="b s" data-a="dl">💾 Als Datei speichern</button><button class="b s" data-a="txt">📋 Als Text kopieren</button></div>${expT?`<textarea id="ex" readonly rows="3" onfocus="this.select()">${E(expT)}</textarea>`:''}<p style="margin-top:8px">Spielstand einspielen:</p><input type="file" id="fi" accept=".json,application/json"><textarea id="imp" rows="3" placeholder="…oder kopierten Text hier einfügen">${E(impT)}</textarea><div class="row"><button class="b s" data-a="imp">⬆️ Einspielen</button>${bk?'<button class="b s" data-a="rest">♻️ Stand vor letztem Import</button>':''}</div></div>
<div class="card"><h2>🤖 Automatisierung</h2><p>Läuft nur, solange Castle Day offen ist.</p><div class="row" style="margin-top:6px"><button class="b s ${S.auto.eat?'on':''}" data-a="aeat">Auto-Versorgung ${S.auto.eat?'an':'aus'}</button><button class="b s ${S.auto.q?'on':''}" data-a="aq">Auto-Quest ${S.auto.q?'an':'aus'}</button></div><p>Versorgung: isst und trinkt unter 30 % und zündet nachts ein Feuer an. Auto-Quest nimmt die kürzeste mögliche Quest an.</p><p style="margin-top:6px">Auto-Rekrutierung, Zielanzahl je Truppe (tippen zum Wechseln):</p><div class="row">${Object.keys(U).filter(k=>!U[k].lord).map(k=>`<button class="b s" data-a="arec" data-u="${k}">${U[k].ic} ${S.auto.rec[k]||'aus'}</button>`).join('')}</div><p>Bauschleife: im Dorf-Tab bei einem Gebäude „＋ Schleife“ tippen.</p></div>
 <h2>Einsatzberichte</h2>${S.reports.length?`<div class="card">${S.reports.slice(0,10).map((r,i)=>`<div class="row" style="margin:4px 0"><span>${E(r.t)}</span><button class="b s" style="margin-left:auto" data-a="ropen" data-i="${i}">Öffnen</button></div>`).join('')}</div>`:'<p class="t">Noch keine Einsatzberichte.</p>'}<h2>Chronik</h2><div class="card log">${S.log.length?S.log.map(t=>`<p>${E(t)}</p>`).join(''):'<p>Noch nichts passiert. Sehr friedlich.</p>'}</div>
 <button class="b s" data-a="reset">${armed?'Wirklich alles löschen?':'Neu anfangen'}</button>`}

function vStart(){return `<div class="card"><h2 style="font-size:34px">Castle Day</h2><p>Baue ein Dorf, rüste deinen Helden aus, besiege Monster und erobere die Nachbardörfer.</p><input type="text" id="nm" maxlength="20" placeholder="Name deines Helden" autocomplete="off"></div>`+Object.keys(CL).map(k=>`<div class="card"><div class="row"><span class="ic">${CL[k].ic}</span><div class="g">${hb(CL[k].n)}<p>${CL[k].d}</p></div><button class="b" data-a="start" data-c="${k}">Wählen</button></div></div>`).join('')}

function modal(){const m=$('#modal');if(!S.hero||F||(!S.lvq.length&&!S.rq.length)){m.hidden=true;return}m.hidden=false;if(S.rq.length&&!Mr){const r=S.rq[0];$('#mbox').innerHTML=`<h2 style="font-size:24px">${E(r.t)}</h2><div class="rep">${r.lines.map(l=>`<p>${E(l)}</p>`).join('')}</div><button class="b" style="margin:6px 0 0" data-a="rclose">Schließen</button>`;return}const lv=S.lvq[0];
 $('#mbox').innerHTML=Mr?`<div class="big pop">${Mr.ic}</div><h2 style="color:${RC[Mr.r||0]}">${E(Mr.n)}</h2><p>${istat(Mr)}</p>${fxHtml(Mr)}<button class="b" style="margin:12px 0 0" data-a="take">Einsacken</button>`:`<h2 style="font-size:36px">Stufe ${lv}!</h2><p>Mehr Angriff, mehr Leben – und eine Truhe wartet.</p><div class="big">🎁</div><button class="b" style="margin:6px 0 0" data-a="open">Truhe öffnen</button>`}

function render(){
 $('#top').hidden=!S.hero;
 if(!S.hero){$('#view').innerHTML=vStart();$('#invbtn').hidden=true;$('#invp').hidden=true;modal();return}
 const T={dorf:['🏘️','Dorf'],karte:['🗺️','Karte'],held:['🎒','Held'],abenteuer:['👹','Abenteuer'],werk:['⚒️','Werkstatt'],handel:['🛒','Händler'],mehr:['⚙️','Mehr']};
 $('#tabs').innerHTML=Object.keys(T).map(k=>`<button data-a="tab" data-t="${k}" class="${k===tab?'on':''}">${T[k][0]}<br>${T[k][1]}</button>`).join('');
 $('#hp').textContent=`${CL[S.hero.c].ic} ${S.hero.n} · Stufe ${S.hero.lv}`;
 $('#view').innerHTML={dorf:vDorf,karte:vKarte,held:vHeld,abenteuer:vAbenteuer,werk:vWerk,handel:vHandel,mehr:vMehr}[tab]();
 if(tab==='abenteuer')drawFight();
 $('#invp').hidden=!Iv;$('#invbtn').hidden=false;if(Iv)$('#invc').innerHTML=vEquip();
 hdrTimers();
 modal();live()}

document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const d=b.dataset,now=Date.now();
 switch(d.a){
 case 'start':{const n=($('#nm').value.trim()||'Namenloser').slice(0,20);S=fresh();S.hero={n,c:d.c,lv:1,xp:0};
  S.eq.w={k:'w',n:'Rostiges Schwert',ic:'🗡️',v:4,r:0,so:1,s:[]};S.eq.a={k:'a',n:'Lederwams',ic:'🛡️',v:3,r:0,so:1,s:[]};
  S.inv=[genGem('fire',1),mkFood('bread'),mkFood('water')];S.qo=genQ();S.enc=genEnc();lg(`🍺 ${n} betritt das Dorf. Der Wirt schaut kurz auf und zapft weiter.`);tab='dorf';break}
 case 'tab':tab=d.t;armed=false;G=null;break;
 case 'sel':if(moved)return;sel=+d.c;break;
 case 'build':{const k=d.k,c=bc(k);if(!reqOk(k)){toast(reqTxt(k));return}if(S.bq||!afford(c))return;pay(c);S.bq={k,start:now,end:now+bt(k)*1000};break}
 case 'train':{const k=d.u,n=+d.n,c=uc(k,n);if(!afford(c))return;if(U[k].lord&&(S.b.rally<3||S.b.barr<U[k].need)){toast('Dafür brauchst du Versammlungsplatz Stufe 3 und Kaserne '+U[k].need+'.');return}if(U[k].g&&cv()<U[k].g*100*n){toast('Zu wenig Gold: '+U[k].g+' 🥇 nötig.');return}if(pop()+n*U[k].p>popMax()){toast('Zu wenig Bauern – bau den Bauernhof aus.');return}pay(c);if(U[k].g)setCv(cv()-U[k].g*100*n);S.tq.push({u:k,n,st:now,end:now+n*ut(k)*1000});break}
 case 'send':{const c=S.camps[sel];if(c.own){toast('Dieses Dorf gehört dir schon.');return}
  const bl=blocked('attack');if(bl){toast(bl);return}
  if(c.rel==='peace'||c.rel==='trade'){toast('Du hast Frieden mit '+c.n+'. Erkläre zuerst den Krieg.');return}
  const u={};let t=0;for(const k in U){u[k]=Math.min(sendSel[k]||0,S.u[k]);t+=u[k]}
  if(!t){toast('Wähle zuerst Truppen aus.');return}
  if(c.rel!=='war'){c.rel='war';S.rep=Math.max(0,S.rep-3);lg(`⚔️ Dein Überfall auf ${c.n} bedeutet Krieg.`)}
  for(const k in U)S.u[k]-=u[k];S.at.push({c:sel,u,st:now,end:now+2*trSec(sel,u)*1000});sendSel={};toast('Truppen marschieren!');break}
 case 'peace':{const c=S.camps[sel],def=campDef(sel);if(now<c.cd){toast('Die Gesandten beraten noch. Versuch es später.');return}
  const t=c.rel==='war'?(armyAtk()>=2*def?0:Math.round(40+tier(sel)*30)):0;
  if(t&&!afford([t,t,t])){toast('Der Tribut ist zu hoch: je '+t+' Rohstoffe.');return}
  if(t)pay([t,t,t]);
  if(Math.random()<peaceP(sel)){c.rel='peace';S.rep=Math.min(100,S.rep+3);lg(`🕊️ ${c.n} nimmt dein Friedensangebot an.`);toast('🕊️ Frieden mit '+c.n)}
  else{c.cd=now+180000;lg(`🕊️ ${c.n} lehnt Frieden ab${t?'. Der Tribut ist verloren':''}.`);toast(c.n+' lehnt ab')}break}
 case 'pact':{const c=S.camps[sel];if(c.rel!=='peace')return;c.rel='trade';lg(`🤝 Handelspakt mit ${c.n} geschlossen.`);toast('🤝 Handelspakt geschlossen');break}
 case 'unpact':{S.camps[sel].rel='peace';lg(`Handelspakt mit ${S.camps[sel].n} gekündigt.`);break}
 case 'war':{const c=S.camps[sel];if(c.rel==='war')return;const brk=c.rel==='peace'||c.rel==='trade';c.rel='war';
  if(brk){S.rep=Math.max(0,S.rep-15);S.camps.forEach(x=>{if(x!==c&&x.rel==='trade'&&Math.random()<.25){x.rel='peace';lg(`🤝 ${x.n} kündigt den Handelspakt wegen deines Vertragsbruchs.`)}});lg(`⚔️ Du hast den Frieden mit ${c.n} gebrochen. Ruf −15.`)}
  else{S.rep=Math.max(0,S.rep-3);lg(`⚔️ Du erklärst ${c.n} den Krieg.`)}
  toast('⚔️ Krieg mit '+c.n);break}
 case 'tset':if(d.f==='n')tradeSel.n=+d.v;else tradeSel[d.f]=d.v;break;
 case 'tp':tradeP=+d.i;break;
 case 'trade':{const c=S.camps[tradeP],T=tradeSel;if(!c||!(c.rel==='trade'||c.rel==='peace'))return;if(now>c.tr.t)c.tr={u:0,t:now+900000};
  const rate=c.rel==='trade'?1:2,cap2=c.rel==='trade'?200:100,give=T.n*rate;
  if(T.o===T.w){toast('Wähle zwei verschiedene Rohstoffe.');return}
  if(c.tr.u+T.n>cap2){toast('Handelsgrenze erreicht ('+cap2+' je 15 Min.).');return}
  if(S.r[T.o]<give){toast('Nicht genug '+RN[T.o]);return}
  S.r[T.o]-=give;addRes(T.w,T.n);c.tr.u+=T.n;lg(`🤝 Handel mit ${c.n}: ${give} ${RN[T.o]} gegen ${T.n} ${RN[T.w]}.`);toast('Handel abgeschlossen');break}
 case 'sbuy':{const c=S.camps[tradeP],x=c&&c.so&&c.so[+d.i];if(!x||x.sold)return;const pr=Math.round(x.p*(c.rel==='trade'?.8:1));if(cv()<pr){toast('Zu wenig Münzen.');return}
  if(x.k!=='dust'&&S.inv.length>=30){toast('Rucksack voll.');return}setCv(cv()-pr);
  if(x.k==='dust')S.dust+=x.n;else if(x.k==='gem')addItem(genGem(x.g,x.lv));else{addItem(mkFood(x.id));addItem(mkFood(x.id))}
  x.sold=true;lg(`🛒 ${c.n}: Sonderangebot gekauft.`);toast('Gekauft!');break}
 case 'wp':{const free=S.b.mauer*4-S.wp,m=Math.min(d.n==='all'?999:+d.n,free,S.u.bw);if(m<=0){toast(free<=0?'Keine freien Plätze auf der Mauer.':'Keine Bogenschützen im Dorf.');return}S.u.bw-=m;S.wp+=m;toast(m+' Bogenschützen platziert');break}
 case 'wpc':S.u.bw+=S.wp;S.wp=0;break;
 case 'icat':icat=d.c;break;
 case 'rclose':S.rq.shift();break;
 case 'ropen':S.rq.unshift(S.reports[+d.i]);break;
 case 'smelt':{const it=S.inv[+d.i];if(!it||!'wam'.includes(it.k))return;const c=coinsFor(it);addCoin(c);S.inv.splice(+d.i,1);lg(`⚒️ ${it.n} eingeschmolzen: ${coinTxt(c)}.`);toast('Geprägt: '+coinTxt(c));break}
 case 'smeltall':{const tot={b:0,s:0,g:0};let n=0;for(let i=S.inv.length-1;i>=0;i--){const it=S.inv[i];if('wam'.includes(it.k)&&(it.r||0)<2){const c=coinsFor(it);tot.b+=c.b||0;tot.s+=c.s||0;tot.g+=c.g||0;S.inv.splice(i,1);n++}}addCoin(tot);toast(`${n} Teile geprägt: ${coinTxt(tot)}`);break}
 case 'dust':{const it=S.inv[+d.i];if(!it||it.k!=='g')return;S.dust+=dustFor(it);S.inv.splice(+d.i,1);toast('💠 +'+dustFor(it)+' Quarzstaub');break}
 case 'gemcraft':{const n=+d.n;if(S.dust<n){toast('Zu wenig Quarzstaub.');return}if(S.inv.length>=30){toast('Rucksack voll.');return}S.dust-=n;const ch=gemChance(n),x=Math.random(),lv=x<ch.p3?3:x<ch.p3+ch.p2?2:1,g=genGem(P(Object.keys(GT)),lv);addItem(g);lg(`🧙 Die Hexe fertigt: ${g.n}.`);toast(`🧙 ${g.n}${lv===3?' – ein Meisterstück!':''}`);break}
 case 'buy':{const p=+d.p;if(cv()<p){toast('Zu wenig Münzen.');return}setCv(cv()-p);addItem(mkFood(d.id));toast(FD[d.id].n+' gekauft');break}
 case 'fight':if(F||S.mut<8)return;{const bl=blocked('fight');if(bl){toast(bl);return}}startFight(+d.i);break;
 case 'fdone':F=null;break;
 case 'quest':{const q=S.qo[+d.i];if(S.q)return;{const bl=blocked('quest');if(bl){toast(bl);return}}if(S.mut<q.mut){toast('Zu wenig Mut. Trink erst mal was.');return}S.mut-=q.mut;S.q=Object.assign({},q,{start:now,end:now+q.dur*1000});S.en=Math.max(0,S.en-10);break}
 case 'well':if(now<S.well){toast('Der Eimer ist noch unterwegs.');return}S.wt=Math.min(100,S.wt+30);S.well=now+WELL;toast('Glug, glug. Durst +30');break;
 case 'craft':{const c=d.cost.split(',').map(Number);if(!afford(c))return;pay(c);addItem(mkFood(d.id));break}
 case 'use':{const it=S.inv[+d.i],f=FD[it.id];S.wt=Math.min(100,S.wt+f.w);S.fd=Math.min(100,S.fd+f.f);S.mut=Math.min(mutMax(),S.mut+f.mu);S.en=Math.min(100,S.en+(f.en||0));S.wm=Math.min(100,S.wm+(f.wm||0));S.inv.splice(+d.i,1);toast(it.n+' – lecker!');break}
 case 'eq':{const it=S.inv[+d.i],old=S.eq[it.k];S.eq[it.k]=it;S.inv.splice(+d.i,1);if(old)S.inv.push(old);G=null;break}
 case 'junk':{const it=S.inv[+d.i];S.inv.splice(+d.i,1);RK.forEach(k=>addRes(k,8*(it.r+1)));toast('Zerlegt');break}
 case 'gem':G=G===+d.i?null:+d.i;break;
 case 'sock':{const gem=S.inv[G],it=S.eq[d.s];if(!gem||!it||it.s.length>=it.so)return;it.s.push({g:gem.g,lv:gem.lv});S.inv.splice(G,1);G=null;toast(`${GT[gem.g].n}-Widerstand erhöht`);break}
 case 'zoom':{const v=d.v;if(v==='1')mz.z=Math.min(4,mz.z*1.5);else if(v==='-1')mz.z=Math.max(1,mz.z/1.5);else if(v==='0')mz={x:240,y:220,z:1};else{const q=px(sel);mz.x=q[0];mz.y=q[1];mz.z=Math.max(mz.z,2)}if(mz.z<=1)mz={x:240,y:220,z:1};break}
 case 'unsock':{const it=S.eq[d.s],key=d.s+d.j;if(!it)return;if(ua!==key){ua=key;toast('Nochmal tippen: der Edelstein wird zerstört.');break}it.s.splice(+d.j,1);ua=null;toast('Edelstein zerstört');break}
 case 'inv':Iv=true;break;
 case 'invx':Iv=false;G=null;ua=null;break;
 case 'fire':if(now<S.fire){toast('Das Feuer brennt noch.');return}if(!afford([15,0,0]))return;S.r.h-=15;S.fire=now+FIRE;toast('🔥 Das Lagerfeuer knistert');break;
 case 'dl':dl();break;
 case 'txt':{S.lastExp=Date.now();expT=JSON.stringify(exp());try{navigator.clipboard.writeText(expT).then(()=>toast('In die Zwischenablage kopiert'),()=>toast('Bitte den Text unten manuell kopieren'))}catch(x){toast('Bitte den Text unten manuell kopieren')}break}
 case 'imp':importText($('#imp')?$('#imp').value:impT);return;
 case 'rest':{try{const b=JSON.parse(localStorage.getItem(K+'_backup'));if(b&&b.hero){S=migrate(b);F=null;G=null;toast('Vorheriger Stand wiederhergestellt')}}catch(x){toast('Kein Backup gefunden')}break}
 case 'aeat':S.auto.eat=!S.auto.eat;break;
 case 'aq':S.auto.q=!S.auto.q;break;
 case 'arec':{const T=[0,10,25,50,100],i=T.indexOf(S.auto.rec[d.u]);S.auto.rec[d.u]=T[(i+1)%T.length];break}
 case 'qadd':if(!reqOk(d.k)){toast(reqTxt(d.k));return}if(S.bqq.length>=5){toast('Die Bauschleife ist voll.');return}S.bqq.push(d.k);toast(B[d.k].n+' zur Bauschleife hinzugefügt');break;
 case 'qdel':S.bqq.splice(+d.i,1);break;
 case 'aggr':S.aggr=+d.v;break;
 case 'open':Mr=rollReward(S.lvq[0]);break;
 case 'take':{addItem(Mr);lg(`🎁 Stufe-${S.lvq[0]}-Truhe: ${Mr.n}`);Mr=null;S.lvq.shift();break}
 case 'reset':if(!armed){armed=true;break}try{localStorage.removeItem(K)}catch(x){}S=fresh();armed=false;break;
 }
 save();render()});
document.addEventListener('change',e=>{if(e.target.id==='fi'&&e.target.files[0]){const r=new FileReader();r.onload=()=>importText(r.result);r.readAsText(e.target.files[0]);e.target.value=''}});
document.addEventListener('input',e=>{if(sliderInput(e))return;if(e.target.id==='imp')impT=e.target.value;if(e.target.id==='diff'){S.diff=+e.target.value;$('#dl').textContent=S.diff+' %';save()}});

const GL=[['🪵','Holz','Baumaterial. Der Holzfäller produziert es.'],['🧱','Lehm','Baumaterial aus der Lehmgrube.'],['⛓️','Eisen','Für Truppen und Gebäude. Kommt aus der Eisenmine.'],['📦','Speicher','Zeigt, wie viel von jedem Rohstoff maximal gelagert werden kann.'],
['💧','Durst','Sinkt mit der Zeit. Brunnen, Wasser, Tee oder Eintopf füllen ihn auf.'],['🍖','Hunger','Sinkt mit der Zeit. Brot, Eintopf oder Wildbret füllen ihn auf.'],['⚡','Energie','Sinkt bei Kämpfen und Quests. Ein Lagerfeuer und manche Speisen füllen sie auf.'],
['🔥','Wärme / Feuer','Als Überlebenswert: Wärme sinkt nachts, ein Lagerfeuer wärmt dich. Als Element: Feuer-Gegner und Feuer-Edelsteine (Widerstand).'],['☀️','Tag','Tagsüber wärmst du dich langsam auf.'],['🌙','Nacht','Nachts wird es kalt, und Monster sind 20 % stärker.'],
['📜','Quest / Chronik','Aufträge vom Aushang und das Protokoll aller Ereignisse.'],['🎒','Inventar','Öffnet deinen Rucksack und deine Ausrüstung.'],['🏘️','Dorf','Gebäude ausbauen und Truppen ausbilden.'],['🗺️','Karte','Nachbardörfer ansehen, überfallen und übernehmen.'],['👹','Abenteuer','Automatische Monsterkämpfe und Quests.'],['⚙️','Mehr','Schwierigkeit, Überfälle und Chronik.'],
['🍺','Taverne','Erhöht deinen maximalen Mut für Quests und Kämpfe.'],['💪','Mut','Wird für Quests und Kämpfe verbraucht und erholt sich mit der Zeit.'],['⏱','Dauer','So lange dauert die Aktion.'],['⏳','Langzeit-Quest','Dauert 30 bis 60 Minuten, gibt dafür mehr Belohnung.'],
['🪓','Holzfäller / Axtschwinger','Gebäude für Holz, aber auch Truppe mit hohem Angriff und wenig Abwehr.'],['⛏️','Eisenmine','Produziert Eisen.'],['🌾','Bauernhof','Mehr Bauern, damit du mehr Truppen halten kannst.'],['🛡️','Kaserne / Abwehr','Schaltet Truppen frei. Bei Werten: Abwehr bzw. Rüstung.'],
['🔱','Speerträger','Gute Abwehr, schwacher Angriff.'],['🗡️','Schwert','Schwertkämpfer oder Waffe. Erhöht den Angriff.'],['⚔️','Angriff','Dein Kampfwert. Auch das Symbol der Klasse Krieger.'],['🔮','Magier','Bekommt 50 % mehr Erfahrung aus Quests.'],['🏹','Späher','Erbeutet 30 % mehr bei Raubzügen.'],
['❄️','Frost','Frost-Gegner. Frost-Edelsteine geben Frost-Widerstand.'],['☠️','Gift','Gift-Gegner. Gift-Edelsteine geben Gift-Widerstand.'],['💎','Edelstein','Wird in einen Sockel gesetzt und gibt Widerstand gegen einen Gegnertyp.'],['❤️','Leben','Deine Lebenspunkte in Kämpfen.'],['🍀','Glück','Erhöht Drop-Chancen und die Chance auf bessere Items.'],
['⛺','Lager','Entwicklungsstufe 1 von 5. Gegnerische Dörfer wachsen mit der Zeit.'],['🛖','Weiler','Stufe 2 von 5 eines gegnerischen Dorfes.'],['🏡','Dorf','Stufe 3 von 5 eines gegnerischen Dorfes.'],['🏰','Burg','Stufe 4 von 5. Starke Verteidigung. Kann überfallen und bei 0 % Loyalität übernommen werden.'],['🏯','Festung','Höchste Stufe 5: stark verteidigt, aber viel Beute.'],['🤖','Automatisierung','Bauschleife, Rekrutierung, Versorgung und Quests laufen automatisch.'],['💾','Spielstand','Sichert deinen Fortschritt als Datei, damit du ihn nach einem Update wieder einspielen kannst.'],['⚒️','Werkstatt','Schmiede, Hexe und Händler.'],['🥉','Bronze','Münze. 10 Bronze = 1 Silber.'],['🥈','Silber','Münze. 10 Silber = 1 Gold.'],['🥇','Gold','Wertvollste Münze.'],['💠','Quarzstaub','Entsteht beim Zerlegen von Edelsteinen. Die Hexe fertigt daraus neue Steine.'],['🧙','Hexe','Zerlegt Edelsteine und fertigt neue.'],['🕊️','Frieden','Das Dorf greift dich nicht an.'],['🤝','Handelspakt','Tausche Rohstoffe 1:1.'],['😐','Neutral','Keine besondere Beziehung.'],['🎯','Bogenschütze','Fernkämpfer, ab Kaserne Stufe 4.'],['🏇','Reiter','Sehr schnell unterwegs, ab Kaserne Stufe 6.'],['⚜️','Ritter','Stärkste Truppe, ab Kaserne Stufe 8.'],['💀','Elite-Gegner','Stärker als normale Monster, aber mit mehr Beute und Erfahrung.'],['🛒','Händler','Marktstand, Handel mit Friedens- und Handelspartnern und Sonderangebote.'],['🌅','Morgen','Die Sonne geht auf.'],['🌇','Abend','Es dämmert, bald wird es Nacht.'],['🕐','Uhrzeit','Spielzeit: Ein Spieltag dauert 30 Minuten echter Zeit.'],['👑','Fürst','Sehr teure und sehr langsame Einheit. Senkt bei einem Sieg die Loyalität eines Dorfes. Nur so lassen sich Dörfer übernehmen.'],['🏛️','Versammlungsplatz','Hier werden Fürsten angeworben (Stufe 3 und Kaserne 10).'],['⛰️','Wall','Erhöht deine Abwehr um 5 % je Stufe.'],['🗼','Mauer','Erhöht die Abwehr um 8 % je Stufe und bietet Plätze für Bogenschützen.'],['🥶','Kälte','Zu kalt: Kämpfe und Ausrücken sind gesperrt.'],['😴','Erschöpft','Zu wenig Energie für Quests und Kämpfe.'],['🏠','Dein Dorf','Hier bist du zu Hause.'],['🚩','Erobertes Dorf','Gehört dir und liefert Rohstoffe.'],['✦','Spezialeffekt','Besonderer Bonus auf epischen, legendären und Set-Items.'],['★','Legendär','Legendäre Items haben zwei starke Effekte.'],['📿','Amulett','Gibt Glück und Sockel für Edelsteine.'],['◯','Sockel','Freier Platz für einen Edelstein.'],
['💥','Kritischer Treffer','Macht 80 % mehr Schaden.'],['🏆','Sieg','Du hast gewonnen und Belohnung erhalten.'],['😵','Bewusstlos','Du hast verloren. Du verlierst nur etwas Durst und Hunger, sterben kannst du nicht.'],['😩','Geschwächt','Zu niedrige Überlebenswerte senken deinen Angriff.'],['😊','Gut versorgt','Alle Überlebenswerte sind in Ordnung.'],
['🍞','Brot','Stillt Hunger.'],['🍲','Eintopf','Stillt viel Hunger und wärmt etwas.'],['🍯','Met','Stillt Durst und gibt Mut.'],['🍵','Kräutertee','Stillt Durst, wärmt und gibt Energie.'],['⚠️','Angriff naht','Ein Gegner überfällt bald dein Dorf. Deine Truppen und dein Held verteidigen.'],['🔨','Bauarbeiten','Ein Gebäude wird gerade ausgebaut.'],['🎁','Truhe','Belohnung beim Stufenaufstieg.'],['🪖','Truppen','Ausgebildete Soldaten.'],['🎉','Stufenaufstieg','Dein Held ist eine Stufe aufgestiegen.']];
const GR=GL.map(([k,t,x])=>[new RegExp(k.replace(/\uFE0F/g,'')+'\uFE0F?','g'),t,x,k]);
function symAt(x,y){let n,o;if(document.caretRangeFromPoint){const r=document.caretRangeFromPoint(x,y);if(r){n=r.startContainer;o=r.startOffset}}else if(document.caretPositionFromPoint){const q=document.caretPositionFromPoint(x,y);if(q){n=q.offsetNode;o=q.offset}}
 if(!n||n.nodeType!==3)return null;const t=n.data;for(const g of GR){g[0].lastIndex=0;let m;while((m=g[0].exec(t))){if(o>=m.index&&o<=m.index+m[0].length)return g}}return null}
let tipT;function showTip(g){const e=$('#tip');e.innerHTML=`<span style="font-size:26px">${g[3]}</span> <b class="hd" style="font-size:20px">${g[1]}</b><br>${g[2]}`;e.hidden=false;clearTimeout(tipT);tipT=setTimeout(()=>e.hidden=true,7000)}
document.addEventListener('click',e=>{const tp=$('#tip');if(!tp.hidden){tp.hidden=true;if(e.target.closest('#tip'))return}
 if(e.target.closest('[data-a],input,#tip'))return;const g=symAt(e.clientX,e.clientY);if(g)showTip(g)});
let pd=null;
document.addEventListener('pointerdown',e=>{const m=e.target.closest('#map');if(m)pd={x:e.clientX,y:e.clientY,mx:mz.x,my:mz.y,m}});
document.addEventListener('pointermove',e=>{if(!pd)return;const r=pd.m.getBoundingClientRect(),k=(480/mz.z)/r.width,dx=e.clientX-pd.x,dy=e.clientY-pd.y;if(Math.abs(dx)+Math.abs(dy)>8)moved=true;if(moved){mz.x=pd.mx-dx*k;mz.y=pd.my-dy*k;pd.m.setAttribute('viewBox',vb())}});
document.addEventListener('pointerup',()=>{pd=null;setTimeout(()=>{moved=false},60)});
load();tick();render();
setInterval(tick,500);setInterval(save,5000);
document.addEventListener('visibilitychange',()=>{save();if(!document.hidden)tick()});