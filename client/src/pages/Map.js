import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import Appbar from "../components/Appbar";
import ImageMarker from "../components/ImageMarker";
import postService from "../services/postService";
import { getUser } from "../utils/Common";
import { Modal } from "react-responsive-modal";
import PostCard from "../components/PostCard";

function Map() {
  const [viewport, setViewport] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setViewport({ zoom: 8, latitude, longitude });
        setLocationError(false);
      },
      () => setLocationError(true)
    );
  }, []);

  useEffect(() => {
    if (!posts) {
      const userID = getUser()._id;
      let res = postService.getFeed(userID).then((res) => {
        console.log(res);
        setPosts(res.post);
      });
    }
  });

  const onViewportChange = (nextViewport) => {
    const { width, height, ...etc } = nextViewport;
    setViewport(etc);
  };

  return locationError === false ? (
    <div className="overflow-y-hidden">
      {posts && posts.length > 0 ? (
        <Modal
          open={selectedPost !== null ? true : false}
          onClose={() => setSelectedPost(null)}
          center
          classNames={{
            modal: "post-modal",
          }}
        >
          <div className="flex justify-center items-center">
            <div className="border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
              {selectedPost !== null ? (
                <PostCard
                  _id={posts[selectedPost]._id}
                  user={posts[selectedPost].user.username}
                  location={posts[selectedPost].location}
                  description={posts[selectedPost].description}
                  image={posts[selectedPost].image}
                  likes={posts[selectedPost].likes}
                  points={posts[selectedPost].points}
                  post={posts[selectedPost]}
                  userImg={posts[selectedPost].user.profileImage}
                  isLoggedInUser={
                    getUser() === null
                      ? null
                      : getUser()._id === posts[selectedPost].userID
                  }
                  event={posts[selectedPost].event}
                  eventID={posts[selectedPost].eventID}
                />
              ) : null}
            </div>
          </div>
        </Modal>
      ) : null}
      <ReactMapGL
        width="100vw"
        height="100vh"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={onViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {posts && posts.length > 0
          ? posts.map(({ lat, long, image, location }, idx) => (
              <ImageMarker
                key={idx}
                latitude={lat}
                longitude={long}
                url={image}
                alt={location}
                viewport={viewport}
                postIndex={idx}
                setSelectedPost={setSelectedPost}
              />
            ))
          : null}
      </ReactMapGL>
      <Appbar />
    </div>
  ) : locationError === true ? (
    <>
      <h1 className="mt-12 mx-auto text-center text-white text-2xl">
        Sorry, something went wrong, we couldn't access your location.
      </h1>
      <Appbar />
    </>
  ) : (
    <></>
  );
}

export default Map;
