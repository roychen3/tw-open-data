import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import './map.scss'
import taiwanCounty from './taiwan-county.json'

const TaiwamMap = ({ selectedCounty, setCounty }) => {
    const mapRef = useRef()

    useEffect(() => {
        const width = 700
        const height = 600

        // 判斷螢幕寬度，給不同放大值
        let mercatorScale, w = window.screen.width
        if (w > 1366) {
            mercatorScale = 11000
        }
        else if (w <= 1366 && w > 480) {
            mercatorScale = 9000
        }
        else {
            mercatorScale = 6000
        }

        // d3：svg path 產生器
        const projection = d3.geoMercator()
            .center([121, 24])
            .scale(mercatorScale)
            .translate([width / 2, height / 2.5])

        var path = d3.geoPath(projection)

        // 讓d3抓svg，並寫入寬高
        var svg = d3.select(mapRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)

        svg.selectAll('path')
            .data(taiwanCounty.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('id', (d) => {
                // 設定id，為了click時加class用
                return d.properties.COUNTYNAME
            })
            .on('click', (d) => {
                setCounty(d.target.id)
            })

    }, [])

    useEffect(() => {
        // 有 .active 存在，就移除 .active
        if (document.querySelector('.container .taiwan-map .active')) {
            document.querySelector('.container .taiwan-map .active').classList.remove('active')
        }
        // 被點擊的縣市加上 .active
        document.querySelector(`.container .taiwan-map #${selectedCounty}`).classList.add('active')
        // d.target.classList.add('active')
    }, [selectedCounty])

    return (
        <div className="container">
            <div className="taiwan-map">
                <div id="map">
                    <svg ref={mapRef} id="svg" ></svg>
                </div>
            </div>
        </div>
    )
}

TaiwamMap.propTypes = {
    selectedCounty: PropTypes.string.isRequired,
    setCounty: PropTypes.func.isRequired,
}

export default TaiwamMap
