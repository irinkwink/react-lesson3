import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Твой ход :)',
      userNumber: '',
      isEnd: false,
      randomNumber: '',
      count: this.props.attempts,
    };

    this.initialState = this.state;
  }

  static getDerivedStateFromProps(props, state) {
    if (state.randomNumber) return null;

    return {
      randomNumber: getRandomNumber(props.min, props.max),
    };
  }

  handleClick = () => {
    this.setState(this.initialState);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(state => {
      if (state.userNumber &&
        state.userNumber >= this.props.min &&
        state.userNumber <= this.props.max) {
        return {
          count: this.state.count - 1,
        };
      }
    });

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число!`,
        };
      }

      if (state.userNumber < this.props.min ||
        state.userNumber > this.props.max) {
        return {
          result: `Введите число от ${this.props.min} до ${this.props.max}`,
        };
      }

      if (+state.userNumber === +state.randomNumber) {
        return {
          result: `Угадали, загаданное число ${state.userNumber}`,
          isEnd: true,
        };
      }

      if (state.count <= 0) {
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
              type='number'
              min={this.props.min}
              max={this.props.max}
              id='user_number'
              onChange={this.handleChange}
              value={this.state.userNumber}
              disabled={this.state.isEnd}
            />
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
