import styles, { typography } from '../style';
import PropTypes from 'prop-types';

function SmallCard({ heading, figure, icon, backgroundColor }) {
  return (
    <div className={`flex bg-white  flex-col flex-1 max-w-[300px] max-h-[200px]  p-4 rounded-lg shadow-md ${backgroundColor}`}>
      <div className="flex items-center gap-4">
        {icon && <img src={icon} alt="" className="w-8 h-8" />} {/* Optional icon */}
        <p className={`${typography.paragraphSmall} text-gray-700 font-semibold`}>{heading}</p>
      </div>
      <div className="flex flex-row items-center justify-between mt-4">
        <h3 className="inter text-xl font-bold text-gray-900 truncate">{figure}</h3>
      </div>
    </div>
  );
}

SmallCard.propTypes = {
  heading: PropTypes.string.isRequired,
  figure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string, // Optional icon URL
  backgroundColor: PropTypes.string, // Optional background color class (e.g., bg-blue-100)
};

SmallCard.defaultProps = {
  backgroundColor: 'bg-gray-100',
};

export default SmallCard;
