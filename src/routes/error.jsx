import PropTypes from 'prop-types';

const Error = ({ error }) => {
    if (Array.isArray(error)) {
      return (
        <ul>
          {error.map((err, index) => (
            <li key={index} style={{color:"red"}}>{err}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul>
          <li style={{color:"red"}}>{error}</li>
        </ul>
      );
    }
  };
  
  Error.propTypes = {
    error: PropTypes.oneOfType([
      PropTypes.string,            
      PropTypes.arrayOf(PropTypes.string), 
    ]).isRequired, 
  };

  export default Error;