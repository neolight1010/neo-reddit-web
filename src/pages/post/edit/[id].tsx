import {withUrqlClient} from "next-urql"
import { Layout } from "../../../components/Layout"
import {createUrqlClient} from "../../../utils/createUrqlClient"

const EditPost = (): JSX.Element => {
  return <Layout>

    Edit post page

    </Layout>
}

export default withUrqlClient(createUrqlClient)(EditPost)
