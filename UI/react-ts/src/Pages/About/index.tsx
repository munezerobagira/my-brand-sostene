import { useEffect, useState } from "react";
import LoadingBall from "../../components/LoadingBall";
import User from "../../Types/User";
import apiRequest from "../../util/apiRequest";
import "./index.css";

function About() {
  const [isLoading, setIsLoading] = useState(true);
  const [ownerInfo, setOwnerInfo] = useState<User>({});
  useEffect(() => {
    (async () => {
      const response = await apiRequest.get("/owner").send({});
      setIsLoading(false);
      if (response.status == 200) {
        const { user } = response.body;
        setOwnerInfo(user);
      }
    })();
  }, []);
  if (isLoading) return <LoadingBall />;
  return (
    <>
      <section id="headline" className="flex margin-nav mh-100">
        <div className="wrapper headline flex">
          <div className="flex-1 headline-text-container">
            <h2>About me</h2>
            <p id="owner-summary">{ownerInfo.summary}</p>
            <div>
              <button className="button-primary">Check resume</button>
            </div>
          </div>
          <div className="headline-picture-container reverse">
            <img
              src={ownerInfo.profilePic.path}
              id="owner-image"
              className="width-full"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="wrapper text-center py-2">
          <div className="heading">
            <h2>More about me</h2>
          </div>
          <div className="flex" id="about-info">
            <div className="about-me width-full text-left" id="about-owner">
              <p>{ownerInfo.about}</p>
              <div className="">
                <button className="button px-3">Hire me</button>
              </div>
            </div>
            <div className="illustration right">
              <object
                data="../../assets/images/aboutme.svg"
                type="image/svg+xml"
                className="showcase"
              ></object>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

