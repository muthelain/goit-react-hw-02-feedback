import React, { Component } from 'react';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOption/FeedbackOptions';
import Notification from './Notification/Notifications';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    
  };

  onLeaveFeedback = event => {
    const nameButton = event.target.textContent;
    this.setState(prevState => ({
      [nameButton]: (prevState[nameButton] += 1),
    }));
  };
  countTotalFeedback(){
    return this.state.good + this.state.neutral + this.state.bad;
  }
  countPositiveFeedbackPercentage(){
    return ((this.state.good / this.countTotalFeedback()) * 100).toFixed(2);
  }

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();


    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}