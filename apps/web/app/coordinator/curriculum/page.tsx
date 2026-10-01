"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, AlertCircle, Settings, GripVertical, Trash2, Library, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// Initial Mock Data
const INITIAL_NODES = [
  { id: "cs101", title: "CS101: Intro to Programming", credits: 3, x: 250, y: 100, type: "core" },
  { id: "math101", title: "MATH101: Calculus I", credits: 3, x: 50, y: 100, type: "core" },
  { id: "cs102", title: "CS102: Data Structures", credits: 4, x: 250, y: 250, type: "core" },
  { id: "cs201", title: "CS201: Algorithms", credits: 4, x: 250, y: 400, type: "core" },
  { id: "ml301", title: "ML301: Machine Learning", credits: 4, x: 500, y: 400, type: "elective" },
  { id: "db202", title: "CS202: Databases", credits: 3, x: 50, y: 400, type: "core" },
  { id: "ai401", title: "AI401: Artificial Intelligence", credits: 4, x: 500, y: 550, type: "elective" },
];

const INITIAL_EDGES = [
  { id: "e1", from: "cs101", to: "cs102" },
  { id: "e2", from: "cs102", to: "cs201" },
  { id: "e3", from: "cs102", to: "ml301" },
  { id: "e4", from: "math101", to: "ml301" },
  { id: "e5", from: "cs102", to: "db202" },
  { id: "e6", from: "ml301", to: "ai401" },
];

const INITIAL_AVAILABLE = [
  { id: "nw301", title: "NW301: Computer Networks", credits: 3, type: "core" },
  { id: "os302", title: "OS302: Operating Systems", credits: 4, type: "core" },
  { id: "se401", title: "SE401: Software Engineering", credits: 3, type: "elective" },
  { id: "ds402", title: "DS402: Distributed Systems", credits: 4, type: "elective" },
];

const CARD_WIDTH = 220;
const CARD_HEIGHT = 86;

