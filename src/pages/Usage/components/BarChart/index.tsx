import * as d3 from 'd3';
import { Box, Text, Group, Title } from '@mantine/core';
import { UsageStatusDataProps } from '../..';
import { useEffect, useRef } from 'react';

interface UsageStatusProps {
  data: UsageStatusDataProps[];
  width: number;
}

const BarChart = (props: UsageStatusProps) => {
  const { data, width } = props;
  const svgRef = useRef(null);
  const margin = { top: 10, right: 50, bottom: 90, left: 50 };

  const height = window.innerHeight * 0.5;
  useEffect(() => {
    d3.select('#bar_chart > svg').remove();
    const svg = d3
      .select(svgRef.current)
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

    const maxYAxis = d3.max(data, (d: UsageStatusDataProps) => +(d.total + d.lastHours)) || 150;
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

    const color = d3.scaleOrdinal().domain(subgroups).range(['#cacaca', '#CBDDE6']);
    const stackedData = d3.stack().keys(subgroups)(
      data.map((datum) => {
        let values = {};
        subgroups.forEach(() => {
          values = { ...datum };
        });
        return values;
      }),
    );
    svg
      .append('g')
      .selectAll('g')
      .data(stackedData)
      .join('g')
      .attr('fill', (d: d3.Series<{ [key: string]: number }, string>) => {
        return color(d.key) as string;
      })
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d.data.name.toString()) ?? null)
      .attr('y', (d) => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .on('mouseover', (event, d) => {
        const tooltip = d3
          .select('#bar_chart')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('padding', '5px')
          .style('background-color', '#FFFFFF')
          .style('border', '1px solid #CCCCCC')
          .style('border-radius', '5px')
          .style('opacity', 0);
        tooltip
          .html(
            `Name: ${d.data.name}<br>
                  Total: ${d.data.total}<br>
                  Last 24 hours: ${d.data.lastHours}`,
          )
          .style('opacity', 0.9)
          .style('top', `${event.pageY}px`)
          .style('left', `${event.pageX}px`);
        d3.select(event.currentTarget).attr('opacity', 0.7);
      })
      .on('mouseout', (event) => {
        d3.select('#bar_chart > div').remove();
        d3.select(event.currentTarget).attr('opacity', 1);
      })
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
