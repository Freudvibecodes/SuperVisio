'use client'
import { useState } from 'react'

export default function Home() {
  const [page, setPage] = useState('dashboard')

  return (
    <div style={{display:'flex', minHeight:'100vh', fontFamily:'system-ui, sans-serif', background:'#F9F7F4'}}>
      
      {/* Sidebar */}
      <aside style={{width:'220px', background:'white', borderRight:'1px solid rgba(0,0,0,0.07)', display:'flex', flexDirection:'column', padding:'0', flexShrink:0}}>
        <div style={{padding:'22px 20px 18px', borderBottom:'1px solid rgba(0,0,0,0.07)'}}>
          <div style={{fontSize:'18px', fontWeight:'500', color:'#1C1917'}}>● Supervisio</div>
          <div style={{fontSize:'11px', color:'#A8A29E', marginTop:'3px'}}>Clinical supervision, simplified</div>
        </div>
        <nav style={{flex:1, padding:'12px 10px'}}>
          {[
            {id:'dashboard', label:'Overview'},
            {id:'sessions', label:'Sessions'},
            {id:'live', label:'Live session'},
            {id:'reports', label:'Ready to review'},
            {id:'forms', label:'Form templates'},
            {id:'settings', label:'Settings'},
          ].map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{display:'flex', alignItems:'center', width:'100%', padding:'8px 10px', borderRadius:'7px', border:'none', background: page===item.id ? '#EBF3EE' : 'none', color: page===item.id ? '#3B6D54' : '#57534E', fontSize:'13px', cursor:'pointer', marginBottom:'1px', textAlign:'left'}}>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{padding:'14px 10px', borderTop:'1px solid rgba(0,0,0,0.07)'}}>
          <div style={{display:'flex', alignItems:'center', gap:'10px', padding:'8px 10px'}}>
            <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#EBF3EE', color:'#3B6D54', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'500'}}>DR</div>
            <div>
              <div style={{fontSize:'13px', fontWeight:'500'}}>Dr. Reeves</div>
              <div style={{fontSize:'11px', color:'#A8A29E'}}>Clinical supervisor</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{flex:1, padding:'28px 32px'}}>
        {page === 'dashboard' && <Dashboard setPage={setPage} />}
        {page === 'sessions' && <Sessions setPage={setPage} />}
        {page === 'live' && <Live />}
        {page === 'reports' && <Reports />}
        {page === 'forms' && <Forms />}
        {page === 'settings' && <Settings />}
      </main>
    </div>
  )
}

