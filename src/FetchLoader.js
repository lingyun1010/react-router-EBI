import React from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'
import EpisodeCard from './EpisodeCard'
import FacetedSearchContainer from './FacetedSearchContainer'
const proxy = 'http://localhost:8080/gxa/sc/json/search?symbol=';
const _fetch = async (host, resource) => {
  const url = proxy.concat(resource);
  console.log('url: ',resource);
  const response = await fetch(url)
  // The promise returned by fetch may be fulfilled with a 4xx or 5xx return code...
  if (response.ok) {
    return await response.json()
  }
  throw new Error(`${url} => ${response.status}`)
}

const CalloutAlert = ({error}) =>
  <div className={`row column`}>
    <div className={`callout alert small`}>
      <h5>Oops!</h5>
      <p>
        {error.description}<br/>
        If the error persists, in order to help us debug the issue, please copy the URL and this message and
        send it to us via <a href={`https://www.ebi.ac.uk/support/gxasc`}>the EBI Support & Feedback system</a>:
      </p>
      <code>{`${error.name}: ${error.message}`}</code>
    </div>
  </div>

CalloutAlert.propTypes = {
  error: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })
}

class FetchLoader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      loading: true,
      error: null
    }
  }

  render() {
    const {noResultsMessage, resultsMessage} = this.props
    const ResultElementClass = EpisodeCard;
    const {data, loading, error} = this.state

    return(
      error ?
        <CalloutAlert error={error} /> :
      loading ?
        <div id={`loader`} className={`row column`}>
          <p>Loading, please wait...</p>
        </div> :
        data.results && data.results.length > 0 ?
          <FacetedSearchContainer {...data}
                                  ResultElementClass={ResultElementClass}
                                  resultsMessage={resultsMessage}/> :
          <div className={`row column`}>
            <p>{noResultsMessage}</p>
          </div>
    )
  }

  _fetchAndSetState(host, resource) {
    this.setState({ loading: true })

    // then and catch methods are run “at the end of the current run of the JavaScript event loop” according to section
    // ‘Timing’ in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises, so state.loading will
    // be true when the promise is handled. Strictly speaking, the right thing to do would be to call _fetch in a
    // callback passed as the second argument to setState, but if we wanted to also return the promise to test the
    // component we’d need to declare a variable outside, set it within the callback, and return it... not pretty!

    return _fetch(host, resource)
          .then(
            (responseJson) =>
              this.setState({
                data: responseJson,
                loading: false,
                error: null
              })
            )
            .catch(
              (error) =>
                this.setState({
                  data: null,
                  loading: false,
                  error: {
                    description: `There was a problem communicating with the server. Please try again later.`,
                    name: error.name,
                    message: error.message
                  }
                })
            )
  }

  componentDidMount() {
    return this._fetchAndSetState(this.props.host, this.props.resource)
  }

  componentDidCatch(error, info) {
    this.setState({
      error: {
          description: `There was a problem rendering this component.`,
          name: error.name,
          message: `${error.message} – ${info}`
      }
    })
  }
}

// FetchLoader.propTypes = {
//   host: PropTypes.string.isRequired,
//   resource: PropTypes.string.isRequired,
//   ResultElementClass: PropTypes.func.isRequired,
//   noResultsMessage: PropTypes.string,
//   resultsMessage: PropTypes.string
// }

export default FetchLoader
