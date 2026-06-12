"use client";
import { useState, useRef } from "react";
import { analyzeProject } from "./actions";

export default function SteelDLinkDashboard() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setAttachedFiles(prev => [...prev, ...names]);
    }
  };

  const handleRun = async () => {
    if (!inputText && attachedFiles.length === 0) return;
    setLoading(true);
    const result = await analyzeProject(inputText, attachedFiles);
    if (!result.error) setData(result);
    else alert("Groq API Error: " + result.message);
    setLoading(false);
  };

  return (
    <main className="h-screen bg-[#060a13] text-slate-300 flex flex-col font-sans overflow-hidden antialiased">
      
      {/* HEADER */}
      <header className="h-16 flex justify-between items-center px-8 border-b border-slate-800 bg-[#0b121f] shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center text-white font-black italic shadow-lg">S</div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight uppercase">SteelDLink AI</h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Structural Intelligence</p>
          </div>
        </div>
        <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h2 className="text-blue-400 font-bold text-xs uppercase tracking-widest">SteelDLink AI Platform</h2>
            <p className="text-[10px] text-slate-500">● Designed by <span className="text-green-500 font-bold italic">Parimal Gavhane</span></p>
        </div>
        <button className="bg-blue-600 px-5 py-1.5 rounded text-[11px] font-bold text-white">Auditor Mode</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* FIXED ANCHORED SIDEBAR */}
        <aside className="w-[320px] bg-[#0b121f] border-r border-slate-800 flex flex-col shrink-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Source Data</h3>
            <textarea 
              value={inputText} onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 bg-[#0a0f1a] border border-slate-800 rounded-xl p-4 text-[11px] outline-none focus:border-blue-600 transition-all leading-relaxed"
              placeholder="Paste drawing notes or RFI text here..."
            />
            
            <div className="space-y-4">
              <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-800 py-10 rounded-2xl text-[10px] font-bold text-slate-500 hover:bg-slate-900 transition-all uppercase">
                + Add Drawings (PDF/Word)
              </button>
              <input type="file" ref={fileInputRef} multiple className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {attachedFiles.map((name, i) => (
                  <div key={i} className="flex justify-between bg-slate-900/50 p-2 rounded border border-slate-800 text-[10px] italic text-slate-500">
                    <span className="truncate w-40">✓ {name}</span>
                    <button onClick={() => setAttachedFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-red-900">×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-800 bg-[#0b121f]">
            <button onClick={handleRun} disabled={loading} className="w-full bg-blue-600 py-4 rounded-2xl text-[10px] font-black uppercase text-white hover:shadow-blue-900/40 shadow-2xl disabled:opacity-50 transition-all">
              {loading ? "Performing Deep Audit..." : `Generate Advanced Quote (${attachedFiles.length} Files)`}
            </button>
          </div>
        </aside>

        {/* MAIN REPORT AREA */}
        <div className="flex-1 bg-[#060a13] p-12 overflow-y-auto custom-scrollbar">
          {data ? (
            <div className="max-w-5xl mx-auto space-y-20 pb-32 animate-in fade-in duration-1000">
               <h2 className="text-4xl font-light text-white tracking-tighter uppercase italic border-b border-slate-800 pb-10">Intake Report</h2>

              {/* 1. EXECUTIVE SUMMARY */}
              <section>
                <h3 className="text-blue-500 font-bold mb-8 text-[13px] tracking-[0.3em] uppercase italic border-l-4 border-blue-600 pl-4">1. EXECUTIVE SUMMARY</h3>
                <div className="bg-[#111827]/30 p-10 rounded-3xl border border-slate-800/50 space-y-8 shadow-2xl">
                    <div className="grid grid-cols-2 gap-8 border-b border-slate-800/50 pb-8">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Project Identifier</p>
                            <p className="text-2xl text-white font-bold tracking-tight uppercase">{data.projectName}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Audit Confidence</p>
                             <p className="text-xl text-yellow-500 font-black">{data.confidence}</p>
                        </div>
                    </div>
                    <ul className="space-y-4 text-[15px] text-slate-300 ml-5 list-disc leading-relaxed">
                      <li>Total Estimated Hours: <span className="text-white font-bold">{data.totalEstHours}</span></li>
                      <li>Total Estimated Cost (USD): <span className="text-green-500 font-bold font-mono">{data.totalEstCost}</span></li>
                    </ul>
                    <p className="text-[16px] leading-loose text-slate-400 italic pt-6 border-t border-slate-800/30">
                        {data.executiveAnalysis}
                    </p>
                </div>

                <h4 className="text-white font-black text-[11px] mt-12 mb-6 uppercase tracking-widest border-b border-slate-800 pb-2 italic text-red-500/80">Critical Risks (In-Depth Technical Analysis)</h4>
                <div className="space-y-4">
                  {data.detailedRisks?.map((r:any, i:number) => (
                    <div key={i} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 border-l-4 border-l-red-800 hover:bg-slate-900/60 transition-all shadow-lg">
                        <p className="text-white font-bold text-sm mb-3 uppercase tracking-wider">{i+1}. {r.title}</p>
                        <p className="text-[13px] text-slate-400 leading-relaxed font-normal">{r.explanation}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. BASIS OF ESTIMATE */}
              <section>
                <h3 className="text-blue-500 font-bold mb-8 text-[13px] tracking-[0.3em] uppercase italic border-l-4 border-blue-600 pl-4">2. BASIS OF ESTIMATE</h3>
                <div className="grid grid-cols-1 gap-6 ml-4">
                    {[
                        {label: "Drawings Reviewed", val: data.basisOfEstimate?.sheets},
                        {label: "Industry Benchmarks", val: data.basisOfEstimate?.standards},
                        {label: "Complexity Factors", val: data.basisOfEstimate?.complexityReasoning}
                    ].map((item, i) => (
                        <div key={i} className="space-y-2">
                            <span className="text-white font-bold text-[10px] uppercase tracking-widest text-slate-500">{item.label}</span>
                            <p className="text-[13px] text-slate-400 leading-relaxed bg-[#111827]/50 p-5 rounded-2xl border border-slate-800/30 italic">{item.val}</p>
                        </div>
                    ))}
                </div>
              </section>

              {/* 3. HOURS TABLE */}
              <section>
                <h3 className="text-blue-500 font-bold mb-8 text-[13px] tracking-[0.3em] uppercase italic border-l-4 border-blue-600 pl-4">3. HOURS BY TASK CATEGORY</h3>
                <div className="border border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-[#0b121f]/30">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead className="bg-[#111827] text-slate-500 uppercase font-black border-b border-slate-800">
                      <tr><th className="p-6">Task</th><th className="p-6 text-center">Low</th><th className="p-6 text-center">High</th><th className="p-6 text-center">% Total</th><th className="p-6">Technical Audit Notes</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {data.hoursTable?.map((h: any, i: number) => (
                        <tr key={i} className="hover:bg-blue-600/5 transition-all group">
                          <td className="p-6 text-white font-bold text-sm uppercase group-hover:text-blue-400 transition-colors">{h.task}</td>
                          <td className="p-6 text-center font-mono text-slate-400">{h.low}</td>
                          <td className="p-6 text-center font-mono text-slate-400">{h.high}</td>
                          <td className="p-6 text-center text-blue-500 font-black">{h.pct}</td>
                          <td className="p-6 text-slate-500 italic leading-relaxed text-[12px] font-light">{h.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center opacity-10 text-8xl font-black italic tracking-[1.5em] select-none uppercase">SDL AI</div>
          )}
        </div>
      </div>
    </main>
  );
}  