import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box } from "@chakra-ui/layout";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [postsData, _execPostsQuery] = usePostsQuery();

  return (
    <Box>
      <NavBar />
      <Box id="posts">
        {!postsData.data
          ? null
          : postsData.data.posts.map((post) => (
              <Box key={post.id}>{post.title}</Box>
            ))}
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
