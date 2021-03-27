import axios from "axios";

const mapboxService = {
  forwardGeocode: async (location) => {
    let res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&routing=false`
    );
    console.log(res.data);
    return res.data || [];
  },
};

export default mapboxService;
