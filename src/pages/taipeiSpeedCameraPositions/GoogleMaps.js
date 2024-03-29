import React, { useEffect, useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Loader } from '@googlemaps/js-api-loader';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Box from '@material-ui/core/Box';

import { MuiLoadingPage } from '../../components/muiCircularProgress';
import MuiTextField from '../../components/MuiTextField';
import { GOOGLE_MAPS_API_KEY } from '../../constants/googleMapsApiKey';

import useTaipeiSpeedCameraPositions from './useTaipeiSpeedCameraPositions';
// google map style 產生器 https://mapstyle.withgoogle.com/
import googleMapsStyleTheme from './googleMapsStyleTheme.json';

const StyledMapLoadError = styled.div`
padding: 2rem;
color: ${({ theme }) => theme.error}};
`;

const StyledMapContainer = styled.div`
  wdth: 100%;
  height: 50vh;
  position: relative;

  @media (min-width: 600px) {
    height: 80vh;
  }
`;
const StyledListContainer = styled.div`
  height: 30vh;
  overflow-y: hidden;

  @media (min-width: 600px) {
    height: 80vh;
  }
`;

const StyledPaper = styled(Paper)`
`;

const StyledLocationOnIcon = styled(LocationOnIcon)`
  width: 39px !important;
  height: 39px !important;
`;

const StyledList = styled(List)`
  height: calc(100% - 80px);
  overflow: auto;
`;

const StyledListItem = styled(ListItem)`
  color: ${({ theme, $isSelected, $isNoMarker }) => {
    if ($isSelected) return theme.highlight;
    else if ($isNoMarker) return theme.error;
    return theme.mainText;
  }} !important;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.hover : ''} !important;

  .MuiListItemIcon-root .MuiSvgIcon-root,
  .MuiTypography-colorTextSecondary {
    color: ${({ theme, $isSelected, $isNoMarker }) => {
      if ($isSelected) return theme.highlight;
      else if ($isNoMarker) return theme.error;
      return theme.mainText;
    }} !important;
  }
`;

const StyledListItemTextSecondary = styled.span`
  display: block;
`;

const getRandomCharacter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return [
    alphabet[Math.floor(Math.random() * alphabet.length)],
    alphabet[Math.floor(Math.random() * alphabet.length)],
    alphabet[Math.floor(Math.random() * alphabet.length)],
  ].join('');
};

