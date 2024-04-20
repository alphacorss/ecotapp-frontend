'use client';
import { Icon } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import Main from '@/app/context/Main';
import useWindowDimensions from '@/app/hooks/useMediaQuery';

const Map = ({ data }: { data: any }) => {
  const { definedGlobalWidth } = React.useContext(Main);
  const { currentWindowWidth } = useWindowDimensions();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (currentWindowWidth < definedGlobalWidth) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentWindowWidth, definedGlobalWidth]);

  const customIcon = new Icon({
    iconUrl: '/pin-solid.svg',
    iconSize: [40, 40],
  });

  return (
    <MapContainer
      center={data[0].position}
      zoom={isMobile ? 10 : 12}
      scrollWheelZoom={false}
      className={`h-full w-full z-[48]`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {data.map((marker: any, i: number) => (
        <Marker key={i} position={marker.position} icon={customIcon}>
          <Popup>
            <div className="flex justify-center items-center gap-5 py-2 px-1">
              <div className="flex-[4]">
                <h3>{marker.title}</h3>
                <p className="leading-snug">{marker.subtitle}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
