import React, { Component } from "react";
import axios from "axios";
import dictionary from "./dictionary.css";

class Dictionary extends Component {
	constructor() {
		super();

		this.state = {
			entries: [],
			entriesFormatted: [],
			iteration: 0
		};
	}

	componentDidMount() {
		this.getDefinition(this.props.entries, this.state.iteration);
	}

	getDefinition = (entries, iteration) => {
		axios({
			url: `http://api.datamuse.com/words?`,
			method: "GET",
			params: {
				sp: entries[iteration],
				md: "dp"
			}
		})
			//------------to make sure if the word has definition-------------//
			.then(response => {
				response = response.data;
				const entriesForModding = [...this.state.entriesFormatted];
				const currentEntry = {
					word: entries[iteration],
					def: response[0].defs[0]
				};

				currentEntry.def = currentEntry.def.split("\t");
				currentEntry.def[0] = (currentEntry.def[0] + " ");
				entriesForModding.push(currentEntry);
				console.log(entriesForModding);
				this.setState(
					{
						entriesFormatted: entriesForModding,
						iteration: this.state.iteration + 1
					},
					() => {
						if (this.state.iteration < this.props.entries.length) {
							this.getDefinition(this.props.entries, this.state.iteration);
						} else {
							return;
						}
					}
				);
			})
			.catch(error => {
				console.log(error, "you gooft it");
			});

		//------------ still need to work on it--------------///
	};

	render() {
		console.log(this.props.entries)
		return (
			<section className="dictionarySection">
				<h2>my dictionary</h2>
				<ul>
					{this.state.entriesFormatted.map((item, i) => {
						return (
							<li key={i}>
								<h3>{item.word}</h3> <p><span className="wordType">{item.def[0]} </span>{item.def[1]}</p>
							</li>
						);
					})}
				</ul>
			</section>
		);
	}
}

export default Dictionary;
//
