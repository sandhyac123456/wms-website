import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicationById } from "../Service/Operation/jobApplicationOperation";

const ResumeView = () => {
  const { id } = useParams();
  const [resumeUrl, setResumeUrl] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplication = async () => {
      const res = await getApplicationById(id, token);
      if (res?.success) {
        setResumeUrl(res.data.resume);
      }
    };

    fetchApplication();
  }, [id]);

  return (
    <div style={{ height: "100vh" }}>
      {resumeUrl ? (
        <iframe
          src={resumeUrl}
          title="Resume"
          width="100%"
          height="100%"
        />
      ) : (
        <p>Loading resume...</p>
      )}
    </div>
  );
};

export default ResumeView;