import { MAIN_LINK } from '@/constants';
import MainLink from './MainLink';

const MainLinks = () => {
  return (
    <div>
      {MAIN_LINK.map((link) => {
        return <MainLink {...link} key={link.label} />;
      })}
    </div>
  );
};

export default MainLinks;
