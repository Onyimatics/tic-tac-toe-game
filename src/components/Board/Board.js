import React, { Component } from 'react'
import _ from 'lodash'

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            player: null,
            winnerIndex: null,
            aiPlayer: "X",
            huPlayer: "O",
            board: Array(9).fill(null),
            mapIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            winLines: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        this.checkWinner = this.checkWinner.bind(this)
        this.huPlayerIndexies = this.huPlayerIndexies.bind(this)
        this.aiIndexes = this.aiIndexes.bind(this)
    }

    checkWinner() {

        for (let index = 0; index < this.state.winLines.length; index++) {
            const [a, b, c] = this.state.winLines[index]

            if (
                this.state.board[a] === this.state.huPlayer &&
                this.state.board[b] === this.state.huPlayer &&
                this.state.board[c] === this.state.huPlayer
            ) {
                this.setState({
                    winner: this.state.huPlayer,
                    winnerIndex: [a, b, c]
                })
            } else if (
                this.state.board[a] === this.state.aiPlayer &&
                this.state.board[b] === this.state.aiPlayer &&
                this.state.board[c] === this.state.aiPlayer
            ) {
                this.setState({
                    winner: this.state.aiPlayer,
                    winnerIndex: [a, b, c]
                })
            }
        }
    }

    aiAction() {
        const availSpot = this.emptyIndexies()
        const checkWinlines = this.state.winLines
        const aiIndexes = this.aiIndexes()
        const opponentIndexes = this.huPlayerIndexies()
        let res = []
        let coverIndex = null

        
        // check to see if there's a winning opportunity
        // get win lines
        checkWinlines.map((value, key) => {
            let intersept = _.intersection(value, aiIndexes)
            console.log(intersept)
            if (intersept.length == 2) {
                let j = _.difference(value, intersept);

                if (this.state.board[j[0]] === null) {
                    coverIndex = j[0]
                }

            }
        })

        if (coverIndex) {
            return coverIndex
        }

        // if intersept == 2 and they are all aiIndexes
        // set coverIndex
        checkWinlines.map((value, key) => {
            let intersept = _.intersection(value, opponentIndexes)
            console.log(intersept)
            if (intersept.length == 2) {
                let j = _.difference(value, intersept)

                if (this.state.board[j[0]] === null) {
                    coverIndex = j[0]
                }

            }
        })

        if (coverIndex) {
            return coverIndex
        }

        checkWinlines.map((value, key) => {
            let intersept = _.intersection(value, availSpot)
            console.log(intersept)
            if (intersept.length == 2) {
                let j = _.difference(value, intersept)

                if (this.state.board[j[0]] === null) {
                    coverIndex = j[0]
                }

            }
        })

        checkWinlines.map((value, key) => {
            let d = _.intersection(value, availSpot)

            if (d && !_.isEmpty(_.difference(value, d))) {
                res.push(d)
            }
        })

        let mostSpot = _.flattenDeep(res)
        let uniq = _.uniq(mostSpot)
        let availtoSpot = uniq

        const center = 4
        if (availtoSpot.includes(center)) {
            return center
        }

        const diagonals = [0, 2, 6, 8]
        const availDiagonals = _.intersection(diagonals, availSpot)

        if (!availtoSpot.includes(center) && availDiagonals.length) {
            return availDiagonals[0];
        }

        let rand = availtoSpot[Math.floor(Math.random() * availtoSpot.length)]

        return rand
    }

    handleClick = index => {
        if (this.state.winner !== null) {
            return
        }

        let newboard = this.state.board;

        if (newboard[index] !== null) {
            return
        }

        newboard[index] = this.state.huPlayer
        this.setState({
            board: newboard,
            player: this.state.huPlayer
        })

        setTimeout(() => {
            this.checkWinner()

            if (this.state.winner === null) {
                let freshboard = this.state.board;
                let aiIndex = this.aiAction();

                freshboard[aiIndex] = this.state.aiPlayer
                this.setState({
                    board: freshboard,
                    player: this.state.aiPlayer
                })

                setTimeout(() => {
                    this.checkWinner()
                }, 800)
            }

        }, 800);

    }

    emptyIndexies = () => {

        let fills = []
        let iterator = _.filter(this.state.board, function (value, key) {
            if (value === null) {
                fills.push(key)
            }
        })

        return fills;
    }

    huPlayerIndexies = () => {

        let fills = []
        let iterator = _.filter(this.state.board, function (value, key) {
            if (value === 'O') {
                fills.push(key)
            }
        })

        return fills;
    }

    aiIndexes = () => {

        let fills = []
        let iterator = _.filter(this.state.board, function (value, key) {
            if (value === 'X') {
                fills.push(key)
            }
        })

        return fills;
    }

    reset(e) {
        this.setState({
            winner: null,
            player: null,
            board: Array(9).fill(null),
            winnerIndex: null
        })
    }

    render() {
        const markColor = this.state.winner === this.state.huPlayer ? "#badc58" : "#ff7979"
        const Box = this.state.board.map((box, index) =>
            <div
                key={index}
                onClick={() => this.handleClick(index)}
                style={
                    this.state.winnerIndex && _.indexOf(this.state.winnerIndex, index) > -1 ? { color: markColor } : {}
                }
                className="col box">
                {box}
            </div>
        )
        return (
            <div className="board" style={{
                width: "400px",
                margin: "10px auto"
            }}>
                {this.state.winner === this.state.huPlayer && <div style={{
                    color: markColor
                }}>
                    <h2>You Win!</h2>
                </div>}

                {this.state.winner === this.state.aiPlayer && <div style={{
                    color: markColor
                }}>
                    <h2>You Lose!</h2>
                </div>}

                {(this.state.winner === null && _.isEmpty(this.emptyIndexies())) && <div style={{
                    color: "#fff"
                }}>
                    <h2>It's a Draw!!!</h2>
                </div>}

                <div className="board-wrapper">
                    {Box}
                </div>

                <button className="btn" type="button" onClick={(e) => this.reset(e)}>
                    {this.state.winner || _.isEmpty(this.emptyIndexies()) ? 'New Game' : 'Reset'}
                </button>
                <h3 className="feedback">Enjoy the game! Any feedback? Kindly drop a feedback mail at ezikeonyinyefavour@gmail.com, Thank you!</h3>

            </div>
        )
    }
}

export default Board;
