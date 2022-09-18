import { useMapEvents } from "react-leaflet";

function MapEvents() {
  const map = useMapEvents({
    click: (event) => {
      alert(event.latlng);
    },
    mouseover: () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    },
  });
  return null;
}

export default MapEvents;
