import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { JourneyGraph, JourneyLink, JourneyNode } from "../types/portfolio";

interface JourneyVisualizationProps {
  graph: JourneyGraph;
}

interface SimulationNode extends JourneyNode, d3.SimulationNodeDatum {}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  strength: number;
}

const groupColors: Record<JourneyNode["group"], string> = {
  Education: "#8c1515",
  Research: "#476a6f",
  Industry: "#6f5b3e",
  Skill: "#5d6b36",
  Project: "#7a4f6a"
};

function resolveId(value: string | number | SimulationNode | undefined): string {
  if (typeof value === "object" && value !== null) {
    return value.id;
  }

  return String(value);
}

export function JourneyVisualization({ graph }: JourneyVisualizationProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const years = useMemo(() => d3.extent(graph.nodes, (node) => node.year), [graph.nodes]);

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) {
      return;
    }

    const width = wrapperRef.current.clientWidth;
    const height = Math.max(420, Math.min(560, width * 0.58));
    const nodes: SimulationNode[] = graph.nodes.map((node) => ({ ...node }));
    const links: SimulationLink[] = graph.links.map((link: JourneyLink) => ({ ...link }));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("role", "img");

    const minYear = years[0] ?? 2022;
    const maxYear = years[1] ?? 2026;
    const yearScale = d3.scaleLinear().domain([minYear, maxYear]).range([70, width - 70]);

    const zoomLayer = svg.append("g");
    const linkLayer = zoomLayer.append("g").attr("class", "journey-links");
    const nodeLayer = zoomLayer.append("g").attr("class", "journey-nodes");
    const labelLayer = zoomLayer.append("g").attr("class", "journey-labels");

    svg
      .append("g")
      .attr("class", "journey-axis")
      .attr("transform", `translate(0, ${height - 38})`)
      .call(d3.axisBottom(yearScale).tickFormat(d3.format("d")).ticks(Math.max(2, maxYear - minYear + 1)));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<SimulationNode, SimulationLink>(links)
          .id((node) => node.id)
          .distance((link) => 95 / Math.max(link.strength, 0.5))
      )
      .force("charge", d3.forceManyBody().strength(-420))
      .force("x", d3.forceX<SimulationNode>((node) => yearScale(node.year)).strength(0.55))
      .force("y", d3.forceY(height / 2).strength(0.08))
      .force("collide", d3.forceCollide<SimulationNode>(44));

    const linkSelection = linkLayer
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "var(--line)")
      .attr("stroke-width", (link) => 1 + link.strength)
      .attr("opacity", 0.75);

    const nodeSelection = nodeLayer
      .selectAll<SVGCircleElement, SimulationNode>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 13)
      .attr("fill", (node) => groupColors[node.group])
      .attr("stroke", "var(--surface)")
      .attr("stroke-width", 2)
      .attr("tabindex", 0)
      .on("pointermove", (event, node) => {
        setTooltip({ x: event.offsetX + 12, y: event.offsetY + 12, text: `${node.label} | ${node.group} | ${node.year}` });
      })
      .on("pointerleave blur", () => setTooltip(null))
      .call(
        d3
          .drag<SVGCircleElement, SimulationNode>()
          .on("start", (event) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          })
          .on("drag", (event) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          })
          .on("end", (event) => {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          })
      );

    const labelSelection = labelLayer
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((node) => node.label)
      .attr("font-size", 12)
      .attr("fill", "var(--text)")
      .attr("text-anchor", "middle")
      .attr("dy", 30);

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.75, 2.8])
        .on("zoom", (event) => {
          zoomLayer.attr("transform", event.transform);
        })
    );

    simulation.on("tick", () => {
      linkSelection
        .attr("x1", (link) => (link.source as SimulationNode).x ?? 0)
        .attr("y1", (link) => (link.source as SimulationNode).y ?? 0)
        .attr("x2", (link) => (link.target as SimulationNode).x ?? 0)
        .attr("y2", (link) => (link.target as SimulationNode).y ?? 0);

      nodeSelection.attr("cx", (node) => node.x ?? 0).attr("cy", (node) => node.y ?? 0);
      labelSelection.attr("x", (node) => node.x ?? 0).attr("y", (node) => node.y ?? 0);
    });

    nodeSelection.append("title").text((node) => `${node.label}, ${node.group}, ${node.year}`);
    linkSelection.append("title").text((link) => `${resolveId(link.source)} to ${resolveId(link.target)}`);

    return () => {
      simulation.stop();
    };
  }, [graph, years]);

  return (
    <div className="journey-viz" ref={wrapperRef}>
      <svg ref={svgRef} aria-label="Interactive academic and technical journey graph" />
      {tooltip ? (
        <div className="viz-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      ) : null}
    </div>
  );
}
