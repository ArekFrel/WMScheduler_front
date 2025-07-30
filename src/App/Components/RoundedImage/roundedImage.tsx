import './styles.css';

type RoundedImageProps = {
    src: string;
    size: {
        width: string | number;
        height: string | number;
    }
}

export const RoundedImage: React.FC<RoundedImageProps> = ({ src, size }) => {
  return (
    <div
      className="roundedImage"
      style={{
        backgroundImage: `url(${src})`,
        // backgroundImage: 'url(' + src + ')',
        width: size.width,
        height: size.height + 'px',
      }}
    ></div>
  );
}

