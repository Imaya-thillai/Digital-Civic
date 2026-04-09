import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, FileText, Users } from 'lucide-react';

const Home = () => {
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.w < 600;

  return (
    <div style={styles.container}>
      <div style={styles.leftGlow} />
      <div style={styles.rightGlow} />

      <motion.div
        initial={{ opacity: 0, y: isMobile ? 30 : -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{
          ...styles.contentSection,
          padding: isMobile ? '2rem 1.4rem' : '4rem',
        }}
      >
        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={styles.brand}
        >
          CIVIX
        </motion.div>

        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? '2rem' : windowSize.w < 900 ? '2.6rem' : '3.5rem',
        }}>
          Digital Civic<br />
          <span style={styles.highlight}>Participation</span>
        </h1>

        <p style={{
          ...styles.description,
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
        }}>
          A platform that connects people with community initiatives,
          enabling them to raise concerns, share opinions, and take part
          in local decision-making.
        </p>

        <div style={{
          ...styles.featureGrid,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: isMobile ? '10px' : '20px',
          marginBottom: isMobile ? '2rem' : '3rem',
        }}>
          <FeatureItem icon={<FileText size={18} />} text="Submit Community Issues" />
          <FeatureItem icon={<Vote size={18} />} text="Participate in Opinion Polls" />
          <FeatureItem icon={<Users size={18} />} text="Support Collective Action" />
        </div>

        <div style={{
          ...styles.buttonGroup,
          flexDirection: isMobile ? 'column' : 'row',
          width: isMobile ? '100%' : 'auto',
          gap: isMobile ? '12px' : '16px',
        }}>
          <Link to="/register" style={{ width: isMobile ? '100%' : 'auto' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                ...styles.registerBtn,
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '14px 24px' : '12px 30px',
                fontSize: isMobile ? '1rem' : '0.95rem',
              }}
            >
              Join the Community
            </motion.button>
          </Link>

          <Link to="/login" style={{ width: isMobile ? '100%' : 'auto' }}>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                ...styles.loginBtn,
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '14px 24px' : '12px 30px',
                fontSize: isMobile ? '1rem' : '0.95rem',
              }}
            >
              Sign In
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureItem = ({ icon, text }) => (
  <div style={styles.featureItem}>
    <div style={styles.iconBox}>{icon}</div>
    <span style={{ fontSize: '0.88rem', color: '#ccc' }}>{text}</span>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    minHeight: '100dvh',
    background: 'linear-gradient(135deg, #291e41 0%, #1e1428 50%, #321217 100%)',
    color: 'white',
    overflow: 'hidden',
    textAlign: 'center',
    position: 'relative',
  },
  leftGlow: {
    position: 'absolute',
    left: '-150px',
    top: '20%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(114,165,245,0.3), transparent 70%)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  rightGlow: {
    position: 'absolute',
    right: '-150px',
    bottom: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)',
    filter: 'blur(90px)',
    pointerEvents: 'none',
  },
  contentSection: {
    maxWidth: '760px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    position: 'relative',
  },
  brand: {
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.35em',
    color: '#60a5fa',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '1rem',
    lineHeight: 1.15,
  },
  highlight: {
    color: '#60a5fa',
    textShadow: '0 0 40px rgba(96,165,250,0.45)',
  },
  description: {
    color: '#94a3b8',
    maxWidth: '480px',
    lineHeight: 1.65,
  },
  featureGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  iconBox: {
    background: 'rgba(59,130,246,0.18)',
    padding: '7px',
    borderRadius: '8px',
    color: '#60a5fa',
    display: 'flex',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
  },
  registerBtn: {
    background: 'rgba(96,165,250,0.15)',
    border: '1px solid rgba(96,165,250,0.4)',
    color: 'white',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0.02em',
    transition: 'background 0.2s',
  },
  loginBtn: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.8)',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0.02em',
  },
};

export default Home;
