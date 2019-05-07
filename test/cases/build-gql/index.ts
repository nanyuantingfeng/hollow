/******************************************************
 * Created by nanyuantingfeng on 2019-05-07 14:47.
 *****************************************************/
import gql from 'graphql-tag'

export const QUERY_CLUSTERS = gql`
  query queryClusters {
    clusters {
      id
      name
      endpoint
      secret
    }
  }
`

export const QUERY_CLUSTER = gql`
  query queryCluster($input: dashboard_clusterEp_getInput!) {
    cluster(input: $input) {
      id
      name
      endpoint
      secret
    }
  }
`

export const SAVE_CLUSTER = gql`
  mutation saveCluster($input: dashboard_clusterEp_saveInput!) {
    saveCluster(input: $input) {
      clientMutationId
    }
  }
`

export const DELETE_CLUSTER = gql`
  mutation deleteCluster($input: dashboard_clusterEp_deleteInput!) {
    deleteCluster(input: $input) {
      clientMutationId
    }
  }
`

export default DELETE_CLUSTER
