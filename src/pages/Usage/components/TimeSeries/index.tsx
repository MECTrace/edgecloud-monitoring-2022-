import * as d3 from 'd3';
import { Box, Text, Group, Title } from '@mantine/core';
import { TimeSeriesDataProps } from '../..';
import { useEffect, useRef } from 'react';

interface TimeSeriesProps {
  dataAllNode: TimeSeriesDataProps[];
  dataSelectedNode: TimeSeriesDataProps[];
  tab: string;
}
const TimeSeries = (props: TimeSeriesProps) => {
  const { dataAllNode, dataSelectedNode, tab } = props;
  const svgRef = useRef(null);
  const margin = { top: 30, right: 50, bottom: 50, left: 50 };
  const width = window.innerWidth * 0.58;
  const height = window.innerHeight * 0.6;

  useEffect(() => {
    d3.select(`#time_series_${tab} > svg`).remove();
    const svg = d3
      .select(svgRef.current)
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
      .line<TimeSeriesDataProps>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.total));
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

    svg
      .selectAll('circle')
      .data(dataAllNode)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return x(new Date(d.date));
      })
      .attr('cy', function (d) {
        return y(d.total);
      })
      .attr('r', 3)
      .attr('fill', '#125073')
      .on('mouseover', function (event, d) {
        const tooltip = d3
          .select(`#time_series_${tab}`)
          .append('div')
          .attr('class', 'tooltip-all-node')
          .style('position', 'absolute')
          .style('padding', '5px')
          .style('background-color', '#FFFFFF')
          .style('border', '1px solid #CCCCCC')
          .style('border-radius', '5px')
          .style('opacity', 0);
        tooltip
          .html(
            `Date: ${new Date(d.date).toDateString()}<br>
                  Total: ${d.total}<br>`,
          )
          .style('opacity', 0.9)
          .style('top', `${event.pageY}px`)
          .style('left', `${event.pageX}px`);
        d3.select(this).attr('r', 6);
      })
      .on('mouseout', function () {
        d3.select(this).attr('r', 3);
        d3.select(`#time_series_${tab} > div.tooltip-all-node`).remove();
      });

    svg
      .selectAll('.selected-circle')
      .data(dataSelectedNode)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return x(new Date(d.date));
      })
      .attr('cy', function (d) {
        return y(d.total);
      })
      .attr('r', 3)
      .attr('fill', '#A8DBF8')
      .attr('class', 'selected-circle')
      .on('mouseover', function (event, d) {
        const tooltip = d3
          .select(`#time_series_${tab}`)
          .append('div')
          .attr('class', 'tooltip-selected-node')
          .style('position', 'absolute')
          .style('padding', '5px')
          .style('background-color', '#FFFFFF')
          .style('border', '1px solid #CCCCCC')
          .style('border-radius', '5px')
          .style('opacity', 0);
        tooltip
          .html(
            `Date: ${new Date(d.date).toDateString()}<br>
                  Total: ${d.total}<br>`,
          )
          .style('opacity', 0.9)
          .style('top', `${event.pageY}px`)
          .style('left', `${event.pageX}px`);
        d3.select(this).attr('r', 6);
      })
      .on('mouseout', function () {
        d3.select(this).attr('r', 3);
        d3.select(`#time_series_${tab} > div.tooltip-selected-node`).remove();
      });
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
        <Group position="center" mt="md">
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