import * as d3 from 'd3';
import { Box, Text, Group, Title } from '@mantine/core';
import { useRef } from 'react';
import { FileTypeDataProps } from '../..';

interface FileTypeProps {
  data: FileTypeDataProps[];
}
const PieChart = (props: FileTypeProps) => {
  const { data } = props;
  data.map((d) => {
    if (d) {
      d.fileType = d.fileType.replace('.', '');
    }
  });
  const svgRef = useRef(null);
  const margin = { top: 10, right: 50, bottom: 50, left: 10 };
  const width = window.innerWidth * 0.25;
  const height = window.innerHeight * 0.5;

  d3.select(svgRef.current).select('svg').remove();

  const radius = (0.8 * Math.min(width, height)) / 2;
  const innerRadius = radius - 60;

  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.fileType))
    .range(d3.schemeCategory10);

  const pie = d3.pie<FileTypeDataProps>().value((d) => d.total);

  const arc = d3
    .arc<d3.PieArcDatum<FileTypeDataProps>>()
    .outerRadius(radius)
    .innerRadius(innerRadius);
  const svg = d3
    .select(svgRef.current)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform', `translate(${width / 2},${(height - margin.bottom) / 2})`);

  svg.style('font-size', '14px');

  if (window.matchMedia('(max-width: 480px)').matches) {
    svg.style('font-size', '12px');
  }

  const arcs = svg.selectAll('arc').data(pie(data)).enter().append('g').attr('class', 'arc');

  arcs
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => color(d.data.fileType) as string)
    .on('mouseover', function (event, d) {
      const tooltip = d3
        .select('#pie_chart')
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
          `File: ${d.data.fileType}<br>
                  Total: ${d.data.total}<br>`,
        )
        .style('opacity', 0.9)
        .style('top', `${event.pageY}px`)
        .style('left', `${event.pageX}px`);
      d3.select(this).attr('opacity', 0.7);
    })
    .on('mouseout', function () {
      d3.select('#pie_chart > div').remove();
      d3.select(this).attr('opacity', 1);
    })
    .transition()
    .duration(500)
    .attrTween('d', function (d: d3.PieArcDatum<FileTypeDataProps>): (t: number) => string {
      const interpolate = d3.interpolate(d.startAngle + 0.1, d.endAngle);
      return function (t: number): string {
        d.endAngle = interpolate(t);
        return arc(d) as string;
      };
    });

  return (
    <>
      <Box sx={{ width: width, height: height * 1.3, background: '#FFFFFF' }}>
        <Title
          order={3}
          weight={700}
          sx={{ marginLeft: margin.left * 2, paddingTop: '0.5rem', fontSize: '1.3rem' }}
        >
          Pie Chart
        </Title>
        <Group key="fileType" position="center" mt="md" mb="xs" spacing={'xl'}>
          {data.map((d: FileTypeDataProps, index: number) => {
            const boxColor = color(color.domain()[index]);
            return (
              <Group key={d.fileType} position="center" spacing={'xs'}>
                <Box sx={{ width: '2rem', height: '0.6rem', background: boxColor as string }}></Box>
                <Text weight={600} size={12}>
                  {d.fileType}
                </Text>
              </Group>
            );
          })}
        </Group>
        <Box id="pie_chart" ref={svgRef}></Box>
      </Box>
    </>
  );
};

export default PieChart;
