declare namespace kakao {
  namespace maps {
    function isInitialized(): boolean;
    function init(appKey: string): void;

    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setLevel(level:number):void;
      getCenter(): LatLng;
      setCenter(latlng: LatLng): void;
      relayout(): void;
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    class Marker {
      title: string;
      constructor(options: MarkerOptions);
    }

    interface MarkerOptions {
      map: Map;
      position: LatLng;
      image?: MarkerImage;
    }

    class MarkerImage {
      constructor(src: string, size: Size, options?: MarkerImageOptions);
    }

    interface MarkerImageOptions {
      offset: Point;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class Point {
      constructor(x: number, y: number);
    }

    namespace services {
      class Geocoder {
        addressSearch(
          address: string,
          callback: (result: GeocoderResult[], status: Status) => void
        ): void;
      }

      interface GeocoderResult {
        address_name: string;
        x: string;
        y: string;
      }

      enum Status {
        OK = 'OK',
      }
    }

    // MarkerClusterer 추가
    class MarkerClusterer {
      constructor(options: MarkerClustererOptions);
      addMarker(marker: Marker): void;
      addMarkers(markers: Marker[]): void;
      removeMarker(marker: Marker): void;
      removeMarkers(markers: Marker[]): void;
      clear(): void;
    }

    interface MarkerClustererOptions {
      map: Map;
      averageCenter?: boolean;
      minLevel?: number;
      disableClickZoom?: boolean;
      gridSize?: number;
      styles?: object[];
    }
  }
}

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

declare interface Window {
  Kakao: any;
}
