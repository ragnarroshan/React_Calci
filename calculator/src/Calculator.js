import { useState } from "react";
export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [reset, setReset] = useState(false);
  const [expr, setExpr] = useState("");
  const rows = [["C","±","%","÷"],["7","8","9","×"],["4","5","6","−"],["1","2","3","+"],[null,"0",".","="]];
  const ops = ["÷","×","−","+"];
  const fns = ["C","±","%"];
  const handleOp = (operator) => { setPrev(parseFloat(display)); setOp(operator); setExpr(display+" "+operator); setReset(true); };
  const calculate = () => {
    if(!op||prev===null) return;
    const cur=parseFloat(display);
    let r=op==="+"?prev+cur:op==="−"?prev-cur:op==="×"?prev*cur:cur?prev/cur:"Error";
    setExpr(prev+" "+op+" "+cur+" =");
    setDisplay(typeof r==="string"?r:String(parseFloat(Number(r).toFixed(8))));
    setPrev(null);setOp(null);setReset(true);
  };
  const click=(v)=>{
    if(v==="C"){setDisplay("0");setPrev(null);setOp(null);setReset(false);setExpr("");}
    else if(v==="±")setDisplay(d=>String(parseFloat(d)*-1));
    else if(v==="%")setDisplay(d=>String(parseFloat(d)/100));
    else if(v==="=")calculate();
    else if(ops.includes(v))handleOp(v);
    else if(v===".")!display.includes(".")&&setDisplay(d=>d+".");
    else if(display==="0"||reset){setDisplay(v);setReset(false);}
    else setDisplay(d=>d.length<10?d+v:d);
  };
  const btnStyle=(v)=>({
    gridColumn:v==="0"?"span 2":undefined,
    background:v==="="?"#ff9f0a":ops.includes(v)?"#ff9f0a22":fns.includes(v)?"#636366":"#1c1c1e",
    color:ops.includes(v)||v==="="?"#ff9f0a":"#fff",
    border:"none",borderRadius:50,fontSize:22,fontWeight:500,
    cursor:"pointer",transition:"all .15s",padding:"20px 0",
    display:"flex",alignItems:"center",justifyContent:"center",
  });
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#000",fontFamily:"'SF Pro Display',-apple-system,sans-serif"}}>
      <div style={{width:320,background:"#111",borderRadius:40,padding:20,boxShadow:"0 40px 80px rgba(0,0,0,.8)"}}>
        <div style={{padding:"20px 16px",textAlign:"right"}}>
          <div style={{color:"#636366",fontSize:14,minHeight:20,marginBottom:4}}>{expr}</div>
          <div style={{color:"#fff",fontSize:display.length>9?28:48,fontWeight:300,letterSpacing:-1,overflow:"hidden",textOverflow:"ellipsis"}}>{display}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {rows.map((row,ri)=>row.map((v,ci)=>v===null?null:(
            <button key={ri+"-"+ci} onClick={()=>click(v)} style={btnStyle(v)}
              onMouseEnter={e=>e.currentTarget.style.opacity=".75"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {v}
            </button>
          )))}
        </div>
      </div>
    </div>
  );
}