function Dashboard({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      <div style={{marginBottom:'24px'}}>
        <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.6px', color:'#A8A29E', marginBottom:'4px'}}>Monday, April 20</div>
        <div style={{fontSize:'24px', fontWeight:'500', color:'#1C1917'}}>Good morning, Dr. Reeves</div>
        <div style={{fontSize:'12.5px', color:'#A8A29E', marginTop:'3px'}}>You have one session live right now</div>
      </div>

      <div style={{background:'#F0F7F3', border:'1px solid rgba(59,109,84,0.15)', borderRadius:'10px', padding:'10px 14px', marginBottom:'18px', fontSize:'12.5px', color:'#3B6D54'}}>
        Group supervision with Maya, Jordan & Priya is live now. Supervisio is recording and taking notes.
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px', marginBottom:'24px'}}>
        {[
          {label:'Hours logged', value:'48', note:'+4 this month', good:true},
          {label:'Active students', value:'7', note:'Across 3 programs', good:false},
          {label:'Forms generated', value:'124', note:'All auto-filled', good:true},
          {label:'Awaiting review', value:'2', note:'Ready to sign', good:false},
        ].map(s => (
          <div key={s.label} style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'16px 18px'}}>
            <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.5px', color:'#A8A29E', marginBottom:'6px'}}>{s.label}</div>
            <div style={{fontSize:'28px', fontWeight:'500', color:'#1C1917', lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:'11.5px', color: s.good ? '#3B6D54' : '#A8A29E', marginTop:'5px'}}>{s.note}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
        <div>
          <div style={{fontSize:'13px', fontWeight:'500', marginBottom:'12px'}}>This week</div>
          {[
            {name:'Group supervision — session 12', meta:'Today · Maya A., Jordan B., Priya C.', status:'Live', live:true},
            {name:'Individual — Kenji Murakami', meta:'Tomorrow · 10:00 AM', status:'Scheduled', live:false},
            {name:'Individual — Sarah Tran', meta:'Wed Apr 22 · 3:00 PM', status:'Scheduled', live:false},
          ].map(s => (
            <div key={s.name} onClick={() => s.live && setPage('live')} style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'14px', cursor: s.live ? 'pointer' : 'default', marginBottom:'8px'}}>
              <div style={{width:'3px', height:'40px', borderRadius:'2px', background: s.live ? '#5A9E7A' : '#EF9F27', flexShrink:0}}></div>
              <div style={{flex:1}}>
                <div style={{fontSize:'13.5px', fontWeight:'500'}}>{s.name}</div>
                <div style={{fontSize:'12px', color:'#A8A29E'}}>{s.meta}</div>
              </div>
              <span style={{fontSize:'11px', padding:'3px 10px', borderRadius:'20px', background: s.live ? '#EBF3EE' : '#FEF3C7', color: s.live ? '#3B6D54' : '#B45309', fontWeight:'500'}}>{s.status}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontSize:'13px', fontWeight:'500', marginBottom:'12px'}}>Student hours</div>
          <div style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'18px 20px'}}>
            {[
              {name:'Kenji Murakami', current:24, total:30},
              {name:'Maya Adeyemi', current:18, total:30},
              {name:'Jordan Bassett', current:12, total:30},
              {name:'Priya Chatterjee', current:7, total:30},
            ].map((s, i) => (
              <div key={s.name} style={{marginBottom: i < 3 ? '14px' : '0'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                  <span style={{fontSize:'13px', fontWeight:'500'}}>{s.name}</span>
                  <span style={{fontSize:'12px', color:'#A8A29E'}}>{s.current} / {s.total}</span>
                </div>
                <div style={{height:'5px', background:'#F2EFE9', borderRadius:'3px', overflow:'hidden'}}>
                  <div style={{height:'100%', width:`${Math.round(s.current/s.total*100)}%`, background:'#5A9E7A', borderRadius:'3px'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Sessions({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px'}}>
        <div>
          <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.6px', color:'#A8A29E', marginBottom:'4px'}}>All sessions</div>
          <div style={{fontSize:'24px', fontWeight:'500'}}>Sessions</div>
        </div>
        <button style={{background:'#3B6D54', color:'white', border:'none', borderRadius:'7px', padding:'8px 16px', fontSize:'13px', fontWeight:'500', cursor:'pointer'}}>+ New session</button>
      </div>
      {[
        {name:'Group supervision — session 12', meta:'Today · 2:00 PM · Maya A., Jordan B., Priya C.', status:'Live now', live:true},
        {name:'Individual — Kenji Murakami', meta:'Tomorrow · 10:00 AM · MACP Yorkville', status:'Scheduled', live:false},
        {name:'Individual — Sarah Tran', meta:'Wed Apr 22 · 3:00 PM · MACP Yorkville', status:'Scheduled', live:false},
        {name:'Individual — Maya Adeyemi · session 11', meta:'Apr 13 · 60 min · Form auto-generated', status:'Complete', done:true},
        {name:'Group supervision — session 10', meta:'Apr 6 · 75 min · Jordan B., Priya C.', status:'Complete', done:true},
      ].map(s => (
        <div key={s.name} onClick={() => (s as any).live && setPage('live')} style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'14px', cursor:(s as any).live?'pointer':'default', marginBottom:'8px'}}>
          <div style={{width:'3px', height:'40px', borderRadius:'2px', background:(s as any).live?'#5A9E7A':(s as any).done?'#D4D0CA':'#EF9F27', flexShrink:0}}></div>
          <div style={{flex:1}}>
            <div style={{fontSize:'13.5px', fontWeight:'500'}}>{s.name}</div>
            <div style={{fontSize:'12px', color:'#A8A29E'}}>{s.meta}</div>
          </div>
          <span style={{fontSize:'11px', padding:'3px 10px', borderRadius:'20px', fontWeight:'500', background:(s as any).live?'#EBF3EE':(s as any).done?'#F2EFE9':'#FEF3C7', color:(s as any).live?'#3B6D54':(s as any).done?'#A8A29E':'#B45309'}}>{s.status}</span>
        </div>
      ))}
    </div>
  )
}

function Live() {
  return (
    <div>
      <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.6px', color:'#A8A29E', marginBottom:'4px'}}>In progress</div>
      <div style={{fontSize:'24px', fontWeight:'500', marginBottom:'18px'}}>Live session</div>
      <div style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'16px 20px', display:'flex', alignItems:'center', gap:'14px', marginBottom:'18px'}}>
        <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#5A9E7A', flexShrink:0}}></div>
        <div style={{flex:1}}>
          <div style={{fontSize:'11px', fontWeight:'500', color:'#3B6D54', textTransform:'uppercase', letterSpacing:'0.5px'}}>Recording & transcribing</div>
          <div style={{fontSize:'14px', fontWeight:'500', marginTop:'1px'}}>Group supervision — session 12</div>
          <div style={{fontSize:'12px', color:'#A8A29E', marginTop:'1px'}}>Yorkville MACP form loaded · 3 students detected</div>
        </div>
        <div style={{fontSize:'22px', fontWeight:'500', color:'#1C1917'}}>00:18:42</div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'14px', marginBottom:'16px'}}>
        {[
          {initials:'MA', name:'Maya Adeyemi', color:'#EBF3EE', textColor:'#3B6D54', case:'Client presenting grief, session 4', approach:'Active listening, reflection', feedback:'Strong rapport building noted'},
          {initials:'JB', name:'Jordan Bassett', color:'#EFF6FF', textColor:'#1E40AF', case:'Adolescent anxiety, CBT', approach:'Cognitive restructuring', feedback:'Improve pacing in transitions'},
          {initials:'PC', name:'Priya Chatterjee', color:'#FDF2F6', textColor:'#9D3B5B', case:'Listening...', approach:'Listening...', feedback:'Listening...'},
        ].map(s => (
          <div key={s.name} style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'16px 18px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'10px', paddingBottom:'12px', marginBottom:'14px', borderBottom:'1px solid rgba(0,0,0,0.07)'}}>
              <div style={{width:'34px', height:'34px', borderRadius:'50%', background:s.color, color:s.textColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'500'}}>{s.initials}</div>
              <div>
                <div style={{fontSize:'14px', fontWeight:'500'}}>{s.name}</div>
                <div style={{fontSize:'11.5px', color:'#A8A29E'}}>MACP · Yorkville</div>
              </div>
            </div>
            {[['Case discussed', s.case], ['Approach used', s.approach], ['Supervisor feedback', s.feedback]].map(([k,v]) => (
              <div key={k} style={{marginBottom:'10px'}}>
                <div style={{fontSize:'10.5px', textTransform:'uppercase', letterSpacing:'0.5px', color:'#A8A29E', marginBottom:'3px'}}>{k}</div>
                <div style={{fontSize:'12.5px', background:'#F9F7F4', borderRadius:'5px', padding:'6px 9px', color: v==='Listening...' ? '#A8A29E' : '#1C1917', fontStyle: v==='Listening...' ? 'italic' : 'normal'}}>{v}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Reports() {
  return (
    <div>
      <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.6px', color:'#A8A29E', marginBottom:'4px'}}>Documents</div>
      <div style={{fontSize:'24px', fontWeight:'500', marginBottom:'6px'}}>Ready to review</div>
      <div style={{fontSize:'12.5px', color:'#A8A29E', marginBottom:'20px'}}>Auto-filled forms waiting for your signature</div>
      {[
        {name:'Maya Adeyemi — session 12', meta:'Yorkville MACP form · Generated today · Ready to sign', review:true},
        {name:'Jordan Bassett — session 12', meta:'Yorkville MACP form · Generated today · Ready to sign', review:true},
      ].map(r => (
        <div key={r.name} style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'14px', marginBottom:'8px', cursor:'pointer'}}>
          <div style={{width:'36px', height:'36px', borderRadius:'7px', background:'#FDF2F6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
            <div style={{width:'14px', height:'16px', border:'1.5px solid #9D3B5B', borderRadius:'2px'}}></div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:'13.5px', fontWeight:'500'}}>{r.name}</div>
            <div style={{fontSize:'12px', color:'#A8A29E'}}>{r.meta}</div>
          </div>
          <span style={{fontSize:'11px', padding:'3px 10px', borderRadius:'20px', background:'#FDF2F6', color:'#9D3B5B', fontWeight:'500'}}>Review</span>
        </div>
      ))}
      <div style={{height:'1px', background:'rgba(0,0,0,0.07)', margin:'18px 0'}}></div>
      <div style={{fontSize:'13px', fontWeight:'500', marginBottom:'12px'}}>Previously signed</div>
      {[
        {name:'Maya Adeyemi — session 11', meta:'Apr 13, 2026 · Signed by Dr. Reeves'},
        {name:'Jordan Bassett — session 10', meta:'Apr 6, 2026 · Signed by Dr. Reeves'},
        {name:'Priya Chatterjee — session 10', meta:'Apr 6, 2026 · Signed by Dr. Reeves'},
      ].map(r => (
        <div key={r.name} style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'14px', marginBottom:'8px'}}>
          <div style={{width:'36px', height:'36px', borderRadius:'7px', background:'#EBF3EE', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'16px'}}>✓</div>
          <div style={{flex:1}}>
            <div style={{fontSize:'13.5px', fontWeight:'500'}}>{r.name}</div>
            <div style={{fontSize:'12px', color:'#A8A29E'}}>{r.meta}</div>
          </div>
          <span style={{fontSize:'11px', padding:'3px 10px', borderRadius:'20px', background:'#F2EFE9', color:'#A8A29E', fontWeight:'500'}}>Signed</span>
        </div>
      ))}
    </div>
  )
}

function Forms() {
  return (
    <div>
      <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.6px', color:'#A8A29E', marginBottom:'4px'}}>Templates</div>
      <div style={{fontSize:'24px', fontWeight:'500', marginBottom:'6px'}}>Form templates</div>
      <div style={{fontSize:'12.5px', color:'#A8A29E', marginBottom:'20px'}}>Upload any program's form once — Supervisio learns the fields automatically</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginBottom:'22px'}}>
        {[
          {name:'Yorkville MACP', desc:'5 pages · 18 fields detected', selected:true},
          {name:'OISE Counselling', desc:'3 pages · 12 fields detected', selected:false},
          {name:'Add a form', desc:'PDF or Word doc', add:true},
        ].map(f => (
          <div key={f.name} style={{background:(f as any).selected?'#F0F7F3':'white', border:`1px solid ${(f as any).selected?'#3B6D54':'rgba(0,0,0,0.07)'}`, borderRadius:'10px', padding:'16px 18px', cursor:'pointer'}}>
            <div style={{width:'32px', height:'32px', borderRadius:'7px', background:(f as any).add?'transparent':'#F2EFE9', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'10px', fontSize:'16px'}}>{(f as any).add ? '+' : '📄'}</div>
            <div style={{fontSize:'13px', fontWeight:'500', marginBottom:'2px'}}>{f.name}</div>
            <div style={{fontSize:'11.5px', color:'#A8A29E'}}>{f.desc}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:'13px', fontWeight:'500', marginBottom:'12px'}}>Yorkville MACP — field preview</div>
      <div style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', padding:'18px 20px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
          {[
            ['Student name', 'Auto-detected from introduction'],
            ['Session date', 'Auto from session metadata'],
            ['Duration', 'Auto from call length'],
            ['Case presented', 'AI-extracted from transcript'],
            ['Theoretical approach', 'AI-extracted from transcript'],
            ['Supervisor observations', 'AI-extracted from transcript'],
            ['Goals for next session', 'AI-extracted from transcript'],
            ['Supervisor signature', 'Pending review'],
          ].map(([k,v]) => (
            <div key={k}>
              <div style={{fontSize:'10.5px', textTransform:'uppercase', letterSpacing:'0.5px', color:'#A8A29E', marginBottom:'3px'}}>{k}</div>
              <div style={{fontSize:'12.5px', color:'#57534E', background:'#F9F7F4', borderRadius:'5px', padding:'5px 9px'}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Settings() {
  return (
    <div>
      <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.6px', color:'#A8A29E', marginBottom:'4px'}}>Account</div>
      <div style={{fontSize:'24px', fontWeight:'500', marginBottom:'20px'}}>Settings</div>
      {[
        {title:'Session behaviour', items:[
          {label:'Auto-join Zoom sessions', desc:'Bot joins automatically when a session starts', on:true},
          {label:'Speaker detection', desc:'Identify each person by their opening introduction', on:true},
          {label:'Auto-generate forms after session', desc:'Forms are drafted the moment the call ends', on:true},
          {label:'Email draft forms for review', desc:'Receive a copy at your registered email address', on:false},
        ]},
        {title:'Notifications', items:[
          {label:'Session reminders', desc:'30 minutes before each scheduled session', on:true},
          {label:'Form ready alerts', desc:'Notified as soon as forms are ready to review', on:true},
        ]},
      ].map(section => (
        <div key={section.title} style={{background:'white', border:'1px solid rgba(0,0,0,0.07)', borderRadius:'10px', marginBottom:'14px', overflow:'hidden'}}>
          <div style={{fontSize:'11px', textTransform:'uppercase', letterSpacing:'0.7px', color:'#A8A29E', fontWeight:'500', padding:'16px 20px 10px', borderBottom:'1px solid rgba(0,0,0,0.07)'}}>{section.title}</div>
          {section.items.map((item, i) => (
            <div key={item.label} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', borderBottom: i < section.items.length-1 ? '1px solid rgba(0,0,0,0.07)' : 'none'}}>
              <div>
                <div style={{fontSize:'13.5px', fontWeight:'500'}}>{item.label}</div>
                <div style={{fontSize:'12px', color:'#A8A29E', marginTop:'1px'}}>{item.desc}</div>
              </div>
              <div style={{width:'36px', height:'20px', borderRadius:'10px', background: item.on ? '#5A9E7A' : '#E8E3DB', position:'relative', cursor:'pointer', flexShrink:0}}>
                <div style={{width:'14px', height:'14px', background:'white', borderRadius:'50%', position:'absolute', top:'3px', right: item.on ? '3px' : 'auto', left: item.on ? 'auto' : '3px'}}></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}