const GoogleMaps = ({ theme }) => {
  const { taipeiSpeedCameraPositions } = useTaipeiSpeedCameraPositions();
  const googleMapRef = useRef();
  const cameraListRef = useRef();

  const millisecond = Date.now().toString().slice(-3);
  const randomCharacter = getRandomCharacter();
  const mapId = `map-${randomCharacter + millisecond}`;
  const [mapElementID] = useState(mapId);

  const [google, setGoogle] = useState(undefined);
  const [loadGoogleError, setLoadGoogleError] = useState(undefined);
  const [gMap, setGMap] = useState(undefined);
  const [infoWindow, setInfoWindow] = useState(undefined);
  const [createdMarkers, setCreatedMarkers] = useState({});
  const [selectedCameraNo, setSelectedCameraNo] = useState('');
  const [filterCameraList, setFilterCameraList] = useState(
    taipeiSpeedCameraPositions
  );
  const [cameraItems, setCameraItems] = useState(null);

  const handleSearchFieldChange = (event) => {
    setSelectedCameraNo('');
    infoWindow.close();
    taipeiSpeedCameraPositions.forEach((item) => {
      if (item.errorMessage) {
        return;
      }
      createdMarkers[item.no].setMap(null);
    });

    if (event.target.value) {
      const reg = new RegExp(event.target.value, 'g');
      const filtedList = taipeiSpeedCameraPositions.filter(
        (item) =>
          reg.test(item.address) ||
          reg.test(`限速 ${item.speedLimit}`) ||
          reg.test(item.features)
      );
      setFilterCameraList(filtedList);
    } else {
      setFilterCameraList(taipeiSpeedCameraPositions);
    }
  };

  const handlePositionListClick = (data) => {
    gMap.setCenter(data.location);

    const infoWindowContent = `
            <div style="color: #ea4335;">
                <div>${data.features} - 限速 ${data.speedLimit}<div>
                    <div>${data.address}</div>
                </div>
                    `;
    infoWindow.setContent(infoWindowContent);
    infoWindow.open(gMap, createdMarkers[data.no]);

    setSelectedCameraNo(data.no);
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader
      .load()
      .then((res) => {
        setGoogle(res);

        const newMap = new res.maps.Map(googleMapRef.current, {
          center: { lat: 25.047802296330403, lng: 121.5177953369906 },
          zoom: 12,
          mapTypeControl: false,
          styles: googleMapsStyleTheme[theme.themeName],
        });
        setGMap(newMap);

        const newInfoWindow = new res.maps.InfoWindow({
          content: '',
          disableAutoPan: true,
        });
        setInfoWindow(newInfoWindow);

        let markers = {};
        taipeiSpeedCameraPositions.forEach((item) => {
          if (item.errorMessage) {
            return;
          }

          const marker = new res.maps.Marker({
            position: item.location,
            map: null,
          });
          marker.addListener('click', () => {
            const infoWindowContent = `
                    <div style="color: #ea4335;">
                        <div>${item.features} - 限速 ${item.speedLimit}<div>
                        <div>${item.address}</div>
                    </div>
                    `;
            newInfoWindow.setContent(infoWindowContent);
            newInfoWindow.open(gMap, marker);

            setSelectedCameraNo(item.no);
          });
          markers[item.no] = marker;
        });
        setCreatedMarkers(markers);
      })
      .catch((err) => {
        console.log('err.message', err.message);
        setLoadGoogleError(err.message);
      });
  }, []);

  useEffect(() => {
    if (gMap) {
      gMap.setOptions({
        styles: googleMapsStyleTheme[theme.themeName],
      });
    }
  }, [theme.themeName]);

  const isElementVisible = (element, container) => {
    const { bottom, height, top } = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return top <= containerRect.top
      ? containerRect.top - top <= height
      : bottom - containerRect.bottom <= height;
  };

  const setContainerScrollY = (element, container) => {
    const { top: elementTop } = element.getBoundingClientRect();
    const { top: containerTop } = container.getBoundingClientRect();
    container.scrollTop += elementTop - containerTop;
  };

  useEffect(() => {
    if (gMap && Object.keys(createdMarkers).length > 0) {
      const items = filterCameraList.map((item) => {
        if (item.errorMessage) {
          return (
            <Fragment key={`${item.no}`}>
              <StyledListItem
                alignItems="flex-start"
                $isSelected={false}
                $isNoMarker
              >
                <ListItemIcon>
                  <StyledLocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${item.features} - 限速 ${item.speedLimit}`}
                  secondary={
                    <>
                      <StyledListItemTextSecondary>
                        {item.address}
                      </StyledListItemTextSecondary>
                      <StyledListItemTextSecondary>
                        經緯度轉換失敗，無法產生地標
                      </StyledListItemTextSecondary>
                    </>
                  }
                />
              </StyledListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          );
        }

        const mark = createdMarkers[item.no];
        mark.setMap(gMap);
        mark.addListener('click', () => {
          const cameraElement = document.querySelector(`#camera-${item.no}`);
          if (
            isElementVisible(cameraElement, cameraListRef.current) === false
          ) {
            setContainerScrollY(cameraElement, cameraListRef.current);
          }
        });

        return (
          <Fragment key={`${item.no}`}>
            <StyledListItem
              alignItems="flex-start"
              role={undefined}
              dense
              button
              onClick={() => handlePositionListClick(item)}
              $isSelected={selectedCameraNo === item.no}
              id={`camera-${item.no}`}
            >
              <ListItemIcon>
                <StyledLocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${item.features} - 限速 ${item.speedLimit}`}
                secondary={item.address}
              />
            </StyledListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      });

      setCameraItems(items);
    }
  }, [gMap, createdMarkers, filterCameraList, selectedCameraNo]);

  return (
    <StyledPaper>
      {loadGoogleError && (
        <StyledMapLoadError>
          <Box display="flex" justifyContent="center">
            <Box>
              <WarningRoundedIcon />
            </Box>
            <Box>系統發生異常</Box>
          </Box>
        </StyledMapLoadError>
      )}
      {!loadGoogleError && (
        <Grid container>
          <Grid item xs={12} sm={!google && !gMap ? 12 : 8}>
            <StyledMapContainer id={mapElementID} ref={googleMapRef}>
              {!google && !gMap && <MuiLoadingPage />}
            </StyledMapContainer>
          </Grid>
          {cameraItems && (
            <Grid item xs={12} sm={4}>
              <StyledListContainer>
                <List>
                  <StyledListItem role={undefined} dense>
                    <MuiTextField
                      label="Search..."
                      onChange={handleSearchFieldChange}
                      fullWidth
                    />
                  </StyledListItem>
                </List>
                <StyledList ref={cameraListRef}>{cameraItems}</StyledList>
              </StyledListContainer>
            </Grid>
          )}
        </Grid>
      )}
    </StyledPaper>
  );
};
GoogleMaps.propTypes = {
  theme: PropTypes.instanceOf(Object).isRequired,
};

export default withTheme(GoogleMaps);
