import React, { Component } from "react";
import { easyWords, mediumWords, hardWords } from "./library.js";
import axios from "axios";

class Question extends Component {
	constructor() {
		super();

		this.state = {
			correctWord: "",
			definition: "",
			score: 0,
			questionNumber: 1,
			wrongAnswers: []
		};
	}
	componentDidMount() {
		this.getComparison(this.props.words[0]);
	}
	getComparison = chosenWord => {
		axios({
			url: `http://api.datamuse.com/words?`,
			method: "GET",
			params: {
				rel_hom: chosenWord,
				md: "d"
			}
		})
			.then(response => {
				response = response.data;
				const wordsWithDefs = response.filter(word => {
					return word;
				});
				this.setState(
					{
						definition: wordsWithDefs[0].defs[0],
						correctWord: wordsWithDefs[0].word
					},
					() => {
						this.formatDefinition();
					}
				);
			})
			.catch(error => {
				console.log(error, "you gooft it");
			});

		this.formatDefinition = () => {
			const defToBeFormatted = this.state.definition;
			const endSplice = defToBeFormatted.indexOf("/");
		};
	};

	handleClick = theWord => {
		if (this.state.questionNumber >= 10) {
			// show results button
		} else if (theWord === this.state.correctWord) {
			this.setState(
				{
					score: this.state.score + 1,
					questionNumber: this.state.questionNumber + 1
				},
				() => {
					this.getComparison(this.props.words[this.state.questionNumber]);
					console.log(this.state.questionNumber);
				}
			);
		} else {
			// console.log('should be blue', this.dictionary)
			const dictionary = [...this.state.wrongAnswers];
			dictionary.push(this.props.words[this.state.questionNumber]);
			this.setState(
				{
					questionNumber: this.state.questionNumber + 1,
					wrongAnswers: dictionary
				},
				() => {
					this.getComparison(this.props.words[this.state.questionNumber]);
					console.log(this.state.questionNumber, this.state.wrongAnswers);
				}
			);
		}
	};

	render() {
		return (
			<div>
				<h2>Question {this.state.questionNumber}</h2>
				<p className="definition">{this.state.definition}</p>
				<button
					className="wordButton"
					onClick={() => {
						this.handleClick(this.props.words[0]);
					}}
				>
					incorrect: {this.props.words[this.state.questionNumber]}
				</button>
				<button
					className="wordButton"
					onClick={() => {
						this.handleClick(this.state.correctWord);
					}}
				>
					correct: {this.state.correctWord}
				</button>
			</div>
		);
	}
}

export default Question;

// randomize which button is correct position stuff

// save if wrong
