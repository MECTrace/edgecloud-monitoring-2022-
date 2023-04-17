import * as d3 from 'd3';
import { Box, Text, Group, Title } from '@mantine/core';
import { UsageStatusDataProps } from '../..';
import { useEffect, useRef } from 'react';

interface UsageStatusProps {
  data: UsageStatusDataProps[];
}

const BarChart = (props: UsageStatusProps) => {
  const { data } = props;
  const svgRef = useRef(null);
  const margin = { top: 10, right: 50, bottom: 90, left: 50 };
  const width = window.innerWidth * 0.32;

  const height = window.innerHeight * 0.5;
  useEffect(() => {
    let svg = d3.select(svgRef.current);
    d3.select('#bar_chart > svg').remove();
    svg = d3
      .select('#bar_chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const groups = data.map((d) => d.name);
    const subgroups = ['total', 'lastHours'];

    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width - margin.left - margin.right])
      .padding(0.2);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '12px')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const maxYAxis = d3.max(data, (d: UsageStatusProps) => +(d.total + d.lastHours)) || 150;
    const amountOfNumberOnY = 5;
    const y = d3
      .scaleLinear()
      .domain([0, maxYAxis])
      .range([height - margin.bottom, 0]);

    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(amountOfNumberOnY))
      .selectAll('text')
      .style('font-size', '15px');

    const color = d3.scaleOrdinal().domain(subgroups).range(['#F0F0F0', '#CBDDE6']);
    const stackedData = d3.stack().keys(subgroups)(data);
    svg
      .append('g')
      .selectAll('g')
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d.data.name))
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .transition()
      .duration(750)
      .delay((d, i) => i * 50)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]));
  }, [data]);
  return (
    <>
      <Box sx={{ width: width, height: height * 1.3, background: '#FFFFFF' }}>
        <Title
          order={3}
          weight={700}
          sx={{ marginLeft: margin.left * 0.3, paddingTop: '0.5rem', fontSize: '1.3rem' }}
        >
          Bar Chart
        </Title>
        <Group position="center" mt="md" mb="xs">
          <Box sx={{ width: '3rem', height: '1.5rem', background: '#cacaca' }}></Box>
          <Text weight={600}>Total File Counts</Text>
          <Box sx={{ width: '3rem', height: '1.5rem', background: '#CBDDE6' }}></Box>
          <Text weight={600}>Last 24 Hours</Text>
        </Group>
        <Box id="bar_chart" ref={svgRef}></Box>
      </Box>
    </>
  );
};

export default BarChart;
