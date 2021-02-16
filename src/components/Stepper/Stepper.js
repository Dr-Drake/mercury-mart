import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import useStyles from './stepper-jss';
import PropTypes from 'prop-types';

export default function PageStepper(props) {
    const {
        steps,
        activeStep,
    } = props
    const classes = useStyles();
    const defaultSteps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    const usedSteps = steps ? steps : defaultSteps;

  return (
      <Stepper activeStep={activeStep ? activeStep : 0} classes={{root: classes.stepper}}>
        {usedSteps.map((label, index) => {
          const stepProps = {
            classes: {root:classes.step},
            expanded: true
          };
          const labelProps = {
            classes: {label:classes.stepLabel}
          };
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
  );
}

PageStepper.propTypes = {
    steps: PropTypes.array,
    activeStep: PropTypes.number,
}
