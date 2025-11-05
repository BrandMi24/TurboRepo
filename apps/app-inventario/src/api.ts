// apps/app-inventario/src/api.ts
export async function getProductos() {
  const r = await fetch("http://localhost:4000/core/products");
  if(!r.ok) throw new Error("Error productos");
  return r.json();
}

// apps/app-inventario/src/Map.tsx (Mapbox)
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!ref.current) return;
    const map = new mapboxgl.Map({ container: ref.current, style: "mapbox://styles/mapbox/streets-v12", center:[-98.3,26.0], zoom:10 });
    new mapboxgl.Marker().setLngLat([-98.3,26.0]).addTo(map);
    return ()=> map.remove();
  },[]);
  return <div style={{height:400}} ref={ref}/>;
}
