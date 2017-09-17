'use strict';

app.service('donutGenerator', function (){

	this.createDonutChart = (data, el) => {
		let color = ['#99d6ff', '#99ff99', '#ffff99', '#ff9999'];
        let width = 300;
        let height = 300;
        let min = Math.min(width, height);
        let svg = d3.select(el).append('svg');
        let pie = d3.layout.pie().sort(null);
        let arc = d3.svg.arc()
          .outerRadius(min / 2 * 0.9)
          .innerRadius(min / 2 * 0.5);

        svg.attr({width: width, height: height});
        var g = svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        g.selectAll('path').data(pie(data))
          .enter().append('path')
            .style('stroke', 'white')
            .attr('d', arc)
            .attr('fill', function(d, i){ return color[i]; });
	};

});