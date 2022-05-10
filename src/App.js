import './App.css';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const symbolContainer = {
  base: { scale: 1, backgroundColor: '#1a1' },
  focus: { scale: 1.1, backgroundColor: 'var(--light-background)' },
  selected: { scale: 1, backgroundColor: 'var(--light-background)' },
};

const symbolSvgContainer = {
  base: { backgroundColor: 'var(--summary-background)' },
  focus: {},
  selected: { backgroundColor: 'var(--summary-background)' },
};

const symbolSummary = {
  base: {},
  focus: {},
  selected: { backgroundColor: 'var(--summary-background)' },
};

const svg = {
  hidden: {
    scale: 1,
  },
  visible: {
    scale: 1.5,
  },
};

const Svg = () => {
  return (
    <motion.div
      layoutId='svg'
      className='svg'
      variants={svg}
      initial='hidden'
      animate='visible'></motion.div>
  );
};

function App() {
  const symbolContainerControls = useAnimation();
  const [pageState, setPageState] = useState('base');

  useEffect(() => {
    symbolContainerControls.set('base');
  }, [symbolContainerControls]);

  return (
    <div className='App'>
      <motion.div
        className='symbolContainer'
        variants={symbolContainer}
        animate={symbolContainerControls}
        onHoverStart={() => {
          setPageState((prev) => {
            if (prev === 'base') {
              symbolContainerControls.start('focus');
              return 'focus';
            }
            return prev;
          });
        }}
        onHoverEnd={() => {
          setPageState((prev) => {
            if (prev === 'focus') {
              symbolContainerControls.start('base');
              return 'base';
            }
            return prev;
          });
        }}>
        {pageState !== 'selected' && (
          <motion.div
            layoutId='symbolBackground'
            className='symbolSvgContainer'
            variants={symbolSvgContainer}
            initial='base'
            animate='selected'
            onTap={() => {
              setPageState((prev) => {
                if (prev === 'focus') {
                  symbolContainerControls.start('selected');
                  return 'selected';
                } else {
                  symbolContainerControls.start('base');
                  return 'base';
                }
              });
            }}>
            <Svg />
          </motion.div>
        )}
        {pageState === 'selected' && (
          <motion.div
            layoutId='symbolBackground'
            className='symbolSummary'
            variants={symbolSummary}
            initial='base'
            animate='selected'>
            <motion.svg
              className='symbolSummaryBorder'
              height='100%'
              width='100%'>
              <motion.rect
                height='100%'
                width='100%'
                strokeWidth={10}
                stroke='var(--white)'
                fill='var(--transparent)'
              />
            </motion.svg>
            <motion.div
              className='toggleFocusButton'
              onTap={() => {
                setPageState((prev) => {
                  if (prev === 'focus') {
                    symbolContainerControls.start('selected');
                    return 'selected';
                  } else {
                    symbolContainerControls.start('base');
                    return 'base';
                  }
                });
              }}>
              BACK
            </motion.div>
            <Svg />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
