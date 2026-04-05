interface ProgressbarProps {
  percentage: number | any;
  circleWidth: number | any;

}

const Progressbar: React.FC<ProgressbarProps> = ({
  percentage,
  circleWidth,
}) => {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  return (
    <div className="flex justify-center">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="18px"
          r={radius}
          className="fill-none stroke-secondary"
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="18px"
          r={radius}
          className="fill-none stroke-[#08CA3F]"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text x="50%"  y="50%" dy="0.3em" textAnchor="middle" className="fill-secondary-foreground text-2xl">
            {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default Progressbar;
