import PropTypes from "prop-types";

const Error = ({ error }) => {
  if (!error) return null;

  return (
    <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
      {Array.isArray(error) ?(
        <ul className="list-disc pl-5 space-y-1">
          {error.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>):(
        <p>{error}</p>)}
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string, // Single error string
    PropTypes.arrayOf(PropTypes.string), // Array of error strings
  ]).isRequired,
};

export default Error;