import * as React from 'react';
import { EditingState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  Scheduler,
  WeekView,
  DragDropProvider,
  CurrentTimeIndicator,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

import appointments from './data-test/today-appointments';

// #FOLD_BLOCK
const styles = ({ spacing}:any) => ({
  checkBoxContainer: {
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(4),
  },
  textField: {
    marginRight: spacing(4),
    marginLeft: spacing(1),
    width: '120px',
  },
});

// #FOLD_BLOCK
const ShadeCellsCheckBox = ({ shadePreviousCells, handleChange }:any) => (
  <FormControlLabel
    control={(
      <Checkbox
        checked={shadePreviousCells}
        onChange={() => handleChange('shadePreviousCells')}
        color="primary"
      />
    )}
    label="Shade previous cells"
  />
);

// #FOLD_BLOCK
const ShadePreviousAppointmentsCheckBox = ({ shadePreviousAppointments, handleChange }:any) => (
  <FormControlLabel
    control={(
      <Checkbox
        checked={shadePreviousAppointments}
        onChange={() => handleChange('shadePreviousAppointments')}
        color="primary"
      />
    )}
    label="Shade previous appointments"
  />
);
// #FOLD_BLOCK
const CheckBoxContainer = withStyles(styles, { name: 'CheckBoxContainer' })(({
  shadePreviousCells, shadePreviousAppointments, handleCheckboxChange, classes,
  // #FOLD_BLOCK
}:any) => (
  <Grid item container direction="column" className={classes.checkBoxContainer} xs={6}>
    <ShadeCellsCheckBox
      shadePreviousCells={shadePreviousCells}
      handleChange={handleCheckboxChange}
    />
    <ShadePreviousAppointmentsCheckBox
      shadePreviousAppointments={shadePreviousAppointments}
      handleChange={handleCheckboxChange}
    />
  </Grid>
));

// #FOLD_BLOCK
const UpdateIntervalBox = withStyles(styles, { name: 'UpdateIntervalSetter' })(({
  updateInterval, onValueChange, classes,
  // #FOLD_BLOCK
}:any) => (
  <Grid item container xs={6} alignItems="center" justify="flex-end">
    <Typography>
      Update every:
    </Typography>
    <TextField
      className={classes.textField}
      variant="outlined"
      onChange={event => onValueChange(event.target.value)}
      value={updateInterval / 1000}
      type="number"
      InputProps={{
        endAdornment: <InputAdornment position="end">s</InputAdornment>,
      }}
    />
  </Grid>
));

export default class Demo extends React.PureComponent<any, any> {
  onCommitChanges: ({ added, changed, deleted }: any) => void;
  handleCheckboxChange: any;
  handleUpdateIntervalChange: (nextValue: any) => void;
  constructor(props:any) {
    super(props);
    this.state = {
      data: appointments,
      shadePreviousCells: true,
      shadePreviousAppointments: true,
      updateInterval: 10000,
    };

    this.onCommitChanges = this.commitChanges.bind(this);
    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleUpdateIntervalChange = (nextValue:any) => {
      this.setState({
        updateInterval: nextValue * 1000,
      });
    };
  }

  commitChanges({ added, changed, deleted }:any) {
    this.setState((state:any) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment:any) => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter((appointment:any) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  // handleCheckboxChange(stateField:any) {
  //   // const { [stateField]: fieldToChange } = this.state;
  //   // this.setState({
  //   //   [stateField]: !fieldToChange,
  //   // });
  // }

  render() {
    const {
      data,
      shadePreviousCells,
      updateInterval,
      shadePreviousAppointments,
    } = this.state;

    return (
      <React.Fragment>
        <Grid container>
          <CheckBoxContainer
            shadePreviousCells={shadePreviousCells}
            shadePreviousAppointments={shadePreviousAppointments}
            // handleCheckboxChange={this.handleCheckboxChange}
          />
          <UpdateIntervalBox
            updateInterval={updateInterval}
            onValueChange={this.handleUpdateIntervalChange}
          />
        </Grid>

        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <EditingState
              onCommitChanges={this.onCommitChanges}
            />
            <EditRecurrenceMenu />
            <WeekView
              startDayHour={9}
              endDayHour={19}
            />

            <Appointments />
            <DragDropProvider />

            <CurrentTimeIndicator
              shadePreviousCells={shadePreviousCells}
              shadePreviousAppointments={shadePreviousAppointments}
              updateInterval={updateInterval}
            />
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
