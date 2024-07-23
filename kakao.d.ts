declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      getCenter(): LatLng;
      setCenter(latlng: LatLng): void;
      relayout(): void;
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    class Marker {
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
  }
}

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}