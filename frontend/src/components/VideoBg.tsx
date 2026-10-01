import Videobg from "../assets/bg-video.mp4";

export default function VideoBg() {
  return (
    <video
      autoPlay
      muted
      loop
      id="myVideo"
      style={{ width: "100%", height: "100%" }}
      src={Videobg}
      className="object-cover fixed top-0 left-0 z-[-1]"
    ></video>
  );
}
