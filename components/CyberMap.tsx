import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const CyberMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });

  useEffect(() => {
    // Creating a fixed topology for the dashboard look
    const nodes = Array.from({ length: 18 }, (_, i) => ({
      id: `node-${i}`,
      group: Math.floor(Math.random() * 3) // 0: Core (Orange), 1: Relay (White), 2: Edge (Green)
    }));

    const links: any[] = [];
    nodes.forEach((node, i) => {
      const targetIndex = (i + 1 + Math.floor(Math.random() * 5)) % nodes.length;
      links.push({ source: node.id, target: nodes[targetIndex].id });
      if (Math.random() > 0.7) {
        links.push({ source: node.id, target: nodes[(i + 3) % nodes.length].id });
      }
    });

    setData({ nodes, links });
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.nodes.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(50))
      .force("charge", d3.forceManyBody().strength(-80))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const link = svg.append("g")
      .attr("stroke", "#064e3b") // emerald-900
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 1);

    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 3)
      .attr("fill", (d: any) => d.group === 0 ? "#FF9933" : (d.group === 1 ? "#FFFFFF" : "#10b981")) // Saffron, White, Green
      .attr("stroke", "#020617")
      .attr("stroke-width", 1);

    // Add pulsing "packets"
    const packets = svg.append("g");
    
    function sendPacket() {
       if (data.links.length === 0) return;
       const randomLink = data.links[Math.floor(Math.random() * data.links.length)];
       
       const source: any = randomLink.source;
       const target: any = randomLink.target;
       
       if(!source.x || !target.x) return;

       const packet = packets.append("circle")
         .attr("r", 2)
         .attr("fill", "#FF9933") // Saffron packets
         .attr("cx", source.x)
         .attr("cy", source.y);

       packet.transition()
         .duration(1000 + Math.random() * 500)
         .ease(d3.easeLinear)
         .attr("cx", target.x)
         .attr("cy", target.y)
         .remove();
    }

    const packetInterval = setInterval(sendPacket, 200);

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    }

    return () => {
      simulation.stop();
      clearInterval(packetInterval);
    };
  }, [data]);

  return (
    <div className="w-full h-64 bg-black/40 border border-emerald-900/50 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute top-2 left-2 text-[10px] text-orange-400 font-mono tracking-wider z-10 flex items-center">
        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
        CYBER_WARFARE_GRID // REGION: ASIA-SOUTH
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default CyberMap;