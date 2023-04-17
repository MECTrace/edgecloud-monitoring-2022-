import * as d3 from 'd3';
import { Box, Text, Group, Title } from '@mantine/core';
import { TimeSeriesDataProps } from '../..';
import { useEffect, useRef } from 'react';
import { Table } from 'tabler-icons-react';

interface TimeSeriesProps {
  dataAllNode: TimeSeriesDataProps[];
  dataSelectedNode: TimeSeriesDataProps[];
  tab: string;
}
const TimeSeries = (props: TimeSeriesProps) => {
  const { dataAllNode, dataSelectedNode, tab } = props;
  const svgRef = useRef(null);
  const margin = { top: 10, right: 50, bottom: 50, left: 50 };
  const width = window.innerWidth * 0.58;
  const height = window.innerHeight * 0.5;

  useEffect(() => {
    let svg = d3.select(svgRef.current);
    d3.select(`#time_series_${tab} > svg`).remove();
    svg = d3
      .select(`#time_series_${tab}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const rangeDate = d3.extent(dataAllNode, (d: TimeSeriesDataProps) => d.date);
    const x = d3
      .scaleUtc()
      .domain([
        new Date(rangeDate[0] || Date.now() - 30 * 60 * 60 * 1000),
        new Date(rangeDate[1] || Date.now()),
      ])
      .range([0, width - margin.left - margin.right]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '15px');

    const maxYAxis = d3.max(dataAllNode, (d: TimeSeriesDataProps) => +d.total) || 150;
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

    const line = d3
      .line()
      .x((d: TimeSeriesDataProps) => x(new Date(d.date)))
      .y((d: TimeSeriesDataProps) => y(d.total));
    svg
      .append('path')
      .attr('class', 'all-node')
      .attr('fill', 'none')
      .attr('stroke', '#125073 ')
      .attr('stroke-width', 3)
      .attr('d', line(dataAllNode));

    svg
      .append('path')
      .attr('class', 'selected-node')
      .attr('fill', 'none')
      .attr('stroke', '#A8DBF8 ')
      .attr('stroke-width', 3)
      .attr('d', line(dataSelectedNode));
  }, [dataAllNode, dataSelectedNode]);
  return (
    <>
      <Box sx={{ width: width, height: height * 1.25, background: '#FFFFFF' }}>
        <Title
          order={3}
          weight={700}
          sx={{ marginLeft: margin.left * 0.3, paddingTop: '0.5rem', fontSize: '1.3rem' }}
        >
          Time Series
        </Title>
        <Group position="center" mt="md" mb="xs">
          <Box sx={{ width: '3rem', height: '1.5rem', background: '#125073 ' }}></Box>
          <Text weight={650}>Daily Total File Counts</Text>
          <Box sx={{ width: '3rem', height: '1.5rem', background: '#A8DBF8 ' }}></Box>
          <Text weight={650}>Daily Selected VM File Counts</Text>
        </Group>
        <Box id={`time_series_${tab}`} ref={svgRef}></Box>
      </Box>
    </>
  );
};

export default TimeSeries;
