import React, { useEffect } from "react";
import { BASE_URL } from "../../constants/BASE_URL";

function Article({ blogId, token }) {
  useEffect(() => {
    const getBlogFindOne = async () => {
      fetch(`${BASE_URL}blog/article/${blogId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((result) => result.json())
    };
    getBlogFindOne();
  }, []);

  return <div>Article</div>;
}

export default Article;
