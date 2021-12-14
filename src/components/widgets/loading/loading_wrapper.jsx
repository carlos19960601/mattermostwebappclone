import LoadingSpinner from './loading_spinner';

const LoadingWrapper = (props) => {
  const { text, loading, children } = props;
  if (!loading) {
    return children;
  }

  return <LoadingSpinner text={text} />;
};

export default LoadingWrapper;
