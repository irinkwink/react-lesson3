import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

const initialState = {
  result: 'Твой ход :)',
  userNumber: '',
  isEnd: false,
};

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      randomNumber:
        Math.floor(Math.random() * (this.props.max - this.props.min + 1)) +
        this.props.min,
      count: this.props.attempts,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState(state => ({
      count: this.state.count - 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число!`,
        };
      }

      if (+state.userNumber === +state.randomNumber) {
        return {
          result: `Угадали, загаданное число ${state.userNumber}`,
          isEnd: true,
        };
      }

      if (state.count === 0) {
        return {
          result: `Вы проиграли :(`,
          isEnd: true,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }
    });

    this.setState(state => ({
      userNumber: '',
    }));
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleClick = () => {
    this.setState({
      ...initialState,
      randomNumber:
        Math.floor(Math.random() * (this.props.max - this.props.min + 1)) +
        this.props.min,
      count: this.props.attempts,
    });
  };

  render() {
    const message = this.state.isEnd ?

      <button
        className={`${style.btn} ${style.btn_play}`}
        onClick={this.handleClick}>
        Сыграть ещё
      </button> :

      <p className={style.attempts}>
        Попыток: {this.state.count} из {this.props.attempts}
      </p>;

    return (
      <div className={style.game}>
        <p className={style.title}>
          Угадай число от {this.props.min} до {this.props.max}
        </p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label htmlFor='user_number'>
            <input
              className={style.input}
              type='number' id='user_number'
              onChange={this.handleChange}
              value={this.state.userNumber} />
          </label>

          <button
            className={style.btn}
            disabled={this.state.isEnd}
          >Угадать</button>
        </form>

        <p className={style.result}>{this.state.result}</p>

        {message}
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  attempts: PropTypes.number,
};