export default function CurriculumGraphPage() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [available, setAvailable] = useState(INITIAL_AVAILABLE);
  
  const [isLinking, setIsLinking] = useState<{ source: string | null; target: string | null }>({ source: null, target: null });
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, item: { id: string; title: string; credits: number; type: string; x?: number; y?: number }, isExisting: boolean) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ ...item, isExisting }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const dataStr = e.dataTransfer.getData("application/json");
    if (!dataStr) return;
    
    const data = JSON.parse(dataStr);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate position relative to container
    let x = e.clientX - rect.left - (CARD_WIDTH / 2);
    let y = e.clientY - rect.top - (CARD_HEIGHT / 2);

    // Snap to grid (rough)
    x = Math.max(20, Math.round(x / 20) * 20);
    y = Math.max(20, Math.round(y / 20) * 20);

    if (data.isExisting) {
      setNodes(prev => prev.map(n => n.id === data.id ? { ...n, x, y } : n));
    } else {
      setNodes(prev => [...prev, { ...data, x, y }]);
      setAvailable(prev => prev.filter(c => c.id !== data.id));
    }
  };

  const handleNodeClick = (id: string) => {
    if (isLinking.source === null) {
      setIsLinking({ source: id, target: null });
    } else if (isLinking.source !== id) {
      // Check if edge already exists
      const exists = edges.find(e => (e.from === isLinking.source && e.to === id) || (e.from === id && e.to === isLinking.source));
      if (!exists) {
        setEdges(prev => [...prev, { id: `e-${Date.now()}`, from: isLinking.source!, to: id }]);
      }
      setIsLinking({ source: null, target: null });
    } else {
      // Cancel linking
      setIsLinking({ source: null, target: null });
    }
  };

  const removeNode = (id: string) => {
    const nodeToRemove = nodes.find(n => n.id === id);
    if (!nodeToRemove) return;
    
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.from !== id && e.to !== id));
    setAvailable(prev => [...prev, { id: nodeToRemove.id, title: nodeToRemove.title, credits: nodeToRemove.credits, type: nodeToRemove.type }]);
  };

  const removeEdge = (id: string) => {
    setEdges(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50">
      
      {/* Sidebar - Available Courses */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-10 shrink-0 shadow-sm">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Library size={18} className="text-blue-800" />
            Course Library
          </h2>
          <p className="text-xs text-slate-500 mt-1">Drag courses onto the canvas to build your curriculum map.</p>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {available.length === 0 && (
            <div className="text-center p-6 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
              All courses placed!
            </div>
          )}
          
          {available.map(course => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              draggable
              onDragStartCapture={(e: any) => handleDragStart(e, course, false)}
              className="group cursor-grab active:cursor-grabbing"
            >
              <Card padding="sm" className="hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden" hover>
                <div className={`absolute top-0 left-0 w-1 h-full ${course.type === 'core' ? 'bg-blue-600' : 'bg-emerald-500'}`} />
                <div className="flex items-start gap-3 ml-2">
                  <div className="mt-0.5 p-1 bg-slate-100 rounded text-slate-400 group-hover:text-blue-600 transition-colors">
                    <GripVertical size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {course.credits} Credits
                      </span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${course.type === 'core' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>
                        {course.type === 'core' ? 'Core' : 'Elective'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <Button variant="secondary" className="w-full" leftIcon={<Plus size={16} />}>
            Create New Course
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-slate-900">B.Tech Computer Science Curriculum</h1>
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">Draft</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            {isLinking.source && (
              <span className="text-amber-600 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                <AlertCircle size={14} /> Select a target course to link
                <button onClick={() => setIsLinking({source: null, target: null})} className="ml-2 font-semibold hover:underline">Cancel</button>
              </span>
            )}
            <Button variant="ghost" size="sm" leftIcon={<Settings size={16} />}>Settings</Button>
            <Button variant="primary" size="sm" leftIcon={<CheckCircle2 size={16} />}>Publish Map</Button>
          </div>
        </div>

        <div 
          className="flex-1 relative overflow-auto bg-slate-50/50"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
          ref={containerRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* SVG Layer for Connections */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ minWidth: 2000, minHeight: 1500 }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-hover" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>

            {edges.map(edge => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              // Calculate connection points (from bottom of source to top of target, or side to side based on relative position)
              let startX = fromNode.x + CARD_WIDTH / 2;
              let startY = fromNode.y + CARD_HEIGHT;
              let endX = toNode.x + CARD_WIDTH / 2;
              let endY = toNode.y - 10; // offset for arrowhead

              // If nodes are side-by-side, connect from side
              if (Math.abs(fromNode.y - toNode.y) < CARD_HEIGHT) {
                if (fromNode.x < toNode.x) {
                  startX = fromNode.x + CARD_WIDTH;
                  startY = fromNode.y + CARD_HEIGHT / 2;
                  endX = toNode.x - 10;
                  endY = toNode.y + CARD_HEIGHT / 2;
                } else {
                  startX = fromNode.x;
                  startY = fromNode.y + CARD_HEIGHT / 2;
                  endX = toNode.x + CARD_WIDTH + 10;
                  endY = toNode.y + CARD_HEIGHT / 2;
                }
              }

              return (
                <g key={edge.id} className="pointer-events-auto cursor-pointer group" onClick={() => removeEdge(edge.id)}>
                  {/* Invisible thicker path for easier hovering/clicking */}
                  <path
                    d={`M ${startX} ${startY} C ${startX} ${(startY + endY) / 2}, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="15"
                  />
                  {/* Visible path */}
                  <path
                    d={`M ${startX} ${startY} C ${startX} ${(startY + endY) / 2}, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`}
                    fill="none"
                    className="stroke-slate-400 group-hover:stroke-rose-500 transition-colors duration-200"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Delete indicator that shows on hover */}
                  <circle cx={(startX + endX)/2} cy={(startY + endY)/2} r="8" fill="#f43f5e" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <line x1={(startX + endX)/2 - 3} y1={(startY + endY)/2 - 3} x2={(startX + endX)/2 + 3} y2={(startY + endY)/2 + 3} stroke="white" strokeWidth="1.5" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <line x1={(startX + endX)/2 + 3} y1={(startY + endY)/2 - 3} x2={(startX + endX)/2 - 3} y2={(startY + endY)/2 + 3} stroke="white" strokeWidth="1.5" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </g>
              );
            })}
          </svg>

          {/* Draggable Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              draggable
              onDragStartCapture={(e: any) => handleDragStart(e, node, true)}
              style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                width: CARD_WIDTH,
                height: CARD_HEIGHT
              }}
              className={`group cursor-grab active:cursor-grabbing ${isLinking.source === node.id ? 'ring-2 ring-blue-500 ring-offset-2 rounded-xl' : ''}`}
            >
              <Card padding="none" className="h-full w-full flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all bg-white overflow-hidden">
                <div className="flex-1 p-3 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900 leading-tight pr-6">{node.title}</h3>
                    <div className="flex flex-col gap-1 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeNode(node.id); }}
                        className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded"
                        title="Remove from map"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-slate-500">{node.credits} CR</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className={`text-[10px] font-semibold ${node.type === 'core' ? 'text-blue-600' : 'text-emerald-600'}`}>
                        {node.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNodeClick(node.id); }}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                        isLinking.source === node.id 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                      }`}
                    >
                      {isLinking.source === node.id ? 'Linking...' : 'Link'}
                    </button>
                  </div>
                </div>
                {/* Connection Points Decoration */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-slate-300 rounded-full opacity-0 group-hover:opacity-100" />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-slate-300 rounded-full opacity-0 group-hover:opacity-100" />
              </Card>
            </motion.div>
          ))}
          
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">Canvas is empty</h3>
                <p className="text-sm text-slate-500 max-w-sm">Drag courses from the library on the left to start building your prerequisite map.</p>
              </div>
            </div>
          )}

        </div>
      </div>
      
    </div>
  );
}
