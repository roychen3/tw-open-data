import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';

import taiwanCounty from './taiwan-county.json';

const StyledMap = styled.div`
flex-grow: 2;

svg#taiwan-map{
    width: 400px;
    height: 500px;
}

svg#taiwan-map path {
    fill: transparent;
    stroke: ${({ theme }) => theme.mainText};
    cursor: pointer;
    transition: fill .2s ease, stroke .2s ease, transform .2s ease;
}

svg#taiwan-map path:hover, 
svg#taiwan-map path.active {
    fill: ${({ theme }) => theme.highlight};
    stroke: ${({ theme }) => theme.mainBackground};
    transform: translateY(-5px);
}

@media (min-width: 600px) {
    text-align: center;
}
@media (min-width: 960px){
    text-align: start;
}
`;

const TaiwamMap = ({ selectedCounty, setCounty }) => {
    const mapRef = useRef();

    useEffect(() => {
        // 判斷螢幕寬度，給不同放大值
        let mercatorScale = 14000;

        // d3：svg path 產生器
        const projection = d3.geoMercator()
            .center([121.2, 24.2])
            .scale(mercatorScale);
        // .translate([50%, 50%])

        var path = d3.geoPath(projection);

        // 讓d3抓svg，並寫入寬高
        var svg = d3.select(mapRef.current)
            .attr('viewBox', '0 0 800 800');

        svg.selectAll('path')
            .data(taiwanCounty.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('id', (countyInfo) => {
                // 設定id，為了click時加class用
                return countyInfo.properties.COUNTYNAME;
            })
            .on('click', (countyPathElement) => {
                setCounty(countyPathElement.target.id);
            });
    }, []);

    useEffect(() => {
        // 有 .active 存在，就移除 .active
        if (document.querySelector('#taiwan-map .active')) {
            document.querySelector('#taiwan-map .active').classList.remove('active');
        }
        // 被點擊的縣市加上 .active
        document.querySelector(`#taiwan-map #${selectedCounty}`).classList.add('active');
    }, [selectedCounty]);

    return (
        <StyledMap>
            <svg ref={mapRef} id="taiwan-map" ></svg>
        </StyledMap>
    );
};

TaiwamMap.propTypes = {
    selectedCounty: PropTypes.string.isRequired,
    setCounty: PropTypes.func.isRequired,
};

export default TaiwamMap;
