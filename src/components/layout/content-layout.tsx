import { useEffect, useState } from "react";
import CommentsPage from "../../features/comments/components/comments.tsx";
import { data } from "../../features/comments/api/index.ts";

function ContentLayout() {
  const [loaded, setLoading] = useState(false);
  useEffect(() => {
    data.then((response) => {
      setLoading(true);
    });
  }, []);
  return (
    <>
      {loaded && <CommentsPage />}
      {loaded === false && <p>Loading...</p>}
    </>
  );
}

export default ContentLayout;
