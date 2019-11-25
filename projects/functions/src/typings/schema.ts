interface ParsedPostPlaceCard {
  post?: {
    /** Post image on Instagram, Pinterest, etc. */
    image?: string;
    /** Link to original post on Instagram, Pinterest, etc. */
    ref: string;
    /** Number of likes on Instagram */
    likes?: number;

    author?: {
      /** Login on Instagram, Pinterest, etc. */
      username: string;
      /** Link to profile */
      ref: string;
      /** Link to avatar image */
      avatar: string;
    };
  };
  location: {
    /** Google Maps id */
    id: string;
    /** Google Maps formatted address */
    address: string;
    /** Google Maps location lat */
    lat: string;
    /** Google Maps location lng */
    lng: string;
  };
  social?: {
    instagram?: {
      /** Location id on Instagram */
      id: string;
      /** Link to location page on Instagram */
      ref: string;
      /** Top photos on location page on Instagram */
      photo: string[];
    };
    googleMaps?: {
      reviews: string[];
      rating: number;
      /** Top photos on location page on GoogleMaps */
      photo: string[];
      /** Link to show point on Google Maps */
      ref: string;
    };
  };
}
