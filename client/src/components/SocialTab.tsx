import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

import './SocialTab.css';


export default function SocialTab() {
  return (
    <footer className="social-tab bg-dark p-2">
      {/* facebook */}
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
      >
        <FontAwesomeIcon icon={faFacebook} style={{ color: '#0e76a8' }} />
      </a>

      {/* GitHub */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
      >
        <FontAwesomeIcon icon={faGhost} style={{ color: '#97e3b8' }} />
      </a>

      {/* X (Twitter) */}
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2"
      >
        <FontAwesomeIcon icon={faXTwitter} style={{ color: '#e1e7a6' }} />
      </a>
    </footer>
  );
}
