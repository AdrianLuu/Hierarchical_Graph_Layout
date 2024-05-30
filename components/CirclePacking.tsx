"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from '@/flare-2.json';

interface DataNode {
  name: string;
  value?: number;
  children?: DataNode[];
}

const CirclePacking: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 1000;
    const height = 1000;
    const format = d3.format(",d");

    const svg = d3.select(ref.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')
      .style('margin', '0 auto')
      .style('background', '#ffffff')
      .style('cursor', 'pointer');

    const root = d3.hierarchy<DataNode>(data as DataNode)
      .sum(d => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const pack = d3.pack<DataNode>()
      .size([width, height])
      .padding(8); // Parameter for density

    const nodes = pack(root).descendants();

    const node = svg.selectAll('g')
      .data(nodes)
      .join('g')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d.children ? '#ffffff' : '#a9a9a9')
      .attr('stroke', d => d.children ? '#a9a9a9' : '#ffffff')
      .attr('stroke-width', 1.5);

    node.filter(d => !d.children).append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', 'white')
      .style('font-size', d => `${Math.max(10, d.r / 3)}px`)
      .text(d => d.data.name);

    node.append('title')
      .text(d => `${d.data.name}\n${format(d.value!)}`);
  }, []);

  return (
    <svg ref={ref}></svg>
  );
};

export default CirclePacking;




